import express from "express";

let configViewEngine = (app) => {
    app.use(express.static("./src/public")); // Sử dụng middleware  để chỉ định thư mục tĩnh () chứa các tài nguyên tĩnh như hình ảnh, CSS, hoặc JavaScript.
    // Cho phép các tài nguyên trong thư mục  được truy cập trực tiếp từ trình duyệt. Ví dụ: nếu có một file hình ảnh  trong thư mục này, nó có thể được truy cập qua URL như .
    app.set("view engine","ejs"); // Cho phép sử dụng  (Embedded JavaScript) để tạo các file HTML động. Đây là một trong những view engine phổ biến trong Express.
    app.set("views","./src/views") // Khi sử dụng  để render HTML, Express sẽ tìm kiếm các file template trong thư mục này.
}

module.exports = configViewEngine; // File này trở thành module chứa logic cấu hình view engine. Hàm  có thể được import và sử dụng trong các file khác, như file cấu hình chính của ứng dụng ( hoặc ).

// ==>tóm lại file viewEngine.js cho phép : 
// Truy cập các file tĩnh trong thư mục ./src/public
// Sử dụng  để render HTML động từ thư mục ./src/views

