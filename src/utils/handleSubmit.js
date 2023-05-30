import { osName, browserName } from 'react-device-detect';

const handleSubmit = (userName, password, firstTimeUser, consentAccepted, device) => {
    if (userName && password && firstTimeUser !== null && consentAccepted) {
        const data = {
            deviceType: device,
            osName: osName,
            browserName: browserName,
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

        console.log(data); // replace this line with actual code to handle the data
    } else {
        // handle incomplete form
    }
};

export default handleSubmit;
