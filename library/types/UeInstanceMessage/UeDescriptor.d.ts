import { DataChannelController } from "../DataChannel/DataChannelController";
import { UeDataMessage } from "./UeDataMessage";
/**
 * Handles sending a Descriptor to the UE Instance
 */
export declare class UeDescriptor extends UeDataMessage {
    /**
    * @param datachannelController - Data Channel Controller
    */
    constructor(datachannelController: DataChannelController);
    /**
     * Send a Descriptor to the UE Instances
     * @param messageType - UE Message Type
     * @param JSODescriptor - Descriptor Message as JSON
     */
    sendDescriptor(messageType: number, JSODescriptor: string): void;
}
