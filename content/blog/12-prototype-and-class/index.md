---
title: "Prototype, Class và Kế thừa: JavaScript thực sự hoạt động như thế nào?"
date: 2025-10-03
categories: ["programming"]
tags: ["javascript", "oop", "prototype", "class", "inheritance"]
author: "Tiết Thanh Minh Hiếu"
description: "Phân tích cách JavaScript hiện thực hóa hướng đối tượng (OOP) thông qua Prototype và Class, cùng so sánh với Java để hiểu rõ bản chất kế thừa trong ngôn ngữ linh hoạt này."
image: "thumbnail.png"
showToc: true
keywords:
  ["javascript", "prototype", "class", "inheritance", "oop", "feynman learning"]
---

Khi học JavaScript Essentials 2, mình từng ngạc nhiên khi thấy khái niệm **class** xuất hiện trong một ngôn ngữ vốn “phi hướng đối tượng”.  
Nhưng khi hiểu sâu hơn, mình nhận ra rằng JavaScript **chưa bao giờ thật sự có class như Java** — nó chỉ _mô phỏng_ lại bằng một cơ chế tên là **prototype**.

Trong bài này, mình sẽ chia sẻ cách JavaScript tổ chức kế thừa qua prototype, vì sao class được thêm vào sau này, và làm sao để hiểu đúng tư duy OOP trong JS.

---

## 1. Prototype là gì?

Trong Java, khi tạo một class, bạn đang định nghĩa một “bản thiết kế”.  
Trong JavaScript, thứ tương đương với “bản thiết kế” là **prototype** — mọi object đều kế thừa từ một object khác.

Ví dụ:

```javascript
const person = {
  greet() {
    console.log("Xin chào!");
  },
};

const student = Object.create(person);
student.study = function () {
  console.log("Đang học JavaScript...");
};

student.greet(); // Kế thừa từ person
student.study();
```

Giải thích:

- `Object.create(person)` tạo một object mới có `person` làm **prototype**.
- Khi gọi `student.greet()`, JS không tìm thấy trong `student`, nên **tự động tìm trong prototype chain** (chuỗi kế thừa).

---

## 2. Prototype chain – Chuỗi tìm kiếm ngầm định

Khi bạn gọi một thuộc tính, JavaScript tìm theo chuỗi:

```
student → person → Object.prototype → null
```

Nếu không tìm thấy ở bất kỳ đâu, kết quả sẽ là `undefined`.
Đây chính là **prototype chain** – cơ chế kế thừa đặc trưng của JavaScript.

---

## 3. Hàm tạo (Constructor Function)

Trước khi có cú pháp `class`, JS đã dùng **constructor function** để mô phỏng class:

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function () {
  console.log(`Xin chào, mình là ${this.name}`);
};

const hieu = new Person("Minh Hiếu");
hieu.sayHi();
```

Khi dùng `new`:

1. JavaScript tạo một object mới.
2. Gán prototype của object này = `Person.prototype`.
3. Gọi hàm `Person` với `this` trỏ vào object đó.
4. Trả về object mới.

---

## 4. Class – Cú pháp mới, bản chất cũ

Từ ES6, cú pháp `class` ra đời để giúp code dễ đọc hơn, nhưng **vẫn dựa trên prototype**.

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log(`Xin chào, mình là ${this.name}`);
  }
}

const hieu = new Person("Minh Hiếu");
hieu.sayHi();
```

Phía sau, đoạn code trên tương đương với cách viết bằng constructor function.
Khác biệt duy nhất: cú pháp `class` giúp dễ hiểu và quen thuộc hơn với lập trình viên Java.

---

## 5. Kế thừa trong JavaScript – `extends` hoạt động ra sao?

Khi dùng `extends`, JavaScript tạo **chuỗi prototype liên kết** giữa class con và class cha.

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
  introduce() {
    console.log(`Mình là ${this.name}`);
  }
}

class Student extends Person {
  study() {
    console.log(`${this.name} đang học...`);
  }
}

const hieu = new Student("Minh Hiếu");
hieu.introduce();
hieu.study();
```

Phía sau:

- `Student.prototype` kế thừa từ `Person.prototype`.
- `Student` (hàm constructor) kế thừa từ `Person` thông qua `Object.setPrototypeOf`.

Nhờ vậy mà JavaScript có thể mô phỏng hành vi “OOP thực thụ” mà không cần hệ thống class thật.

---

## 6. So sánh với Java – Cùng là OOP, khác tư duy

| Tiêu chí         | Java                            | JavaScript                             |
| ---------------- | ------------------------------- | -------------------------------------- |
| Mô hình          | Class-based                     | Prototype-based                        |
| Cách kế thừa     | Tĩnh, kiểm tra lúc biên dịch    | Động, xác định lúc runtime             |
| Khả năng mở rộng | Khó thay đổi sau khi định nghĩa | Có thể thêm phương thức bất cứ lúc nào |
| Ngữ cảnh `this`  | Cố định trong class             | Phụ thuộc vào cách gọi                 |

Điều thú vị là: JavaScript cho phép “mở rộng class” ngay cả khi đã tạo instance.
Đây vừa là sức mạnh, vừa là nguồn gốc của nhiều lỗi khó debug nếu không hiểu rõ cơ chế prototype.

---

## 7. Một ví dụ minh họa nhỏ

```javascript
class Animal {
  speak() {
    console.log("Âm thanh chung của động vật");
  }
}

class Dog extends Animal {
  speak() {
    super.speak();
    console.log("Gâu gâu!");
  }
}

const dog = new Dog();
dog.speak();
```

Kết quả:

```
Âm thanh chung của động vật
Gâu gâu!
```

Từ khóa `super` gọi lại phương thức ở class cha — nhưng đằng sau, JavaScript chỉ đơn giản là **truy ngược lên prototype chain**.

---

## 8. Kết luận

JavaScript không “bắt chước” Java, mà chọn con đường riêng:
thay vì ép buộc class cố định, nó để lập trình viên **tự tạo cấu trúc kế thừa theo runtime**.

Với mình, hiểu rõ prototype không chỉ giúp viết code tốt hơn, mà còn giúp nhìn ra triết lý của JS:

> Tất cả đều là object, và mọi thứ đều có thể mở rộng.

---

_Keep learning, keep coding._
