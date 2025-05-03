const express = require('express');
const router = express.Router();
const axios = require('axios');

// Sử dụng API key Gemini do user cung cấp
const GEMINI_API_KEY = 'AIzaSyCluk9FEGWLgww8WEBPGwRGKj_UxNOkttk';

// Route chat AI demo
router.post('/api/ai-chat', async (req, res) => {
  console.log("=============1234354====test xem chay vao dau");
  const { message } = req.body;
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: message }]
          }
        ]
      }
    );
    // Lấy nội dung trả về từ Gemini
    const reply = response.data.candidates[0].content.parts[0].text;
    res.json({ reply });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ reply: "Xin lỗi, AI Gemini hiện không thể trả lời. Vui lòng thử lại sau." });
  }
});

module.exports = router; 