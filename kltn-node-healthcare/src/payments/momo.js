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

/**
 * Tạo thanh toán MoMo
 * @param {*} req 
 * @param {*} res 
 * Body: { amount, orderInfo }
 */
async function createMoMoPayment(req, res) {
    try {
        const { amount, orderInfo } = req.body;
        if (!amount || !orderInfo) {
            return res.status(400).json({ message: 'Missing amount or orderInfo' });
        }
        const requestId = partnerCode + Date.now();
        const orderId = requestId;
        const extraData = "";
        // Raw signature
        const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
        // Signature
        const signature = crypto.createHmac('sha256', secretkey)
            .update(rawSignature)
            .digest('hex');
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
            lang: 'vi'
        };
        // Gửi request đến MoMo
        const momoRes = await axios.post(endpoint, requestBody, {
            headers: { 'Content-Type': 'application/json' }
        });
        // Trả về URL thanh toán cho frontend
        if (momoRes.data && momoRes.data.payUrl) {
            return res.json({ payUrl: momoRes.data.payUrl });
        } else {
            return res.status(500).json({ message: 'MoMo payment failed', data: momoRes.data });
        }
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
}

module.exports = { createMoMoPayment }; 