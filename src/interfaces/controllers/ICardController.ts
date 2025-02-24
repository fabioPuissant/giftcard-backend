import { Request, Response } from "express";

export interface ICardController {
    activateCard(req: Request, res: Response): Promise<void>;
    loadCard(req: Request, res: Response): Promise<void>;
    getCard(req: Request, res: Response): Promise<void>;
    requestRedemption(req: Request, res: Response): Promise<void>;
    createCard(req: Request, res: Response): Promise<void>;
    confirmRedemption(req: Request, res: Response): Promise<void>;
}
