import prisma from "../config/database";
import { ICardService } from "../interfaces/services/ICardService";
import { ICard } from "@interfaces/models/ICard";

export class CardService implements ICardService {
  loadCard(cardId: string, amount: number, giverId: string): Promise<ICard> {
      throw new Error("Method not implemented.");
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
}
