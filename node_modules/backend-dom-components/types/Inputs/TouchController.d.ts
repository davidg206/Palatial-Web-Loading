import { UeInputTouchMessage } from "../UeInstanceMessage/UeInputTouchMessage";
import { DataChannelController } from "../DataChannel/DataChannelController";
import { ITouchController } from "./ITouchController";
import { IVideoPlayer } from "../VideoPlayer/IVideoPlayer";
/**
 * Handles the Touch input Events
 */
export declare class TouchController implements ITouchController {
    ueInputTouchMessage: UeInputTouchMessage;
    playerElement: HTMLVideoElement;
    /**
     *
     * @param dataChannelController - the data channel controller
     * @param playerElement - the player element DOM
     */
    constructor(dataChannelController: DataChannelController, playerElement: HTMLVideoElement, videoElementProvider: IVideoPlayer);
    /**
     * When a touch event starts
     * @param event - the touch event being intercepted
     */
    onTouchStart(touchEvent: TouchEvent): void;
    /**
     * When a touch event ends
     * @param event - the touch event being intercepted
     */
    onTouchEnd(touchEvent: TouchEvent): void;
    /**
     * when a moving touch event occurs
     * @param event - the touch event being intercepted
     */
    onTouchMove(touchEvent: TouchEvent): void;
}
