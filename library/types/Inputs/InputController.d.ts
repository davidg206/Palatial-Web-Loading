import { DataChannelController } from "../DataChannel/DataChannelController";
import { FakeTouchController } from "./FakeTouchController";
import { KeyboardController } from "./KeyboardController";
import { MouseController } from "./MouseController";
import { ITouchController } from "./ITouchController";
import { GamePadController } from "./GamepadController";
import { ControlSchemeType } from "../Config/Config";
import { GyroController } from "./GyroController";
import { IVideoPlayer } from "../VideoPlayer/IVideoPlayer";
import { UeDescriptorUi } from "../UeInstanceMessage/UeDescriptorUi";
import { IDelegate } from "../Delegate/IDelegate";
/**
 * Class for handling inputs for mouse and keyboard
 */
export declare class InputController {
    videoElementProvider: IVideoPlayer;
    dataChannelController: DataChannelController;
    keyboardController: KeyboardController;
    mouseController: MouseController;
    touchController: ITouchController;
    fakeTouchController: FakeTouchController;
    gamePadController: GamePadController;
    gyroController: GyroController;
    ueDescriptorUi: UeDescriptorUi;
    delegate: IDelegate;
    /**
     *
     * @param dataChannelController - the data channel controller
     */
    constructor(dataChannelController: DataChannelController, ueDescriptorUi: UeDescriptorUi, videoElementProvider: IVideoPlayer, delegate: IDelegate);
    /**
     * registers browser key events
     * @param suppressBrowserKeys - option to suppress browser keys
     */
    registerKeyBoard(suppressBrowserKeys: boolean): void;
    /**
     * register mouse events based on a control type
     * @param controlScheme - if the mouse is either hovering or locked
     */
    registerMouse(controlScheme: ControlSchemeType): void;
    /**
     * register touch events
     * @param fakeMouseTouch - the faked mouse touch event
     * @param playerElement - the player elements DOM
     */
    registerTouch(fakeMouseTouch: boolean, playerElement: HTMLVideoElement): void;
    /**
     * registers a gamepad
     */
    registerGamePad(): void;
    /**
     * registers a gyro device
     */
    registerGyro(): void;
}
