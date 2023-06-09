import { WebSocketController } from "../WebSockets/WebSocketController";
import { StreamController } from "../VideoPlayer/StreamController";
import { MessageInstanceState, MessageAnswer, MessageAuthResponse, MessageConfig } from "../WebSockets/MessageReceive";
import { UiController } from "../Ui/UiController";
import { FreezeFrameController } from "../FreezeFrame/FreezeFrameController";
import { AfkLogic } from "../Afk/AfkLogic";
import { DataChannelController } from "../DataChannel/DataChannelController";
import { PeerConnectionController } from "../PeerConnectionController/PeerConnectionController";
import { KeyboardController } from "../Inputs/KeyboardController";
import { ITouchController } from "../Inputs/ITouchController";
import { UeDescriptorUi } from "../UeInstanceMessage/UeDescriptorUi";
import { UeControlMessage } from "../UeInstanceMessage/UeControlMessage";
import { AggregatedStats } from "../PeerConnectionController/AggregatedStats";
import { IWebRtcPlayerController } from "./IWebRtcPlayerController";
import { IDelegate } from "../Delegate/IDelegate";
import { Config } from "../Config/Config";
import { Encoder, InitialSettings, WebRTC } from "../DataChannel/InitialSettings";
import { LatencyTestResults } from "../DataChannel/LatencyTestResults";
import { InputController } from "../Inputs/InputController";
import { MicController } from "../MicPlayer/MicController";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";
/**
 * Entry point for the Web RTC Player
 */
