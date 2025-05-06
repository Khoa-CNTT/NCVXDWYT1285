import momoService from '../payments/momo.js';

const processPayment = async (req, res) => {
    console.log('Dữ liệu nhận được từ frontend:', req.body);
    try {
        const { amount, orderInfo } = req.body;
        if (!amount || !orderInfo) {
            return res.status(400).json({ message: 'Thiếu thông tin thanh toán' });
        }
        const paymentResponse = await momoService.createMoMoPayment(req, res);
        if (paymentResponse.payUrl) {
            return res.status(200).json({ payUrl: paymentResponse.payUrl });
        } else {
            return res.status(500).json({ message: 'Không tạo được link thanh toán MoMo' });
        }
    } catch (error) {
        console.error('Lỗi xử lý thanh toán MoMo:', error);
        return res.status(500).json({ message: 'Lỗi xử lý thanh toán' });
    }
};

export default { processPayment };
