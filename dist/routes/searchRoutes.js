"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const searchController_1 = require("../controllers/searchController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.get('/search/name', auth_1.auth, searchController_1.searchByName);
router.get('/search/phone', auth_1.auth, searchController_1.searchByPhone);
exports.default = router;
