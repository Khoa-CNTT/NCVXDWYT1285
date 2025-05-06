import express from 'express';
import momoController from '../controllers/momoController.js';
const router = express.Router();

// Route cho thanh toán MoMo
router.post('/api/payments/momo', momoController.processPayment);

export default router;