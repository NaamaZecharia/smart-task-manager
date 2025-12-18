import express from 'express';
import { getCategories, createCategory } from '../controllers/categoryController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', protect, getCategories);
router.post('/', protect, createCategory);

export default router;