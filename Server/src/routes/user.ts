import {
  RegisterPlayer,
  CheckPlayerBalance,
  RemovePlayerBalance,
  AddPlayerBalance,
} from "../controllers/userController";
import express from "express";

const router = express.Router();

router.post("/register", RegisterPlayer);
router.get("/check-balance/:id", CheckPlayerBalance);
router.post("/remove-balance", RemovePlayerBalance);
router.post("/add-balance", AddPlayerBalance);

export default router;
