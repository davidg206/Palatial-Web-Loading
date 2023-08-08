export function CreateConfig(signalingAddress: any, playerElement: any): libspsfrontend.Config;
export function emitUIInteraction(msg: any): void;
export function sendCommand(cmd: any): void;
export let playerElement: HTMLElement;
export let config: libspsfrontend.Config;
export let delegate: NativeDOMDelegate;
import * as libspsfrontend from "backend-dom-components-1";
import { NativeDOMDelegate } from "./components/NativeDOMDelegate";
