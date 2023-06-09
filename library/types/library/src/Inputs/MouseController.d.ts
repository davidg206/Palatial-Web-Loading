import { UeInputMouseMessage } from "../UeInstanceMessage/UeInputMouseMessage";
import { DataChannelController } from "../DataChannel/DataChannelController";
import { NormaliseAndQuantiseSigned, UnquantisedAndDenormaliseUnsigned, NormaliseAndQuantiseUnsigned } from "./CoordinateData";
import { IVideoPlayer } from "../VideoPlayer/IVideoPlayer";
/**
 * Handles the Mouse Inputs for the document
 */
export declare class MouseController {
    readonly unsignedOutOfRange: number;
    readonly signedOutOfRange: number;
    ueInputMouseMessage: UeInputMouseMessage;
    videoElementProvider: IVideoPlayer;
    printInputs: boolean;
    /**
     *
     * @param dataChannelController - Data Channel Controller
     */
    constructor(dataChannelController: DataChannelController, videoElementProvider: IVideoPlayer);
    /**
     * Handle when a mouse button is released
     * @param buttons - Mouse Button
     * @param X - Mouse pointer X coordinate
     * @param Y - Mouse pointer Y coordinate
     */
    releaseMouseButtons(buttons: number, X: number, Y: number): void;
    /**
     * Handle when a mouse button is pressed
     * @param buttons - Mouse Button
     * @param X - Mouse pointer X coordinate
     * @param Y - Mouse pointer Y coordinate
     */
    pressMouseButtons(buttons: number, X: number, Y: number): void;
    /**
     * Handle when a mouse is moved
     * @param X - Mouse X Coordinate
     * @param Y - Mouse Y Coordinate
     * @param deltaX - Mouse Delta X Coordinate
     * @param deltaY - Mouse Delta Y Coordinate
     */
    sendMouseMove(X: number, Y: number, deltaX: number, deltaY: number): void;
    /**
     * Handles when a mouse button is pressed down
     * @param button - Mouse Button Pressed
     * @param X  - Mouse X Coordinate
     * @param Y  - Mouse Y Coordinate
     */
    sendMouseDown(button: number, X: number, Y: number): void;
    /**
     * Handles when a mouse button is pressed up
     * @param button - Mouse Button Pressed
     * @param X  - Mouse X Coordinate
     * @param Y  - Mouse Y Coordinate
     */
    sendMouseUp(button: number, X: number, Y: number): void;
    /**
     * Handles when a mouse wheel event
     * @param deltaY - Mouse Wheel data
     * @param X  - Mouse X Coordinate
     * @param Y  - Mouse Y Coordinate
     */
    sendMouseWheel(deltaY: number, X: number, Y: number): void;
    /**
     * Handles mouse enter
     */
    sendMouseEnter(): void;
    /**
     * Handles mouse Leave
     */
    sendMouseLeave(): void;
    /**
     * Normalises and Quantised the Mouse Coordinates
     * @param x - Mouse X Coordinate
     * @param y - Mouse Y Coordinate
     * @returns - Normalize And Quantize Unsigned Data Type
     */
    normaliseAndQuantiseUnsigned(x: number, y: number): NormaliseAndQuantiseUnsigned;
    /**
     * Denormalises and unquantised the Mouse Coordinates
     * @param x - Mouse X Coordinate
     * @param y - Mouse Y Coordinate
     * @returns - unquantise and Denormalize Unsigned Data Type
     */
    unquantiseAndDenormaliseUnsigned(x: number, y: number): UnquantisedAndDenormaliseUnsigned;
    /**
     * Normalises and Quantised the Mouse Coordinates
     * @param x - Mouse X Coordinate
     * @param y - Mouse Y Coordinate
     * @returns - Normalize And Quantize Signed Data Type
     */
    normaliseAndQuantiseSigned(x: number, y: number): NormaliseAndQuantiseSigned;
}
