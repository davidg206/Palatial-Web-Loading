/**
 * The Types of Messages that will be received
 */
export declare enum MessageRecvTypes {
    AUTHENTICATION_REQUIRED = "authenticationRequired",
    AUTHENTICATION_RESPONSE = "authenticationResponse",
    INSTANCE_STATE = "instanceState",
    CONFIG = "config",
    PLAYER_COUNT = "playerCount",
    ANSWER = "answer",
    ICE_CANDIDATE = "iceCandidate",
    PING = "ping"
}
/**
 * Types of Authentication reposes
 */
export declare enum MessageAuthResponseOutcomeType {
    REDIRECT = "REDIRECT",
    INVALID_TOKEN = "INVALID_TOKEN",
    AUTHENTICATED = "AUTHENTICATED",
    ERROR = "ERROR"
}
/**
 * States of the UE Instance
 */
export declare enum InstanceState {
    UNALLOCATED = "UNALLOCATED",
    PENDING = "PENDING",
    FAILED = "FAILED",
    READY = "READY"
}
/**
 * Concrete Received Message wrapper
 */
export declare class MessageRecv {
    type: string;
    id: string;
}
/**
 * Authentication Required Message wrapper
 */
export declare class MessageAuthRequired extends MessageRecv {
}
/**
 * Authentication Response Message wrapper
 */
export declare class MessageAuthResponse extends MessageRecv {
    outcome: MessageAuthResponseOutcomeType;
    redirect: string;
    error: string;
}
/**
 * Instance State Message wrapper
 */
export declare class MessageInstanceState extends MessageRecv {
    state: InstanceState;
    details: string;
    progress: number;
}
/**
 * Config Message Wrapper
 */
export declare class MessageConfig extends MessageRecv {
    peerConnectionOptions: RTCConfiguration;
}
/**
 * Player Count Message wrapper
 */
export declare class MessagePlayerCount extends MessageRecv {
    count: number;
}
/**
 * Web RTC offer Answer Message wrapper
 */
export declare class MessageAnswer extends MessageRecv {
    sdp: string;
}
/**
 * Ice Candidate Message wrapper
 */
export declare class MessageIceCandidate extends MessageRecv {
    candidate: RTCIceCandidateInit;
}
