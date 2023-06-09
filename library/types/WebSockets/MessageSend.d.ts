import { AggregatedStats } from "../PeerConnectionController/AggregatedStats";
import { CandidatePairStats } from "../PeerConnectionController/CandidatePairStats";
import { CandidateStat } from "../PeerConnectionController/CandidateStat";
import { dataChannelStats } from "../PeerConnectionController/DataChannelStats";
import { inboundAudioStats } from "../PeerConnectionController/InboundAudioStats";
import { inboundVideoStats } from "../PeerConnectionController/InboundVideoStats";
import { OutBoundVideoStats } from "../PeerConnectionController/OutBoundVideoStats";
/**
 * The Send Types that are pushed from the signaling server
 */
export declare enum MessageSendTypes {
    ICE_CANDIDATE = "iceCandidate",
    STATS = "stats",
    AUTHENTICATION_REQUEST = "authenticationRequest",
    REQUEST_INSTANCE = "requestInstance",
    OFFER = "offer",
    PONG = "pong"
}
/**
 * A Wrapper for the message to send to the signaling server
 */
export declare class MessageSend implements Send {
    type: MessageSendTypes;
    peerConnectionOptions: Object;
    /**
     * Turns the wrapper into a JSON String
     * @returns - JSON String of the Message to send
     */
    payload(): string;
}
export interface Send {
    /**
     * Turns the wrapper into a JSON String
     * @returns - JSON String of the Message to send
     */
    payload: () => string;
}
/**
 * Auth Request Message Wrapper
 */
export declare class MessageAuthRequest extends MessageSend {
    token: string;
    provider: string;
    /**
     * @param token - Token Provided by the Auth Provider
     * @param provider - Name of the provider that is registered in the auth plugin
     */
    constructor(token: string, provider: string);
}
/**
 * Instance Request Message Wrapper
 */
export declare class MessagePong extends MessageSend {
    time: number;
    constructor(time: number);
}
/**
 * Instance Request Message Wrapper
 */
export declare class MessageRequestInstance extends MessageSend {
    constructor();
}
/**
 * Aggregated Stats Message Wrapper
 */
export declare class MessageStats extends MessageSend {
    inboundVideoStats: inboundVideoStats;
    inboundAudioStats: inboundAudioStats;
    candidatePair: CandidatePairStats;
    dataChannelStats: dataChannelStats;
    localCandidates: Array<CandidateStat>;
    remoteCandidates: Array<CandidateStat>;
    outboundVideoStats: OutBoundVideoStats;
    /**
     * @param aggregatedStats - Aggregated Stats
     */
    constructor(aggregatedStats: AggregatedStats);
}
/**
 *  Web RTC Offer message wrapper
 */
export declare class MessageWebRTCOffer extends MessageSend {
    sdp: string;
    /**
     * @param offer - Generated Web RTC Offer
     */
    constructor(offer?: RTCSessionDescriptionInit);
}
/**
 * RTC Ice Candidate Wrapper
 */
export declare class MessageIceCandidate implements Send {
    candidate: RTCIceCandidate;
    type: MessageSendTypes;
    /**
     * @param candidate - RTC Ice Candidate
     */
    constructor(candidate: RTCIceCandidate);
    /**
     * Turns the wrapper into a JSON String
     * @returns - JSON String of the Message to send
     */
    payload(): string;
}
