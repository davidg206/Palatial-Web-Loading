import { inboundAudioStats } from "./InboundAudioStats";
import { inboundVideoStats } from "./InboundVideoStats";
import { dataChannelStats } from "./DataChannelStats";
import { CandidateStat } from "./CandidateStat";
import { CandidatePairStats } from "./CandidatePairStats";
import { OutBoundVideoStats } from "./OutBoundVideoStats";
import { StreamStats } from "./StreamStats";
export declare class AggregatedStats {
    inboundVideoStats: inboundVideoStats;
    inboundAudioStats: inboundAudioStats;
    lastVideoStats: inboundVideoStats;
    candidatePair: CandidatePairStats;
    dataChannelStats: dataChannelStats;
    localCandidates: Array<CandidateStat>;
    remoteCandidates: Array<CandidateStat>;
    outBoundVideoStats: OutBoundVideoStats;
    streamStats: StreamStats;
    constructor();
    /**
     * Gather all the information from the RTC Peer Connection Report
     * @param rtcStatsReport - RTC Stats Report
     */
    processStats(rtcStatsReport: RTCStatsReport): void;
    /**
     * Process stream stats data from webrtc
     *
     * @param stat the stats coming in from webrtc
     */
    handleStream(stat: any): void;
    /**
     * Process the Ice Candidate Pair Data
     */
    handleCandidatePair(stat: any): void;
    /**
     * Process the Data Channel Data
     */
    handleDataChannel(stat: any): void;
    /**
     * Process the Local Ice Candidate Data
     */
    handleLocalCandidate(stat: any): void;
    /**
     * Process the Remote Ice Candidate Data
     */
    handleRemoteCandidate(stat: any): void;
    /**
     * Process the Inbound RTP Audio and Video Data
     */
    handleInBoundRTP(stat: any): void;
    /**
     * Process the outbound RTP Audio and Video Data
     */
    handleRemoteOutBound(stat: any): void;
    /**
     * Process the Inbound Video Track Data
     */
    handleTrack(stat: any): void;
    /**
     * Check if a value coming in from our stats is actually a number
     */
    isNumber(value: any): boolean;
}
