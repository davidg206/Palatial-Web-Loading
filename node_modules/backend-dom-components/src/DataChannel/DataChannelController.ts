import { Logger } from "../Logger/Logger";
import { DataChannelReceiveMessageType as DataChannelReceiveMessageType } from "./DataChannelReceiveMessageType";
import { IInitialSettings, } from "./IInitialSettings";
import { InitialSettings, } from "./InitialSettings";
import { ILatencyTestResults } from "../DataChannel/ILatencyTestResults"
import { LatencyTestResults } from "../DataChannel/LatencyTestResults"
import { VideoPlayer } from "../VideoPlayer/VideoPlayer"
import { Config } from "../Config/Config";
import { UeDescriptorUi } from "../UeInstanceMessage/UeDescriptorUi";

class at {
    public inRange: any;
    public x: any;
    public y: any;
    constructor(e: any, t: any, s: any) {
        this.inRange = e, this.x = t, this.y = s
    }
}
class lt {
    public x: any;
    public y: any;
    constructor(e: any, t: any) {
        this.x = e, this.y = t
    }
}
class dt {
    public x: any;
    public y: any;
    constructor(e: any, t: any) {
        this.x = e, this.y = t
    }
}
class ot {
    private videoElementProvider: any;
    private videoElementParent: HTMLElement | null = null;
    private videoElement: HTMLVideoElement | null = null;
    private ratio = 0;
    private normalizeAndQuantizeUnsignedFunc: (e: number, t: number) => any;
    private normalizeAndQuantizeSignedFunc: (e: number, t: number) => any;
    private denormalizeAndUnquantizeUnsignedFunc: (e: number, t: number) => any;
    constructor(e: any) {
        this.videoElementProvider = e;
        this.normalizeAndQuantizeUnsignedFunc = () => {
            throw new Error("Normalize and quantize unsigned, method not implemented.");
        };
        this.normalizeAndQuantizeSignedFunc = () => {
            throw new Error("Normalize and unquantize signed, method not implemented.");
        };
        this.denormalizeAndUnquantizeUnsignedFunc = () => {
            throw new Error("Denormalize and unquantize unsigned, method not implemented.");
        };
    }
    public normalizeAndQuantizeUnsigned(e: number, t: number): any {
        return this.normalizeAndQuantizeUnsignedFunc(e, t);
    }
    public unquantizeAndDenormalizeUnsigned(e: number, t: number): any {
        return this.denormalizeAndUnquantizeUnsignedFunc(e, t);
    }
    public normalizeAndQuantizeSigned(e: number, t: number): any {
        return this.normalizeAndQuantizeSignedFunc(e, t);
    }
    public setupNormalizeAndQuantize(): void {
        if ((this.videoElementParent = this.videoElementProvider.getVideoParentElement(), this.videoElement = this.videoElementProvider.getVideoElement(), this.videoElementParent && this.videoElement)) {
            const e = this.videoElementParent.clientHeight / this.videoElementParent.clientWidth;
            const t = this.videoElement.videoHeight / this.videoElement.videoWidth;
            if (e > t) {
                //console.log("Setup Normalize and Quantize for playerAspectRatio > videoAspectRatio");
                this.ratio = e / t;
                this.normalizeAndQuantizeUnsignedFunc = (e: number, t: number) => this.normalizeAndQuantizeUnsignedPlayerBigger(e, t);
                this.normalizeAndQuantizeSignedFunc = (e: number, t: number) => this.normalizeAndQuantizeSignedPlayerBigger(e, t);
                this.denormalizeAndUnquantizeUnsignedFunc = (e: number, t: number) => this.denormalizeAndUnquantizeUnsignedPlayerBigger(e, t);
            } else {
                //console.log("Setup Normalize and Quantize for playerAspectRatio <= videoAspectRatio");
                this.ratio = t / e;
                this.normalizeAndQuantizeUnsignedFunc = (e: number, t: number) => this.normalizeAndQuantizeUnsignedPlayerSmaller(e, t);
                this.normalizeAndQuantizeSignedFunc = (e: number, t: number) => this.normalizeAndQuantizeSignedPlayerSmaller(e, t);
                this.denormalizeAndUnquantizeUnsignedFunc = (e: number, t: number) => this.denormalizeAndUnquantizeUnsignedPlayerSmaller(e, t);
            }
        }
    }
    private normalizeAndQuantizeUnsignedPlayerBigger(e: number, t: number): any {
        const s = e / this.videoElementParent!.clientWidth;
        const n = this.ratio * (t / this.videoElementParent!.clientHeight - 0.5) + 0.5;
        return (s < 0 || s > 1 || n < 0 || n > 1 ? new at(!1, 65535, 65535) : new at(!0, 65536 * s, 65536 * n));
    }
    denormalizeAndUnquantizeUnsignedPlayerBigger(e: number, t: number): lt {
        const s: number = e / 65536;
        const n: number = (t / 65536 - 0.5) / this.ratio + 0.5;
        return new lt(s * this.videoElementParent.clientWidth, n * this.videoElementParent.clientHeight);
    }
    normalizeAndQuantizeSignedPlayerBigger(e: number, t: number): dt {
        const s: number = e / (0.5 * this.videoElementParent.clientWidth);
        const n: number = this.ratio * t / (0.5 * this.videoElementParent.clientHeight);
        return new dt(32767 * s, 32767 * n);
    }
    normalizeAndQuantizeUnsignedPlayerSmaller(e: number, t: number): at {
        const s: number = this.ratio * (e / this.videoElementParent.clientWidth - 0.5) + 0.5;
        const n: number = t / this.videoElementParent.clientHeight;
        return s < 0 || s > 1 || n < 0 || n > 1 ? new at(false, 65535, 65535) : new at(true, 65536 * s, 65536 * n);
    }
    denormalizeAndUnquantizeUnsignedPlayerSmaller(e: number, t: number): lt {
        const s: number = (e / 65536 - 0.5) / this.ratio + 0.5;
        const n: number = t / 65536;
        return new lt(s * this.videoElementParent.clientWidth, n * this.videoElementParent.clientHeight);
    }
    normalizeAndQuantizeSignedPlayerSmaller(e: number, t: number): dt {
        const s: number = this.ratio * e / (0.5 * this.videoElementParent.clientWidth);
        const n: number = t / (0.5 * this.videoElementParent.clientHeight);
        return new dt(32767 * s, 32767 * n);
    }
}

