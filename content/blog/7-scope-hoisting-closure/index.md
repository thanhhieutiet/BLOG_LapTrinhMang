---
title: "Scope, Hoisting và Closure: Khi JavaScript 'ma thuật' hơn bạn nghĩ"
date: 2025-09-17
categories: ["programming"]
tags: ["javascript", "scope", "closure", "hoisting"]
author: "Tiết Thanh Minh Hiếu"
description: "Giải thích dễ hiểu về Scope, Hoisting và Closure trong JavaScript – những khái niệm từng khiến mình 'vỡ đầu' khi học Cisco Academy."
image: "thumbnail.png"
keywords:
  [
    "javascript essentials",
    "scope",
    "hoisting",
    "closure",
    "cisco academy",
    "feynman learning",
  ]
draft: true
---

Chào mọi người!

Nếu bạn từng học **JavaScript Essentials 1 hoặc 2** của Cisco Academy, chắc hẳn đã gặp ba "từ khóa huyền thoại": **Scope**, **Hoisting** và **Closure**.

Chúng từng khiến mình vò đầu bứt tóc suốt mấy ngày, cho đến khi mình thử giải thích lại cho người khác — và đó cũng là lúc mình thật sự hiểu chúng (phong cách Feynman đúng nghĩa).

---

## Scope – Biến sống ở đâu?

### Câu chuyện thực tế

Khi mình mới học JS, mình nghĩ "biến khai báo xong thì ở đâu cũng dùng được".

Cho đến khi đoạn code sau khiến mình ngã ngửa:

```javascript
function sayHi() {
  let name = "MinhHieu";
}
console.log(name); // ReferenceError: name is not defined
```

### Giải thích theo kiểu dễ hiểu

**Scope là phạm vi sống của biến.**

Biến chỉ tồn tại trong block `{}` nơi nó được khai báo.

Trong JS có 3 loại scope chính:

- **Global Scope** – tồn tại mọi nơi.
- **Function Scope** – chỉ trong hàm.
- **Block Scope** – với let và const.

Tưởng tượng: Scope như căn nhà, mỗi biến chỉ được phép "ra ngoài chơi" trong khu vực được cấp phép.

---

## Hoisting – JavaScript "kéo lên" mọi thứ ra sao?

Khi mới học, mình từng thắc mắc: "Tại sao có thể dùng biến trước khi khai báo mà không lỗi?"

```javascript
console.log(a); // undefined
var a = 5;
```

### Thực ra chuyện gì xảy ra?

JavaScript đọc code hai lần:

1. Lần đầu kéo khai báo lên đầu (hoisting).
2. Lần hai thực thi code.

Vậy nên đoạn trên tương đương:

```javascript
var a; // được hoisted
console.log(a);
a = 5;
```

### Nhưng cẩn thận!

`let` và `const` không hoisting theo cách cũ — chúng bị "đặt vào vùng chết tạm thời (TDZ)".

Nếu dùng trước khi khai báo, sẽ lỗi ngay:

```javascript
console.log(b); // ReferenceError
let b = 10;
```

**Bài học:** Hãy luôn khai báo biến ở đầu scope để tránh "ảo giác hoisting".

---

## Closure – Khi function nhớ được mọi thứ

Đây là phần khiến mình mất nhiều thời gian nhất khi học Cisco Academy.

Mình từng nghĩ mỗi lần function chạy xong thì mọi biến bên trong biến mất. Nhưng đoạn sau lại cho kết quả bất ngờ:

```javascript
function counter() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  };
}

const add = counter();
add(); // 1
add(); // 2
add(); // 3
```

### Giải thích theo phong cách Feynman

1. Mỗi khi `counter()` chạy, JS tạo một môi trường (environment) riêng.
2. Function bên trong vẫn nhớ môi trường đó — dù `counter()` đã kết thúc.
3. Đó chính là closure: function ghi nhớ biến từ "ngôi nhà cũ" của nó.

**Liên hệ với Java:**
Java không có closure đúng nghĩa, nhưng hành vi tương tự có thể thấy khi dùng inner class hoặc lambda expression giữ reference đến biến bên ngoài.

---

## Khi ba khái niệm này gặp nhau

Một đoạn "combo bug" kinh điển mà mình từng gặp:

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// Kết quả: 3, 3, 3
```

### Vì sao?

- `var` không có block scope → chỉ có 1 biến `i` được hoisted lên.
- Khi setTimeout chạy, `i` đã bằng 3 rồi.

### Cách sửa đơn giản

```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// Kết quả: 0, 1, 2 (đúng rồi!)
```

---

## Tổng kết & Bài học mình rút ra

| Khái niệm | Mô tả ngắn gọn                      | Ghi nhớ nhanh                       |
| --------- | ----------------------------------- | ----------------------------------- |
| Scope     | Biến sống trong phạm vi nhất định   | "Ai sinh ở đâu, ở đó dùng"          |
| Hoisting  | JS kéo khai báo lên đầu scope       | "Cứ tưởng lỗi, hóa ra JS tốt bụng"  |
| Closure   | Function nhớ biến của môi trường cũ | "Ký ức function không bao giờ quên" |

---

## Gợi ý ảnh minh họa

- **Ảnh 1:** sơ đồ 3 vòng tròn: Global → Function → Block Scope
- **Ảnh 2:** Event loop + closure environment đơn giản
- **Ảnh 3 (thumbnail):** hình kiểu "JS Magic Hat" hoặc "Scope vs Closure" (Unsplash / AI generate)

---

## Lời kết

Ba khái niệm này là "cửa ải" đầu tiên mà ai học JavaScript cũng phải vượt qua.

Khi mình ngừng cố nhớ lý thuyết, và bắt đầu giải thích lại bằng ví dụ thật, mọi thứ trở nên dễ dàng hơn rất nhiều.

Còn bạn thì sao? Có "cú lừa" nào với scope hay closure khiến bạn nhớ mãi không quên không? Comment chia sẻ nhé!

Keep learning, keep coding, and don't fear the magic of JavaScript!
