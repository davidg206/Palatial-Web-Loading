import { InitialSettings } from "./InitialSettings";
import { LatencyTestResults } from "../DataChannel/LatencyTestResults";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";
import { Config } from "../Config/Config";
import { UeDescriptorUi } from "../UeInstanceMessage/UeDescriptorUi";
declare class at {
    inRange: any;
    x: any;
    y: any;
    constructor(e: any, t: any, s: any);
}
declare class lt {
    x: any;
    y: any;
    constructor(e: any, t: any);
}
declare class dt {
    x: any;
    y: any;
    constructor(e: any, t: any);
}
declare class ot {
    private videoElementProvider;
    private videoElementParent;
    private videoElement;
    private ratio;
    private normalizeAndQuantizeUnsignedFunc;
    private normalizeAndQuantizeSignedFunc;
    private denormalizeAndUnquantizeUnsignedFunc;
    constructor(e: any);
    normalizeAndQuantizeUnsigned(e: number, t: number): any;
    unquantizeAndDenormalizeUnsigned(e: number, t: number): any;
    normalizeAndQuantizeSigned(e: number, t: number): any;
    setupNormalizeAndQuantize(): void;
    private normalizeAndQuantizeUnsignedPlayerBigger;
    denormalizeAndUnquantizeUnsignedPlayerBigger(e: number, t: number): lt;
    normalizeAndQuantizeSignedPlayerBigger(e: number, t: number): dt;
    normalizeAndQuantizeUnsignedPlayerSmaller(e: number, t: number): at;
    denormalizeAndUnquantizeUnsignedPlayerSmaller(e: number, t: number): lt;
    normalizeAndQuantizeSignedPlayerSmaller(e: number, t: number): dt;
}
/**
 * Handles the Sending and Receiving of messages to the UE Instance via the Data Channel
 */
export declare class DataChannelController {
    dataChannel: RTCDataChannel;
    peerConnection: RTCPeerConnection;
    datachannelOptions: RTCDataChannelInit;
    label: string;
    isReceivingFreezeFrame: boolean;
    ueDescriptorUi: UeDescriptorUi;
    static editTextButton: HTMLButtonElement;
    static hiddenInput: HTMLInputElement;
    static coordinateConverter: ot;
    isIOS: boolean;
    constructor(videoElement: VideoPlayer, config: Config);
    focusAndOpenKeyboard(el: HTMLElement, timeout?: number): void;
    /**
     * To Create and Set up a Data Channel
     * @param peerConnection - The RTC Peer Connection
     * @param label - Label of the Data Channel
     * @param datachannelOptions - Optional RTC DataChannel options
     */
    createDataChannel(peerConnection: RTCPeerConnection, label: string, datachannelOptions?: RTCDataChannelInit): void;
    /**
     * Handles when the Data Channel is opened
     */
    handleOnOpen(): void;
    /**
     * Handles when the Data Channel is closed
     */
    handleOnClose(): void;
    /**
     * Handles when a message is received
     * @param event - Message Event
     */
    handleOnMessage(event: MessageEvent): void;
    /**
     * Fired when a Response message is sent from the UE Instance
     * @param message - Message Data Uint8Array
     */
    onResponse(message: Uint8Array): void;
    /**
     * Fired when a Command message is sent from the UE Instance
     * @param message - Message Data Uint8Array
     */
    onCommand(message: Uint8Array): void;
    showOnScreenKeyboard(command: any): void;
    /**
     * Send Data over the Data channel to the UE Instance
     * @param data - Message Data Array Buffer
     */
    sendData(data: ArrayBuffer): void;
    /**
     * Fired when the UE Instance updates who has Quality Ownership
     * @param hasQualityOwnership - Does the client have Quality Ownership
     */
    onQualityControlOwnership(hasQualityOwnership: boolean): void;
    /**
     * Fired when the UE Instance sends freeze frame data
     * @param message - Freeze Frame Data
     */
    processFreezeFrameMessage(message: Uint8Array): void;
    /**
     * Fired when the UE Instance sends a un Freeze Frame
     */
    onUnFreezeFrame(): void;
    /**
     * Fired when the UE Instance sends the Video Encoder Avg QP
     * @param AvgQP - Avg QP
     */
    onVideoEncoderAvgQP(AvgQP: number): void;
    /**
     * Fired when the UE Instance sends Latency test Results
     * @param latencyTestResults - Latency Test Results
     */
    onLatencyTestResult(latencyTestResults: LatencyTestResults): void;
    /**
     * Fired when the UE Instance sends Initial Settings
     * @param InitialSettings - Initial Settings
     */
    OnInitialSettings(InitialSettings: InitialSettings): void;
    /**
     * An override method for resetting the Afk warning timer when data is sent over the data channel
     */
    resetAfkWarningTimerOnDataSend(): void;
}
export interface InstanceCommand {
    command: string;
}
export {};
