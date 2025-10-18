---
title: "Lỗi logic trong JavaScript: Khi code chạy đúng mà sai"
date: 2025-10-02
categories: ["programming"]
tags: ["javascript", "bug", "logic", "debug"]
author: "Tiết Thanh Minh Hiếu"
description: "Những lỗi logic trong JavaScript thường không gây lỗi cú pháp nhưng khiến chương trình hoạt động sai cách. Cùng nhìn lại những tình huống 'chạy đúng mà sai' và cách mình học được từ chúng."
image: "thumbnail.png"
showToc: true
keywords: ["javascript", "logic error", "bug", "debugging", "feynman learning"]
---

Khi học JavaScript, có lẽ ai cũng từng trải qua cảm giác này:  
**Code chạy được, không báo lỗi, nhưng kết quả lại chẳng đúng như mong đợi.**  
Đó chính là loại lỗi “đáng sợ” nhất – **logic error**.

Khác với lỗi cú pháp (syntax error), lỗi logic không khiến chương trình dừng lại, mà âm thầm khiến nó chạy sai.  
Trong bài viết này, mình muốn chia sẻ một số lỗi logic kinh điển mà chính mình từng mắc, và cách tư duy lại để tránh chúng về sau.

---

## 1. So sánh lỏng lẻo (`==`) – Kẻ gây hiểu lầm phổ biến

```javascript
console.log(0 == false); // true
console.log("" == 0); // true
console.log(null == undefined); // true
```

Nếu bạn chỉ nhìn kết quả, có thể tưởng JavaScript “tự thông minh” hiểu ý mình.
Thực ra, đây là do cơ chế **type coercion** – JavaScript tự chuyển đổi kiểu dữ liệu trước khi so sánh.

Cách khắc phục đơn giản:

- Luôn dùng **so sánh nghiêm ngặt (`===`)**
- Hoặc, khi cần so sánh linh hoạt, hãy _rõ ràng về ý định_ trước khi viết.

```javascript
console.log(0 === false); // false
console.log("" === 0); // false
```

---

## 2. Floating point – Khi số không còn chính xác

```javascript
console.log(0.1 + 0.2); // 0.30000000000000004
```

Máy tính không lưu trữ số thập phân chính xác tuyệt đối.
Lỗi này không chỉ riêng JavaScript, mà hầu hết các ngôn ngữ lập trình đều có.

Giải pháp:

- Khi cần so sánh số thực, nên dùng **khoảng sai số (epsilon)** thay vì so sánh trực tiếp.

```javascript
function nearlyEqual(a, b) {
  return Math.abs(a - b) < Number.EPSILON;
}

console.log(nearlyEqual(0.1 + 0.2, 0.3)); // true
```

---

## 3. Closure và vòng lặp – Lỗi logic “điển hình”

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
```

Kết quả:

```
3
3
3
```

Mình từng mất cả tiếng chỉ để hiểu tại sao ba lần in ra đều là 3.
Nguyên nhân: `var` không có **block scope**, nên tất cả callback đều dùng chung một biến `i`.

Cách sửa:

- Dùng `let` để tạo scope riêng cho từng vòng lặp.

```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
```

---

## 4. Hiểu sai về `this`

Lỗi logic với `this` rất phổ biến, đặc biệt khi chuyển từ Java sang JavaScript.

Ví dụ:

```javascript
const user = {
  name: "Hiếu",
  greet() {
    console.log(`Xin chào, ${this.name}`);
  },
};

const greetFunc = user.greet;
greetFunc(); // undefined
```

Khi tách `greet` ra khỏi object, giá trị `this` mất ngữ cảnh.
Giải pháp:

- Dùng **arrow function** khi cần giữ ngữ cảnh.
- Hoặc **bind** lại giá trị `this` mong muốn.

```javascript
const greetFuncBound = user.greet.bind(user);
greetFuncBound(); // Xin chào, Hiếu
```

---

## 5. Kiểm tra giá trị `NaN`

`NaN` (Not-a-Number) có một tính chất đặc biệt:
Nó **không bằng chính nó**.

```javascript
console.log(NaN === NaN); // false
```

Nếu bạn từng viết điều kiện kiểu:

```javascript
if (value === NaN) {
  // Không bao giờ vào đây
}
```

thì đây chính là một lỗi logic.
Giải pháp:

```javascript
if (isNaN(value)) {
  console.log("Giá trị không hợp lệ");
}
```

---

## 6. Khi code “đúng” nhưng tư duy “sai”

Một bài học mình rút ra từ những lỗi logic là:

> Đôi khi code đúng cú pháp, đúng trình tự, nhưng sai vì mình chưa hiểu đủ bản chất.

Ví dụ, khi xử lý bất đồng bộ mà không hiểu Event Loop, ta dễ viết code “chạy được nhưng không đúng thứ tự”.
Từ đó, mình học được rằng **hiểu sâu cơ chế của ngôn ngữ quan trọng hơn thuộc cú pháp.**

---

## 7. Cách rèn luyện để tránh lỗi logic

1. **Viết code chậm lại, đọc kỹ điều kiện.**
2. **In ra giá trị trung gian (`console.log`) thay vì đoán.**
3. **Đặt tên biến có ý nghĩa**, tránh nhầm lẫn.
4. **Viết test nhỏ** cho từng hàm, kể cả khi project không lớn.
5. **Giải thích lại code của mình bằng lời nói** – cách Feynman luôn khuyên.

---

## 8. Kết luận

Lỗi logic là phần “con người” nhất trong lập trình.
Máy tính luôn đúng, chỉ có chúng ta hiểu sai.
Nhưng chính nhờ những lần “chạy đúng mà sai”, mình hiểu sâu hơn về JavaScript, về cách máy hoạt động, và về chính cách mình tư duy.

Học cách đọc lỗi, hiểu lỗi, và sửa lỗi – đó cũng là cách học hiệu quả nhất mà mình từng trải qua.

---

_Keep learning, keep coding._
