import { Request, Response } from "express";
import { Contact } from "../models/Contact";

export const addContact = async (req: Request, res: Response) => {
  try {
    const { name, phone } = req.body;
    const userId = (req as any).user._id;
    const contact = new Contact({ userId, name, phone });
    await contact.save();
    res.status(201).send({ success: true, contact });
  } catch (error: any) {
    res.status(400).send({ success: false, message: error.message });
  }
};

export const markSpam = async (req: Request, res: Response) => {
  try {
    const { contactId } = req.params;
    await Contact.findByIdAndUpdate(contactId, { isSpam: true });
    res.send({ success: true });
  } catch (error: any) {
    res.status(400).send({ success: false, message: error.message });
  }
};

export const getContacts = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    console.log("User ID:", userId); // Log the user ID
    const contacts = await Contact.find({ userId });
    res.send({ contacts });
  } catch (error: any) {
    res.status(400).send({ success: false, message: error.message });
  }
};

export const markNumberssAsSpam = async (req: Request, res: Response) => {
  try {
    const { phoneNumbers } = req.body;
    console.log(phoneNumbers);
    // Array to store promises for database operations
    const promises = [];

    for (const phone of phoneNumbers) {
      // Check if the phone number already exists in the database
      const existingContact = await Contact.findOne({ phone });

      if (existingContact) {
        // If the contact exists, update its isSpam status to true
        promises.push(
          Contact.findByIdAndUpdate(existingContact._id, { isSpam: true })
        );
      } else {
        // If the contact doesn't exist, create a new one
        const newContact = new Contact({
          userId: (req as any).user._id,
          name: "default",
          phone,
          isSpam: true,
        });
        promises.push(newContact.save());
      }
    }

    // Execute all promises
    await Promise.all(promises);

    res.send({ success: true });
  } catch (error: any) {
    res.status(400).send({ success: false, message: error.message });
  }
};
