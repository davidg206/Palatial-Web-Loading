import { SpecialKeyCodes } from "./SpecialKeyCodes";
import { DataChannelController } from "../DataChannel/DataChannelController";
import { UeInputKeyboardMessage } from "../UeInstanceMessage/UeInputKeyboardMessage";
import { UeDescriptorUi } from "../UeInstanceMessage/UeDescriptorUi";
import { Logger } from "../Logger/Logger";
import { IDelegate } from "../Delegate/IDelegate"
import { NativeDOMDelegate } from "../../../src/components/NativeDOMDelegate"

/**
 * Handles the Keyboard Inputs for the document
 */
export class KeyboardController {
    ueInputKeyBoardMessage: UeInputKeyboardMessage;
    ueDescriptorUi: UeDescriptorUi;
    keyboardController: KeyboardController;
    suppressBrowserKeys: boolean;
    delegate: IDelegate;
    events: KeyboardEvent[];

    /**
     * 
     * @param dataChannelController - Data Channel Controller
     * @param suppressBrowserKeys - Suppress Browser Keys
     */
    constructor(dataChannelController: DataChannelController, ueDescriptorUi: UeDescriptorUi, suppressBrowserKeys: boolean, delegate: IDelegate) {
        this.ueInputKeyBoardMessage = new UeInputKeyboardMessage(dataChannelController);
	this.ueDescriptorUi = ueDescriptorUi;
        this.suppressBrowserKeys = suppressBrowserKeys;
	this.delegate = delegate;
        this.events = [];
    }

    /**
     * Registers document keyboard events with the controller
     */
    registerKeyBoardEvents() {
        document.onkeydown = (ev: KeyboardEvent) => { this.events.push(ev); this.handleOnKeyDown(ev); }
        document.onkeyup = (ev: KeyboardEvent) => this.handleOnKeyUp(ev);

        //This has been deprecated as at Jun 13 2021
        document.onkeypress = (ev: KeyboardEvent) => this.handleOnKeyPress(ev);

        window.addEventListener('blur', () => {
          for (let i = 0; i < this.events.length; i++) {
            let event = this.events[i];
            let newEvent = new KeyboardEvent('keyup', {
              bubbles: event.bubbles,
              cancelable: event.cancelable,
              key: event.key,
	      keyCode: event.keyCode,
	      which: event.which,
	      shiftKey: event.shiftKey,
	      ctrlKey: event.ctrlKey,
	      altKey: event.altKey,
	      metaKey: event.metaKey
            });
	    document.dispatchEvent(newEvent);
          }
          this.events = [];
        });
    }

    /**
     * Handles When a key is down
     * @param keyboardEvent - Keyboard event 
     */
    handleOnKeyDown(keyboardEvent: KeyboardEvent) {
	if (!(<NativeDOMDelegate>this.delegate).isInGame()) {
		return;
	}

	if (keyboardEvent.ctrlKey) {
		if (keyboardEvent.key == 'v') {
			const self = this;
			navigator.clipboard.readText().then(text => {
				for (let i = 0; i < text.length; i++) {
					const char = text.charAt(i);
					const key = char.charCodeAt(0);
					self.ueInputKeyBoardMessage.sendKeyDown(key, keyboardEvent.repeat);
					document.onkeypress(new KeyboardEvent("keypress", { charCode: key }));
				}
			}).catch(err => {
				console.error('Failed to read clipboard contents: ', err);
			});
		}
		if (keyboardEvent.key == 'c') {
			this.ueDescriptorUi.sendUiConsoleInteraction("requestInputSelection");
		}
		if (this.getKeycode(keyboardEvent) == SpecialKeyCodes.backSpace) {
			// clear input box
		}
	} else {
		const key = keyboardEvent.key;
		if (key == 'Unidentified') {
			return;
		}
		this.ueInputKeyBoardMessage.sendKeyDown(this.getKeycode(keyboardEvent), keyboardEvent.repeat);

		// backSpace is not considered a keypress in JavaScript but we need it
		// to be so characters may be deleted in a UE4 text entry field.
		if (keyboardEvent.keyCode === SpecialKeyCodes.backSpace) {
			document.onkeypress(new KeyboardEvent("keypress", { charCode: SpecialKeyCodes.backSpace }));
		}
	}
	if (this.suppressBrowserKeys && this.isKeyCodeBrowserKey(keyboardEvent.keyCode)) {
		keyboardEvent.preventDefault();
	}
    }

    /**
     * handles when a key is up
     * @param keyboardEvent - Keyboard event
     */
    handleOnKeyUp(keyboardEvent: KeyboardEvent) {
        Logger.Log(Logger.GetStackTrace(), "handleOnKeyUp", 6);
        this.ueInputKeyBoardMessage.sendKeyUp(this.getKeycode(keyboardEvent));

        if (this.suppressBrowserKeys && this.isKeyCodeBrowserKey(keyboardEvent.keyCode)) {
            keyboardEvent.preventDefault();
        }
    }

    /**
     * Handles when a key is press
     * @param keyboard - Keyboard Event
     */
    handleOnKeyPress(keyboard: KeyboardEvent) {
        Logger.Log(Logger.GetStackTrace(), "handleOnkeypress", 6);
        this.ueInputKeyBoardMessage.sendKeyPress(keyboard.charCode);
    }

    /**
     * Gets the Keycode of the Key pressed
     * @param keyboardEvent - Key board Event
     * @returns the key code of the Key
     */
    getKeycode(keyboardEvent: KeyboardEvent) {
        //Need to move this to a newer version using keyboard event location. as keyboardEvent.keycode is deprecated

        if (keyboardEvent.keyCode === SpecialKeyCodes.shift && keyboardEvent.code === 'ShiftRight') return SpecialKeyCodes.rightShift;
        else if (keyboardEvent.keyCode === SpecialKeyCodes.control && keyboardEvent.code === 'ControlRight') return SpecialKeyCodes.rightControl;
        else if (keyboardEvent.keyCode === SpecialKeyCodes.alt && keyboardEvent.code === 'AltRight') return SpecialKeyCodes.rightAlt;
        else return keyboardEvent.keyCode;
    }

    /**
     * Browser keys do not have a charCode so we only need to test keyCode.
     */
    isKeyCodeBrowserKey(keyCode: number) {
        // Function keys or tab key.
	if (keyCode == 116 || keyCode == 122) return false;
        return keyCode >= 112 && keyCode <= 123 || keyCode === 9;
    }
}
/* 5457524f4d4d */
