/// <reference types="node" />
import '../assets/css/player.css';
import { EventEmitter } from "events";
import * as libspsfrontend from "backend-dom-components-1";
/**
 * Class for the base overlay structure
 */
export declare class OverlayBase implements libspsfrontend.IOverlay {
    protected rootElement: HTMLDivElement;
    protected rootDiv: HTMLDivElement;
    textElement: HTMLDivElement;
    /**
     * Construct an overlay
     * @param rootDiv the root element this overlay will be inserted into
     * @param rootElement the root element that is the overlay
     */
    protected constructor(rootDiv: HTMLDivElement, rootElement: HTMLDivElement, textElement: HTMLDivElement);
    /**
     * Show the overlay
     */
    show(): void;
    /**
     * Hide the overlay
     */
    hide(): void;
}
/**
 * Class for the base action overlay structure
 */
export declare class ActionOverlayBase extends OverlayBase implements libspsfrontend.IActionOverlay {
    eventEmitter: EventEmitter;
    contentElementSpanId: string;
    /**
     * Construct an action overlay
     * @param rootDiv the root element this overlay will be inserted into
     * @param rootElement the root element that is the overlay
     * @param contentElement an element that contains text for the action overlay
     */
    constructor(rootDiv: HTMLDivElement, rootElement: HTMLDivElement, contentElement: HTMLDivElement, contentElementSpanId?: string);
    /**
     * Update the text overlays inner text
     * @param text the update text to be inserted into the overlay
     */
    update(text: string): void;
    /**
     * Set a method as an event emitter callback
     * @param callBack the method that is to be called when the event is emitted
     */
    onAction(callBack: (...args: any[]) => void): void;
    /**
     * Activate an event that is attached to the event emitter
     */
    activate(): void;
}
/**
 * Class for the afk overlay base
 */
export declare class AfkOverlayBase extends ActionOverlayBase implements libspsfrontend.IAfkOverlay {
    private countDownSpanElementId;
    /**
     * Construct an Afk overlay
     * @param rootDiv the root element this overlay will be inserted into
     * @param rootElement the root element that is the overlay
     * @param textElement an element that contains text for the action overlay
     * @param countDownSpanElementId the id of the span that holds the countdown element
     */
    constructor(rootDiv: HTMLDivElement, rootElement: HTMLDivElement, textElement: HTMLDivElement, countDownSpanElementId: string);
    /**
     * Update the count down spans number for the overlay
     * @param countdown the count down number to be inserted into the span for updating
     */
    updateCountdown(countdown: number): void;
}
/**
 * Class for the text overlay base
 */
export declare class TextOverlayBase extends OverlayBase implements libspsfrontend.ITextOverlay {
    /**
     * Construct a text overlay
     * @param rootDiv the root element this overlay will be inserted into
     * @param rootElement the root element that is the overlay
     * @param textElement an element that contains text for the action overlay
     */
    constructor(rootDiv: HTMLDivElement, rootElement: HTMLDivElement, textElement: HTMLDivElement);
    /**
     * Update the text overlays inner text
     * @param text the update text to be inserted into the overlay
     */
    update(text: string): void;
}
/**
 * Class for the VideoQp indicator
 */
export declare class VideoQpIndicator {
    videoEncoderAvgQP: number;
    qualityStatus: SVGElement;
    qualityText: HTMLSpanElement;
    outer: any;
    middle: any;
    inner: any;
    dot: any;
    statsText: string;
    color: string;
    readonly orangeQP = 26;
    readonly redQP = 35;
    /**
     * construct a VideoQpIndicator object
     * @param qualityStatusId the html id of the qualityStatus element
     * @param qualityTextId the html id of the qualityText element
     * @param outerId the html id of the outer element
     * @param middleId the html id of the middle element
     * @param innerId the html id of the inner element
     * @param dotId the html id of the dot element
     */
    constructor(qualityStatusId: string, qualityTextId: string, outerId: string, middleId: string, innerId: string, dotId: string);
    /**
     * used to set the speed of the status light
     * @param speed - Set the speed of the blink if the status light higher the speed the faster the blink
     */
    blinkVideoQualityStatus(speed: number): void;
    /**
      * updates the QP tooltip by converting the Video Encoder QP to a colour light
      * @param QP - The video encoder QP number needed to find the average
      */
    updateQpTooltip(QP: number): void;
}
/**
 * Class for handling fullscreen logic
 */
