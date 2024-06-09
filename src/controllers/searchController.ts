import { Request, Response } from "express";
import { User } from "../models/User";
import { Contact } from "../models/Contact";

export const searchByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    if (!name || typeof name !== "string") {
      throw new Error("Invalid or missing name parameter");
    }

    const regexStartsWith = new RegExp(`^${name}`, "i");
    const regexContains = new RegExp(name, "i");

    const contacts = await Contact.find({ name: regexStartsWith }).select(
      "name phone isSpam"
    );
    const additionalContacts = await Contact.find({
      name: regexContains,
      _id: { $nin: contacts.map((c: { _id: any }) => c._id) },
    }).select("name phone isSpam");

    res.send({ contacts: contacts.concat(additionalContacts) });
  } catch (error: any) {
    res.status(400).send({ success: false, message: error.message });
  }
};

export const searchByPhone = async (req: Request, res: Response) => {
  try {
    const { phone } = req.query;
    const users = await User.find({ phone }).select("name phone email");
    const contacts = await Contact.find({ phone }).select("name phone isSpam");

    if (users && users.length > 0) {
      res.send({ users }); // Output only users if found
    } else {
      res.send({ contacts }); // Output only contacts if users not found
    }
  } catch (error: any) {
    res.status(400).send({ success: false, message: error.message });
  }
};

export const searchByPhoneDisplayEmail = async (req: Request, res: Response) => {
    try {
      const { phone } = req.query;
      if (!phone || typeof phone !== 'string') {
        return res.status(400).send({ success: false, message: 'Invalid or missing phone parameter' });
      }
  
      const requestingUserId = (req as any).user._id;

      // Find the user by phone number
      const user = await User.findOne({ phone }).select("name phone email _id");
      if (!user) {
        return res.status(404).send({ success: false, message: 'User not found' });
      }
      
      // Get the requesting user's phone number
      const requestingUser = await User.findById(requestingUserId).select("phone");
      if (!requestingUser) {
          return res.status(404).send({ success: false, message: 'Requesting user not found' });
          }
  
      // Check if the requesting user's phone number exists in the found user's contacts
      const contactExists = await Contact.findOne({ userId: user._id, phone: requestingUser.phone });
  
      // Prepare the user data to be returned
      let userData;
      if (contactExists) {
        userData = {
          name: user.name,
          phone: user.phone,
          email: user.email
        };
      } else {
        userData = {
          name: user.name,
          phone: user.phone
        };
      }
  
      // Find contacts by phone number
      const contacts = await Contact.find({ phone }).select("name phone isSpam");
  
      res.send({ user: userData, contacts });
    } catch (error: any) {
      res.status(400).send({ success: false, message: error.message });
    }
  };