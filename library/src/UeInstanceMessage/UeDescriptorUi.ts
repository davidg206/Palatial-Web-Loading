import { DataChannelController } from "../DataChannel/DataChannelController";
import { UeDescriptor } from "./UeDescriptor";
import { UeMessageType } from "./UeMessageTypes";
import { Config } from "../Config/Config";

/**
 * Handles the Sending of a UI Descriptor to the UE Instance
 */
export class UeDescriptorUi extends UeDescriptor {

    dataChannelController: DataChannelController;
    config: Config;

    /**
     * @param dataChannelController - Data Channel Controller
     */
    constructor(dataChannelController: DataChannelController, config: Config) {
        super(dataChannelController);
	this.dataChannelController = dataChannelController;
	this.config = config;
    }

    /**
     * Send a set res UI Descriptor to UE Instance
     * @param width - Width of res
     * @param height - Height of res
     */
    sendUpdateVideoStreamSize(width: number, height: number) {
        console.log(`called with ${width}, ${height}`);
	if (this.config.isMobile) {
		width *= 2;
		height *= 2;
	}
	console.log(`updating size to: ${width},${height}`)
	const s = JSON.stringify({
		"Resolution.Width": width,
		"Resolution.Height": height
	});
	const n = {
		id: 51
	};
	const r = new DataView(new ArrayBuffer(3 + 2 * s.length));
	let o = 0;
	r.setUint8(o, n.id), o++, r.setUint16(o, s.length, !0), o += 2;
	for (let e = 0; e < s.length; e++) {
		r.setUint16(o, s.charCodeAt(e), !0);
		o += 2;
	}
	this.dataChannelController.sendData(r.buffer);	
    }

    /**
     * Send a stat fps UI Descriptor to UE Instance
     */
    sendShowFps() {
        this.sendUiConsoleInteraction("stat fps");
    }

    /**
     * Send a Encoder Rate Control to UE Instance
     * @param rateControl - Rate Control "CBR" | "VBR" | "ConstQP" 
     */
    sendEncoderRateControl(rateControl: "CBR" | "VBR" | "ConstQP") {
        this.sendUiConsoleInteraction("PixelStreaming.Encoder.RateControl " + rateControl);
    }

    /**
     * Send Encoder Target Bit Rate to the UE Instance
     * @param targetBitRate - Send a Target Bit Rate
     */
    sendEncoderTargetBitRate(targetBitRate: number) {
        this.sendUiConsoleInteraction("PixelStreaming.Encoder.TargetBitrate " + (targetBitRate > 0 ? targetBitRate : -1));
    }

    /**
     * Send Encoder Max Bit Rate VBR to UE Instance
     * @param maxBitRate - Send A Max Bit Rate
     */
    sendEncoderMaxBitrateVbr(maxBitRate: number) {
        this.sendUiConsoleInteraction("PixelStreaming.Encoder.MaxBitrateVBR " + (maxBitRate > 0 ? maxBitRate : 1));
    }

    /**
     * Send the Minimum Quantization Parameter to the UE Instance
     * @param minQP - Minimum Quantization Parameter 
     */
    sendEncoderMinQP(minQP: number) {
        this.sendUiConsoleInteraction("PixelStreaming.Encoder.MinQP " + minQP);
    }

    /**
     * Send the Maximum Quantization Parameter to the UE Instance
     * @param maxQP - Maximum Quantization Parameter 
     */
    sendEncoderMaxQP(maxQP: number) {
        this.sendUiConsoleInteraction("PixelStreaming.Encoder.MaxQP " + maxQP);
    }

    /**
     * Send Enable Filler Data to the UE Instance
     * @param enable - True
     */
    sendEncoderEnableFillerData(enable: boolean) {
        this.sendUiConsoleInteraction("PixelStreaming.Encoder.EnableFillerData " + Number(enable).valueOf());
    }

    /**
     * Send Encoder MultiPass to UE Instance
     * @param multiPass - MultiPass "DISABLED" | "QUARTER" | "FULL"
     */
    sendEncoderMultiPass(multiPass: "DISABLED" | "QUARTER" | "FULL") {
        this.sendUiConsoleInteraction("PixelStreaming.Encoder.Multipass " + multiPass);
    }

    /**
     * Send a Web RTC Degradation Preference to UE Instance
     * @param DegradationPreference - Degradation Preference "BALANCED" | "MAINTAIN_FRAMERATE" | "MAINTAIN_RESOLUTION"
     */
    sendWebRtcDegradationPreference(DegradationPreference: "BALANCED" | "MAINTAIN_FRAMERATE" | "MAINTAIN_RESOLUTION") {
        this.sendUiConsoleInteraction("PixelStreaming.WebRTC.DegradationPreference " + DegradationPreference);
    }

    /**
     * Sends the Max FPS to the UE Instance
     * @param MaxFps - Web RTC Max Frames Per Second
     */
    sendWebRtcMaxFps(MaxFps: number) {
        this.sendUiConsoleInteraction("PixelStreaming.WebRTC.MaxFps " + MaxFps);
    }

    /**
    * Sends the FPS to the UE Instance used un UE 5.0
    * @param Fps - Web RTC Frames Per Second
    */
    sendWebRtcFps(Fps: number) {
        this.sendUiConsoleInteraction("PixelStreaming.WebRTC.Fps " + Fps);
    }

    /**
     * Sends the Minimum bit rate to the UE Instance
     * @param MinBitrate - Web RTC Minimum Bitrate
     */
    sendWebRtcMinBitrate(MinBitrate: number) {
        this.sendUiConsoleInteraction("PixelStreaming.WebRTC.MinBitrate " + MinBitrate);
    }

    /**
     * Sends the Maximum bit rate to the UE Instance
     * @param MaxBitrate - Web RTC Maximum Bitrate
     */
    sendWebRtcMaxBitrate(MaxBitrate: number) {
        this.sendUiConsoleInteraction("PixelStreaming.WebRTC.MaxBitrate " + MaxBitrate);
    }

    /**
     * Sends the Low Quantization Parameter Threshold level to the UE Instance
     * @param LowQpThreshold - Low Quantization Parameter Threshold Level
     */
    sendWebRtcLowQpThreshold(LowQpThreshold: number) {
        this.sendUiConsoleInteraction("PixelStreaming.WebRTC.LowQpThreshold " + LowQpThreshold);
    }

    /**
     * Sends the High Quantization Parameter Threshold level to the UE Instance
     * @param HighQpThreshold - High Quantization Parameter Threshold Level
     */
    sendWebRtcHighQpThreshold(HighQpThreshold: number) {
        this.sendUiConsoleInteraction("PixelStreaming.WebRTC.HighQpThreshold " + HighQpThreshold);
    }

    /**
     * Sends a descriptor string to the UE Interaction Instance
     * @param descriptor - the String descriptor to send
     */
    sendUiInteraction(descriptor: string) {
        this.sendDescriptor(UeMessageType.uiInteraction, descriptor);
    }

    /**
     * Sends a console descriptor
     * @param descriptor - The string descriptor to send
     */
    sendUiConsoleInteraction(descriptor: string) {
        let payload = {
            Console: descriptor
        }
        this.sendUiInteraction(JSON.stringify(payload));
    }

    sendCommand(payload: Record<string, any>) {
	this.sendUiInteraction(JSON.stringify(payload));
    }
}

