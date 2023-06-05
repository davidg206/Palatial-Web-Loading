import { MouseController } from "../Inputs/MouseController";
import { IVideoPlayer } from "./IVideoPlayer";
import { IVideoPlayerMouseInterface } from "./VideoPlayerMouseInterface";
/**
 * Handle the mouse locked events
 */
export declare class VideoPlayerMouseLockedEvents implements IVideoPlayerMouseInterface {
    x: number;
    y: number;
    videoElementProvider: IVideoPlayer;
    mouseController: MouseController;
    /**
     * @param videoElementProvider - The HTML Video Element provider
     * @param mouseController  - Mouse Controller
     */
    constructor(videoElementProvider: IVideoPlayer, mouseController: MouseController);
    /**
     * Handle when the locked state Changed
     */
    handleLockStateChange(): void;
    /**
     * Handle the mouse move event, sends the mouse data to the UE Instance
     * @param mouseEvent - Mouse Event
     */
    handleMouseMove(mouseEvent: MouseEvent): void;
    /**
     * Handle the mouse Down event, sends the mouse data to the UE Instance
     * @param mouseEvent - Mouse Event
     */
    handleMouseDown(mouseEvent: MouseEvent): void;
    /**
     * Handle the mouse Up event, sends the mouse data to the UE Instance
     * @param mouseEvent - Mouse Event
     */
    handleMouseUp(mouseEvent: MouseEvent): void;
    /**
     * Handle the mouse wheel event, sends the mouse wheel data to the UE Instance
     * @param wheelEvent - Mouse Event
     */
    handleMouseWheel(wheelEvent: WheelEvent): void;
    /**
     * Handle the mouse context menu event, sends the mouse data to the UE Instance
     * @param mouseEvent - Mouse Event
     */
    handleContextMenu(mouseEvent: MouseEvent): void;
}
