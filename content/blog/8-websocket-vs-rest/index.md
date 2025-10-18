---
title: "WebSocket & REST: Hai cách nói chuyện khác nhau giữa client và server"
date: 2025-08-19
categories: ["programming"]
tags: ["javascript", "java", "websocket", "rest", "networking"]
author: "Tiết Thanh Minh Hiếu"
description: "REST và WebSocket khác nhau thế nào? Một bên nói từng câu, một bên trò chuyện liên tục — cùng khám phá sự khác biệt qua ví dụ dễ hiểu!"
image: "thumbnail.png"
showToc: true
keywords:
  [
    "rest api",
    "websocket",
    "client-server",
    "javascript",
    "java",
    "feynman learning",
  ]
---

Chào các bạn 👋  
Nếu bạn từng viết API bằng **Spring Boot** hoặc **Node.js/Express**, chắc hẳn đã nghe qua hai cái tên quen thuộc: **REST** và **WebSocket**.  
Lúc đầu, mình cứ nghĩ chúng "na ná" nhau — đều là cách client nói chuyện với server thôi mà.  
Nhưng hoá ra… **một bên là “gửi thư tay”, còn một bên là “trò chuyện qua điện thoại”** 📞.  
Cùng mình bóc tách nhé 👇

---

## 1️⃣ REST là gì? – “Gửi thư tay” có trật tự 📬

REST (Representational State Transfer) là **cách giao tiếp truyền thống trên web**, sử dụng **HTTP request/response**.

### Cách hoạt động:

- Client gửi **request** (thư tay) đến địa chỉ (endpoint).
- Server trả lại **response** (bức thư hồi âm).
- Mỗi lần trao đổi là **một phiên độc lập**, không nhớ gì về lần trước.

```javascript
// Gửi request REST từ client (JS)
fetch("https://api.example.com/users/1")
  .then((res) => res.json())
  .then((data) => console.log(data));
```

💡 Trong Java, có thể dùng `RestTemplate` hoặc `WebClient`:

```java
RestTemplate rest = new RestTemplate();
User user = rest.getForObject("https://api.example.com/users/1", User.class);
```

### Ưu điểm:

✅ Dễ hiểu, dễ debug, được hỗ trợ ở mọi framework.
✅ Rất phù hợp cho CRUD (Create, Read, Update, Delete).

### Nhược điểm:

❌ Không phù hợp cho real-time (chat, thông báo, game...).
❌ Mỗi request phải mở – đóng kết nối → tốn tài nguyên khi liên tục gửi dữ liệu.

---

## 2️⃣ WebSocket là gì? – “Trò chuyện qua điện thoại” ☎️

WebSocket là giao thức **giao tiếp hai chiều, liên tục**, được xây dựng trên TCP.
Một khi kết nối mở, **client và server có thể gửi dữ liệu cho nhau bất cứ lúc nào** — không cần request lại.

```javascript
// Client JavaScript
const socket = new WebSocket("ws://localhost:8080/chat");

socket.onopen = () => {
  console.log("Connected to server!");
  socket.send("Hello from client!");
};

socket.onmessage = (event) => {
  console.log("Server says:", event.data);
};
```

💡 Bên Java (Spring Boot) có thể dùng `@ServerEndpoint` hoặc `STOMP over WebSocket`.

### Ưu điểm:

✅ Real-time – dữ liệu cập nhật ngay lập tức.
✅ Kết nối ổn định, ít overhead hơn HTTP request liên tục.

### Nhược điểm:

❌ Phức tạp hơn khi triển khai, cần xử lý reconnect, timeout, security.
❌ Không lý tưởng cho các API thuần dữ liệu (ví dụ GET/POST đơn giản).

---

## 3️⃣ REST vs WebSocket – Hai phong cách nói chuyện khác nhau

| Đặc điểm                   | REST API                     | WebSocket                      |
| -------------------------- | ---------------------------- | ------------------------------ |
| **Kiểu giao tiếp**         | Request/Response (một chiều) | Full-duplex (hai chiều)        |
| **Kết nối**                | Mở và đóng mỗi lần gọi       | Giữ kết nối lâu dài            |
| **Dữ liệu real-time**      | Không                        | Có                             |
| **Độ phức tạp triển khai** | Dễ                           | Trung bình – cao               |
| **Ứng dụng điển hình**     | API web, mobile app          | Chat app, dashboard, game, IoT |

💡 **Tưởng tượng:**

- REST: Mỗi lần bạn muốn nói chuyện, bạn viết thư, gửi đi, chờ trả lời.
- WebSocket: Cầm điện thoại nói chuyện trực tiếp — phản hồi ngay.

---

## 4️⃣ Khi nào nên chọn REST, khi nào chọn WebSocket?

| Tình huống                                             | Giải pháp tốt nhất |
| ------------------------------------------------------ | ------------------ |
| Gửi/nhận dữ liệu tĩnh (user info, bài viết, sản phẩm)  | REST API           |
| Cập nhật dữ liệu real-time (chat, bảng giá coin, game) | WebSocket          |
| Hệ thống lớn cần cache/CDN                             | REST               |
| Dashboard cập nhật liên tục                            | WebSocket          |

🧩 Nhiều ứng dụng hiện đại **kết hợp cả hai**:

- REST để load dữ liệu ban đầu
- WebSocket để cập nhật real-time sau đó

---

## 5️⃣ Demo nhỏ: Chat app mini 💬

Giả sử mình tạo app chat giữa client và server:

**JavaScript (Client):**

```javascript
const socket = new WebSocket("ws://localhost:8080/chat");
socket.onmessage = (event) => console.log("New message:", event.data);

// Gửi tin nhắn
socket.send("Hello from client!");
```

**Spring Boot (Server):**

```java
@ServerEndpoint("/chat")
public class ChatEndpoint {
    @OnMessage
    public void onMessage(Session session, String message) throws IOException {
        System.out.println("Received: " + message);
        session.getBasicRemote().sendText("Server received: " + message);
    }
}
```

➡️ Kết quả: Client và server _nói chuyện trực tiếp_, không cần request lại liên tục.

---

## 6️⃣ Tổng kết – Hai ngôn ngữ, hai phong cách giao tiếp

| Java                              | JavaScript                       |
| --------------------------------- | -------------------------------- |
| Spring Boot REST / WebSocket      | Fetch API / Native WebSocket     |
| Phù hợp hệ thống lớn, typing chặt | Linh hoạt, dễ debug, học nhanh   |
| “Backend nói chuyện nghiêm túc”   | “Frontend nói chuyện nhanh nhẹn” |

💡 Cả hai đều quan trọng — hiểu REST giúp bạn **thiết kế API tốt**, hiểu WebSocket giúp bạn **xây app real-time hiện đại**.

---

### 📸 Gợi ý ảnh minh họa:

- Ảnh 1: sơ đồ REST (request-response arrows)
- Ảnh 2: sơ đồ WebSocket (kết nối 2 chiều liên tục)
- Ảnh 3 (thumbnail): hình vui kiểu “REST vs WebSocket boxing match” 🥊

---

### 💬 Lời kết

Lúc mới học, mình từng chọn sai công cụ chỉ vì “nghe tên hay hơn”.
Giờ thì mình hiểu: **REST và WebSocket không đối thủ, mà là đồng đội.**
Cái hay là học được _khi nào nên nói chậm, khi nào nên nói nhanh_ – như trong giao tiếp thật vậy 😄

---

_Keep learning, keep coding, and let your apps talk smarter! ⚡_
