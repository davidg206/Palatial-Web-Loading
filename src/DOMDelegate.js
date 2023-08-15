import { NativeDOMDelegate } from "./components/NativeDOMDelegate";
import { isMobile } from 'react-device-detect';
import { signallingServerAddress } from "./signallingServer";
import * as libspsfrontend from 'backend-dom-components-1';

// prep the player div element
export let playerElement = document.getElementById("player");
// Create a config object
export let config = CreateConfig(signallingServerAddress, playerElement);
config.enableSpsAutoConnect = true;
config.enableSpsAutoplay = true;
config.controlScheme = libspsfrontend.ControlSchemeType.HoveringMouse;
config.suppressBrowserKeys = true;
config.afkTimeout = 600;
config.fakeMouseWithTouches = false;

// Create a Native DOM delegate instance that implements the Delegate interface class
export let delegate = new NativeDOMDelegate(config);

// Create a config object instance
export function CreateConfig(signalingAddress, playerElement) {
  let config = new libspsfrontend.Config(signalingAddress, playerElement, isMobile);
  return config;
}

export function emitUIInteraction(msg) {
  if (delegate.streamReady)
    delegate.getPlayerController().ueDescriptorUi.sendCommand(msg);
  else
    console.error('stream not ready. can\'t send ' + JSON.stringify(msg));
}

export function sendCommand(cmd) {
  emitUIInteraction({ Console: cmd });
}
