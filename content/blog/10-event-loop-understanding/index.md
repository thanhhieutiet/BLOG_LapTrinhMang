---
title: "Tư duy bất đồng bộ trong thực tế: Event Loop hoạt động ra sao?"
date: 2025-10-01
categories: ["programming"]
tags: ["javascript", "event loop", "asynchronous", "nodejs"]
author: "Tiết Thanh Minh Hiếu"
description: "Giải thích cách JavaScript xử lý bất đồng bộ thông qua Event Loop, Stack, Queue và cơ chế thực thi, dựa trên ví dụ thực tế và tư duy Feynman."
image: "thumbnail.png"
showToc: true
keywords:
  [
    "javascript",
    "event loop",
    "asynchronous",
    "microtask",
    "callback queue",
    "nodejs",
  ]
---

Khi mới học JavaScript, mình từng thắc mắc:  
**Làm sao một ngôn ngữ chạy đơn luồng mà vẫn xử lý được nhiều việc cùng lúc?**  
Câu trả lời nằm ở một cơ chế đặc biệt: **Event Loop**.

Hiểu Event Loop không chỉ giúp viết code bất đồng bộ hiệu quả hơn,  
mà còn giúp chúng ta rèn luyện một tư duy rất quan trọng trong lập trình:  
**Tư duy chờ đợi và sắp xếp công việc.**

---

## 1. Bất đồng bộ – khái niệm thường bị hiểu sai

Nhiều người nghĩ “bất đồng bộ” nghĩa là “đa luồng”, nhưng điều này không đúng trong JavaScript.  
JS vẫn chỉ có **một luồng chính (single thread)** để thực thi code, nhưng nó biết **ủy quyền công việc** cho môi trường xung quanh (browser hoặc Node.js runtime) để không bị chặn.

Ví dụ đơn giản:

```javascript
console.log("Bắt đầu");

setTimeout(() => {
  console.log("Đã chờ 2 giây");
}, 2000);

console.log("Kết thúc");
```

Kết quả in ra:

```
Bắt đầu
Kết thúc
Đã chờ 2 giây
```

Dù `setTimeout` đặt ở giữa, dòng “Đã chờ 2 giây” lại xuất hiện cuối cùng.
Vì sao lại thế?
Bởi JavaScript **đưa công việc chờ** cho môi trường bên ngoài xử lý,
và chỉ khi mọi việc trong **call stack** xong xuôi, nó mới **lặp lại (loop)** để kiểm tra hàng đợi (queue).

---

## 2. Cấu trúc cơ bản của Event Loop

Event Loop hoạt động dựa trên 3 thành phần chính:

1. **Call Stack** – nơi các hàm được thực thi tuần tự.
2. **Callback Queue** – nơi chứa các hàm chờ được chạy sau khi công việc bất đồng bộ hoàn tất.
3. **Event Loop** – “người gác cổng”, kiểm tra xem Stack có trống chưa. Nếu trống, lấy hàm từ Queue lên thực thi.

Hình dung đơn giản:

> Call Stack là sân khấu.
> Callback Queue là hàng chờ sau cánh gà.
> Event Loop là người điều phối, đảm bảo chỉ có một người biểu diễn trên sân khấu tại một thời điểm.

---

## 3. Microtask và Macrotask – điều ít ai để ý

Không phải tất cả callback đều “bình đẳng”.
JavaScript chia công việc bất đồng bộ thành **2 loại hàng chờ**:

| Loại                | Ví dụ thường gặp                 | Thời điểm thực thi                       |
| ------------------- | -------------------------------- | ---------------------------------------- |
| **Macrotask Queue** | `setTimeout`, `setInterval`, I/O | Sau khi Stack rỗng                       |
| **Microtask Queue** | `Promise.then`, `queueMicrotask` | Thực thi ngay sau Stack, trước Macrotask |

Ví dụ:

```javascript
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");
```

Kết quả:

```
A
D
C
B
```

Promise (`C`) chạy **trước** `setTimeout` (`B`) vì microtask có độ ưu tiên cao hơn.
Điều này giải thích tại sao nhiều khi code bất đồng bộ không chạy theo thứ tự mà ta tưởng tượng.

---

## 4. Node.js và Browser – khác biệt ở đâu?

- **Browser** có Web API: `setTimeout`, `fetch`, `DOM events`.
- **Node.js** có libuv và hàng đợi riêng, chia nhiều pha (timers, I/O, check...).

Dù khác nhau về chi tiết, **cả hai đều tuân theo nguyên lý Event Loop**:

> Một luồng chính + hàng đợi công việc + cơ chế lặp kiểm tra stack.

Nhờ đó mà JavaScript có thể xử lý hàng nghìn request, callback, hay sự kiện mà không bị “đóng băng”.

---

## 5. Tư duy bất đồng bộ trong thực tế

Event Loop dạy cho lập trình viên một điều rất hay:
**Không thể làm mọi việc cùng lúc, nhưng có thể sắp xếp thứ tự hợp lý để mọi việc vẫn diễn ra trôi chảy.**

Trong cuộc sống, nếu ta cứ chờ mọi thứ hoàn tất mới bắt đầu việc tiếp theo, ta sẽ rất chậm.
Nhưng nếu biết phân loại công việc “nặng” và “nhẹ”, và cho chúng chạy song song theo đúng thứ tự, ta sẽ hiệu quả hơn rất nhiều.

---

## 6. Một ví dụ tổng hợp

```javascript
console.log("Start");

setTimeout(() => console.log("Timeout"), 0);

Promise.resolve().then(() => console.log("Promise"));

console.log("End");
```

Thứ tự kết quả:

```
Start
End
Promise
Timeout
```

Mỗi lần Event Loop quay một vòng (tick), nó sẽ:

1. Thực thi các tác vụ trong Stack.
2. Chạy tất cả microtask (Promise).
3. Sau đó mới đến macrotask (Timeout, I/O).

---

## 7. Kết luận

Event Loop không chỉ là một cơ chế kỹ thuật — nó là cách JavaScript “tư duy” về thời gian và thứ tự công việc.
Khi hiểu nó, ta không còn sợ bug do bất đồng bộ, mà bắt đầu **tận dụng nó để viết code mượt hơn, hiệu quả hơn**.

Điều thú vị là tư duy này cũng ứng dụng được trong học tập và công việc:
Biết ưu tiên việc nào “nặng”, việc nào “nhẹ”, việc nào cần chờ — cũng là một cách lập trình cho chính cuộc sống của mình.

---

_Keep learning, keep coding._
