import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import Sidebar from './Sidebar';
import Navbar from "./Navbar";
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import VideoContext from "../context/VideoContext";
import { useContext } from "react";

export default function Videocall() {
    let isAdmin=JSON.parse(localStorage.getItem("is_admin"));
    const roomID = "Spayroll";
    let myMeeting = async (element) => {
   // generate Kit Token
    const appID = 812851395;
    const serverSecret = "6678217183587a9b2a6a705bac5f60c4";
    const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  Date.now().toString() , "Abhi");

   // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
           window.location.protocol + '//' + 
           window.location.host + window.location.pathname +
            '?roomID=' +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
    });
  };

  const mainStyle = {
    width: "calc(115% - 162px)", // Adjusted width to fill the remaining space after the Sidebar
    marginTop: "40px",
    marginBottom: "50px", 
  };
  
  let {isAdministrator} =useContext(VideoContext);

  return (
    <div>
      {isAdministrator===true?<AdminNavbar/>:<Navbar/>}
        <div className="d-flex">
        {isAdministrator===true?<AdminSidebar/>:<Sidebar/>}
        <div className='myComponent' style={mainStyle}>
          <div ref={myMeeting} style={{ width: '100%', height: '80vh' }}>
          </div>
        </div>
      </div>
    </div>
  );
}


