const crypto = require('crypto');
const axios = require('axios');

// MoMo config
const partnerCode = "MOMO";
const accessKey = "F8BBA842ECF85";
const secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
const redirectUrl = "https://momo.vn/return";
const ipnUrl = "https://callback.url/notify";
const requestType = "captureWallet";
const endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";

async function createMoMoPayment(req, res) {
    try {
        const { amount, orderInfo } = req.body;
        if (!amount || !orderInfo) {
            console.log('Thiếu thông tin gửi đến MoMo:', req.body);
            return res.status(400).json({ message: 'Missing amount or orderInfo' });
        }

        const requestId = partnerCode + Date.now();
        const orderId = requestId;
        const extraData = "";

        // Raw signature
        const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
        const signature = crypto.createHmac('sha256', secretkey).update(rawSignature).digest('hex');

        // Request body
        const requestBody = {
            partnerCode,
            accessKey,
            requestId,
            amount: amount.toString(),
            orderId,
            orderInfo,
            redirectUrl,
            ipnUrl,
            extraData,
            requestType,
            signature,
            lang: 'vi',
        };

        console.log('Dữ liệu gửi đến MoMo API:', requestBody);

        // Gửi request đến MoMo
        const momoRes = await axios.post(endpoint, requestBody, {
            headers: { 'Content-Type': 'application/json' },
        });

        console.log('Phản hồi từ MoMo API:', momoRes.data);

        // Trả về URL thanh toán
        if (momoRes.data && momoRes.data.payUrl) {
            return { payUrl: momoRes.data.payUrl };
        } else {
            return { message: 'MoMo payment failed', data: momoRes.data };
        }
    } catch (err) {
        console.error('Lỗi khi tạo URL thanh toán MoMo:', err);
        return { message: 'Internal server error', error: err.message };
    }
}

module.exports = { createMoMoPayment };