---
title: "Performance 101: Vì sao JavaScript chậm – và cách mình tối ưu code web"
date: 2025-10-05
categories: ["programming"]
tags: ["javascript"]
author: "Tiết Thanh Minh Hiếu"
description: "Chia sẻ về cách JavaScript xử lý, vì sao có thể trở nên chậm trong các ứng dụng web lớn, và những kinh nghiệm mình rút ra khi tối ưu hiệu năng thực tế."
image: "thumbnail.png"
showToc: true
keywords:
  [
    "javascript performance",
    "web optimization",
    "dom manipulation",
    "async",
    "frontend speed",
  ]
---

Trong một dự án nhỏ, có thể bạn không nhận ra JavaScript chậm.  
Nhưng khi ứng dụng web của bạn bắt đầu phình ra, chạy trên trình duyệt cũ, hoặc xử lý hàng nghìn phần tử DOM – mọi thứ bắt đầu trở nên “giật”.

Bài viết này mình muốn chia sẻ lại **những nguyên nhân chính khiến JavaScript chậm** và **cách mình đã tối ưu chúng trong thực tế**, đặc biệt khi làm việc với web interface phức tạp.

---

## 1. JavaScript chạy đơn luồng – đây là điểm xuất phát

Không như Java hay C++ có đa luồng thực sự, JavaScript chỉ có **một luồng chính (main thread)** để:

- Render giao diện,
- Xử lý event,
- Chạy code logic của bạn.

Điều này có nghĩa:

> Nếu một tác vụ chạy quá lâu, nó sẽ **chặn toàn bộ giao diện** – khiến người dùng tưởng web bị đơ.

Ví dụ:

```javascript
for (let i = 0; i < 1e9; i++) {} // vòng lặp "đốt CPU"
console.log("Xong rồi!");
```

Trong lúc vòng lặp này chạy, người dùng không thể click hay cuộn trang.

---

## 2. Tối ưu vòng lặp và thuật toán

Một trong những “tội đồ” phổ biến nhất là **vòng lặp kém hiệu quả**.
Ví dụ so sánh nhỏ:

```javascript
// Cách 1: gọi querySelectorAll trong mỗi vòng lặp (rất chậm)
for (let i = 0; i < document.querySelectorAll(".item").length; i++) {
  document.querySelectorAll(".item")[i].classList.add("active");
}

// Cách 2: cache lại kết quả
const items = document.querySelectorAll(".item");
for (let i = 0; i < items.length; i++) {
  items[i].classList.add("active");
}
```

Khác biệt hiệu năng có thể gấp **hàng chục lần** nếu số phần tử lớn.
→ Bài học: **giảm số lần thao tác lặp hoặc truy vấn DOM**.

---

## 3. DOM Manipulation – vấn đề lớn nhất

Mỗi khi bạn chỉnh sửa DOM, trình duyệt phải **repaint** hoặc **reflow** – tức là tính toán lại layout.
Thao tác này tốn thời gian, đặc biệt khi có nhiều phần tử con.

Cách mình thường áp dụng:

### ✅ Thay vì thêm từng phần tử:

```javascript
for (let i = 0; i < 1000; i++) {
  const el = document.createElement("div");
  el.textContent = i;
  document.body.appendChild(el);
}
```

### 👉 Hãy dùng Document Fragment:

```javascript
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const el = document.createElement("div");
  el.textContent = i;
  fragment.appendChild(el);
}
document.body.appendChild(fragment);
```

Kỹ thuật này giảm đáng kể thời gian reflow.

---

## 4. Async & Web Worker – “chia nhỏ công việc nặng”

Khi gặp tác vụ xử lý dữ liệu lớn, đừng để main thread gánh hết.
Hãy chuyển sang **Web Worker** – nơi có thể xử lý song song mà không chặn UI.

Ví dụ cơ bản:

```javascript
// main.js
const worker = new Worker("worker.js");

worker.postMessage("bắt đầu tính toán");

worker.onmessage = (e) => {
  console.log("Kết quả:", e.data);
};

// worker.js
onmessage = (e) => {
  let sum = 0;
  for (let i = 0; i < 1e8; i++) sum += i;
  postMessage(sum);
};
```

Với Web Worker, người dùng vẫn có thể thao tác giao diện trong khi tác vụ nặng được xử lý ở nền.

---

## 5. Lazy Loading – chỉ tải khi cần

Đừng tải mọi thứ ngay lập tức.
Mình từng giảm **thời gian tải ban đầu 40%** chỉ bằng cách lazy load hình ảnh và script phụ.

Ví dụ với ảnh:

```html
<img loading="lazy" src="thumbnail.png" alt="Ảnh demo" />
```

Hoặc với code:

```javascript
// Chỉ load module khi người dùng nhấn nút
button.addEventListener("click", async () => {
  const module = await import("./chart.js");
  module.renderChart();
});
```

---

## 6. Debounce và Throttle – kiểm soát tần suất sự kiện

Các sự kiện như `scroll` hoặc `resize` có thể gọi hàng trăm lần mỗi giây.
Không kiểm soát tốt → trình duyệt “đuối”.

Ví dụ:

```javascript
window.addEventListener("scroll", () => {
  console.log("Đang cuộn...");
});
```

Thay vì gọi liên tục, ta nên **debounce**:

```javascript
function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

window.addEventListener(
  "scroll",
  debounce(() => {
    console.log("Cuộn xong rồi!");
  }, 200)
);
```

---

## 7. Tư duy tối ưu – không chỉ là code

Sau nhiều lần tối ưu, mình nhận ra:

> Performance không chỉ nằm ở vài dòng code, mà ở **cách mình tổ chức toàn bộ luồng dữ liệu và UI**.

Một vài thói quen giúp cải thiện hiệu năng đáng kể:

- **Giảm phụ thuộc vào DOM trực tiếp**, dùng virtual DOM hoặc state management.
- **Giảm kích thước script** (minify, tree-shaking).
- **Tách code hợp lý** để tải nhanh hơn.
- **Đo lường trước khi tối ưu**, dùng Chrome DevTools hoặc Lighthouse.

---

## 8. Kết luận

JavaScript không thật sự “chậm” – chỉ là **nó thành thật với cách ta viết code**.
Nếu hiểu cách trình duyệt hoạt động, mỗi dòng tối ưu đều mang lại khác biệt rõ rệt.

Đối với mình, quá trình tối ưu code không chỉ giúp web chạy nhanh hơn,
mà còn giúp rèn luyện tư duy logic, khả năng đo lường và kiên nhẫn –
những phẩm chất cốt lõi của một lập trình viên chuyên nghiệp.

---

_Keep learning, keep coding._
