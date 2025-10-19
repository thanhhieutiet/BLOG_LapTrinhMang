---
title: "Tiết Thanh Minh Hiếu - AI Security Researcher"
date: 2025-09-21
weight: 1
type: "page" # ← QUAN TRỌNG
draft: false
image: "Poster_ABM_ILIMG.png"
# image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=750"
---

# Xin chào! Tôi là Tiết Thanh Minh Hiếu

**AI Security Researcher** | Sinh viên CNTT K22, HUTECH

Trong 3 năm qua, tôi đã đi từ sinh viên CNTT thông thường đến Top 1 lớp Đồ án Cơ sở (9.0/10) và là 1 trong 10 đề tài được duyệt thẳng NCKH. Hành trình của tôi tập trung vào giao điểm giữa AI và Cybersecurity - nơi công nghệ tiên tiến gặp gỡ bảo mật thực tế.

---

## Tầm nhìn

Trở thành chuyên gia AI Security và giảng viên truyền cảm hứng cho thế hệ sau. Tôi tin rằng cách học tốt nhất là dạy lại cho người khác - mỗi bài viết tôi chia sẻ không chỉ giúp bạn đọc mà còn giúp tôi củng cố kiến thức của chính mình.

---

## Học vấn & Thành tích

**Đại học Công nghệ TP.HCM (HUTECH)** - Công nghệ Thông tin, K22 (2022-2026)

- GPA gần nhất: **3.83/4.0** | GPA tích lũy: **3.52/4.0**

**Thành tích nổi bật:**

- **Top 1 lớp Đồ án Cơ sở (2025)** - Điểm 9.0/10
- **Nghiên cứu Khoa học Sinh viên (NCKH)** - Top 10/60+ đề tài được duyệt thẳng vòng sơ khảo

---

## Chuyên môn

**Machine Learning & AI**

- Transformer Networks, BERT, Deep Learning
- Training custom models (13,000+ samples)
- Android Malware Detection: 94.3% accuracy

**Cybersecurity**

- Malware Analysis, Anti-evasion, Static Analysis
- Tools: Androguard, YARA Rules, ProGuard

**Lập trình**

- Python (Advanced), Java (Intermediate)
- TensorFlow, PyTorch, Flask/FastAPI
- Git, Linux/Ubuntu, Docker

**Chứng chỉ**

- Hoàn thành: Networking Basics | JavaScript Essentials 1 & 2 (Cisco Academy)
- Đang theo học: Google Cybersecurity Certificate
- Dự định: IBM Cybersecurity Analyst, CompTIA Security+

---

## Hành trình Nghiên cứu

Nghiên cứu của tôi tập trung vào **phát hiện mã độc Android bằng Transformer Networks**, với mục tiêu đối phó các kỹ thuật né tránh ngày càng tinh vi.

---

### 🔬 Giai đoạn 1: Chứng minh khái niệm (Q2/2025) - Đồ án Cơ sở

**"Transformer Networks có phát hiện mã độc tốt hơn các phương pháp truyền thống?"**

**Phương pháp:** So sánh BERT vs CNN vs LSTM trên MH-100K (100K mẫu), giải quyết vấn đề mất cân bằng dữ liệu nghiêm trọng.

**Kết quả:**

<div align="center">

![So sánh hiệu suất](roc_curves_comparison.png)

_BERT: 94% | CNN: 74% | LSTM: 69% (+20% improvement)_

![Confusion Matrix](detailed_confusion_matrix.png)

_Malware recall: 5% → 89% sau khi cân bằng dữ liệu_

</div>

**Tại sao BERT vượt trội?** Hiểu ngữ cảnh kết hợp (INTERNET + READ_CONTACTS = rủi ro), trong khi CNN/LSTM chỉ nhìn từng đặc trưng riêng lẻ.

**Recognition:** Top 1 lớp (9.0/10)  
**Câu hỏi tiếp theo:** _Còn hoạt động khi bị obfuscated?_

---

### 🚀 Giai đoạn 2: Ứng dụng thực tế (Q4/2025) - Đồ án Chuyên ngành

**"BERT có thể phát hiện mã độc đã bị che giấu bằng obfuscation?"**

**Dataset:**

- **CICMalDroid 2020** - Benchmark dataset được công nhận trong academic research
- Malware: 13,205 APK từ 4 families nguy hiểm nhất
- Benign: ~48GB samples (đang trong quá trình xử lý)
- Quy mô tổng: 70GB+ dữ liệu thô

**Phương pháp:**

- Xử lý 13,205 malware APK với pipeline tự động
- Trích xuất features: Permissions, API calls, code structures
- Tạo obfuscated variants bằng ProGuard
- Huấn luyện BERT trên cả benign và obfuscated malware

