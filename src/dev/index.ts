import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'bootstrap/dist/css/bootstrap-reboot.min.css'
import 'bootstrap/dist/css/bootstrap-utilities.min.css'
import { NativeDOMDelegate } from "./NativeDOMDelegate";
import * as libspsfrontend from 'backend-dom-components';
import * as fs from 'fs';

// set the logger level
//libspsfrontend.Logger.SetLoggerVerbosity(10);

// do not Determine whether a signalling server WebSocket URL was specified at compile-time or if we need to compute it at runtime
declare var WEBSOCKET_URL: string;
let signallingServerAddress = WEBSOCKET_URL;
if (signallingServerAddress == '') {
    // define our signallingServerProtocol to be used based on whether
    // or not we're accessing our frontend via a tls
    let signallingServerProtocol = 'ws:';
    if (location.protocol === 'https:') {
        signallingServerProtocol = 'wss:';
    }

    // build the websocket endpoint based on the protocol used to load the frontend
    signallingServerAddress = signallingServerProtocol + '//' + window.location.hostname

    // if the frontend for an application is served from a base-level domain
    // it has a trailing slash, so we need to account for this when appending the 'ws' for the websocket ingress
    if (window.location.pathname == "/") {
        signallingServerAddress += '/ws'
    } else {
        signallingServerAddress += (window.location.pathname + '/ws')
    }
}

if (isMobile()) {
	//document.getElementById('fullscreen-btn').style.display = 'flex';
	(document.querySelector('.tooltiptext') as HTMLElement).style.opacity = '0';
}

const epicRegex = /\/([a-zA-Z0-9_-]+)\/ws$/;
const app = signallingServerAddress.match(epicRegex)[1];

// prep the player div element 
let playerElement = document.getElementById("player") as HTMLDivElement;

// Create a config object
let config = CreateConfig(signallingServerAddress, playerElement);
config.enableSpsAutoConnect = true;
config.enableSpsAutoplay = true;
config.controlScheme = libspsfrontend.ControlSchemeType.HoveringMouse;
config.suppressBrowserKeys = true;
config.afkTimeout = 600;
config.fakeMouseWithTouches = false;
// Create a Native DOM delegate instance that implements the Delegate interface class
let delegate = new NativeDOMDelegate(config);
delegate.appName = app;

// Create and return a new webRtcPlayerController instance 
let RTCPlayer = create(config, delegate);

// create takes in a delegate interface type which our NativeDomDelegate class implements
function create(config: libspsfrontend.Config, delegate: libspsfrontend.IDelegate) {
    return new libspsfrontend.webRtcPlayerController(config, delegate);
}

/*
document.addEventListener("touchmove", (event: TouchEvent) => {
    event.preventDefault();
}, { passive: false });
*/

// Create a config object instance 
function CreateConfig(signalingAddress: string, playerElement: HTMLDivElement) {
    let config = new libspsfrontend.Config(signalingAddress, playerElement, isMobile());
    return config;
}

// On a touch device we will need special ways to show the on-screen keyboard.
if ('ontouchstart' in document.documentElement) {
    config.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
    createOnScreenKeyboardHelpers(playerElement);
}

function createOnScreenKeyboardHelpers(htmlElement: HTMLDivElement) {
    let hiddenInput: HTMLInputElement = null;
    let editTextButton: HTMLButtonElement = null;
    if (document.getElementById('hiddenInput') === null) {
        hiddenInput = document.createElement('input');
        hiddenInput.id = 'hiddenInput';
        //hiddenInput.maxLength = 0;
	hiddenInput.type = 'text';
	hiddenInput.autocomplete = "off";
	hiddenInput.autocapitalize = "off";
	if (!config.isIOS)
	    hiddenInput.style.width = "0px";
        htmlElement.appendChild(hiddenInput);
    }

    hiddenInput.addEventListener('input', (event: InputEvent) => {
	if (hiddenInput.value.length > 1) {
	    hiddenInput.value = hiddenInput.value.slice(1);
	}
	const lastChar = hiddenInput.value[0];
	if (!config.isIOS && event.inputType != 'deleteContentBackward')
	    document.onkeypress(new KeyboardEvent("keypress", { charCode: lastChar.charCodeAt(0) }));
    });
	
    hiddenInput.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.keyCode === 13) { // check if the key pressed is "Enter"
            hiddenInput.blur(); // remove the focus from the input element
        }
    });


    if (document.getElementById('editTextButton') === null) {
        editTextButton = document.createElement('button');
        editTextButton.id = 'editTextButton';
        editTextButton.innerHTML = 'edit';
        htmlElement.appendChild(editTextButton);

        // Hide the 'edit text' button.
        editTextButton.classList.add('hiddenState');

	editTextButton.addEventListener("touchend", ((e:Event)=>{
	  hiddenInput.focus();
	  hiddenInput.setSelectionRange(hiddenInput.value.length, hiddenInput.value.length);
	  editTextButton.classList.add('hiddenState');
          e.preventDefault();
        }));
    }
    libspsfrontend.DataChannelController.hiddenInput = hiddenInput;
    libspsfrontend.DataChannelController.editTextButton = editTextButton;
}

function isMobile() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor);
  return check;
}

function zoomIn() {
  // Replace "scaleFactor" with the scaling factor you want to use.
  const scaleFactor = 1.2;
  
  // Get the current scale value of the page.
  const currentScale = parseFloat(document.body.style.transform.replace('scale(','').replace(')',''));

  // Calculate the new scale value by multiplying the current scale by the scaling factor.
  const newScale = currentScale ? currentScale * scaleFactor : scaleFactor;

  // Set the new scale value using the transform property.
  document.body.style.transform = `scale(${newScale})`;
}

    document.addEventListener('keydown', function(event) {
      if (event.key === 'F2') {
        let element = document.getElementById('stats-panel');
        let transformValue = element.style.transform;

        if (transformValue === '' || transformValue === 'none') {
          element.style.transform = 'translateX(0%)';
        } else {
          element.style.transform = '';
        }
        let connection : HTMLElement = document.getElementById('connection');
        console.log(connection.style.display);
        if (connection.style.display === '' || connection.style.display === 'none') {
          connection.style.display = 'flex';
        } else {
          connection.style.display = 'none';
        }
      }
    });
