import { UeInputMouseMessage } from "../UeInstanceMessage/UeInputMouseMessage";
import { DataChannelController } from "../DataChannel/DataChannelController";
import { ITouchController } from "./ITouchController";
import { MouseButton } from "./MouseButtons";
import { Logger } from "../Logger/Logger";

/**
 * Allows for the usage of fake touch events and implements ITouchController
 * @param dataChannelController - The controller for the Data channel 
 * @param videoPlayerElement - The video player DOM element 
 */
export class FakeTouchController implements ITouchController {
    fingers: Finger[];
    ueInputMouseMessage: UeInputMouseMessage;
    videoPlayerElement: HTMLVideoElement;

    constructor(dataChannelController: DataChannelController, videoPlayerElement: HTMLVideoElement) {
        this.ueInputMouseMessage = new UeInputMouseMessage(dataChannelController);
        this.videoPlayerElement = videoPlayerElement;
	this.fingers = [];
        document.ontouchstart = (ev: TouchEvent) => this.onTouchStart(ev);
        document.ontouchend = (ev: TouchEvent) => this.onTouchEnd(ev);
        document.ontouchmove = (ev: TouchEvent) => this.onTouchMove(ev);
    }

    /**
     * When a touch event begins 
     * @param touch - the activating touch event 
     */
    onTouchStart(touch: TouchEvent): void {
        let touchInfo = touch.changedTouches[0];
        let fingerInfo = {
            ID: touchInfo.identifier,
            X: touchInfo.clientX - this.videoPlayerElement.getBoundingClientRect().left,
            Y: touchInfo.clientY - - this.videoPlayerElement.getBoundingClientRect().top
        }
	Logger.Log(Logger.GetStackTrace(), "Touch start", 6);

        this.fingers.push(fingerInfo);

        let mouseEvent = new MouseEvent(touch.type, touchInfo)
        this.videoPlayerElement.onmouseenter(mouseEvent);
        this.ueInputMouseMessage.sendMouseDown(MouseButton.mainButton, fingerInfo.X, fingerInfo.Y);
    }

    /**
     * When a touch event ends 
     * @param touchEvent - the activating touch event 
     */
    onTouchEnd(touch: TouchEvent): void {
        let touchInfo = touch.changedTouches[0];

        for (let i = 0; i < this.fingers.length; i++) {
            if (touchInfo.identifier === this.fingers[i].ID) {
                let x = touchInfo.clientX - this.videoPlayerElement.getBoundingClientRect().left;
                let y = touchInfo.clientY - this.videoPlayerElement.getBoundingClientRect().top;
                this.ueInputMouseMessage.sendMouseUp(MouseButton.mainButton, x, y);

                let mouseEvent = new MouseEvent(touch.type, touch)
                this.videoPlayerElement.onmouseleave(mouseEvent);
                this.fingers[i] = this.fingers[this.fingers.length - 1];
                this.fingers.pop();
            }
        }
    }

    /**
     * On a Move touch event 
     * @param touchEvent - the activating touch event 
     */
    onTouchMove(touchEvent: TouchEvent): void {
        let touchInfo = touchEvent.changedTouches[0];
        for (let i = 0; i < this.fingers.length; i++) {
            if (touchInfo.identifier === this.fingers[i].ID) {
                let x = touchInfo.clientX - this.videoPlayerElement.getBoundingClientRect().left;
                let y = touchInfo.clientY - this.videoPlayerElement.getBoundingClientRect().top;
                this.ueInputMouseMessage.sendMouseMove(x, y, x - this.fingers[i].X, y - this.fingers[i].Y);
                this.fingers[i].X = x;
                this.fingers[i].Y = y;
            }
        }
    }
}

/**
 * The interface for finger position mapping 
 */
export interface Finger {
    ID: number;
    X: number;
    Y: number;

}
