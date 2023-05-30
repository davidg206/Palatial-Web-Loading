"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeDOMDelegate = exports.FullScreenLogic = exports.VideoQpIndicator = exports.TextOverlayBase = exports.AfkOverlayBase = exports.ActionOverlayBase = exports.OverlayBase = void 0;
require("./assets/css/player.css");
var events_1 = require("events");
var libspsfrontend = require("backend-dom-components");
/**
 * Class for the base overlay structure
 */
var OverlayBase = /** @class */ (function () {
    /**
     * Construct an overlay
     * @param rootDiv the root element this overlay will be inserted into
     * @param rootElement the root element that is the overlay
     */
    function OverlayBase(rootDiv, rootElement, textElement) {
        this.rootDiv = rootDiv;
        this.rootElement = rootElement;
        this.textElement = textElement;
        this.rootElement.appendChild(this.textElement);
        this.hide();
        this.rootDiv.appendChild(this.rootElement);
    }
    /**
     * Show the overlay
     */
    OverlayBase.prototype.show = function () {
        this.rootElement.classList.remove("hiddenState");
    };
    /**
     * Hide the overlay
     */
    OverlayBase.prototype.hide = function () {
        this.rootElement.classList.add("hiddenState");
    };
    return OverlayBase;
}());
exports.OverlayBase = OverlayBase;
/**
 * Class for the base action overlay structure
 */
var ActionOverlayBase = /** @class */ (function (_super) {
    __extends(ActionOverlayBase, _super);
    /**
     * Construct an action overlay
     * @param rootDiv the root element this overlay will be inserted into
     * @param rootElement the root element that is the overlay
     * @param contentElement an element that contains text for the action overlay
     */
    function ActionOverlayBase(rootDiv, rootElement, contentElement, contentElementSpanId) {
        var _this = _super.call(this, rootDiv, rootElement, contentElement) || this;
        _this.eventEmitter = new events_1.EventEmitter();
        _this.contentElementSpanId = contentElementSpanId;
        return _this;
    }
    /**
     * Update the text overlays inner text
     * @param text the update text to be inserted into the overlay
     */
    ActionOverlayBase.prototype.update = function (text) {
        if ((text != null || text != undefined) && (this.contentElementSpanId != null || this.contentElementSpanId != undefined)) {
            document.getElementById(this.contentElementSpanId).innerHTML = text;
        }
    };
    /**
     * Set a method as an event emitter callback
     * @param callBack the method that is to be called when the event is emitted
     */
    ActionOverlayBase.prototype.onAction = function (callBack) {
        this.eventEmitter.on("action", callBack);
    };
    /**
     * Activate an event that is attached to the event emitter
     */
    ActionOverlayBase.prototype.activate = function () {
        this.eventEmitter.emit("action");
    };
    return ActionOverlayBase;
}(OverlayBase));
exports.ActionOverlayBase = ActionOverlayBase;
/**
 * Class for the afk overlay base
 */
var AfkOverlayBase = /** @class */ (function (_super) {
    __extends(AfkOverlayBase, _super);
    /**
     * Construct an Afk overlay
     * @param rootDiv the root element this overlay will be inserted into
     * @param rootElement the root element that is the overlay
     * @param textElement an element that contains text for the action overlay
     * @param countDownSpanElementId the id of the span that holds the countdown element
     */
    function AfkOverlayBase(rootDiv, rootElement, textElement, countDownSpanElementId) {
        var _this = _super.call(this, rootDiv, rootElement, textElement) || this;
        _this.countDownSpanElementId = countDownSpanElementId;
        return _this;
    }
    /**
     * Update the count down spans number for the overlay
     * @param countdown the count down number to be inserted into the span for updating
     */
    AfkOverlayBase.prototype.updateCountdown = function (countdown) {
        document.getElementById(this.countDownSpanElementId).innerHTML = countdown.toString();
    };
    return AfkOverlayBase;
}(ActionOverlayBase));
exports.AfkOverlayBase = AfkOverlayBase;
/**
 * Class for the text overlay base
 */
var TextOverlayBase = /** @class */ (function (_super) {
    __extends(TextOverlayBase, _super);
    /**
     * Construct a text overlay
     * @param rootDiv the root element this overlay will be inserted into
     * @param rootElement the root element that is the overlay
     * @param textElement an element that contains text for the action overlay
     */
    function TextOverlayBase(rootDiv, rootElement, textElement) {
        return _super.call(this, rootDiv, rootElement, textElement) || this;
    }
    /**
     * Update the text overlays inner text
     * @param text the update text to be inserted into the overlay
     */
    TextOverlayBase.prototype.update = function (text) {
        if (text != null || text != undefined) {
            this.textElement.innerHTML = text;
        }
    };
    return TextOverlayBase;
}(OverlayBase));
exports.TextOverlayBase = TextOverlayBase;
/**
 * Class for the VideoQp indicator
 */
