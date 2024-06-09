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
exports.markSpam = exports.addContact = void 0;
const Contact_1 = require("../models/Contact");
const addContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phone } = req.body;
        const userId = req.user._id;
        const contact = new Contact_1.Contact({ userId, name, phone });
        yield contact.save();
        res.status(201).send({ success: true, contact });
    }
    catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
});
exports.addContact = addContact;
const markSpam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contactId } = req.params;
        yield Contact_1.Contact.findByIdAndUpdate(contactId, { isSpam: true });
        res.send({ success: true });
    }
    catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
});
exports.markSpam = markSpam;
