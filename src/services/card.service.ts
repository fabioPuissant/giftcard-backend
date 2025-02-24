import prisma from "../config/database";
import { ICardService } from "../interfaces/services/ICardService";
import { ICard } from "@interfaces/models/ICard";

export class CardService implements ICardService {
    public async loadCard(cardId: string, amount: number, giverId: string): Promise<ICard> {
        const card = await prisma.card.findFirstOrThrow({ where: { id: cardId } })
        const updatedBalance = card.balance + amount;
        const loadedCard = await prisma.card.update({
            where: { id: cardId },
            data: {
                balance: updatedBalance,
                giverId,
                isActive: true,
            },
        });

        await prisma.transaction.create({
            data: {
                cardId: cardId,
                userId: giverId,
                amount: amount,
                type: "load",
            },
        });

        return card as ICard;
    }

    public async activateCard(cardId: string, amount: number, giverId: string): Promise<ICard> {
        // 1. Update the card's balance and link it to a giver
        const card = await prisma.card.update({
            where: { id: cardId },
            data: {
                balance: amount,
                giverId,
                isActive: true,
            },
        });

        // 2. Record a 'load' transaction
        await prisma.transaction.create({
            data: {
                cardId: cardId,
                userId: giverId,
                amount: amount,
                type: "load",
            },
        });

        return card as ICard;
    }

    public async getCardDetails(cardId: string): Promise<ICard> {
        const card = await prisma.card.findUnique({
            where: { id: cardId },
            include: { giver: true, recipient: true },
        });
        if (!card) throw new Error("Card not found");
        return card as ICard;
    }

    public async requestRedemption(cardId: string, recipientId: string): Promise<any> {
        const card = await prisma.card.findUnique({ where: { id: cardId } });
        if (!card || !card.isActive) {
            throw new Error("Card is invalid or already redeemed");
        }
        if (card.balance <= 0) {
            throw new Error("No balance to redeem");
        }

        // Mark the prospective recipient on the card
        await prisma.card.update({
            where: { id: cardId },
            data: { redeemedBy: recipientId },
        });

        // Create a 'redeem' transaction in pending state
        const transaction = await prisma.transaction.create({
            data: {
                cardId,
                userId: recipientId,
                amount: card.balance,
                type: "redeem",
            },
        });

        return transaction;
    }

    public async confirmRedemption(cardId: string, giverId: string, redemptionId: string): Promise<any> {
        const card = await prisma.card.findUnique({ where: { id: cardId } });
        if (!card || card.giverId !== giverId) {
            throw new Error("You are not the owner of this card");
        }

        // (Call Stripe/PayPal for bank transfer if needed)

        // Zero out balance and deactivate card
        await prisma.card.update({
            where: { id: cardId },
            data: {
                balance: 0,
                isActive: false,
            },
        });

        // Mark transaction as 'completed' if you track statuses
        const transaction = await prisma.transaction.update({
            where: { id: redemptionId },
            data: {
                // e.g., status: 'completed'
            },
        });

        return transaction;
    }
    public async createCard(qrCode: string): Promise<ICard> {
        // 1. Validate that the QR code is unique
        const existingCard = await prisma.card.findUnique({
            where: { qrCode },
        });
        if (existingCard) {
            throw new Error("A card with this QR code already exists.");
        }

        // 2. Create the card. For MVP, we set balance to 0, isActive to false or true as needed.
        const newCard = await prisma.card.create({
            data: {
                giverId: null,
                qrCode,
                balance: 0,
                isActive: false
            },
        });

        return newCard as ICard;
    }

}