var VideoQpIndicator = /** @class */ (function () {
    /**
     * construct a VideoQpIndicator object
     * @param qualityStatusId the html id of the qualityStatus element
     * @param qualityTextId the html id of the qualityText element
     * @param outerId the html id of the outer element
     * @param middleId the html id of the middle element
     * @param innerId the html id of the inner element
     * @param dotId the html id of the dot element
     */
    function VideoQpIndicator(qualityStatusId, qualityTextId, outerId, middleId, innerId, dotId) {
        this.videoEncoderAvgQP = -1;
        // non html elements 
        this.statsText = "";
        this.color = "";
        // qp colours 
        this.orangeQP = 26;
        this.redQP = 35;
        this.qualityStatus = document.getElementById(qualityStatusId);
        this.qualityText = document.getElementById(qualityTextId);
        this.outer = document.getElementById(outerId);
        this.middle = document.getElementById(middleId);
        this.inner = document.getElementById(innerId);
        this.dot = document.getElementById(dotId);
    }
    /**
     * used to set the speed of the status light
     * @param speed - Set the speed of the blink if the status light higher the speed the faster the blink
     */
    VideoQpIndicator.prototype.blinkVideoQualityStatus = function (speed) {
        var _this = this;
        var iteration = speed;
        var opacity = 1;
        var tickID = setInterval(function () {
            opacity -= 0.1;
            _this.qualityText.style.opacity = String(Math.abs((opacity - 0.5) * 2));
            if (opacity <= 0.1) {
                if (--iteration == 0) {
                    clearInterval(tickID);
                }
                else {
                    opacity = 1;
                }
            }
        }, 100 / speed);
    };
    /**
      * updates the QP tooltip by converting the Video Encoder QP to a colour light
      * @param QP - The video encoder QP number needed to find the average
      */
    VideoQpIndicator.prototype.updateQpTooltip = function (QP) {
        this.videoEncoderAvgQP = QP;
        if (QP > this.redQP) {
            this.color = "red";
            this.blinkVideoQualityStatus(2);
            this.statsText = "<div style=\"color: ".concat(this.color, "\">Poor encoding quality</div>");
            this.outer.style.fill = "#3c3b40";
            this.middle.style.fill = "#3c3b40";
            this.inner.style.fill = this.color;
            this.dot.style.fill = this.color;
        }
        else if (QP > this.orangeQP) {
            this.color = "orange";
            this.blinkVideoQualityStatus(1);
            this.statsText = "<div style=\"color: ".concat(this.color, "\">Blocky encoding quality</div>");
            this.outer.style.fill = "#3c3b40";
            this.middle.style.fill = this.color;
            this.inner.style.fill = this.color;
            this.dot.style.fill = this.color;
        }
        else if (QP <= 0) {
            this.color = "#b0b0b0";
            this.outer.style.fill = "#3c3b40";
            this.middle.style.fill = "#3c3b40";
            this.inner.style.fill = "#3c3b40";
            this.dot.style.fill = "#3c3b40";
            this.statsText = "<div style=\"color: ".concat(this.color, "\">Not connected</div>");
        }
        else {
            this.color = "lime";
            this.qualityStatus.style.opacity = '1';
            this.statsText = "<div style=\"color: ".concat(this.color, "\">Clear encoding quality</div>");
            this.outer.style.fill = this.color;
            this.middle.style.fill = this.color;
            this.inner.style.fill = this.color;
            this.dot.style.fill = this.color;
        }
        this.qualityText.innerHTML = this.statsText;
    };
    return VideoQpIndicator;
}());
exports.VideoQpIndicator = VideoQpIndicator;
/**
 * Class for handling fullscreen logic
 */
