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
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../models/User");
const Contact_1 = require("../models/Contact");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const populateData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect('mongodb://localhost:27017/contact-management', { useNewUrlParser: true, useUnifiedTopology: true });
    // Create sample users
    const usersData = [
        { name: 'John Doe', phone: '1234567890', email: 'john@example.com', password: yield bcryptjs_1.default.hash('password', 8) },
        { name: 'Jane Smith', phone: '0987654321', email: 'jane@example.com', password: yield bcryptjs_1.default.hash('password', 8) }
    ];
    const users = yield User_1.User.insertMany(usersData);
    // Create sample contacts
    const contactsData = [
        { userId: users[0]._id, name: 'Alice Brown', phone: '5555555555', isSpam: false },
        { userId: users[1]._id, name: 'Bob White', phone: '6666666666', isSpam: true }
    ];
    yield Contact_1.Contact.insertMany(contactsData);
    mongoose_1.default.connection.close();
});
populateData().catch((error) => console.error('Data population error:', error));
