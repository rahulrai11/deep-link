import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

function DeepNotFound() {

    useEffect(() => {
        const openApp = () => {

            const path = window.location.pathname;
            const customURL = "myapp://" + path.replace(/^\/+/, ''); // Ensure clean path

            const playStoreURL = "https://play.google.com/store/apps/details?id=com.bastianqrapp";
            const appStoreURL = "https://apps.apple.com/in/app/bastian-customer-parts-portal/id6473263265";
            var fallbackURL = "https://rahulrai11.github.io/deep-link/#app"; // fallback page

            const userAgent = navigator.userAgent;
            const isAndroid = /Android/i.test(userAgent);
            const isiOS = /iPhone|iPad|iPod/i.test(userAgent);

            let appOpened = false;
            let fallbackTimeout;

            function stopRedirect() {
                console.log("App detected as opened, stopping redirect.");
                appOpened = true;
                clearTimeout(fallbackTimeout);
                window.removeEventListener("visibilitychange", handleVisibilityChange);
                document.removeEventListener("click", stopRedirect);
                document.removeEventListener("touchstart", stopRedirect);
            }

            function handleVisibilityChange() {
                if (document.hidden) {
                    stopRedirect();
                }
            }

            window.addEventListener("visibilitychange", handleVisibilityChange);
            document.addEventListener("click", stopRedirect);
            document.addEventListener("touchstart", stopRedirect);

            // Attempt direct navigation
            window.location.href = customURL;

            // Alternative iframe method for better reliability
            let iframe = document.createElement("iframe");
            iframe.style.display = "none";
            iframe.src = customURL;
            document.body.appendChild(iframe);

            if (isAndroid) {
                fallbackTimeout = setTimeout(() => {
                    if (!appOpened) {
                        window.location.replace(playStoreURL);
                    } else {
                        console.log("App opened successfully, stopping script.");
                    }
                }, 800); // Increased timeout for better user interaction detection
            } else {
                fallbackTimeout = setTimeout(function () {
                    window.location = fallbackURL;
                }, 1500); // 1.5s wait is typical
            }
        };

        openApp();

    }, []);

    const deep = () => {
        const playStoreURL = "https://play.google.com/store/apps/details?id=com.bastianqrapp";
        const appStoreURL = "https://apps.apple.com/in/app/bastian-customer-parts-portal/id6473263265";


        const userAgent = navigator.userAgent;
        const isAndroid = /Android/i.test(userAgent);
        // const isiOS = /iPhone|iPad|iPod/i.test(userAgent);
        const isiOS = /iPhone|iPad|iPod|Mac/i.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

        if (isAndroid) {
            window.location.replace(playStoreURL);
        } else if (isiOS) {
            window.location.replace(appStoreURL);
        }
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
            {/* <p style={{ marginTop: "10px", fontSize: "18px", width: "80%" }}>
                Off we go! If Bastian’s already chilling on your device, we’ll take you there.
                If not, <a href="#"
                    onClick={(event) => {
                        event.preventDefault(); // Prevent default navigation
                        deep(); // Call the function when clicked
                    }}
                    style={{ textDecoration: "underline", color: "blue" }}>
                    just hit the store and start your journey
                </a>
            </p>

            <ReactPlayer
                className='react-player'
                playing={true}
                loop
                muted
                playsInline={true} // Ensures proper playback on iOS Safari
                url='https://qrcodeblobstorage.blob.core.windows.net/qrcodecontainer/bastians/bastian.mp4'
                width='100%'
            /> */}

        </div>
    );
}

export default DeepNotFound;
