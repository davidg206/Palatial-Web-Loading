import { DataChannelController } from "../DataChannel/DataChannelController";
import { UeDataMessage } from "./UeDataMessage";
/**
 * Handles sending Keyboard Messages to the UE Instance
 */
export declare class UeInputKeyboardMessage extends UeDataMessage {
    /**
     *
     * @param datachannelController - Data Channel Controller
     */
    constructor(datachannelController: DataChannelController);
    /**
     * Sends the key down to the UE Instance
     * @param keyCode - Key code
     * @param isRepeat - Is the key repeating
     */
    sendKeyDown(keyCode: number, isRepeat: boolean): void;
    /**
     * Sends the Key Up to the UE Instance
     * @param keyCode - Key code
     */
    sendKeyUp(keyCode: number): void;
    /**
     * Sends the key press to the UE Instance
     * @param CharCode - character code of a key pressed
     */
    sendKeyPress(CharCode: number): void;
}
