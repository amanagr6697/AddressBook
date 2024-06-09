import express from 'express';
import { searchByName, searchByPhone,searchByPhoneDisplayEmail } from '../controllers/searchController';
import { auth } from '../middlewares/auth';

const router = express.Router();

router.get('/search/name', auth, searchByName);
router.get('/search/phone', auth, searchByPhone);
router.get('/search/email/phone',auth,searchByPhoneDisplayEmail)

export default router;
