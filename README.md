# OUR LOVE STORY — TRƯỜNG SƠN & DIỄM QUỲNH
> **"Our Little Universe — Thế giới nhỏ của hai chúng ta"**  
> Bắt đầu nhắn tin từ **10/06/2024** • Chính thức yêu nhau từ **17/10/2024**.

Website album ảnh và nhật ký tình yêu cao cấp được thiết kế theo tư duy **Mobile-first**, phong cách tạp chí nghệ thuật (Editorial Photography & Cinematic Storytelling) kết hợp digital journal lãng mạn.

---

## 1. TỔNG QUAN & CÁC CỘT MỐC ĐÃ CẤU HÌNH

- **10/06/2024**: Dòng tin nhắn đầu tiên (The Very First Text).
- **17/10/2024**: Chính thức thành đôi (Ngày bắt đầu yêu nhau — mốc tính ngày yêu).
- **23/11/2024**: Chuyến đi chơi xa đầu tiên — Tam Đảo mù sương.
- **19/01/2025** (Trước Tết âm 2025): Bộ ảnh Áo Dài truyền thống đón xuân.
- **18/04/2025**: Sinh nhật ấm áp bên em cùng chiếc bánh kem chú heo hồng.
- **17 - 18/10/2025**: Săn mây Tà Xùa mừng tròn 1 năm yêu nhau.
- **09 - 11/10/2026**: Chinh phục Hà Giang hùng vĩ qua những khúc quanh tay áo.
- **Hôm nay & Mãi về sau**: Hơn 2 năm gắn kết (730+ ngày) và trọn vẹn tương lai.

---

## 2. CẤU TRÚC THƯ MỤC

```text
Album/
├── index.html                   # Giao diện chính (semantic HTML5, SEO, OpenGraph)
├── server.js                    # Server tĩnh Node.js siêu nhẹ
├── css/
│   └── style.css                # Toàn bộ CSS thiết kế, animation, responsive
├── js/
│   ├── config.js                # File cấu hình tên cặp đôi, ngày yêu, thư tình, nhạc
│   ├── data.js                  # Dữ liệu dòng thời gian (Story), album (Gallery), kỷ niệm nhỏ (Moments)
│   └── app.js                   # Xử lý logic, đếm ngày yêu, lọc album, lightbox, nhạc, hiệu ứng
├── assets/
│   ├── image/                   # Thư mục ảnh gốc
│   ├── images/
│   │   ├── user/                # 26 ảnh thật đã tối ưu hóa < 1MB cho web
│   │   └── user_manifest.json   # Chi tiết kích thước và thông số từng ảnh
│   └── music/
│       └── our-song.mp3         # Bài hát lãng mạn (Romantic Piano Melody)
└── README.md                    # Hướng dẫn chi tiết
```

---

## 3. CÁCH CHẠY WEBSITE

Bạn có thể chạy website bằng một trong hai cách rất đơn giản:

### Cách 1: Dùng VS Code Live Server
1. Cài extension **Live Server** trong VS Code (nếu chưa có).
2. Chuột phải vào file `index.html` -> Chọn **Open with Live Server** (hoặc phím tắt `Alt + L, Alt + O`).
3. Website sẽ tự động mở trên trình duyệt tại `http://127.0.0.1:5500`.

### Cách 2: Chạy trực tiếp bằng Node.js có sẵn
Mở Terminal tại thư mục `Album` và gõ:
```bash
node server.js
```
Truy cập trình duyệt: `http://localhost:5500`.

---

## 4. CÁC TÍNH NĂNG NỔI BẬT ĐÃ ĐƯỢC CẤU HÌNH

1. **Màn mở đầu Cinematic (Opening Screen)**:
   - Dòng chữ nghệ thuật: *"Our Love Story — Trường Sơn & Diễm Quỳnh"*.
   - Câu trích dẫn: *"Từ dòng tin nhắn đầu tiên ngày 10/06/2024 đến ngày 17/10/2024 chính thức thành đôi, anh biết mình đã tìm thấy người thương nhất của cuộc đời mình."*
   - Nút `Mở những kỷ niệm` chuyển cảnh mượt mà vào trang chính.

2. **Hero Section**:
   - Ảnh bìa Áo Dài Tết tuyệt đẹp của hai bạn với typography thanh lịch.
   - Huy hiệu `Since 17.10.2024`.
   - Hiệu ứng cuộn trang mềm mại.

3. **Bộ đếm ngày yêu thời gian thực (Relationship Counter)**:
   - Tự động tính số ngày từ mốc **17/10/2024** đến hiện tại (> 734 ngày).
   - Hiển thị chi tiết: **Số ngày**, **Số năm**, **Số tháng**, **Số ngày lẻ**, **Giờ**, **Phút**, **Giây** tự nhảy từng giây.
   - Hoạt ảnh đếm số mượt mà khi cuộn tới.

