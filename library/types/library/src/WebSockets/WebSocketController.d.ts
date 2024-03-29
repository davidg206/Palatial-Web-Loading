import { AggregatedStats } from "../PeerConnectionController/AggregatedStats";
import * as MessageReceive from "./MessageReceive";
import { IDelegate } from "../Delegate/IDelegate";
declare global {
    interface WebSocket {
        onmessagebinary?(event?: MessageEvent): void;
    }
}
/**
 * The controller for the WebSocket and all associated methods
 */
export declare class WebSocketController {
    WS_OPEN_STATE: number;
    address: string;
    webSocket: WebSocket;
    delegate: IDelegate;
    /**
     * @param Address - The Address of the signaling server
     */
    constructor(Address: string, delegate: IDelegate);
    /**
     * Connect to the signaling server
     * @returns - If there is a connection
     */
    connect(): boolean;
    /**
     * Handles what happens when a message is received in binary form
     * @param event - Message Received
     */
    handelOnMessageBinary(event: MessageEvent): void;
    /**
     * Handles what happens when a message is received
     * @param event - Message Received
     */
    handleOnMessage(event: MessageEvent): void;
    /**
     * Handles when the Websocket is opened
     * @param event - Not Used
     */
    handleOnOpen(event: Event): void;
    /**
     * Handles when there is an error on the websocket
     * @param event - Error Payload
     */
    handleOnError(event: Event): void;
    /**
     * Handles when the Websocket is closed
     * @param event - Close Event
     */
    handleOnClose(event: CloseEvent): void;
    /**
     * An override for stopping the afk warning timer
     */
    stopAfkWarningTimer(): void;
    sendWebRtcOffer(offer: RTCSessionDescriptionInit): void;
    /**
     * Sends an RTC Ice Candidate to the Server
     * @param candidate - RTC Ice Candidate
     */
    sendIceCandidate(candidate: RTCIceCandidate): void;
    /**
     * Closes the Websocket connection
     */
    close(): void;
    /**
     * Sends the Aggregated Stats to the signaling server
     * @param stats - Stats Payload
     */
    sendStats(stats: AggregatedStats): void;
    /** Event used for Displaying websocket closed messages */
    onWebSocketOncloseOverlayMessage(event: CloseEvent): void;
    /**
     * The Message Contains the payload of the peer connection options used for the RTC Peer hand shake
     * @param messageConfig - Config Message received from he signaling server
     */
    onConfig(messageConfig: MessageReceive.MessageConfig): void;
    /**
     * @param iceCandidate - Ice Candidate sent from the Signaling server server's RTC hand shake
     */
    onIceCandidate(iceCandidate: RTCIceCandidateInit): void;
    /**
     * Event is fired when the websocket receives the answer for the RTC peer Connection
     * @param messageAnswer - The RTC Answer payload from the signaling server
     */
    onWebRtcAnswer(messageAnswer: MessageReceive.MessageAnswer): void;
    /**
     * Event fired with the websocket receives a instance state
     * @param instanceState - UE Instance State
     */
    onInstanceStateChange(instanceState: MessageReceive.MessageInstanceState): void;
    /**
     * Event fired with the websocket receives a Authentication Response
     * @param authResponse - Authentication Response
     */
    onAuthenticationResponse(authResponse: MessageReceive.MessageAuthResponse): void;
}
