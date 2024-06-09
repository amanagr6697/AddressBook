import express from "express";
import {
  addContact,
  markSpam,
  getContacts,
  markNumberssAsSpam,
} from "../controllers/contactController";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.post("/contacts", auth, addContact);
router.post("/contacts/:contactId/spam", auth, markSpam);
router.get("/contacts", auth, getContacts);
router.post("/contacts/spam", auth, markNumberssAsSpam);

export default router;