/**
 * Handles the Sending and Receiving of messages to the UE Instance via the Data Channel
 */
export class DataChannelController {
    dataChannel: RTCDataChannel;
    peerConnection: RTCPeerConnection;
    datachannelOptions: RTCDataChannelInit;
    label: string;
    isReceivingFreezeFrame = false;
    ueDescriptorUi: UeDescriptorUi;

    // If the user focuses on a UE input widget then we show them a button to open
    // the on-screen keyboard. JavaScript security means we can only show the
    // on-screen keyboard in response to a user interaction.
    static editTextButton: HTMLButtonElement = undefined;

    // A hidden input text box which is used only for focusing and opening the
    // on-screen keyboard.
    static hiddenInput: HTMLInputElement = undefined;

    static coordinateConverter: ot;
    isIOS: boolean;

    constructor(videoElement: VideoPlayer, config: Config) {
      DataChannelController.coordinateConverter = new ot(videoElement);
      this.isIOS = config.isIOS;
    }

    focusAndOpenKeyboard(el: HTMLElement, timeout?:  number): void {
        if (!timeout) {
            timeout = 100;
        }
        if (el) {
            // Align temp input element approximately where the input element is
            // so the cursor doesn't jump around
            const __tempEl__: HTMLInputElement = document.createElement('input');
            __tempEl__.style.position = 'absolute';
            __tempEl__.style.top = `${el.offsetTop + 7}px`;
            __tempEl__.style.left = `${el.offsetLeft}px`;
            __tempEl__.style.height = '0';
            __tempEl__.style.opacity = '0';
            // Put this temp element as a child of the page <body> and focus on it
            document.body.appendChild(__tempEl__);
            __tempEl__.focus();

            // The keyboard is open. Now do a delayed focus on the target element
            setTimeout(function() {
                el.focus();
                el.click();
                // Remove the temp element
                document.body.removeChild(__tempEl__);
            }, timeout);
        }
    }

    /**
     * To Create and Set up a Data Channel
     * @param peerConnection - The RTC Peer Connection
     * @param label - Label of the Data Channel
     * @param datachannelOptions - Optional RTC DataChannel options
     */
    createDataChannel(peerConnection: RTCPeerConnection, label: string, datachannelOptions?: RTCDataChannelInit) {
        this.peerConnection = peerConnection;
        this.label = label;
        this.datachannelOptions = datachannelOptions;
        if (datachannelOptions == null) {
            this.datachannelOptions = {} as RTCDataChannelInit
            this.datachannelOptions.ordered = true;
        }

        this.dataChannel = this.peerConnection.createDataChannel(this.label, this.datachannelOptions);
        //We Want an Array Buffer not a blob
        this.dataChannel.binaryType = "arraybuffer";
        this.dataChannel.onopen = () => this.handleOnOpen();
        this.dataChannel.onclose = () => this.handleOnClose();
        this.dataChannel.onmessage = (ev: MessageEvent<any>) => { this.handleOnMessage(ev); };
    }

