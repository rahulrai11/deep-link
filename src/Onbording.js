import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

function Onbording() {
    const [content, setContent] = useState('');

    useEffect(() => {

        const openApp = () => {
            var appScheme = "myapp://"; // Ensure this matches your AndroidManifest.xml
            var playStoreWeb = "https://play.google.com/store/apps/details?id=com.bastianqrapp";
            var appStoreLink = "https://apps.apple.com/in/app/bastian-customer-parts-portal/id6473263265"; // Replace with actual App Store link

            var userAgent = navigator.userAgent || navigator.vendor;

            // alert("Open your app");

            // If app is not installed, redirect after 2 seconds
            setTimeout(function () {
                if (/android/i.test(userAgent)) {
                    //window.location.href = playStoreWeb;
                    window.location.href = "intent://play.google.com/store/apps/details?id=com.bastianqrapp#Intent;package=com.android.vending;scheme=https;end;";
                } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
                    window.location.href = appStoreLink;
                    // alert("call")
                } else {
                    // window.location.href = playStoreWeb;
                }
            }, 500);
        }

        // openApp();
    }, [])

    const reDirectToStore = () => {
        const appStoreURL = "https://apps.apple.com/in/app/bastian-customer-parts-portal/id6473263265";
        window.location.replace(appStoreURL);
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            textAlign: "center"
        }}>
            <p style={{ marginTop: "10px", fontSize: "18px", width: "80%" }}>
                To view the Bastian Customer Parts Portal, please{" "}
                <a href="#"
                    onClick={(event) => {
                        event.preventDefault(); // Prevent default navigation
                        reDirectToStore(); // Call the function when clicked
                    }}
                    style={{ textDecoration: "underline", color: "blue" }}>
                    download
                </a>{" "}
                the app in the App Store.
            </p>

            <ReactPlayer
                className='react-player'
                playing={true}
                loop
                muted
                playsInline={true} // Ensures proper playback on iOS Safari
                url='https://qrcodeblobstorage.blob.core.windows.net/qrcodecontainer/bastians/bastian.mp4'
                width='100%'
            />
        </div>
    )
}

export default Onbording