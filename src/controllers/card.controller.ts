import { Request, Response } from "express";
import { ICardController } from "@interfaces/controllers/ICardController";
import { CardService } from "@services/card.service";

export class CardController implements ICardController {
  private cardService: CardService;

  constructor() {
    this.cardService = new CardService();
  }
    loadCard(req: Request, res: Response): Promise<void> {
        throw new Error("Method not implemented.");
    }

  public activateCard = async (req: Request, res: Response): Promise<void> => {
    try {
      const { cardId, amount, giverId } = req.body;
      const result = await this.cardService.activateCard(cardId, amount, giverId);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  public getCard = async (req: Request, res: Response): Promise<void> => {
    try {
      const { cardId } = req.params;
      const card = await this.cardService.getCardDetails(cardId);
      res.json(card);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  public requestRedemption = async (req: Request, res: Response): Promise<void> => {
    try {
      const { cardId } = req.params;
      const { recipientId } = req.body;
      const redemptionRequest = await this.cardService.requestRedemption(cardId, recipientId);
      res.json(redemptionRequest);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  public confirmRedemption = async (req: Request, res: Response): Promise<void> => {
    try {
      const { cardId } = req.params;
      const { giverId, redemptionId } = req.body;
      const confirmation = await this.cardService.confirmRedemption(cardId, giverId, redemptionId);
      res.json(confirmation);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}
