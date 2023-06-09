export declare class AfkLogic {
    controlScheme: number;
    warnTimeout: number;
    closeTimeout: number;
    active: boolean;
    warnTimer: ReturnType<typeof setTimeout>;
    countDown: number;
    countDownTimer: ReturnType<typeof setInterval>;
    constructor(controlScheme: number, afkTimeout: number);
    /**
     * The methods that occur when an afk event listener is clicked
     */
    onAfkClick(): void;
    /**
     * Start the warning timer if a timeout is set greater that 0 seconds
     */
    startAfkWarningTimer(): void;
    /**
     * Stop the afk warning timer
     */
    stopAfkWarningTimer(): void;
    /**
     * Pause the timer which when elapsed will warn the user they are inactive.
     */
    pauseAfkWarningTimer(): void;
    /**
     * If the user interacts then reset the warning timer.
     */
    resetAfkWarningTimer(): void;
    /**
     * Show the AFK overlay and begin the countDown
     */
    activateAfkEvent(): void;
    /**
     * An override method for updating the afk countdown number in the overlay
     */
    updateAfkCountdown(): void;
    /**
     * An override method for showing the afk overlay
     */
    showAfkOverlay(): void;
    /**
     * An override method for hiding the afk overlay
     */
    hideCurrentOverlay(): void;
    /**
     * An  override method for setting the override for the disconnect message
     */
    setDisconnectMessageOverride(message: string): void;
    /**
     * An override method for closing the websocket connection from the clients side
     */
    closeWebSocket(): void;
}
