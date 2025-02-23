import { CardId } from "src/classes/cardId.class copy";

export interface ICard {
    id: CardId;
    qrCode: string;
    balance: number;
    isActive: boolean;
    giverId: string;
    redeemedBy: RedeemedBy;
    createdAt: Date;
    updatedAt: Date;
}