export declare class webRtcPlayerController implements IWebRtcPlayerController {
    config: Config;
    sdpConstraints: RTCOfferOptions;
    webSocketController: WebSocketController;
    dataChannelController: DataChannelController;
    datachannelOptions: RTCDataChannelInit;
    videoPlayer: VideoPlayer;
    streamController: StreamController;
    keyboardController: KeyboardController;
    touchController: ITouchController;
    ueControlMessage: UeControlMessage;
    ueDescriptorUi: UeDescriptorUi;
    peerConnectionController: PeerConnectionController;
    uiController: UiController;
    inputController: InputController;
    freezeFrameController: FreezeFrameController;
    shouldShowPlayOverlay: boolean;
    afkLogic: AfkLogic;
    playerElementClientRect: DOMRect;
    lastTimeResized: number;
    matchViewportResolution: boolean;
    resizeTimeout: ReturnType<typeof setTimeout>;
    latencyStartTime: number;
    delegate: IDelegate;
    disconnectMessageOverride: string;
    urlParams: URLSearchParams;
    micController: MicController;
    /**
     *
     * @param config - the frontend config object
     * @param delegate - the delegate interface object
     */
    constructor(config: Config, delegate: IDelegate);
    /**
     * connect up the onAfkClick action with a method so it can be exposed to the delegate
     */
    onAfkClick(): void;
    /**
     * Restart the stream automaticity without refreshing the page
     */
    restartStreamAutomaticity(): void;
    /**
     * Sets if we are enlarging the display to fill the window for freeze frames and ui controller
     * @param isFilling is the display filling or not
     */
    setEnlargeToFillDisplay(isFilling: boolean): void;
    /**
     * Loads a freeze frame if it is required otherwise shows the play overlay
     */
    loadFreezeFrameOrShowPlayOverlay(): void;
    /**
     * Enable the video after hiding a freeze frame
     */
    InvalidateFreezeFrameAndEnableVideo(): void;
    getWebSocketController(): WebSocketController;
    /**
     * Plays the stream audio and video source and sets up other pieces while the stream starts
     */
    playStream(): void;
    /**
     * Plays the video stream
     */
    private playVideo;
    /**
     * Enable the video to play automaticity if enableSpsAutoplay is true
     */
    autoPlayVideoOrSetUpPlayOverlay(): void;
    /**
     * Connect to the Signaling server
     */
    connectToSignallingSever(): void;
    /**
     * This will start the handshake to the signalling server
     * @param peerConfig  - RTC Configuration Options from the Signaling server
     * @remark RTC Peer Connection on Ice Candidate event have it handled by handle Send Ice Candidate
     */
    startSession(peerConfig: RTCConfiguration): void;
    /**
     * Checks the peer connection options for a turn server and returns true or false
     */
    checkTurnServerAvailability(options: RTCConfiguration): boolean;
    /**
     * Handles when a Config Message is received contains the Peer Connection Options required (STUN and TURN Server Info)
     * @param messageConfig - Config Message received from the signaling server
     */
    handleOnConfigMessage(messageConfig: MessageConfig): void;
    /**
     * Handle the RTC Answer from the signaling server
     * @param Answer - Answer Message from the Signaling server
     */
    handleWebRtcAnswer(Answer: MessageAnswer): void;
    /**
     * When an ice Candidate is received from the Signaling server add it to the Peer Connection Client
     * @param iceCandidate - Ice Candidate from Server
     */
    handleIceCandidate(iceCandidate: RTCIceCandidateInit): void;
    /**
     * Send the ice Candidate to the signaling server via websocket
       * @param iceEvent - RTC Peer ConnectionIceEvent) {
     */
    handleSendIceCandidate(iceEvent: RTCPeerConnectionIceEvent): void;
    /**
     * Send the RTC Offer Session to the Signaling server via websocket
     * @param offer - RTC Session Description
     */
    handleSendWebRTCOffer(offer: RTCSessionDescriptionInit): void;
    /**
     * registers the mouse for use in IWebRtcPlayerController
     */
    activateRegisterMouse(): void;
    /**
     * Sets up the Data channel Keyboard, Mouse, UE Control Message, UE Descriptor
     */
    handleDataChannelConnected(): void;
    /**
     * Handles when the web socket receives an authentication response
     * @param authResponse - Authentication Response
     */
    handleAuthenticationResponse(authResponse: MessageAuthResponse): void;
    /**
     * Handles when the stream size changes
     */
    updateVideoStreamSize(): void;
    /**
     * Handles when the Instance State Changes
     * @param instanceState  - Instance State
     */
    handleInstanceStateChange(instanceState: MessageInstanceState): void;
    /**
     * Set the freeze frame overlay to the player div
     * @param playerElement - The div element of the Player
     */
    setUpMouseAndFreezeFrame(playerElement: HTMLDivElement): void;
    /**
     * Close the Connection to the signaling server
     */
    closeSignalingServer(): void;
    /**
     * Fires a Video Stats Event in the RTC Peer Connection
     */
    getStats(): void;
    /**
     * Send a Latency Test Request to the UE Instance
     */
    sendLatencyTest(): void;
    /**
     * Send the Encoder Settings to the UE Instance as a UE UI Descriptor.
     * @param encoder - Encoder Settings
     */
    sendEncoderSettings(encoder: Encoder): void;
    /**
     * Send the WebRTC Settings to the UE Instance as a UE UI Descriptor.
     * @param webRTC - Web RTC Settings
     */
    sendWebRtcSettings(webRTC: WebRTC): void;
    /**
     * Send Aggregated Stats to the Signaling Server
     * @param stats - Aggregated Stats
     */
    sendStatsToSignallingServer(stats: AggregatedStats): void;
    /**
     * Sends a UI Interaction Descriptor to the UE Instance
     * @param message - String to send to the UE Instance
     */
    sendUeUiDescriptor(message: string): void;
    /**
     * Sends the UI Descriptor `stat fps` to the UE Instance
     */
    sendShowFps(): void;
    /**
     * Sends a request to the UE Instance to have ownership of Quality
     */
    sendRequestQualityControlOwnership(): void;
    /**
     * Handles when a Latency Test Result are received from the UE Instance
     * @param latencyTimings - Latency Test Timings
     */
    handleLatencyTestResult(latencyTimings: LatencyTestResults): void;
    /**
     * Handles when the Encoder and Web RTC Settings are received from the UE Instance
     * @param settings - Initial Encoder and Web RTC Settings
     */
    handleInitialSettings(settings: InitialSettings): void;
    /**
     * Handles when the Quantization Parameter are received from the UE Instance
     * @param AvgQP - Encoders Quantization Parameter
     */
    handleVideoEncoderAvgQP(AvgQP: number): void;
    /**
     * Flag set if the user has Quality Ownership
     * @param hasQualityOwnership - Does the current client have Quality Ownership
     */
    handleQualityControlOwnership(hasQualityOwnership: boolean): void;
    /**
     * Handles when the Aggregated stats are Collected
     * @param stats - Aggregated Stats
     */
    handleVideoStats(stats: AggregatedStats): void;
    /**
    * To Resize the Video Player element
    */
    resizePlayerStyle(): void;
    /**
     * Get the overridden disconnect message
     */
    getDisconnectMessageOverride(): string;
    /**
     * Set the override for the disconnect message
     */
    setDisconnectMessageOverride(message: string): void;
}
