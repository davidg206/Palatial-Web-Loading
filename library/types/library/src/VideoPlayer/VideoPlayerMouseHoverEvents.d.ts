import { MouseController } from "../Inputs/MouseController";
import { IVideoPlayerMouseInterface } from "./VideoPlayerMouseInterface";
/**
 * Video Player mouse Hover handler
 */
export declare class VideoPlayerMouseHoverEvents implements IVideoPlayerMouseInterface {
    mouseController: MouseController;
    /**
     * @param mouseController - Mouse Controller
     */
    constructor(mouseController: MouseController);
    /**
     * Satisfies the interfaces handleLockStateChange requirement
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