**Kết quả:**

- Tỷ lệ xử lý thành công: **94.3%** (12,453/13,205 malware APK)
- Pipeline có khả năng scale lên hàng chục GB dữ liệu
- **1/22 đề tài** được duyệt thẳng không cần chỉnh sửa

**Tech Stack:** Python, Androguard, BERT/Transformer, ProGuard, Flask/FastAPI, YARA

### 🎯 Giai đoạn 3: Nghiên cứu Chuyên sâu (2025+) - NCKH

**"Phát hiện malware qua Function Call Graph khi static analysis không đủ"**

**Vấn đề:**
Obfuscation tĩnh có thể bị vượt qua nhờ BERT, nhưng các kỹ thuật evasion nâng cao như API hiding, dynamic loading, control flow obfuscation vẫn là thách thức lớn.

**Giải pháp đề xuất - Phân tích đồ thị gọi hàm (FCG/BCG):**

Ý tưởng cốt lõi: _Malware có thể che giấu tên hàm, nhưng khó che giấu luồng thực thi!_

**Phương pháp:**

1. Trích xuất Function Call Graph/Better Call Graph từ APK
2. Chuyển đổi graph thành embeddings
3. Áp dụng Graph Neural Network + BERT
4. Phát hiện suspicious call patterns

**Ưu thế:** Malware phải thực thi để hoạt động, và khi thực thi sẽ để lại dấu vết trong call graph - rất khó che giấu hoàn toàn.

**Mục tiêu:**

- Độ chính xác >95% trên các kỹ thuật evasion nâng cao
- Tool phân tích FCG/BCG cho Android APK
- Research paper với phương pháp và dataset đóng góp

**Tiến độ:**

- Đề tài approved (Top 10/60+)
- Đang xây dựng FCG extraction pipeline
- Thiết kế GNN architecture

**Giảng viên hướng dẫn:** Cô Đinh Huỳnh Tuệ Tuệ

---

## Timeline Tổng quan

| Giai đoạn             | Câu hỏi nghiên cứu               | Kết quả chính                             |
| --------------------- | -------------------------------- | ----------------------------------------- |
| **🎯 ĐACS (Q2/2025)** | BERT có tốt hơn CNN/LSTM?        | ✅ **+20% accuracy**<br>✅ Top 1 (9.0/10) |
| **🚀 ĐACN (Q4/2025)** | BERT có chống được obfuscation?  | ✅ **94.3% success**<br>✅ 1/22 approved  |
| **🔬 NCKH (2025+)**   | FCG/BCG có vượt static analysis? | 🔄 **In progress**<br>🎯 Goal: >95%       |

## Tại sao tôi tạo blog này?

Blog này không chỉ là nơi hoàn thành yêu cầu môn học, mà là bước đầu tiên trong hành trình rèn luyện kỹ năng truyền đạt để trở thành giảng viên Security.

**Bạn sẽ tìm thấy ở đây:**

- Kinh nghiệm thực tế từ các project AI Security
- Cách tiếp cận thực tế thay vì lý thuyết khô khan
- Tips & tricks học được qua quá trình "vấp ngã"
- Kiến thức phức tạp được giải thích dễ hiểu

Mục tiêu của tôi là biến những khái niệm về Cybersecurity, AI và Machine Learning thành những câu chuyện thú vị mà bất kỳ ai cũng có thể hiểu được.

---

## Lộ trình phát triển

**2025 - Bước ngoặt**

- Q2: Top 1 ĐACS (9.0/10)
- Q4: Approved ĐACN & NCKH first try
- Hiện tại: Deep dive vào AI Security với Transformer Networks

**Mục tiêu 2025**

- Hoàn thành xuất sắc ĐACN & NCKH
- Hoàn thành Google Cybersecurity Certificate
- Tìm cơ hội thực tập tại công ty AI/Security
- Publish research findings và xây dựng portfolio

**Tầm nhìn dài hạn (2026+)**

- Tốt nghiệp với thành tích xuất sắc
- Đạt chứng chỉ CompTIA Security+
- Làm việc full-time trong lĩnh vực AI Security
- Trở thành giảng viên Cybersecurity
- Speaker tại các sự kiện tech Việt Nam

---

## Blog này dành cho bạn nếu

Bạn đang học về Cybersecurity, Java, JavaScript hoặc AI và muốn hiểu cách áp dụng kiến thức vào thực tế. Bạn thích học thông qua kinh nghiệm thực tế hơn là lý thuyết suông.

Hãy cùng học, cùng phát triển và cùng tạo nên một cộng đồng tech Việt Nam mạnh mẽ!

---

_"The best way to learn is to teach others" - Triết lý tôi theo đuổi trong mỗi bài viết_
