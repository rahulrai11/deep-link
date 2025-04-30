import { useEffect, useState } from "react";

function HTMLPage() {
    const [content, setContent] = useState('');

    useEffect(() => {
        const openApp = () => {
            var appScheme = "myapp://"; // Ensure this matches your AndroidManifest.xml
            var playStoreWeb = "https://play.google.com/store/apps/details?id=com.bastianqrapp";
            var appStoreLink = "https://apps.apple.com/in/app/bastian-customer-parts-portal/id6473263265"; // Replace with actual App Store link
 
            var userAgent = navigator.userAgent || navigator.vendor;
 
            // Open the app using a hidden link
            var link = document.createElement('a');
            link.href = appScheme;
            link.style.display = "none";
            document.body.appendChild(link);
            link.click();

            // If app is not installed, redirect after 2 seconds
            setTimeout(function () {
                if (/android/i.test(userAgent)) {
                    //window.location.href = playStoreWeb;
                    window.location.href = "intent://play.google.com/store/apps/details?id=com.bastianqrapp#Intent;package=com.android.vending;scheme=https;end;";
                } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
                    window.location.href = appStoreLink;
                } else {
                    // window.location.href = playStoreWeb;
                }
            }, 500);
        }

        openApp();
    }, [])

    return (
        <div>
            <p>!!!! Off we go! If Bastian already chilling on your device, we'll take you there. If not, no worries—we'll zip you to the store in a flash!.</p>
        </div>
    )
}

export default HTMLPage