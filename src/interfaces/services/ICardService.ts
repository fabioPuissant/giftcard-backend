import { ICard } from "../models/ICard";

export interface ICardService {
  activateCard(cardId: string, amount: number, giverId: string): Promise<ICard>;
  loadCard(cardId: string, amount: number, giverId: string): Promise<ICard>;
  getCardDetails(cardId: string): Promise<ICard>;
  requestRedemption(cardId: string, recipientId: string): Promise<any>; // or a more specific return type
  confirmRedemption(cardId: string, giverId: string, redemptionId: string): Promise<any>;
}
