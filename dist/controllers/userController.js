"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phone, password, email } = req.body;
        const hashedPassword = yield bcryptjs_1.default.hash(password, 8);
        const user = new User_1.User({ name, phone, password: hashedPassword, email });
        yield user.save();
        res.status(201).send({ success: true, message: 'User registered successfully' });
    }
    catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone, password } = req.body;
        const user = yield User_1.User.findOne({ phone });
        if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
            throw new Error('Invalid login credentials');
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, 'your_jwt_secret');
        res.send({ token });
    }
    catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
});
exports.login = login;