4. **Hành trình yêu thương (Our Story Timeline)**:
   - Cột mốc 1 (10/06/2024): Tin nhắn đầu tiên (ảnh dọc chụp màn hình được tối ưu trọn vẹn).
   - Cột mốc 2 (17/10/2024): Chính thức yêu nhau.
   - Cột mốc 3 (23/11/2024): Chuyến đi xa đầu tiên — Tam Đảo mù sương.
   - Cột mốc 4 (Tết 2025): Bộ ảnh Áo Dài trước Tết âm lịch 2025.
   - Cột mốc 5 (18/04/2025): Sinh nhật ấm áp bên em — Chiếc bánh kem heo hồng & nụ cười em.
   - Cột mốc 6 (17-18/10/2025): Săn mây Tà Xùa mừng 1 năm yêu nhau.
   - Cột mốc 7 (9, 10, 11/10/2026): Chinh phục Hà Giang hùng vĩ.
   - Cột mốc 8: Hơn 2 năm bên nhau và mọi ngày mai.

5. **Album ảnh tạp chí (Photo Gallery)**:
   - 16+ hình ảnh chất lượng cao phân chia theo danh mục:
     - **Tất cả kỷ niệm**
     - **Bên nhau**
     - **Hẹn hò**
     - **Chuyến đi**
     - **Dịp đặc biệt**
     - **Khoảnh khắc nhỏ**
   - Bộ lọc tức thì không giật lag.

6. **Chế độ xem ảnh toàn màn hình (Fullscreen Lightbox)**:
   - Chạm vào bất kỳ ảnh nào để xem toàn màn hình trên nền tối điện ảnh.
   - Hỗ trợ vuốt trái / vuốt phải trên điện thoại để chuyển ảnh kế tiếp hoặc trước đó.
   - Vuốt xuống hoặc bấm nút X để đóng.
   - Trên máy tính: Dùng phím mũi tên `←` / `→` và phím `Escape`.

7. **Góc Kỷ Niệm Nhỏ Bé (Scrapbook Postcards)**:
   - Những tấm postcard nghiêng nhẹ đính băng dính Washi và sticker đáng yêu (`🌷`, `✨`, `🤍`, `🥰`).
   - Font chữ viết tay cho những lời nhắn gửi chân thành.

8. **Lá Thư Tình Gửi Em (Love Letter)**:
   - Phong cách giấy da kem viền cổ điển với con dấu sáp niêm phong.
   - Lời tự tình từ Trường Sơn gửi Diễm Quỳnh.
   - Nút con dấu sáp có thể bấm để mở hoặc gấp lại thư.

9. **Trình phát nhạc lãng mạn (Music Player)**:
   - Widget đĩa nhạc vinyl nổi góc dưới màn hình.
   - Khi bấm phát: Đĩa nhạc xoay tròn nhịp nhàng, các cột sóng âm thanh nhảy theo giai điệu.
   - Có thể thu nhỏ gọn gàng để không che khuất ảnh.

10. **Thanh điều hướng Mobile (Bottom Bar)**:
    - Thiết kế kính mờ (glassmorphism) gắn đáy màn hình, tính toán safe-area cho iPhone.
    - Cuộn mượt đến từng mục chỉ với một lần chạm.

11. **Tương tác Thả Tim (Heart Burst)**:
    - Nút "Thả tim yêu thương" ở chân trang và chạm vào ảnh Hero sẽ tạo chùm trái tim bay lơ lửng lung linh.

---

## 5. HƯỚNG DẪN TÙY CHỈNH KHI CẦN

### Thay đổi tên, ngày yêu, nội dung thư tình:
Mở file `js/config.js`:
- Tên bạn nam / bạn nữ: `partnerOne: "Trường Sơn"`, `partnerTwo: "Diễm Quỳnh"`.
- Ngày bắt đầu yêu / nhắn tin: `anniversaryDate: "2026-06-10"`.
- Nội dung thư tình: Chỉnh sửa các câu trong mảng `CONFIG.letter.content`.

### Thay đổi bài hát:
1. Thả file nhạc định dạng `.mp3` của bạn vào thư mục `assets/music/` (ví dụ đặt tên là `bai-hat-cua-chung-minh.mp3`).
2. Mở `js/config.js`, đổi dòng:
   ```javascript
   src: "assets/music/bai-hat-cua-chung-minh.mp3",
   title: "Tên bài hát của bạn",
   artist: "Tên ca sĩ"
   ```

### Thêm ảnh mới:
1. Bạn có thể thêm ảnh mới vào `assets/images/user/`.
2. Mở `js/data.js` và thêm một mục mới vào mảng `galleryMemories`:
   ```javascript
   {
     id: 17,
     title: "Tựa đề kỷ niệm",
     date: "25.10.2026",
     category: "together", // together | dates | travel | special | moments
     image: "assets/images/user/ten-anh-moi.jpg",
     caption: "Mô tả ngắn cảm xúc của hai bạn...",
     location: "Địa điểm",
     aspect: "portrait" // portrait | landscape | square
   }
   ```
# Anniversary