    /**
     * Handles when the Data Channel is opened
     */
    handleOnOpen() {
        Logger.Log(Logger.GetStackTrace(), "Data Channel: " + this.label + " is opened.", 7);
    }

    /**
     * Handles when the Data Channel is closed
     */
    handleOnClose() {
        Logger.Log(Logger.GetStackTrace(), "Data Channel: " + this.label + " is closed.", 7);
    }

    /**
     * Handles when a message is received 
     * @param event - Message Event
     */
    handleOnMessage(event: MessageEvent) {
        let message = new Uint8Array(event.data);

        Logger.Log(Logger.GetStackTrace(), "Message incoming", 6);
        Logger.Log(Logger.GetStackTrace(), "Message:" + message, 6);

        switch (message[0]) {
            case DataChannelReceiveMessageType.QualityControlOwnership: {
                Logger.Log(Logger.GetStackTrace(), "DataChannelReceiveMessageType.QualityControlOwnership", 6);
                let QualityOwnership = new Boolean(message[1]).valueOf();
                this.onQualityControlOwnership(QualityOwnership);
                break;
            }
            case DataChannelReceiveMessageType.Response: {
                Logger.Log(Logger.GetStackTrace(), "DataChannelReceiveMessageType.Response", 6);
                this.onResponse(message);
                break;
            }
            case DataChannelReceiveMessageType.Command: {
                Logger.Log(Logger.GetStackTrace(), "DataChannelReceiveMessageType.Command", 6);
                this.onCommand(message);
                break;
            }
            case DataChannelReceiveMessageType.FreezeFrame: {
                Logger.Log(Logger.GetStackTrace(), "DataChannelReceiveMessageType.FreezeFrame", 6);
                this.processFreezeFrameMessage(message);
                break;
            }
            case DataChannelReceiveMessageType.UnfreezeFrame: {
                Logger.Log(Logger.GetStackTrace(), "DataChannelReceiveMessageType.FreezeFrame", 6);
                this.isReceivingFreezeFrame = false;
                this.onUnFreezeFrame();
                break;
            }
            case DataChannelReceiveMessageType.VideoEncoderAvgQP: {
                Logger.Log(Logger.GetStackTrace(), "DataChannelReceiveMessageType.VideoEncoderAvgQP", 6);
                let AvgQP = Number(new TextDecoder("utf-16").decode(message.slice(1)));
                this.onVideoEncoderAvgQP(AvgQP);
                break;
            }
            case DataChannelReceiveMessageType.latencyTest: {
                Logger.Log(Logger.GetStackTrace(), "DataChannelReceiveMessageType.latencyTest", 6);
                let latencyAsString = new TextDecoder("utf-16").decode(message.slice(1));
                let iLatencyTestResults: ILatencyTestResults = JSON.parse(latencyAsString);
                let latencyTestResults: LatencyTestResults = new LatencyTestResults();
                Object.assign(latencyTestResults, iLatencyTestResults);
                latencyTestResults.processFields()
                this.onLatencyTestResult(latencyTestResults);
                break;
            }
            case DataChannelReceiveMessageType.InitialSettings: {
                Logger.Log(Logger.GetStackTrace(), "DataChannelReceiveMessageType.InitialSettings", 6);
                let payloadAsString = new TextDecoder("utf-16").decode(message.slice(1));
                let iInitialSettings: IInitialSettings = JSON.parse(payloadAsString);
                let initialSettings: InitialSettings = new InitialSettings();
                Object.assign(initialSettings, iInitialSettings);
                initialSettings.ueCompatible()
                Logger.Log(Logger.GetStackTrace(), payloadAsString, 6);
                this.OnInitialSettings(initialSettings);
                break;
            }
            default: {
                //Logger.Log(Logger.GetStackTrace(), message[0].toString());
                //Logger.Error(Logger.GetStackTrace(), "unknown message sent on the Data channel");
                break;
            }
        }
    }

