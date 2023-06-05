import { MouseController } from "../Inputs/MouseController";
import { IVideoPlayer } from "./IVideoPlayer";
/**
 * Video Player Controller handles the creation of the video HTML element and all handlers
 */
export declare class StreamController {
    videoElementProvider: IVideoPlayer;
    audioElement: HTMLAudioElement;
    mouseController: MouseController;
    constructor(videoElementProvider: IVideoPlayer);
    /**
     * Handles when the Peer connection has a track event
     * @param rtcTrackEvent - RTC Track Event
     */
    handleOnTrack(rtcTrackEvent: RTCTrackEvent): void;
    /**
    * Creates the audio device when receiving an RTCTrackEvent with the kind of "audio"
    * @param audioMediaStream - Audio Media stream track
    */
    CreateAudioTrack(audioMediaStream: MediaStream): void;
}
