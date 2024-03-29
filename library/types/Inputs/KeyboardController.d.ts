import { DataChannelController } from "../DataChannel/DataChannelController";
import { UeInputKeyboardMessage } from "../UeInstanceMessage/UeInputKeyboardMessage";
import { UeDescriptorUi } from "../UeInstanceMessage/UeDescriptorUi";
import { IDelegate } from "../Delegate/IDelegate";
/**
 * Handles the Keyboard Inputs for the document
 */
export declare class KeyboardController {
    ueInputKeyBoardMessage: UeInputKeyboardMessage;
    ueDescriptorUi: UeDescriptorUi;
    keyboardController: KeyboardController;
    suppressBrowserKeys: boolean;
    delegate: IDelegate;
    /**
     *
     * @param dataChannelController - Data Channel Controller
     * @param suppressBrowserKeys - Suppress Browser Keys
     */
    constructor(dataChannelController: DataChannelController, ueDescriptorUi: UeDescriptorUi, suppressBrowserKeys: boolean);
    /**
     * Registers document keyboard events with the controller
     */
    registerKeyBoardEvents(): void;
    /**
     * Handles When a key is down
     * @param keyboardEvent - Keyboard event
     */
    handleOnKeyDown(keyboardEvent: KeyboardEvent): void;
    /**
     * handles when a key is up
     * @param keyboardEvent - Keyboard event
     */
    handleOnKeyUp(keyboardEvent: KeyboardEvent): void;
    /**
     * Handles when a key is press
     * @param keyboard - Keyboard Event
     */
    handleOnKeyPress(keyboard: KeyboardEvent): void;
    /**
     * Gets the Keycode of the Key pressed
     * @param keyboardEvent - Key board Event
     * @returns the key code of the Key
     */
    getKeycode(keyboardEvent: KeyboardEvent): number;
    /**
     * Browser keys do not have a charCode so we only need to test keyCode.
     */
    isKeyCodeBrowserKey(keyCode: number): boolean;
}
