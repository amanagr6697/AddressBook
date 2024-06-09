"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactController_1 = require("../controllers/contactController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post('/contacts', auth_1.auth, contactController_1.addContact);
router.post('/contacts/:contactId/spam', auth_1.auth, contactController_1.markSpam);
exports.default = router;
