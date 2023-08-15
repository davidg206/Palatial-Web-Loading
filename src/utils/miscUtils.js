import { delegate } from '../DOMDelegate';

export function getScreenOrientation() {
  let orientation = "";

  if (typeof window.screen.orientation !== 'undefined') {
    orientation = window.screen.orientation.type;
  } else if (typeof window.orientation !== 'undefined') {
    // Deprecated API for older iOS versions
    if (window.orientation === 0 || window.orientation === 180) {
      orientation = "portrait";
    } else {
      orientation = "landscape";
    }
  }

  return orientation;
}

// dedicated server ports
export const port = {
  "tankhouse":  1111,
  "dev":        2222,
  "officedemo": 3333,
  "epic":       4444,
  "demo":       5555,
  "osloworks":  6666,
  "prophet":    7777,
  "oslodemo":   8882,
  "45Main":      3333,
  "PalatialDev": 2222,
  "abnormal": 8881,
};

export const write = (file, message) => {
  const data = {
    filename: file,
    data: message
  };

  fetch('https://prophet.palatialxr.com:3000/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    console.log(`statusCode: ${response.status}`);
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
};

export function getPortNumberFromFile(fileName, searchString) {
  const filePath = `assets/${fileName}`;

  fetch(filePath)
    .then(response => { console.log(response); return response.text(); })
    .then(fileContent => {
      const lines = fileContent.split('\n');

      for (const line of lines) {
        const [key, value] = line.split('=');

        if (key.trim() === searchString) {
          const portNumber = parseInt(value.trim(), 10);
          console.log(`Port number for ${searchString}: ${portNumber}`);
          return portNumber;
        }
      }

      console.log(`No port number found for ${searchString}`);
      return null; // Return null if the searchString is not found
    })
    .catch(error => {
      console.error(`Error reading file: ${error}`);
      return null; // Return null if there's an error reading the file
    });
}

export const waitForLevelReady = () => {
  return new Promise(resolve => {
    if (delegate.levelReady) {
      resolve(true);
    } else {
      const checkLevelReady = () => {
        if (delegate.levelReady) {
          resolve(true);
        } else {
          setTimeout(checkLevelReady, 100);
        }
      };

      checkLevelReady();
    }
  });
};

export const waitForProjectName = () => {
  return new Promise(resolve => {
    if (delegate.appName) {
      resolve(delegate.appName);
    } else {
      const checkName = () => {
        if (delegate.appName) {
          resolve(delegate.appName);
        } else {
          setTimeout(checkName, 100);
        }
      };

      checkName();
    }
  });
};

export const onPlayAction = () => {
  delegate.onPlayAction();
  const root = document.getElementById("root");
  root.classList.add("fade-out");
  delegate.inGame = true;
  delegate.levelReady = false;
  console.log('inGame');
};
