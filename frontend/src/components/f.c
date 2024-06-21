#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <mpi.h>
#include <math.h>

// Prototypes for helper functions
void get_n_m(int argc, char *argv[], int nAndm[2]);
void create_matrix(float **A, int n, char *flag, char *filename);
void print_matrix(float **A, int n, int m, char *label, int rank, int cpu);
void back_substitution(float **A, float **Y, float **X, int n, int m, int rank, int cpu);
void matrix_multiply(float **A, float **R, float **Y, int n, int m, int rank, int cpu);
float calculate_error(float **X, float **R, int n, int m, int rank, int cpu);

int main(int argc, char *argv[]) {
    MPI_Init(&argc, &argv);
    int rank, cpu;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &cpu);

    // Parse command line arguments to obtain matrix dimensions and initialization flag
    int nAndm[2], n, m;
    get_n_m(argc, argv, nAndm);
    n = nAndm[0];
    m = nAndm[1];

    // Allocate memory for matrices A, R, Y, X
    float **A, **R, **Y, **X;
    A = (float **)malloc(n * sizeof(float *));
    R = (float **)malloc(n * sizeof(float *));
    Y = (float **)malloc(n * sizeof(float *));
    X = (float **)malloc(n * sizeof(float *));
    for (int i = 0; i < n; i++) {
        A[i] = (float *)malloc(n * sizeof(float));
        R[i] = (float *)malloc(m * sizeof(float));
        Y[i] = (float *)malloc(m * sizeof(float));
        X[i] = (float *)malloc(m * sizeof(float));
    }

    // Create and initialize matrix A
    create_matrix(A, n, argv[1], argv[2]);

    // Print matrix A
    print_matrix(A, n, n, "Matrix A", rank, cpu);

    // Create and initialize reference matrix R
    create_matrix(R, n, "-r", NULL);

    // Print reference matrix R
    print_matrix(R, n, m, "Reference Matrix R", rank, cpu);

    // Parallel matrix multiply to calculate Y = A * R
    matrix_multiply(A, R, Y, n, m, rank, cpu);

    // Solve the matrix equation AX = Y in parallel using back substitution
    back_substitution(A, Y, X, n, m, rank, cpu);

    float error = calculate_error(X, R, n, m, rank, cpu);

    if (rank == 0) {
        printf("Error: %.6f\n", error);
    }

    for (int i = 0; i < n; i++) {
        free(A[i]);
        free(R[i]);
        free(Y[i]);
        free(X[i]);
    }
    free(A);
    free(R);
    free(Y);
    free(X);

    MPI_Finalize();
    return 0;
}


void get_n_m(int argc, char *argv[], int nAndm[2]) {
    if (argc != 3) {
        fprintf(stderr, "Usage: %s -r n\n", argv[0]);
        exit(EXIT_FAILURE);
    }
    if (argv[1][0] != '-' || (argv[1][1] != 'r' && argv[1][1] != 'f' && argv[1][1] != 'd')) {
        fprintf(stderr, "Invalid flag. Use -r for random initialization, -d for diagonal initialization, or -f for file input.\n");
        exit(EXIT_FAILURE);
    }
    nAndm[0] = atoi(argv[2]);
    nAndm[1] = atoi(argv[2]); 
    if(argv[1][1]=='f'){
        FILE *fp = fopen(argv[2], "r");
        if (fp == NULL) {
            fprintf(stderr, "Error opening file\n");
            exit(EXIT_FAILURE);
        }
        int size;
        if (fscanf(fp, "%d", &size) != 1) {
            fprintf(stderr, "Error reading matrix size from file 111111\n");
            exit(EXIT_FAILURE);
        }
        fclose(fp);
        nAndm[0]=size;
        nAndm[1]=size;
    }
}

void create_matrix(float **A, int n, char *flag, char *filename) {
    int i, j;
    if (flag[1] == 'r') 
    {
        srand(time(NULL)); 
        for (i = 0; i < n; i++) {
            for (j = 0; j < n; j++) {
                A[i][j] = (float)rand() / RAND_MAX;
            }
        }
    }
    else if (flag[1] == 'f') 
    {
        FILE *fp = fopen(filename, "r");
        if (fp == NULL) {
            fprintf(stderr, "Error opening file %s\n", filename);
            exit(EXIT_FAILURE);
        }

        int size;
        if (fscanf(fp, "%d", &size) != 1) {
            fprintf(stderr, "Error reading matrix size from file %s\n", filename);
            exit(EXIT_FAILURE);
        }

        if (size != n) {
            fprintf(stderr, "Error: Matrix size in file %s does not match expected size %d\n", filename, n);
            exit(EXIT_FAILURE);
        }

        //printf("Matrix size read from file: %d\n", size);

        for (i = 0; i < n; i++) {
            for (j = 0; j < n; j++) {
                if (fscanf(fp, "%f", &A[i][j]) != 1) {
                    fprintf(stderr, "Error reading matrix from file %s\n", filename);
                    exit(EXIT_FAILURE);
                }
                //printf("Read element A[%d][%d]: %.2f\n", i, j, A[i][j]);
            }
        }

        fclose(fp);
    }

    else if (flag[1] == 'd') 
    {
        for (i = 0; i < n; i++) {
            for (j = 0; j < n; j++) {
                if (i == j) {
                    A[i][j] = i + 1; 
                } else {
                    A[i][j] = 0.0;
                }
            }
        }
    } 
    else {
        fprintf(stderr, "Invalid flag. Use -r for random initialization, -d for diagonal initialization, or -f for file input.\n");
        exit(EXIT_FAILURE);
    }
}


void print_matrix(float **A, int n, int m, char *label, int rank, int cpu) {
    printf("%s from rank %d of %d\n", label, rank, cpu);
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            printf("%.2f ", A[i][j]);
        }
        printf("\n");
    }
}

void back_substitution(float **A, float **Y, float **X, int n, int m, int rank, int cpu) {
    for (int i = 0; i < m; i++) { // For each column in Y
        for (int j = n - 1; j >= 0; j--) { // Backward substitution
            float sum = 0;
            for (int k = j + 1; k < n; k++) {
                sum += A[j][k] * X[k][i];
            }
            X[j][i] = (Y[j][i] - sum) / A[j][j];
        }
    }
}

void matrix_multiply(float **A, float **R, float **Y, int n, int m, int rank, int cpu) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            Y[i][j] = 0;
            for (int k = 0; k < n; k++) {
                Y[i][j] += A[i][k] * R[k][j];
            }
        }
    }
}

float calculate_error(float **X, float **R, int n, int m, int rank, int cpu) {
    // error: ε = Σ((X - R)^2) / n
    float error = 0.0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            error += pow(X[i][j] - R[i][j], 2);
        }
    }
    error /= n;
    return error;
}