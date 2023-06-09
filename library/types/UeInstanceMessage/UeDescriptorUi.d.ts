import { DataChannelController } from "../DataChannel/DataChannelController";
import { UeDescriptor } from "./UeDescriptor";
import { Config } from "../Config/Config";
/**
 * Handles the Sending of a UI Descriptor to the UE Instance
 */
export declare class UeDescriptorUi extends UeDescriptor {
    dataChannelController: DataChannelController;
    config: Config;
    /**
     * @param dataChannelController - Data Channel Controller
     */
    constructor(dataChannelController: DataChannelController, config: Config);
    /**
     * Send a set res UI Descriptor to UE Instance
     * @param width - Width of res
     * @param height - Height of res
     */
    sendUpdateVideoStreamSize(width: number, height: number): void;
    /**
     * Send a stat fps UI Descriptor to UE Instance
     */
    sendShowFps(): void;
    /**
     * Send a Encoder Rate Control to UE Instance
     * @param rateControl - Rate Control "CBR" | "VBR" | "ConstQP"
     */
    sendEncoderRateControl(rateControl: "CBR" | "VBR" | "ConstQP"): void;
    /**
     * Send Encoder Target Bit Rate to the UE Instance
     * @param targetBitRate - Send a Target Bit Rate
     */
    sendEncoderTargetBitRate(targetBitRate: number): void;
    /**
     * Send Encoder Max Bit Rate VBR to UE Instance
     * @param maxBitRate - Send A Max Bit Rate
     */
    sendEncoderMaxBitrateVbr(maxBitRate: number): void;
    /**
     * Send the Minimum Quantization Parameter to the UE Instance
     * @param minQP - Minimum Quantization Parameter
     */
    sendEncoderMinQP(minQP: number): void;
    /**
     * Send the Maximum Quantization Parameter to the UE Instance
     * @param maxQP - Maximum Quantization Parameter
     */
    sendEncoderMaxQP(maxQP: number): void;
    /**
     * Send Enable Filler Data to the UE Instance
     * @param enable - True
     */
    sendEncoderEnableFillerData(enable: boolean): void;
    /**
     * Send Encoder MultiPass to UE Instance
     * @param multiPass - MultiPass "DISABLED" | "QUARTER" | "FULL"
     */
    sendEncoderMultiPass(multiPass: "DISABLED" | "QUARTER" | "FULL"): void;
    /**
     * Send a Web RTC Degradation Preference to UE Instance
     * @param DegradationPreference - Degradation Preference "BALANCED" | "MAINTAIN_FRAMERATE" | "MAINTAIN_RESOLUTION"
     */
    sendWebRtcDegradationPreference(DegradationPreference: "BALANCED" | "MAINTAIN_FRAMERATE" | "MAINTAIN_RESOLUTION"): void;
    /**
     * Sends the Max FPS to the UE Instance
     * @param MaxFps - Web RTC Max Frames Per Second
     */
    sendWebRtcMaxFps(MaxFps: number): void;
    /**
    * Sends the FPS to the UE Instance used un UE 5.0
    * @param Fps - Web RTC Frames Per Second
    */
    sendWebRtcFps(Fps: number): void;
    /**
     * Sends the Minimum bit rate to the UE Instance
     * @param MinBitrate - Web RTC Minimum Bitrate
     */
    sendWebRtcMinBitrate(MinBitrate: number): void;
    /**
     * Sends the Maximum bit rate to the UE Instance
     * @param MaxBitrate - Web RTC Maximum Bitrate
     */
    sendWebRtcMaxBitrate(MaxBitrate: number): void;
    /**
     * Sends the Low Quantization Parameter Threshold level to the UE Instance
     * @param LowQpThreshold - Low Quantization Parameter Threshold Level
     */
    sendWebRtcLowQpThreshold(LowQpThreshold: number): void;
    /**
     * Sends the High Quantization Parameter Threshold level to the UE Instance
     * @param HighQpThreshold - High Quantization Parameter Threshold Level
     */
    sendWebRtcHighQpThreshold(HighQpThreshold: number): void;
    /**
     * Sends a descriptor string to the UE Interaction Instance
     * @param descriptor - the String descriptor to send
     */
    sendUiInteraction(descriptor: string): void;
    /**
     * Sends a console descriptor
     * @param descriptor - The string descriptor to send
     */
    sendUiConsoleInteraction(descriptor: string): void;
    sendCommand(payload: Record<string, any>): void;
}
