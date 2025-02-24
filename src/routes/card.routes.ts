import { Router } from "express";
import { CardController } from "../controllers/card.controller";

const cardRouter = Router();
const cardController = new CardController();

cardRouter.post("/", cardController.createCard);
cardRouter.post("/activate", cardController.activateCard);
cardRouter.post("/load", cardController.loadCard);
cardRouter.get("/:cardId", cardController.getCard);
cardRouter.post("/:cardId/redeem", cardController.requestRedemption);
cardRouter.post("/:cardId/confirm", cardController.confirmRedemption);

export default cardRouter;
