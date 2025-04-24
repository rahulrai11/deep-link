import { useEffect } from "react";

function DeepNotFound() {
    useEffect(() => {
        const openApp = () => {
            const path = window.location.pathname;
            const customURL = "myapp://" + path.replace(/^\/+/, ''); // Ensure clean path

            const playStoreURL = "https://play.google.com/store/apps/details?id=com.bastianqrapp";
            const appStoreURL = "https://apps.apple.com/in/app/bastian-customer-parts-portal/id6473263265";

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

            console.log("Trying to open app:", customURL);

            // Direct navigation attempt
            window.location.href = customURL;

            // Alternative iframe method for better reliability
            let iframe = document.createElement("iframe");
            iframe.style.display = "none";
            iframe.src = customURL;
            document.body.appendChild(iframe);

            // return
            // Set a fallback redirection ONLY if the app does not open
            fallbackTimeout = setTimeout(() => {
                if (!appOpened) {
                    console.log("App not detected, redirecting to store.");
                    if (isAndroid) {
                        window.location.replace(playStoreURL);
                    } else if (isiOS) {
                        window.location.replace(appStoreURL);
                    }
                } else {
                    console.log("App opened successfully, stopping script.");
                }
            }, 5000); // Increased timeout for better user interaction detection
        };

        openApp();
    }, []);

    const deep = () => {
        const playStoreURL = "https://play.google.com/store/apps/details?id=com.bastianqrapp";
        const appStoreURL = "https://apps.apple.com/in/app/bastian-customer-parts-portal/id6473263265";

        const userAgent = navigator.userAgent;
        const isAndroid = /Android/i.test(userAgent);
        const isiOS = /iPhone|iPad|iPod/i.test(userAgent);

        if (isAndroid) {
            window.location.replace(playStoreURL);
        } else if (isiOS) {
            window.location.replace(appStoreURL);
        }
    }
    return (
        <div>
            <button onClick={deep}>go to app store</button>
            <p>
                If Bastian is installed, it will open automatically. Otherwise, you'll be redirected to download it shortly.
            </p>
        </div>
    );
}

export default DeepNotFound;
