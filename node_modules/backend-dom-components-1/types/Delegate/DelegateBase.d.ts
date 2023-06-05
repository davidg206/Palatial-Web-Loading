import { Config } from "..";
import { IDelegate } from "./IDelegate";
import { InitialSettings } from "../DataChannel/InitialSettings";
import { LatencyTestResults } from "../DataChannel/LatencyTestResults";
import { IActionOverlay } from "../Overlay/IActionOverlay";
import { IAfkOverlay } from "../Overlay/IAfkOverlay";
import { IOverlay } from "../Overlay/IOverlay";
import { ITextOverlay } from "../Overlay/ITextOverlay";
import { AggregatedStats } from "../PeerConnectionController/AggregatedStats";
import { IWebRtcPlayerController } from "../WebRtcPlayer/IWebRtcPlayerController";
import { MessageInstanceState, MessageAuthResponse } from '../WebSockets/MessageReceive';
/**
 * Provides common base functionality for delegates that implement the IDelegate interface
*/
export declare class DelegateBase implements IDelegate {
    iWebRtcController: IWebRtcPlayerController;
    config: Config;
    showActionOrErrorOnDisconnect: boolean;
    currentOverlay: IOverlay;
    disconnectOverlay: IActionOverlay;
    connectOverlay: IActionOverlay;
    playOverlay: IActionOverlay;
    afkOverlay: IAfkOverlay;
    infoOverlay: ITextOverlay;
    errorOverlay: ITextOverlay;
    /**
     * @param config - A newly instantiated config object
     * returns the base delegate object with the config inside it along with a new instance of the Overlay controller class
     */
    constructor(config: Config);
    setConfigTimeout(time: number): void;
    /**
     * Shows the disconnect overlay
     */
    showDisconnectOverlay(updateText: string): void;
    /**
     * Update the disconnect overlays span text
     * @param updateText the new countdown number
     */
    updateDisconnectOverlay(updateText: string): void;
    /**
     * Activates the disconnect overlays action
     */
    onDisconnectionAction(): void;
    /**
     * Hides the current overlay
     */
    hideCurrentOverlay(): void;
    /**
     * Shows the connect overlay
     */
    showConnectOverlay(): void;
    /**
     * Shows the play overlay
     */
    showPlayOverlay(): void;
    /**
     * Shows the text overlay
     */
    showTextOverlay(text: string): void;
    /**
     * Shows the error overlay
     */
    showErrorOverlay(text: string): void;
    /**
     * Activates the connect overlays action
     */
    onConnectAction(): void;
    /**
     * Activates the play overlays action
     */
    onPlayAction(): void;
    /**
     * Shows the afk overlay
     * @param countDown the countdown number for the afk countdown
     */
    showAfkOverlay(countDown: number): void;
    /**
     * Update the afk overlays countdown number
     * @param countDown the new countdown number
     */
    updateAfkOverlay(countDown: number): void;
    /**
     * Activates the afk overlays action
     */
    onAfkAction(): void;
    /**
     * Instantiate the WebRTCPlayerController interface to provide WebRTCPlayerController functionality within this class and set up anything that requires it
     * @param iWebRtcPlayerController
     */
    setIWebRtcPlayerController(iWebRtcPlayerController: IWebRtcPlayerController): void;
    /**
     * Show the Connect Overlay or auto connect
     */
    showConnectOrAutoConnectOverlays(): void;
    /**
     * Show the webRtcAutoConnect Overlay and connect
     */
    onWebRtcAutoConnect(): void;
    /**
     * Set up functionality to happen when an instance state change occurs
     * @param instanceState - the message instance state
     */
    onInstanceStateChange(instanceState: MessageInstanceState): void;
    /**
     * Set up functionality to happen when receiving an auth response
     * @param authResponse - the auth response message type
     */
    onAuthenticationResponse(authResponse: MessageAuthResponse): void;
    /**
     * Set up functionality to happen when receiving a webRTC answer
     */
    onWebRtcAnswer(): void;
    /**
     * Shows a text overlay to alert the user the stream is currently loading
     */
    onStreamLoading(): void;
    /**
     * Event fired when the video is disconnected
     */
    onDisconnect(eventString: string): void;
    /**
     * Handles when Web Rtc is connecting
     */
    onWebRtcConnecting(): void;
    /**
     * Handles when Web Rtc has connected
     */
    onWebRtcConnected(): void;
    /**
     * Handles when Web Rtc fails to connect
     */
    onWebRtcFailed(): void;
    /**
     * Set up methods and functions to run when the video is initialised
     */
    onVideoInitialised(): void;
    /**
     * Set up functionality to happen when receiving latency test results
     * @param latency - latency test results object
     */
    onLatencyTestResult(latency: LatencyTestResults): void;
    /**
     * Set up functionality to happen when receiving video statistics
     * @param videoStats - video statistics as a aggregate stats object
     */
    onVideoStats(videoStats: AggregatedStats): void;
    /**
     * Set up functionality to happen when calculating the average video encoder qp
     * @param QP - the quality number of the stream
     */
    onVideoEncoderAvgQP(QP: number): void;
    /**
     * Set up functionality to happen when receiving and handling initial settings for the UE app
     * @param settings - initial UE app settings
     */
    onInitialSettings(settings: InitialSettings): void;
    /**
     * Set up functionality to happen when setting quality control ownership of a stream
     * @param hasQualityOwnership - does this user have quality ownership of the stream true / false
     */
    onQualityControlOwnership(hasQualityOwnership: boolean): void;
}
