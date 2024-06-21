import React, { useState } from 'react';

function ImageComparator() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [accuracy, setAccuracy] = useState(null);

  const handleImage1Change = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage1(reader.result);
    };
  };

  const handleImage2Change = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage2(reader.result);
    };
  };

  const handleCompareClick = async () => {
    if (image1 && image2) {
      const response = await fetch('/compare-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image1, image2 }),
      });
      const data = await response.json();
      setAccuracy(data.accuracy);
    }
  };

  return (
    <div>
      <h2>Image Comparator</h2>
      <div>
        <input type="file" accept="image/*" onChange={handleImage1Change} />
        <img src={image1} alt="Image 1" />
      </div>
      <div>
        <input type="file" accept="image/*" onChange={handleImage2Change} />
        <img src={image2} alt="Image 2" />
      </div>
      <button onClick={handleCompareClick}>Compare Images</button>
      {accuracy && <p>Accuracy: {accuracy}%</p>}
    </div>
  );
}

export default ImageComparator;
