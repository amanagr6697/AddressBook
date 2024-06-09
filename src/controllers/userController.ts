// src/controllers/userController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, phone, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ name, phone, password: hashedPassword, email });
    await user.save();
    res.status(201).send({ success: true, message: 'User registered successfully' });
  } catch (error:any) {
    console.log(error.message);
    res.status(400).send({ success: false, message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new Error('Invalid login credentials');
    }
    const token = jwt.sign({ _id: user._id }, 'your_jwt_secret');
    res.send({ token });
  } catch (error:any) {
    res.status(400).send({ success: false, message: error.message });
  }
};
