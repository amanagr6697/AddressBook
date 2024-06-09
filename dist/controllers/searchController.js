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
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchByPhone = exports.searchByName = void 0;
const User_1 = require("../models/User");
const Contact_1 = require("../models/Contact");
const searchByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        if (!name || typeof name !== 'string') {
            throw new Error('Invalid or missing name parameter');
        }
        const regexStartsWith = new RegExp(`^${name}`, 'i');
        const regexContains = new RegExp(name, 'i');
        const users = yield User_1.User.find({ name: regexStartsWith }).select('name phone email');
        const contacts = yield Contact_1.Contact.find({ name: regexStartsWith }).select('name phone isSpam');
        const additionalContacts = yield Contact_1.Contact.find({ name: regexContains, _id: { $nin: contacts.map(c => c._id) } }).select('name phone isSpam');
        res.send({ users, contacts: contacts.concat(additionalContacts) });
    }
    catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
});
exports.searchByName = searchByName;
const searchByPhone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone } = req.query;
        const users = yield User_1.User.find({ phone }).select('name phone email');
        const contacts = yield Contact_1.Contact.find({ phone }).select('name phone isSpam');
        res.send({ users, contacts });
    }
    catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
});
exports.searchByPhone = searchByPhone;
