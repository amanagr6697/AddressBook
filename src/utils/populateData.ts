import mongoose from 'mongoose';
import { User } from '../models/User';
import { Contact } from '../models/Contact';
import bcrypt from 'bcryptjs';

const NUMBER_OF_USERS = 50;
const NUMBER_OF_CONTACTS = 50;

const generateRandomPhone = () => {
  const digits = '0123456789';
  let phone = '';
  for (let i = 0; i < 10; i++) {
    phone += digits[Math.floor(Math.random() * 10)];
  }
  return phone;
};

const generateRandomEmail = (name: string) => {
  const domains = ['example.com', 'gmail.com', 'yahoo.com', 'hotmail.com'];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  return name.toLowerCase().replace(' ', '') + '@' + randomDomain;
};

const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 8);
};

const populateData = async () => {
  await mongoose.connect('mongodb://localhost:27017/content-system', { useNewUrlParser: true, useUnifiedTopology: true } as mongoose.ConnectOptions);

  const usersData = Array.from({ length: NUMBER_OF_USERS }, (_, index) => ({
    name: `User ${index + 1}`,
    phone: generateRandomPhone(),
    email: generateRandomEmail(`User ${index + 1}`),
    password: 'password' 
  }));

  const hashedPasswords = await Promise.all(usersData.map(user => hashPassword(user.password)));
  usersData.forEach((user, index) => user.password = hashedPasswords[index]);

  const users = await User.insertMany(usersData);

  // Generate sample contacts
  const contactsData = Array.from({ length: NUMBER_OF_CONTACTS }, (_, index) => ({
    userId: users[Math.floor(Math.random() * users.length)]._id,
    name: `Contact ${index + 1}`,
    phone: generateRandomPhone(),
    isSpam: Math.random() < 0.5 // Randomly assign isSpam
  }));

  await Contact.insertMany(contactsData);

  mongoose.connection.close();
};

populateData().catch((error) => console.error('Data population error:', error));
