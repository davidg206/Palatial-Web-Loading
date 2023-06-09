import { DataChannelController } from "../DataChannel/DataChannelController";
import { UeInputGamePadMessage } from "../UeInstanceMessage/UeInputGamePadMessage";
/**
 * The class that handles the functionality of gamepads and controllers
 */
export declare class GamePadController {
    ueInputGamePadMessage: UeInputGamePadMessage;
    controllers: Controller[];
    /**
     * @param dataChannelController - the data chanel controller
     */
    constructor(dataChannelController: DataChannelController);
    /**
     * Connects the gamepad handler
     * @param gamePadEvent - the activating gamepad event
     */
    gamePadConnectHandler(gamePadEvent: GamepadEvent): void;
    /**
     * Disconnects the gamepad handler
     * @param gamePadEvent - the activating gamepad event
     */
    gamePadDisconnectHandler(gamePadEvent: GamepadEvent): void;
    /**
     * Scan for connected gamepads
     */
    scanGamePads(): void;
    /**
     * Updates the status of the gamepad and sends the inputs
     */
    updateStatus(): void;
}
/**
 * The interface for controllers
 */
export interface Controller {
    currentState: Gamepad;
    prevState: Gamepad;
}