export declare class FullScreenLogic {
    isFullscreen: boolean;
    /**
     * Construct a FullScreenLogic object
     */
    constructor();
    /**
     * Makes the document fullscreen
     * @returns
     */
    fullscreen(): void;
    /**
     * Handles the fullscreen button on change
     */
    onFullscreenChange(): void;
}
export declare class NativeDOMDelegate extends libspsfrontend.DelegateBase {
    config: libspsfrontend.Config;
    latencyStartTime: number;
    videoStartTime: number;
    mobileUser: boolean;
    streamReady: boolean;
    levelReady: boolean;
    wasDisconnected: boolean;
    readyListeners: Array<() => void>;
    disconnectHook: Function;
    loadingProgress: number;
    inGame: boolean;
    passwordResponse: object;
    iWebRtcController: libspsfrontend.IWebRtcPlayerController;
    id: string;
    showStats: boolean;
    videoQpIndicator: VideoQpIndicator;
    fullScreenLogic: FullScreenLogic;
    settingsPanel: HTMLDivElement;
    statsPanel: HTMLDivElement;
    forceTurnToggle: HTMLInputElement;
    enlargeDisplayToFillWindow: HTMLInputElement;
    qualityControlOwnershipCheckBox: HTMLInputElement;
    toggleMatchViewPortRes: HTMLInputElement;
    controlSchemeToggle: HTMLInputElement;
    controlSchemeToggleTitle: HTMLDivElement;
    uiDescriptorText: HTMLInputElement;
    encoderMinQpText: HTMLInputElement;
    encoderMaxQpText: HTMLInputElement;
    webRtcFpsText: HTMLInputElement;
    webRtcMinBitrateText: HTMLInputElement;
    webRtcMaxBitrateText: HTMLInputElement;
    sendStatsToServer: HTMLInputElement;
    preStreamContainer: HTMLDivElement;
    viewSettingsHeader: HTMLDivElement;
    commandsHeader: HTMLDivElement;
    streamingSettingsHeader: HTMLDivElement;
    statsHeader: HTMLDivElement;
    latencyHeader: HTMLDivElement;
    viewSettingsContainer: HTMLDivElement;
    commandsContainer: HTMLDivElement;
    streamingSettingsContainer: HTMLDivElement;
    statsContainer: HTMLDivElement;
    latencyContainer: HTMLDivElement;
    appName: string;
    constructor(config: libspsfrontend.Config);
    getLoadingProgress(): number;
    getResponseEventListener(): Map<string, (obj: any) => void>;
    addResponseEventListener(eventKey: string, listener: (obj: any) => void): void;
    removeResponseEventListener(eventKey: string): void;
    getPlayerController(): libspsfrontend.webRtcPlayerController;
    updateVideoStreamSize(x: number, y: number): void;
    write(file: string, message: string): void;
    isInGame(): boolean;
    addReadyListener(listener: () => void): void;
    onStreamReady(rH: () => void): void;
    onDisconnectHook(disconnectHook: (val: boolean) => void): void;
    /**
     * Builds the disconnect overlay
     */
    buildDisconnectOverlay(): void;
    /**
     * Builds the connect overlay
     */
    buildConnectOverlay(): void;
    /**
     * Builds the play overlay
     */
    buildPlayOverlay(): void;
    /**
     * Builds the Afk overlay
     */
    buildAfkOverlay(): void;
    /**
     * Builds the info overlay
     */
    buildInfoOverlay(): void;
    /**
     * Builds the error overlay
     */
    buildErrorOverlay(): void;
    /**
     * Shows a text overlay to alert the user the stream is currently loading
     */
    onStreamLoading(): void;
    zoomIn(): void;
    /**
    * Set up functionality to happen when an instance state change occurs and updates the info overlay with the response
    * @param instanceState - the message instance state
    */
    onInstanceStateChange(instanceState: libspsfrontend.MessageInstanceState): void;
    /**
     * Set up functionality to happen when receiving an auth response and updates an info overlay with the response
     * @param authResponse - the auth response message type
     */
    onAuthenticationResponse(authResponse: libspsfrontend.MessageAuthResponse): void;
    /**
     * Set up button click functions and button functionality
     */
    ConfigureButtons(): void;
    /**
     * Shows or hides the settings panel if clicked
     */
    settingsClicked(): void;
    /**
     * Shows or hides the stats panel if clicked
     */
    statsClicked(): void;
    /**
     * Set up toggle element for controlling hovering mouse or locked mouse
     * @param toggleElement the toggle html element to be set up
     */
    setUpControlSchemeTypeToggle(toggleElement: HTMLInputElement): void;
    /**
     * Set up url toggle buttons
     * @param toggleElement the toggle element being activated
     * @param urlParameterKey the url key that is being made use of
     */
    setUpToggleWithUrlParams(toggleElement: HTMLInputElement, urlParameterKey: string): void;
    /**
     * Disable shared session links for all players
     * @returns false
     */
    IsLinkSharingEnabled(): Promise<boolean>;
    /**
     * Handle when the Video has been Initialised
     */
    onVideoInitialised(): void;
    /**
     * Extended from the base functionality; displays the error overlay and resets the buttons stream tools upon disconnect
     * @param eventText
     */
    onDisconnect(eventText: string): void;
    /**
     * `Takes the InitialSettings and wired to frontend
     * @param settings - Settings sent from the UE Instance`
     */
    onInitialSettings(settings: libspsfrontend.InitialSettings): void;
    /**
    * Used to handle the Video Stats from the Peer Connection Client
    * @param stats - Stats generate from the Peer Connection Client
    */
    onVideoStats(stats: libspsfrontend.AggregatedStats): void;
    /**
    * formats Bytes coming in for video stats
    * @param bytes number to convert
    * @param decimals number of decimal places
    */
    formatBytes(bytes: number, decimals: number): string;
    /**
    * Handles the result of the UE Latency Test
    * @param latencyTimings - Latency Test Timings sent from the UE Instance
    */
    onLatencyTestResult(latencyTimings: libspsfrontend.LatencyTestResults): void;
    /**
     * Handles when the ownership flag is sent from the signaling server
     * @param hasQualityOwnership - flag if the user has quality ownership
     */
    onQualityControlOwnership(hasQualityOwnership: boolean): void;
    /**
      * Calls updateQpTooltip to update the QP colour light
      * @param QP - The video encoder QP number needed to find the average
      */
    onVideoEncoderAvgQP(QP: number): void;
}
/**
 * Declare additions to global html objects that do not exist on the bases
 */
declare global {
    interface Document {
        webkitIsFullScreen?: boolean;
        mozFullScreen?: boolean;
        webkitFullscreenEnabled?: boolean;
        mozCancelFullScreen?: () => Promise<void>;
        msExitFullscreen?: () => Promise<void>;
        webkitExitFullscreen?: () => Promise<void>;
        mozFullScreenElement?: Element;
        msFullscreenElement?: Element;
        webkitFullscreenElement?: Element;
    }
    interface HTMLElement {
        msRequestFullscreen?: () => Promise<void>;
        mozRequestFullscreen?: () => Promise<void>;
        webkitRequestFullscreen?: () => Promise<void>;
    }
}