    /**
     * Fired when a Response message is sent from the UE Instance
     * @param message - Message Data Uint8Array
     */
    onResponse(message: Uint8Array) {
        Logger.Log(Logger.GetStackTrace(), "DataChannelReceiveMessageType.Response", 6);
        let response = new TextDecoder("utf-16").decode(message.slice(1));
        Logger.Log(Logger.GetStackTrace(), response, 6);
        // add to response handlers 
	/*for (let listener of responseEventListeners.values()) {
		listener(response);
	}*/

	const t = JSON.parse(response);
	console.log(response);
	if (t.name == 'selectedText') {
		navigator.clipboard.writeText(t.data);
	}
	if (t.command == 'Join Session') {
		console.log("Join Session");
		this.ueDescriptorUi.sendUiInteraction(JSON.stringify({
			"Password": "Palatial",
			"IP": "palatial.tenant-palatial-platform.coreweave.cloud:2222"
		}));
	}
    }

    /**
     * Fired when a Command message is sent from the UE Instance
     * @param message - Message Data Uint8Array
     */
    onCommand(message: Uint8Array) {
        Logger.Log(Logger.GetStackTrace(), "DataChannelReceiveMessageType.Command", 6);
        let commandAsString = new TextDecoder("utf-16").decode(message.slice(1));
        Logger.Log(Logger.GetStackTrace(), "Data Channel Command: " + commandAsString, 6);
        let command: any = JSON.parse(commandAsString);
        if (command.command === "onScreenKeyboard") {
            //show on screen Keyboard
	    Logger.Log(Logger.GetStackTrace(), "Show on screen keyboard: " + commandAsString, 6);
	    this.showOnScreenKeyboard(command);
        }
    }

    showOnScreenKeyboard(command: any) {
	let hiddenInput = DataChannelController.hiddenInput;
        if (command.showOnScreenKeyboard) {
            if (true) { // this.isIOS
                // Show the 'edit text' button.
                DataChannelController.editTextButton.classList.remove('hiddenState');
                // Place the 'edit text' button near the UE input widget.
                let pos = DataChannelController.coordinateConverter.unquantizeAndDenormalizeUnsigned(command.x, command.y);
                if (pos.x != 0 && pos.y != 0) {
                    DataChannelController.editTextButton.style.top = pos.y.toString() + 'px';
		    DataChannelController.editTextButton.style.left = (pos.x - 40).toString() + 'px';
	        }
	    } else {
	        //this.focusAndOpenKeyboard(DataChannelController.hiddenInput);
	        DataChannelController.hiddenInput.focus();
	    }
        } else {
            // Hide the 'edit text' button.
            DataChannelController.editTextButton.classList.add('hiddenState');
            // Hide the on-screen keyboard.
            DataChannelController.hiddenInput.blur();
        }
    }

    /**
     * Send Data over the Data channel to the UE Instance
     * @param data - Message Data Array Buffer
     */
    sendData(data: ArrayBuffer) {
        // reset the afk inactivity
        this.resetAfkWarningTimerOnDataSend();

        if (this.dataChannel && this.dataChannel.readyState == "open") {
            this.dataChannel.send(data);
        } else {
            Logger.Error(Logger.GetStackTrace(), "Message Failed: " + new Uint8Array(data));
        }
    }

    /**
     * Fired when the UE Instance updates who has Quality Ownership
     * @param hasQualityOwnership - Does the client have Quality Ownership
     */
    onQualityControlOwnership(hasQualityOwnership: boolean) { }

    /**
     * Fired when the UE Instance sends freeze frame data
     * @param message - Freeze Frame Data
     */
    processFreezeFrameMessage(message: Uint8Array) { }

    /**
     * Fired when the UE Instance sends a un Freeze Frame
     */
    onUnFreezeFrame() { }

    /**
     * Fired when the UE Instance sends the Video Encoder Avg QP
     * @param AvgQP - Avg QP
     */
    onVideoEncoderAvgQP(AvgQP: number) { }

    /**
     * Fired when the UE Instance sends Latency test Results
     * @param latencyTestResults - Latency Test Results
     */
    onLatencyTestResult(latencyTestResults: LatencyTestResults) { }

    /**
     * Fired when the UE Instance sends Initial Settings
     * @param InitialSettings - Initial Settings
     */
    OnInitialSettings(InitialSettings: InitialSettings) { }

    /**
     * An override method for resetting the Afk warning timer when data is sent over the data channel 
     */
    resetAfkWarningTimerOnDataSend() { }
}

export interface InstanceCommand {
    command: string;
}
