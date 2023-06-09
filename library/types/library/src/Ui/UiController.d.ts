import { IVideoPlayer } from "../VideoPlayer/IVideoPlayer";
/**
 * The Ui Controller class handles all methods that interact with the UI
 */
export declare class UiController {
    videoPlayerProvider: IVideoPlayer;
    playerStyleAttributes: playerStyleAttributes;
    orientationChangeTimeout: ReturnType<typeof setTimeout>;
    lastTimeResized: number;
    resizeTimeout: number;
    enlargeDisplayToFillWindow: boolean;
    constructor(videoPlayerProvider: IVideoPlayer);
    /**
     * Resizes the player element to fill the window
     * @param playerElement - the player DOM element
     */
    resizePlayerStyleToFillWindow(playerElement: HTMLDivElement): void;
    /**
     * Resizes the player element to fit the actual size of the stream
     * @param playerElement - the player DOM element
     */
    resizePlayerStyleToActualSize(playerElement: HTMLDivElement): void;
    /**
     * Resizes the player element to fit an arbitrary size
     * @param playerElement - the player DOM element
     */
    resizePlayerStyleToArbitrarySize(playerElement: HTMLDivElement): void;
    /**
     * An override for setting up the mouse and freezeFrame
     * @param element - the player DOM element
     */
    setUpMouseAndFreezeFrame(element: HTMLDivElement): void;
    /**
     * An override for updating the video stream size
     */
    updateVideoStreamSize(): void;
    /**
     * Resizes the player style based on the window height and width
     * @returns - nil if requirements are satisfied
     */
    resizePlayerStyle(): void;
    /**
     * On the orientation change of a window clear the timeout
     */
    onOrientationChange(): void;
}
/**
 * Handles the player style attributes so they can be instantiated
 */
export declare class playerStyleAttributes {
    styleWidth: number;
    styleHeight: number;
    styleTop: number;
    styleLeft: number;
    styleCursor: string;
    styleAdditional: number;
}
