import { DataChannelController } from "../DataChannel/DataChannelController";
import { NormaliseAndQuantiseUnsigned } from "../Inputs/CoordinateData";
import { IVideoPlayer } from "../VideoPlayer/IVideoPlayer";
import { UeDataMessage } from "./UeDataMessage";
/**
 * Handles Sending Touch messages to the UE Instance
 */
export declare class UeInputTouchMessage extends UeDataMessage {
    fingers: number[];
    fingersIds: {
        [key: number]: number;
    };
    readonly unsignedOutOfRange: number;
    readonly signedOutOfRange: number;
    printInputs: boolean;
    videoElementProvider: IVideoPlayer;
    /**
     * @param datachannelController - Data channel Controller
     */
    constructor(datachannelController: DataChannelController, videoElementProvider: IVideoPlayer);
    /**
     * Handles Touch event Start
     * @param touches - Touch List
     */
    sendTouchStart(touches: TouchList): void;
    /**
     * Handles Touch event End
     * @param touches - Touch List
     */
    sendTouchEnd(touches: TouchList): void;
    /**
     * Handles Touch event Move
     * @param touches - Touch List
     */
    sendTouchMove(touches: TouchList): void;
    /**
     * Handles Sending the Touch Event to the UE Instance via the Data channel
     * @param touches - Touch List
     */
    sendTouch(touchType: number, touches: TouchList): void;
    /**
     * TO DO
     * @param x - X Coordinate
     * @param y - Y Coordinate
     * @returns - Normalised and Quantised Unsigned values
     */
    normaliseAndQuantiseUnsigned(x: number, y: number): NormaliseAndQuantiseUnsigned;
}
