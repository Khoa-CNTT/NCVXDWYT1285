# BookingCare Healthcare

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-17-61DAFB?logo=react)](https://reactjs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql)](https://www.mysql.com/)

**Nền tảng đặt lịch khám bệnh trực tuyến** tích hợp trợ lý AI, quản lý hồ sơ bệnh nhân và tư vấn sức khỏe tự động.

| Thông tin | Mô tả |
|-----------|--------|
| **Mã dự án** | NCVXDWYT1285 |
| **Repository** | [GitHub](https://github.com/Khoa-CNTT/NCVXDWYT1285) |
| **Team size** | 5 members |
| **Vai trò Backend** | RESTful API, đồng bộ dữ liệu, tích hợp AI Chatbot |

---

## 📋 Tổng quan

**BookingCare Healthcare** là hệ thống y tế trực tuyến cho phép bệnh nhân đặt lịch khám, quản lý lịch hẹn và nhận tư vấn qua AI. Hệ thống được thiết kế để đồng bộ mượt mà giữa **Frontend (React.js)**, **Backend (Node.js/Express)** và **dịch vụ AI Chatbot**, đảm bảo trải nghiệm nhất quán cho người dùng và quản trị viên.

### Tính năng chính

- **Đặt lịch khám**: Đặt lịch theo bác sĩ, chuyên khoa, phòng khám; xác thực qua email.
- **Quản lý bệnh nhân & bác sĩ**: Phân quyền Admin / Bác sĩ / Bệnh nhân; quản lý lịch khám, gửi đơn thuốc qua email.
- **AI Chatbot**: Tích hợp Gemini AI để trả lời câu hỏi và hỗ trợ người dùng 24/7.
- **Thanh toán**: Tích hợp cổng thanh toán MoMo.
- **Tự động hóa**: Cron job gửi email nhắc lịch hẹn; gửi đơn thuốc sau khám.
- **Đa ngôn ngữ**: Hỗ trợ tiếng Việt và tiếng Anh (i18n).

---

## 🏗 Kiến trúc hệ thống

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           BOOKINGCARE HEALTHCARE                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌──────────────┐     REST API      ┌──────────────┐    HTTPS          │
│   │   React.js   │ ◄───────────────► │  Node.js     │ ◄──────────────►  │
│   │   Frontend   │                   │  Express     │     Gemini AI     │
│   │   (Redux)    │                   │  Backend     │     (Chatbot)     │
│   └──────────────┘                   └──────┬───────┘                   │
│          │                                   │                           │
│          │                                   │ Sequelize                 │
│          │                                   ▼                           │
│          │                            ┌──────────────┐                   │
│          │                            │    MySQL     │                   │
│          │                            │   Database   │                   │
│          │                            └──────────────┘                   │
│          │                                   │                           │
│          │                          Nodemailer / node-cron                │
│          │                          MoMo Payment Gateway                 │
│          ▼                                   ▼                           │
│   ┌──────────────┐                   ┌──────────────┐                    │
│   │  Email UX    │                   │  Email +     │                    │
│   │  (Verify,    │                   │  Cron Remind │                    │
│   │   Remedy)    │                   │  MoMo IPN    │                    │
│   └──────────────┘                   └──────────────┘                    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Đồng bộ dữ liệu

- **Frontend ↔ Backend**: RESTful API chuẩn; CORS được cấu hình để kết nối an toàn.
- **Backend ↔ AI Chatbot**: Proxy API `/api/ai-chat` gọi Gemini; Frontend gọi Backend, Backend gọi Gemini — đảm bảo bảo mật API key và luồng dữ liệu thống nhất.
- **Backend ↔ MySQL**: Sequelize ORM, migrations chuẩn, quan hệ rõ ràng giữa User, Booking, Doctor, Schedule, Specialty, Clinic, Handbook.

---

## 🛠 Công nghệ sử dụng

| Thành phần | Công nghệ |
|------------|-----------|
| **Backend** | Node.js, Express.js |
| **Database** | MySQL 8, Sequelize (ORM) |
| **Frontend** | React 17, Redux, React Router, Bootstrap, Formik, Yup |
| **AI Chatbot** | Google Gemini API (generateContent) |
| **Email** | Nodemailer (Gmail SMTP) |
| **Định thời** | node-cron (nhắc lịch hẹn) |
| **Thanh toán** | MoMo Payment Gateway (sandbox) |
| **Bảo mật** | bcrypt (mật khẩu), CORS, body limit |

---

## 📁 Cấu trúc repository

```
kltn_group16/
├── README.md                 # File này
├── doantotnghiep (3).sql     # Script database (reference)
├── kltn-node-healthcare/     # Backend (Node.js + Express)
│   ├── src/
│   │   ├── config/           # DB, view engine
│   │   ├── controllers/     # Auth, User, Doctor, Patient, Specialty, Clinic, Handbook, MoMo
│   │   ├── migrations/      # Sequelize migrations
│   │   ├── models/          # User, Booking, Doctor_info, Schedule, Specialty, Clinic, Handbook, Allcode, ...
│   │   ├── payments/        # MoMo integration
│   │   ├── route/           # initWebRoutes
│   │   ├── routes/          # aiChatRoute, momoRoute
│   │   ├── services/        # auth, patient, doctor, email, clinic, specialty, handbook
│   │   ├── utils/
│   │   └── server.js
│   └── package.json
├── kltn-react-healthcare/    # Frontend (React)
│   ├── src/
│   │   ├── components/      # Chat AI, Search, Navigator, Form, ...
│   │   ├── containers/      # App, Auth, System (Admin), Patient, Doctor
│   │   ├── routes/          # Home, Login, System, Doctor
│   │   ├── services/        # userService, adminService
│   │   ├── store/           # Redux actions & reducers
│   │   ├── translations/    # vi.json, en.json
│   │   └── config.js        # API_BASE_URL
│   └── package.json
└── kltn-word-bao-cao/       # Tài liệu dự án (User Story, Test, DB, ...)
```

---

## 🚀 Cài đặt & Chạy dự án

### Yêu cầu

- Node.js >= 16
- MySQL >= 8.0
- Yarn hoặc npm

### 1. Clone repository

```bash
git clone https://github.com/Khoa-CNTT/NCVXDWYT1285.git
cd NCVXDWYT1285
```

### 2. Backend (Node.js)

```bash
cd kltn-node-healthcare
cp .env.example .env   # Tạo .env (nếu có), chỉnh DB và EMAIL_APP, EMAIL_APP_PASSWORD
npm install
# Tạo database MySQL tên doantotnghiep (hoặc theo config)
npx sequelize-cli db:migrate
npm start
```

Backend chạy mặc định tại **http://localhost:8080**.

**Biến môi trường gợi ý** (`.env`):

- `PORT=8080`
- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` (hoặc dùng `config/config.json`)
- `EMAIL_APP`, `EMAIL_APP_PASSWORD` (Gmail app password)
- `URL_REACT=http://localhost:3000` (để link xác nhận booking đúng)

### 3. Frontend (React)

```bash
cd kltn-react-healthcare
npm install
npm start
```

Frontend chạy tại **http://localhost:3000**. Đảm bảo `config.js` trỏ `API_BASE_URL` tới Backend (vd: `http://localhost:8080/`).

### 4. AI Chatbot

Chatbot dùng **Google Gemini API** qua route Backend `POST /api/ai-chat`. Cấu hình API key tại Backend (ví dụ trong `routes/aiChatRoute.js` hoặc qua biến môi trường). Frontend gọi Backend, Backend gọi Gemini — không cần cấu hình thêm ở Frontend ngoài URL API.

---

## 📡 API chính (Backend)

| Nhóm | Method | Endpoint | Mô tả |
|------|--------|----------|--------|
| **Auth** | POST | `/api/login` | Đăng nhập |
| | POST | `/api/auth/forgot-password` | Quên mật khẩu (gửi email đặt lại) |
| **User** | GET | `/api/get-all-users` | Danh sách user (theo role) |
| | POST | `/api/create-new-user` | Tạo user |
| | PUT | `/api/edit-user` | Sửa user |
| **Doctor** | GET | `/api/top-doctor-home` | Bác sĩ nổi bật |
| | GET | `/api/get-detail-doctor-by-id` | Chi tiết bác sĩ |
| | POST | `/api/bulk-create-schedule` | Tạo lịch khám |
| | GET | `/api/get-schedule-doctor-by-date` | Lịch theo ngày |
| | POST | `/api/send-remedy` | Gửi đơn thuốc (email) |
| **Patient / Booking** | POST | `/api/patient-book-appointment` | Đặt lịch (gửi email xác nhận) |
| | POST | `/api/verify-book-appointment` | Xác nhận lịch (token) |
| | GET | `/api/get-list-patient-by-user-id` | Lịch sử đặt lịch của user |
| **Specialty / Clinic / Handbook** | GET/POST | `/api/get-all-specialty`, `/api/create-new-specialty`, ... | CRUD chuyên khoa, cơ sở, cẩm nang |
| **AI** | POST | `/api/ai-chat` | Chat với AI (Gemini) |
| **Payment** | POST | `/api/payments/momo` | Tạo link thanh toán MoMo |

---

## 🗄 Database (MySQL)

Các bảng chính (Sequelize models / migrations):

- **users** – Tài khoản (Admin, Bác sĩ, Bệnh nhân)
- **doctor_infor**, **markdown** – Thông tin & mô tả bác sĩ
- **schedules** – Lịch khám theo bác sĩ
- **bookings** – Đặt lịch (token xác nhận, status)
- **specialties**, **clinics** – Chuyên khoa, cơ sở y tế
- **handbooks** – Cẩm nang sức khỏe
- **allcodes** – Mã hệ thống (role, gender, time, status)

Quan hệ: User ↔ Booking ↔ Doctor, Schedule, Allcode; Doctor ↔ Specialty, Clinic (doctor_clinic_specialty).

---

## 👥 Phân quyền & Luồng nghiệp vụ

- **Admin**: Quản lý user, bác sĩ, chuyên khoa, phòng khám, cẩm nang, bệnh nhân (lịch hẹn).
- **Bác sĩ**: Quản lý lịch khám, danh sách bệnh nhân, gửi đơn thuốc, đổi mật khẩu.
- **Bệnh nhân**: Xem bác sĩ/chuyên khoa/phòng khám, đặt lịch, xác nhận qua email, xem lịch sử đặt lịch; dùng Chat AI và thanh toán MoMo (nếu bật trên giao diện).

---

## 📄 Tài liệu bổ sung

- Thư mục **kltn-word-bao-cao/** chứa tài liệu dự án: User Story, Product Backlog, Database, Test Plan, Test Case, Meeting Report, Configuration Management, Reflection.

---

## 📌 Tóm tắt:

- **Dự án**: Nền tảng đặt lịch khám trực tuyến (BookingCare Healthcare), tích hợp AI chatbot và quản lý hồ sơ bệnh nhân.
- **Thiết kế hệ thống**: Kiến trúc đồng bộ dữ liệu giữa Frontend, Backend và dịch vụ AI Chatbot.
- **Backend**: RESTful API bảo mật (Node.js/Express) cho đặt lịch, quản lý bệnh nhân, tư vấn sức khỏe tự động (email, cron, đơn thuốc).
- **Công nghệ**: Node.js, Express, MySQL, React.js, tích hợp AI Chatbot (Gemini), Nodemailer, MoMo, Sequelize.

---

**BookingCare Healthcare** — NCVXDWYT1285 • [GitHub](https://github.com/Khoa-CNTT/NCVXDWYT1285)