var FullScreenLogic = /** @class */ (function () {
    /**
     * Construct a FullScreenLogic object
     */
    function FullScreenLogic() {
        var _this = this;
        this.isFullscreen = false;
        document.getElementById("fullscreen-btn").onclick = function () { return _this.fullscreen(); };
        // set up the full screen events
        document.addEventListener('webkitfullscreenchange', function () { return _this.onFullscreenChange(); }, false);
        document.addEventListener('mozfullscreenchange', function () { return _this.onFullscreenChange(); }, false);
        document.addEventListener('fullscreenchange', function () { return _this.onFullscreenChange(); }, false);
        document.addEventListener('MSFullscreenChange', function () { return _this.onFullscreenChange(); }, false);
    }
    /**
     * Makes the document fullscreen
     * @returns
     */
    FullScreenLogic.prototype.fullscreen = function () {
        // if already full screen; exit
        // else go fullscreen
        if (document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
            else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
        else {
            var element = void 0;
            //HTML elements controls
            if (!(document.fullscreenEnabled || document.webkitFullscreenEnabled)) {
                element = document.getElementById("streamingVideo");
            }
            else {
                element = document.getElementById("playerUI");
            }
            if (!element) {
                return;
            }
            if (element.requestFullscreen) {
                element.requestFullscreen();
            }
            else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            }
            else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
            else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
            else if (element.webkitEnterFullscreen) {
                element.webkitEnterFullscreen(); //for iphone this code worked
            }
        }
        this.onFullscreenChange();
    };
    /**
     * Handles the fullscreen button on change
     */
    FullScreenLogic.prototype.onFullscreenChange = function () {
        this.isFullscreen = (document.webkitIsFullScreen
            || document.mozFullScreen
            || (document.msFullscreenElement && document.msFullscreenElement !== null)
            || (document.fullscreenElement && document.fullscreenElement !== null));
        var minimize = document.getElementById('minimizeIcon');
        var maximize = document.getElementById('maximizeIcon');
        if (minimize && maximize) {
            if (this.isFullscreen) {
                minimize.style.display = 'inline';
                //ios disappearing svg fix
                minimize.style.transform = 'translate(0, 0)';
                maximize.style.display = 'none';
            }
            else {
                minimize.style.display = 'none';
                maximize.style.display = 'inline';
                //ios disappearing svg fix
                maximize.style.transform = 'translate(0, 0)';
            }
        }
    };
    return FullScreenLogic;
}());
exports.FullScreenLogic = FullScreenLogic;
var NativeDOMDelegate = /** @class */ (function (_super) {
    __extends(NativeDOMDelegate, _super);
    function NativeDOMDelegate(config) {
        var _this = _super.call(this, config) || this;
        // settings and stats panels
        _this.settingsPanel = document.getElementById('settings-panel');
        _this.statsPanel = document.getElementById('stats-panel');
        // Pre Stream options
        _this.forceTurnToggle = document.getElementById("force-turn-tgl");
        // Viewing
        _this.enlargeDisplayToFillWindow = document.getElementById("enlarge-display-to-fill-window-tgl");
        _this.qualityControlOwnershipCheckBox = document.getElementById("quality-control-ownership-tgl");
        _this.toggleMatchViewPortRes = document.getElementById("match-viewport-res-tgl");
        _this.controlSchemeToggle = document.getElementById("control-scheme-tgl");
        _this.controlSchemeToggleTitle = document.getElementById("control-scheme-title");
        // Commands
        _this.uiDescriptorText = document.getElementById("ui-descriptor-text");
        // Settings
        _this.encoderMinQpText = document.getElementById("encoder-min-qp-text");
        _this.encoderMaxQpText = document.getElementById("encoder-max-qp-text");
        _this.webRtcFpsText = document.getElementById("webrtc-fps-text");
        _this.webRtcMinBitrateText = document.getElementById("webrtc-min-bitrate-text");
        _this.webRtcMaxBitrateText = document.getElementById("webrtc-max-bitrate-text");
        // Statistics
        _this.sendStatsToServer = document.getElementById("send-stats-tgl");
        // Containers Headers
        _this.preStreamContainer = document.getElementById("preStreamOptionsHeader");
        _this.viewSettingsHeader = document.getElementById("viewSettingsHeader");
        _this.commandsHeader = document.getElementById("commandsHeader");
        _this.streamingSettingsHeader = document.getElementById("streamingSettingsHeader");
        _this.statsHeader = document.getElementById("statisticsHeader");
        _this.latencyHeader = document.getElementById("latencyTestHeader");
        // Containers
        _this.viewSettingsContainer = document.getElementById("viewSettingsContainer");
        _this.commandsContainer = document.getElementById("commandsContainer");
        _this.streamingSettingsContainer = document.getElementById("streamingSettingsContainer");
        _this.statsContainer = document.getElementById("statisticsContainer");
        _this.latencyContainer = document.getElementById("latencyTestContainer");
        _this.showStats = true;
        _this.videoQpIndicator = new VideoQpIndicator("connectionStrength", "qualityText", "outer", "middle", "inner", "dot");
        _this.fullScreenLogic = new FullScreenLogic();
        _this.streamReady = false;
        // build all of the overlays 
        _this.buildDisconnectOverlay();
        _this.buildConnectOverlay();
        _this.buildPlayOverlay();
        _this.buildAfkOverlay();
        _this.buildInfoOverlay();
        _this.buildErrorOverlay();
        _this.startNoteTimeout();
        // configure all buttons 
        _this.ConfigureButtons();
        return _this;
    }
    NativeDOMDelegate.prototype.startNoteTimeout = function () {
        setTimeout(function () {
            var noteText = document.querySelector('.loadingNote');
            noteText.style.opacity = '1';
            if (document.getElementById('bubble').innerHTML == "Loading")
                noteText.innerHTML = 'Please refresh if the experience does not load after 30 seconds.';
        }, 17000);
        /*setTimeout(() => {
    console.log('this.streamReady = ' + this.streamReady);
                if (!this.streamReady) {
        console.log('redirecting');
        (<libspsfrontend.webRtcPlayerController>this.iWebRtcController).webSocketController.close();
        (<libspsfrontend.webRtcPlayerController>this.iWebRtcController).webSocketController.address = "wss://216.153.60.65/ws";
        (<libspsfrontend.webRtcPlayerController>this.iWebRtcController).webSocketController.connect();
    }
        }, 2000);*/
    };
    NativeDOMDelegate.prototype.updateVideoStreamSize = function (x, y) {
        this.iWebRtcController.ueDescriptorUi.sendUpdateVideoStreamSize(x, y);
    };
    NativeDOMDelegate.prototype.write = function (file, message) {
        var data = {
            filename: file,
            data: message
        };
        fetch('https://prophet.palatialxr.com:3001/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(function (response) {
            console.log("statusCode: ".concat(response.status));
            return response.json();
        })
            .then(function (data) {
            console.log(data);
        })
            .catch(function (error) {
            console.error(error);
        });
    };
    /**
     * Builds the disconnect overlay
     */
    NativeDOMDelegate.prototype.buildDisconnectOverlay = function () {
        var _this = this;
        // build the overlay base div 
        var disconnectOverlayHtml = document.createElement('div');
        disconnectOverlayHtml.id = "disconnectOverlay";
        disconnectOverlayHtml.className = "clickableState";
        // set the event Listener
        var disconnectOverlayEvent = function () { return _this.onDisconnectionAction(); };
        var self = this;
        // add the new event listener 
        disconnectOverlayHtml.addEventListener('click', function onOverlayClick(event) {
            var container = document.querySelector('.textContainer');
            var video = document.getElementById('streamingVideo');
            var playerUI = document.getElementById('playerUI');
            disconnectOverlayEvent(event);
            playerUI.style.pointerEvents = 'auto';
            container.style.display = 'flex';
            container.style.opacity = '1';
            video.style.display = 'none';
            video.style.opacity = '0';
            video.style.pointerEvents = 'auto';
            self.startNoteTimeout();
            document.body.classList.remove('clickableState');
            //whuzz
        });
        // build the inner html container 
        var disconnectOverlayHtmlInnerContainer = document.createElement('div');
        disconnectOverlayHtmlInnerContainer.id = 'disconnectButton';
        // build the span that holds error text
        var disconnectOverlayInnerSpan = document.createElement('span');
        disconnectOverlayInnerSpan.id = 'disconnectText';
        disconnectOverlayInnerSpan.innerHTML = 'Click To Restart';
        // build the image element that holds the reconnect element
        var restartSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        restartSvg.setAttribute('width', "40");
        restartSvg.setAttribute('height', "40");
        restartSvg.setAttribute('fill', "currentColor");
        restartSvg.setAttribute('class', "bi bi-arrow-counterclockwise m-2");
        restartSvg.setAttribute('viewBox', "0 0 16 16");
        // build the arrow path 
        var restartSvgPathArrow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        restartSvgPathArrow.setAttribute('fill-rule', "evenodd");
        restartSvgPathArrow.setAttribute('d', "M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z");
        // build the circle path
        var restartSvgPathCircle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        restartSvgPathCircle.setAttribute('d', "M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z");
        // bring it all together
        restartSvg.appendChild(restartSvgPathArrow);
        restartSvg.appendChild(restartSvgPathCircle);
        // append the span and images to the content container 
        disconnectOverlayHtmlInnerContainer.appendChild(disconnectOverlayInnerSpan);
        disconnectOverlayHtmlInnerContainer.appendChild(restartSvg);
        // instantiate the overlay
        this.disconnectOverlay = new ActionOverlayBase(this.config.playerElement, disconnectOverlayHtml, disconnectOverlayHtmlInnerContainer, "disconnectText");
    };
    /**
     * Builds the connect overlay
     */
    NativeDOMDelegate.prototype.buildConnectOverlay = function () {
        var _this = this;
        // build the overlay base div 
        var connectOverlayHtml = document.createElement('div');
        connectOverlayHtml.id = "connectOverlay";
        connectOverlayHtml.className = "clickableState";
        // set the event Listener
        var connectOverlayEvent = function () { return _this.onConnectAction(); };
        // add the new event listener 
        connectOverlayHtml.addEventListener('click', function onOverlayClick(event) {
            connectOverlayEvent(event);
        });
        // build the inner html 
        var connectOverlayHtmlInner = document.createElement('div');
        connectOverlayHtmlInner.id = 'connectButton';
        connectOverlayHtmlInner.innerHTML = 'Click to start';
        // instantiate the overlay
        this.connectOverlay = new ActionOverlayBase(this.config.playerElement, connectOverlayHtml, connectOverlayHtmlInner);
    };
    /**
     * Builds the play overlay
     */
    NativeDOMDelegate.prototype.buildPlayOverlay = function () {
        var _this = this;
        // build the overlay base div 
        var playOverlayHtml = document.createElement('div');
        //playOverlayHtml.id = "startText";
        //playOverlayHtml.classList.add("clickableState", "loadingText");
        // set the event Listener
        var playOverlayEvent = function () { return _this.onPlayAction(); };
        // add the new event listener
        /*playOverlayHtml.addEventListener('click', function onOverlayClick(event: Event) {
                playOverlayEvent(event);
                document.getElementById('container').style.display = 'none';
                document.body.style.cursor = 'none';
                openFullscreen();
        });*/
        // build the inner html 
        var playOverlayHtmlInner = document.createElement('div');
        //playOverlayHtmlInner.className = "disconnectText";
        //playOverlayHtmlInner.innerHTML = "Click to start";
        // instantiate the overlay
        this.playOverlay = new ActionOverlayBase(this.config.playerElement, playOverlayHtml, playOverlayHtmlInner);
    };
    /**
     * Builds the Afk overlay
     */
    NativeDOMDelegate.prototype.buildAfkOverlay = function () {
        var _this = this;
        // build the overlay base div 
        var afkOverlayHtml = document.createElement('div');
        afkOverlayHtml.id = "afkOverlay";
        afkOverlayHtml.className = "clickableState";
        var afkOverlayEvent = function () { return _this.onAfkAction(); };
        afkOverlayHtml.addEventListener('click', function onOverlayClick(event) {
            afkOverlayEvent(event);
        });
        // build the inner html
        var afkOverlayHtmlInner = document.createElement('div');
        afkOverlayHtmlInner.id = 'afkOverlayInner';
        afkOverlayHtmlInner.innerHTML = '<center>No activity detected<br>Disconnecting in <span id="afkCountDownNumber"></span> seconds<br>Click to continue<br></center>';
        // instantiate the overlay
        this.afkOverlay = new AfkOverlayBase(this.config.playerElement, afkOverlayHtml, afkOverlayHtmlInner, "afkCountDownNumber");
    };
    /**
     * Builds the info overlay
     */
    NativeDOMDelegate.prototype.buildInfoOverlay = function () {
        // build the overlay base div 
        var infoOverlayHtml = document.createElement('div');
        infoOverlayHtml.id = "infoOverlay";
        infoOverlayHtml.className = "textDisplayState";
        // build the inner html
        var infoOverlayHtmlInner = document.createElement('div');
        infoOverlayHtmlInner.id = 'messageOverlayInner';
        // instantiate the overlay
        this.infoOverlay = new TextOverlayBase(this.config.playerElement, infoOverlayHtml, infoOverlayHtmlInner);
    };
    /**
     * Builds the error overlay
     */
    NativeDOMDelegate.prototype.buildErrorOverlay = function () {
        // build the overlay base div 
        var errorOverlayHtml = document.createElement('div');
        errorOverlayHtml.id = "errorOverlay";
        errorOverlayHtml.className = "textDisplayState";
        // build the inner html
        var errorOverlayHtmlInner = document.createElement('div');
        errorOverlayHtmlInner.id = 'errorOverlayInner';
        errorOverlayHtmlInner.classList.add(".text-danger");
        // instantiate the overlay
        this.errorOverlay = new TextOverlayBase(this.config.playerElement, errorOverlayHtml, errorOverlayHtmlInner);
    };
    /**
     * Shows a text overlay to alert the user the stream is currently loading
     */
    NativeDOMDelegate.prototype.onStreamLoading = function () {
        // build the spinner span
        var spinnerSpan = document.createElement('span');
        spinnerSpan.className = "visually-hidden";
        spinnerSpan.innerHTML = "Loading";
        // build the spinner div
        var spinnerDiv = document.createElement('div');
        spinnerDiv.id = "loading-spinner";
        spinnerDiv.className = "spinner-border ms-2";
        spinnerDiv.setAttribute("role", "status");
        // append the spinner to the element
        spinnerDiv.appendChild(spinnerSpan);
        this.showTextOverlay("Loading Stream " + spinnerDiv.outerHTML);
    };
    NativeDOMDelegate.prototype.zoomIn = function () {
        var scaleFactor = 1.2;
        var currentScale = parseFloat(document.body.style.transform.replace('scale(', '').replace(')', ''));
        var newScale = currentScale ? currentScale * scaleFactor : scaleFactor;
        document.body.style.transform = "scale(".concat(newScale, ")");
    };
    /**
    * Set up functionality to happen when an instance state change occurs and updates the info overlay with the response
    * @param instanceState - the message instance state
    */
    NativeDOMDelegate.prototype.onInstanceStateChange = function (instanceState) {
        var _this = this;
        var instanceStateMessage = "";
        var isInstancePending = false;
        var isError = false;
        // get the response type
        switch (instanceState.state) {
            case libspsfrontend.InstanceState.UNALLOCATED:
                instanceStateMessage = "Instance Unallocated: " + instanceState.details;
                break;
            case libspsfrontend.InstanceState.FAILED:
                instanceStateMessage = "UE Instance Failed: " + instanceState.details;
                isError = true;
                break;
            case libspsfrontend.InstanceState.PENDING:
                isInstancePending = true;
                if (instanceState.details == undefined || instanceState.details == null) {
                    instanceStateMessage = "Your application is pending";
                }
                else {
                    instanceStateMessage = instanceState.details;
                }
                break;
            case libspsfrontend.InstanceState.READY:
                if (instanceState.details == undefined || instanceState.details == null) {
                    instanceStateMessage = "Instance is Ready";
                }
                else {
                    instanceStateMessage = "Instance is Ready: " + instanceState.details;
                }
                break;
            default:
                instanceStateMessage = "Unhandled Instance State" + instanceState.state + " " + instanceState.details;
                break;
        }
        if (isError) {
            this.showErrorOverlay(instanceStateMessage);
        }
        else if (isInstancePending) {
            //check if there is already and instance pending if so return 
            var preExistingPendingMessage = document.getElementById('loading-spinner');
            if (preExistingPendingMessage) {
                // only update our text div
                var textDiv = document.getElementById("text-" + instanceState.id);
                textDiv.innerHTML = instanceStateMessage;
                return;
            }
            // build a wrapper to hold our text and our spinner
            var wrapperDiv = document.createElement('div');
            // build a text div to hold our text message
            var textSpan = document.createElement('span');
            textSpan.id = "text-" + instanceState.id;
            textSpan.innerHTML = instanceStateMessage;
            // build the spinner span
            var spinnerSpan = document.createElement('span');
            spinnerSpan.className = "visually-hidden";
            spinnerSpan.innerHTML = "Loading...";
            // build the spinner div
            var spinnerDiv = document.createElement('div');
            spinnerDiv.id = "loading-spinner";
            spinnerDiv.className = "spinner-border ms-2";
            spinnerDiv.setAttribute("role", "status");
            // append wrapper and the spinner to the element
            wrapperDiv.appendChild(textSpan);
            wrapperDiv.appendChild(spinnerDiv).appendChild(spinnerSpan);
            // insert the inner html into the base div
            this.showTextOverlay(wrapperDiv.outerHTML);
        }
        else {
            var container_1 = document.querySelector('.textContainer');
            var bubbleText_1 = document.querySelector('.loadingText');
            var noteText_1 = document.querySelector('.loadingNote');
            var bubble = document.getElementById('bubble');
            bubbleText_1.innerHTML = "Press to Enter";
            noteText_1.innerHTML = '';
            //%
            // set the event Listener
            var playOverlayEvent_1 = function () { return _this.onPlayAction(); };
            var fadeOutLoader_1 = function (event) {
                event.stopPropagation();
                playOverlayEvent_1(event);
                if (_this.config.isMobile) {
                    //if (document.fullscreenElement == null) this.fullScreenLogic.fullscreen();
                    //setTimeout(function() { screen.orientation.lock("landscape-primary"); }, 1000);
                }
                // enable dynamic resolution
                _this.iWebRtcController.matchViewportResolution = true;
                _this.iWebRtcController.updateVideoStreamSize();
                document.body.classList.remove('clickableState');
                libspsfrontend.DataChannelController.coordinateConverter.setupNormalizeAndQuantize();
                container_1.addEventListener('transitionend', function () {
                    container_1.style.display = 'none';
                    container_1.style.opacity = '0';
                    bubbleText_1.innerHTML = "Loading";
                    noteText_1.style.opacity = '0';
                    var video = document.getElementById('streamingVideo');
                    video.style.display = 'flex';
                    video.style.opacity = "1";
                    video.style.pointerEvents = 'auto';
                    document.getElementById('playerUI').style.pointerEvents = "auto";
                });
                if (_this.appName == "prophet" && _this.config.isMobile) {
                    var filename_1 = '/mnt/pvc/orientation.txt';
                    var currentOrientation_1 = window.orientation;
                    console.log(currentOrientation_1);
                    _this.write(filename_1, (currentOrientation_1 === 90 || currentOrientation_1 === -90) ? "landscape" : "portrait");
                    window.addEventListener("orientationchange", function () {
                        var newOrientation = window.orientation;
                        console.log(newOrientation);
                        if (newOrientation !== currentOrientation_1) {
                            console.log("Orientation has changed: " + newOrientation);
                            currentOrientation_1 = newOrientation;
                            var orientationString = (newOrientation === 90 || newOrientation === -90) ? "landscape" : "portrait";
                            _this.write(filename_1, orientationString);
                            console.log("Orientation saved to file: ".concat(orientationString));
                        }
                    });
                }
                container_1.style.opacity = '0';
                document.body.removeEventListener('click', fadeOutLoader_1);
            };
            document.body.classList.add('clickableState');
            document.body.onclick = fadeOutLoader_1;
        }
        function openFullscreen() {
            var body = document.documentElement;
            if (body.requestFullscreen) {
                body.requestFullscreen();
            }
            else if (body.webkitRequestFullscreen) { /* Safari */
                body.webkitRequestFullscreen();
            }
            else if (body.msRequestFullscreen) { /* IE11 */
                body.msRequestFullscreen();
            }
        }
    };
    /**
     * Set up functionality to happen when receiving an auth response and updates an info overlay with the response
     * @param authResponse - the auth response message type
     */
    NativeDOMDelegate.prototype.onAuthenticationResponse = function (authResponse) {
        var instanceStateMessage = "";
        var isError = false;
        // get the response type
        switch (authResponse.outcome) {
            case libspsfrontend.MessageAuthResponseOutcomeType.AUTHENTICATED:
                instanceStateMessage = "Authentication has succeeded. Requesting Instance";
                break;
            case libspsfrontend.MessageAuthResponseOutcomeType.INVALID_TOKEN:
                instanceStateMessage = "Invalid Token: " + authResponse.error;
                isError = true;
                break;
            case libspsfrontend.MessageAuthResponseOutcomeType.REDIRECT:
                instanceStateMessage = "Redirecting to: " + authResponse.redirect;
                break;
            case libspsfrontend.MessageAuthResponseOutcomeType.ERROR:
                instanceStateMessage = "Error: " + authResponse.error;
                isError = true;
                break;
            default:
                instanceStateMessage = "Unhandled Auth Response: " + authResponse.outcome;
                break;
        }
        // if the response is an error show the error instead of the info 
        if (isError) {
            this.showErrorOverlay(instanceStateMessage);
        }
        else {
            this.showTextOverlay(instanceStateMessage);
        }
    };
    /**
     * Set up button click functions and button functionality
     */
    NativeDOMDelegate.prototype.ConfigureButtons = function () {
        var _this = this;
        // set up the settings 
        document.getElementById('settingsBtn').onclick = function () { return _this.settingsClicked(); };
        document.getElementById('settingsClose').onclick = function () { return _this.settingsClicked(); };
        // setup the info button
        document.getElementById('statsBtn').onclick = function () { return _this.statsClicked(); };
        document.getElementById('statsClose').onclick = function () { return _this.statsClicked(); };
        // setup the Force TURN toggle
        this.setUpToggleWithUrlParams(this.forceTurnToggle, "ForceTURN");
        this.setUpControlSchemeTypeToggle(this.controlSchemeToggle);
        // set up the restart stream button
        document.getElementById("restart-stream-button").onclick = function () {
            _this.settingsPanel.classList.toggle("panel-wrap-visible");
            _this.iWebRtcController.restartStreamAutomaticity();
        };
        document.getElementById("btn-streaming-settings").onclick = function () {
            libspsfrontend.Logger.Log(libspsfrontend.Logger.GetStackTrace(), "--------  Sending Streaming settings  --------", 7);
            var encode = {
                MinQP: Number(_this.encoderMinQpText.value),
                MaxQP: Number(_this.encoderMaxQpText.value),
            };
            var webRtcSettings = {
                FPS: Number(_this.webRtcFpsText.value),
                MinBitrate: Number(_this.webRtcMinBitrateText.value) * 1000,
                MaxBitrate: Number(_this.webRtcMaxBitrateText.value) * 1000,
            };
            _this.iWebRtcController.sendEncoderSettings(encode);
            _this.iWebRtcController.sendWebRtcSettings(webRtcSettings);
            libspsfrontend.Logger.Log(libspsfrontend.Logger.GetStackTrace(), "-------------------------------------------", 7);
        };
        // sending UI descriptors 
        document.getElementById("sendUiDescriptor").onclick = function () {
            _this.iWebRtcController.sendUeUiDescriptor(_this.uiDescriptorText.value);
        };
        // show the current fps on screen 
        document.getElementById("show-fps-button").onclick = function () {
            _this.iWebRtcController.sendShowFps();
        };
        // make the player fill the window
        this.enlargeDisplayToFillWindow.onchange = function () {
            _this.iWebRtcController.resizePlayerStyle();
            _this.iWebRtcController.setEnlargeToFillDisplay(_this.enlargeDisplayToFillWindow.checked);
        };
        // make the player match the view port resolution 
        this.toggleMatchViewPortRes.onchange = function () {
            _this.iWebRtcController.matchViewportResolution = _this.toggleMatchViewPortRes.checked;
            _this.iWebRtcController.updateVideoStreamSize();
        };
        // quality control ownership checkbox 
        this.qualityControlOwnershipCheckBox.onchange = function () {
            if (_this.qualityControlOwnershipCheckBox.checked === false) {
                _this.iWebRtcController.sendRequestQualityControlOwnership();
            }
        };
    };
    /**
     * Shows or hides the settings panel if clicked
     */
    NativeDOMDelegate.prototype.settingsClicked = function () {
        /**
         * Toggle settings panel. If stats panel is already open, close it and then open settings
         */
        if (this.statsPanel.classList.contains("panel-wrap-visible")) {
            this.statsPanel.classList.toggle("panel-wrap-visible");
        }
        this.settingsPanel.classList.toggle("panel-wrap-visible");
    };
    /**
     * Shows or hides the stats panel if clicked
     */
    NativeDOMDelegate.prototype.statsClicked = function () {
        /**
         * Toggle stats panel. If settings panel is already open, close it and then open stats
         */
        if (this.settingsPanel.classList.contains("panel-wrap-visible")) {
            this.settingsPanel.classList.toggle("panel-wrap-visible");
        }
        this.statsPanel.classList.toggle("panel-wrap-visible");
    };
    /**
     * Set up toggle element for controlling hovering mouse or locked mouse
     * @param toggleElement the toggle html element to be set up
     */
    NativeDOMDelegate.prototype.setUpControlSchemeTypeToggle = function (toggleElement) {
        var _this = this;
        if (toggleElement) {
            // set the state for the toggle based on the config
            if (this.config.controlScheme === libspsfrontend.ControlSchemeType.LockedMouse) {
                this.controlSchemeToggleTitle.innerHTML = "Control Scheme: Locked Mouse";
                this.controlSchemeToggle.checked = false;
            }
            else {
                this.controlSchemeToggleTitle.innerHTML = "Control Scheme: Hovering Mouse";
                this.controlSchemeToggle.checked = true;
            }
            // set the onChange event 
            toggleElement.onchange = function () {
                if (toggleElement.checked === true) {
                    _this.controlSchemeToggleTitle.innerHTML = "Control Scheme: Hovering Mouse";
                    _this.config.controlScheme = libspsfrontend.ControlSchemeType.HoveringMouse;
                    _this.iWebRtcController.activateRegisterMouse();
                }
                else {
                    _this.controlSchemeToggleTitle.innerHTML = "Control Scheme: Locked Mouse";
                    _this.config.controlScheme = libspsfrontend.ControlSchemeType.LockedMouse;
                    _this.iWebRtcController.activateRegisterMouse();
                }
            };
        }
    };
    /**
     * Set up url toggle buttons
     * @param toggleElement the toggle element being activated
     * @param urlParameterKey the url key that is being made use of
     */
    NativeDOMDelegate.prototype.setUpToggleWithUrlParams = function (toggleElement, urlParameterKey) {
        if (toggleElement) {
            //Check if the element has been set from the URL Params 
            toggleElement.checked = new URLSearchParams(window.location.search).has(urlParameterKey);
            toggleElement.onchange = function () {
                var urlParams = new URLSearchParams(window.location.search);
                if (toggleElement.checked === true) {
                    urlParams.set(urlParameterKey, "true");
                }
                else {
                    urlParams.delete(urlParameterKey);
                }
                window.history.replaceState({}, '', urlParams.toString() !== "" ? "".concat(location.pathname, "?").concat(urlParams) : "".concat(location.pathname));
            };
        }
    };
    /**
     * Disable shared session links for all players
     * @returns false
     */
    NativeDOMDelegate.prototype.IsLinkSharingEnabled = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, false];
            });
        });
    };
    /**
     * Handle when the Video has been Initialised
     */
    NativeDOMDelegate.prototype.onVideoInitialised = function () {
        var _this = this;
        console.log('ready!');
        this.streamReady = true;
        // starting a latency check
        document.getElementById("btn-start-latency-test").onclick = function () {
            _this.iWebRtcController.sendLatencyTest();
        };
        // Set up stream tools header functionality
        this.viewSettingsHeader.onclick = function () {
            _this.viewSettingsContainer.classList.contains("d-none") ? _this.viewSettingsContainer.classList.remove("d-none") : _this.viewSettingsContainer.classList.add("d-none");
        };
        this.commandsHeader.onclick = function () {
            _this.commandsContainer.classList.contains("d-none") ? _this.commandsContainer.classList.remove("d-none") : _this.commandsContainer.classList.add("d-none");
        };
        this.streamingSettingsHeader.onclick = function () {
            _this.streamingSettingsContainer.classList.contains("d-none") ? _this.streamingSettingsContainer.classList.remove("d-none") : _this.streamingSettingsContainer.classList.add("d-none");
        };
        this.statsHeader.onclick = function () {
            _this.statsContainer.classList.contains("d-none") ? _this.statsContainer.classList.remove("d-none") : _this.statsContainer.classList.add("d-none");
        };
        this.latencyHeader.onclick = function () {
            _this.latencyContainer.classList.contains("d-none") ? _this.latencyContainer.classList.remove("d-none") : _this.latencyContainer.classList.add("d-none");
        };
        // Reveal all the container
        this.viewSettingsContainer.classList.remove("d-none");
        this.commandsContainer.classList.remove("d-none");
        this.streamingSettingsContainer.classList.remove("d-none");
        this.statsContainer.classList.remove("d-none");
        this.videoStartTime = Date.now();
    };
    /**
     * Extended from the base functionality; displays the error overlay and resets the buttons stream tools upon disconnect
     * @param eventText
     */
    NativeDOMDelegate.prototype.onDisconnect = function (eventText) {
        // display the text overlay by calling its super method so it will use its default behavior first 
        _super.prototype.onDisconnect.call(this, "".concat(eventText));
        // update all of the tools upon disconnect 
        this.onVideoEncoderAvgQP(0);
        // starting a latency check
        document.getElementById("btn-start-latency-test").onclick = function () { };
        // Set up stream tools header functionality
        this.viewSettingsHeader.onclick = function () { };
        this.commandsHeader.onclick = function () { };
        this.streamingSettingsHeader.onclick = function () { };
        this.statsHeader.onclick = function () { };
        this.latencyHeader.onclick = function () { };
        // Hide all the containers
        this.viewSettingsContainer.classList.add("d-none");
        this.commandsContainer.classList.add("d-none");
        this.streamingSettingsContainer.classList.add("d-none");
        this.statsContainer.classList.add("d-none");
        var video = document.getElementById('streamingVideo');
        var bubble = document.getElementById('bubble');
        video.style.display = 'none';
        video.style.opacity = '0';
        bubble.style.display = 'none';
        bubble.style.pointerEvents = 'none';
        document.querySelector('.loadingText').innerHTML = "Loading";
        document.body.onclick = null;
    };
    /**
     * `Takes the InitialSettings and wired to frontend
     * @param settings - Settings sent from the UE Instance`
     */
    NativeDOMDelegate.prototype.onInitialSettings = function (settings) {
        if (settings.Encoder) {
            this.encoderMinQpText.value = settings.Encoder.MinQP.toString();
            this.encoderMaxQpText.value = settings.Encoder.MaxQP.toString();
        }
        if (settings.WebRTC) {
            this.webRtcMinBitrateText.value = settings.WebRTC.MinBitrate.toString();
            this.webRtcMaxBitrateText.value = settings.WebRTC.MaxBitrate.toString();
            this.webRtcFpsText.value = settings.WebRTC.FPS.toString();
        }
    };
    /**
    * Used to handle the Video Stats from the Peer Connection Client
    * @param stats - Stats generate from the Peer Connection Client
    */
    NativeDOMDelegate.prototype.onVideoStats = function (stats) {
        var runTime = new Date(Date.now() - this.videoStartTime).toISOString().substr(11, 8);
        var statsText = "";
        var inboundData = this.formatBytes(stats.inboundVideoStats.bytesReceived, 2);
        // format numbering based on the browser language
        var numberFormat = new Intl.NumberFormat(window.navigator.language, {
            maximumFractionDigits: 0
        });
        // ensure that we have a currentRoundTripTime coming in from stats and format it if it's a number
        var netRTT = stats.candidatePair.hasOwnProperty('currentRoundTripTime') && stats.isNumber(stats.candidatePair.currentRoundTripTime) ? numberFormat.format(stats.candidatePair.currentRoundTripTime * 1000) : 'Can\'t calculate';
        statsText += "<div>Duration: ".concat(runTime, "</div>");
        statsText += "<div>Received: ".concat(inboundData, "</div>");
        statsText += "<div>Packets Lost: ".concat(stats.inboundVideoStats.packetsLost, "</div>");
        statsText += "<div>Bitrate (kbps): ".concat(stats.inboundVideoStats.bitrate, "</div>");
        statsText += "<div>Video Resolution: ".concat(stats.inboundVideoStats.hasOwnProperty('frameWidth') && stats.inboundVideoStats.frameWidth && stats.inboundVideoStats.hasOwnProperty('frameHeight') && stats.inboundVideoStats.frameHeight ?
            stats.inboundVideoStats.frameWidth + 'x' + stats.inboundVideoStats.frameHeight : 'Chrome only', "</div>");
        statsText += "<div>Frames Decoded: ".concat(stats.inboundVideoStats.hasOwnProperty('framesDecoded') ? numberFormat.format(stats.inboundVideoStats.framesDecoded) : 'Chrome only', "</div>");
        statsText += "<div>Packets Lost: ".concat(stats.inboundVideoStats.hasOwnProperty('packetsLost') ? numberFormat.format(stats.inboundVideoStats.packetsLost) : 'Chrome only', "</div>");
        statsText += "<div>Framerate: ".concat(stats.inboundVideoStats.framerate, "</div>");
        statsText += "<div>Frames dropped: ".concat(stats.inboundVideoStats.framesDropped, "</div>");
        statsText += "<div>Net RTT (ms): ".concat(netRTT, "</div>");
        //statsText += `<div>Browser receive to composite (ms): ${stats.inboundVideoStats.receiveToCompositeMs}</div>`;
        statsText += "<div>Video Quantization Parameter: ".concat(this.videoQpIndicator.videoEncoderAvgQP, "</div>");
        var statsDiv = document.getElementById("statisticsResult");
        statsDiv.innerHTML = statsText;
        libspsfrontend.Logger.Log(libspsfrontend.Logger.GetStackTrace(), "--------- Stats ---------\n ".concat(stats, "\n------------------------"), 6);
        if (this.sendStatsToServer.checked === true) {
            this.iWebRtcController.sendStatsToSignallingServer(stats);
        }
    };
    /**
    * formats Bytes coming in for video stats
    * @param bytes number to convert
    * @param decimals number of decimal places
    */
    NativeDOMDelegate.prototype.formatBytes = function (bytes, decimals) {
        if (bytes === 0) {
            return "0";
        }
        var factor = 1024;
        var dm = decimals < 0 ? 0 : decimals;
        var sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
        var i = Math.floor(Math.log(bytes) / Math.log(factor));
        return parseFloat((bytes / Math.pow(factor, i)).toFixed(dm)) + ' ' + sizes[i];
    };
    /**
    * Handles the result of the UE Latency Test
    * @param latencyTimings - Latency Test Timings sent from the UE Instance
    */
    NativeDOMDelegate.prototype.onLatencyTestResult = function (latencyTimings) {
        libspsfrontend.Logger.Log(libspsfrontend.Logger.GetStackTrace(), latencyTimings.toString(), 6);
        var latencyStatsInnerHTML = '';
        latencyStatsInnerHTML += "<div>Net latency RTT (ms): " + latencyTimings.networkLatency + "</div>";
        latencyStatsInnerHTML += "<div>UE Encode (ms): " + latencyTimings.EncodeMs + "</div>";
        latencyStatsInnerHTML += "<div>UE Capture (ms): " + latencyTimings.CaptureToSendMs + "</div>";
        latencyStatsInnerHTML += "<div>Browser send latency (ms): " + latencyTimings.browserSendLatency + "</div>";
        latencyStatsInnerHTML += latencyTimings.frameDisplayDeltaTimeMs && latencyTimings.browserReceiptTimeMs ? "<div>Browser receive latency (ms): " + latencyTimings.frameDisplayDeltaTimeMs + "</div>" : "";
        latencyStatsInnerHTML += "<div>Total latency (excluding browser) (ms): " + latencyTimings.latencyExcludingDecode + "</div>";
        latencyStatsInnerHTML += latencyTimings.endToEndLatency ? "<div>Total latency (ms): " + latencyTimings.endToEndLatency + "</div>" : "";
        this.latencyContainer.classList.remove("d-none");
        document.getElementById("latencyStatsResults").innerHTML = latencyStatsInnerHTML;
    };
    /**
     * Handles when the ownership flag is sent from the signaling server
     * @param hasQualityOwnership - flag if the user has quality ownership
     */
    NativeDOMDelegate.prototype.onQualityControlOwnership = function (hasQualityOwnership) {
        this.qualityControlOwnershipCheckBox.checked = hasQualityOwnership;
    };
    /**
      * Calls updateQpTooltip to update the QP colour light
      * @param QP - The video encoder QP number needed to find the average
      */
    NativeDOMDelegate.prototype.onVideoEncoderAvgQP = function (QP) {
        this.videoQpIndicator.updateQpTooltip(QP);
    };
    return NativeDOMDelegate;
}(libspsfrontend.DelegateBase));
exports.NativeDOMDelegate = NativeDOMDelegate;
