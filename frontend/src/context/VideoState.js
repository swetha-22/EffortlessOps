import React ,{useRef, useState} from 'react'
import VideoContext from './VideoContext'
const VideoState = (props) => {

    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [isVideoOn, setIsVideoOn] = useState(false);
    // const [trackStatus, settrackStatus] = useState(false);
    
    const [isAdministrator, setIsAdministrator] = useState(false);


    //Tracking Analysis button in ImgCollection component
    const [thresholdCalc, setThresholdCalc] = useState(0);

    const [isAdminContext, setIsAdmin] = useState(false);
    

    // start the video stream
    const startVideoStream = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(stream);
            videoRef.current.srcObject = stream;
            await videoRef.current.play();
        } catch (error) {
            console.log("getUserMedia() not supported.");
        }
    };

    // stop the video stream
    const stopVideoStream = async () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            videoRef.current.srcObject = null;
            setStream(null);
        }
    };




    
    const takeSnapshot = async () => {

        console.log("Taking snapshot");
        if (!stream){
            console.log("no stream");
            return;
        } 
    
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
    
        const reader = new FileReader();
        reader.onloadend = function () {
            const base64data = reader.result;
            saveImageToServer(base64data);
        };
        reader.readAsDataURL(blob);
    }
    const saveImageToServer = async (base64data) => {
        console.log("saving...")
        const response = await fetch("https://effortlessops-backend.onrender.com/api/signup/upload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "emp_id":localStorage.getItem("emp_id"),
            },
            body: JSON.stringify({ image: base64data }),
        });
    
        console.log("Image saved:", response);
    }



    
    return (
        <VideoContext.Provider value={{videoRef,startVideoStream ,stopVideoStream ,takeSnapshot ,thresholdCalc, setThresholdCalc, setIsVideoOn, isAdminContext, setIsAdmin, isAdministrator, setIsAdministrator}}>
            {props.children}
        </VideoContext.Provider>
    )
}

export default VideoState;
