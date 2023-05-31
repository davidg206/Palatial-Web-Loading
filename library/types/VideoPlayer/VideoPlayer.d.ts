import { IVideoPlayer } from "./IVideoPlayer";
export declare class VideoPlayer implements IVideoPlayer {
    videoElement: HTMLVideoElement;
    constructor(rootDiv: HTMLDivElement, startVideoMuted: boolean);
    /**
     * Get the current context of the html video element
     * @returns the current context of the video element
     */
    getVideoElement(): HTMLVideoElement;
    /**
     * Get the current context of the html video elements parent
     * @returns the current context of the video elements parent
     */
    getVideoParentElement(): HTMLElement;
    /**
     * Set the click actions for when the Element is mouse clicked
     * @param event - Mouse Event
     */
    setClickActions(event: MouseEvent): void;
    /**
    * Set the mouse enter and mouse leave events
    */
    setMouseEnterAndLeaveEvents(mouseEnterCallBack: () => void, mouseLeaveCallBack: () => void): void;
    /**
    * Set the Video Elements src object tracks to enable
    * @param enabled - Enable Tracks on the Src Object
    */
    setVideoEnabled(enabled: boolean): void;
}
