import { osName, browserName } from 'react-device-detect';
import { delegate, emitUIInteraction, config } from '../DOMDelegate';
import React, { useState, useEffect, useRef } from 'react';

const handleSubmit = (userName, password, firstTimeUser, consentAccepted, device, setError) => {
    return (event) => {
        if (userName && password && firstTimeUser !== null && consentAccepted) {
            const data = {
                deviceType: device,
                osName: osName,
                browserName: browserName,
		mobileUser: config.isMobile,
                userName: userName,
                consentAccepted: consentAccepted,
                firstTimeUser: firstTimeUser ? "Yes" : "No",
                password: password,
                timestamp: new Date().getTime() // current time in Epoch time
            };

            /*
            //Use this to test if input is properly logged//

            const json = JSON.stringify(data);
            const blob = new Blob([json], {type: "application/json"});
            const href = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = href;
            link.download = 'userInformation.json';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            */

            console.log("Sending: " + JSON.stringify(data));

            if (password !== "Palatial") {
                setError('Wrong password. Please try again');
                return;
            } else {
                setError('');
            }

	    document.querySelector('.proceedButton').disabled = true;

            const videoElement = document.getElementById("myVideo");
            videoElement.play();

            delegate.checkStreamReady(() => {
                emitUIInteraction(data);
                const root = document.getElementById("root");
                root.classList.add("fade-out");

                root.addEventListener("transitionend", () => {
                    document.getElementById("player").classList.remove("fade-out");
                    document.getElementById("player").classList.add("fade-in");
                });

                delegate.onPlayAction();
            });

        } else {
            // handle incomplete form
        }
    }
};

export default handleSubmit;
