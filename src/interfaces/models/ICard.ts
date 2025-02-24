import { CardId } from "src/classes/cardId.class copy";

export interface ICard {
    // id: CardId;
    id: string
    qrCode: string;
    balance: number;
    isActive: boolean;
    giverId: string;
    redeemedBy: RedeemedBy;
    createdAt: Date;
    updatedAt: Date;
}