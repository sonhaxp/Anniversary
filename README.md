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

12. **Trang Mini-game Tỏ Tình Meme Gen Z (`tre-trau.html`)**:
    - **Ý tưởng**: "Tỏ tình online — từ chối là một khái niệm xa xỉ".
    - **Nút "Không đồng ý" siêu lươn**: Hơn 6 kiểu né tránh bất ngờ (chạy trốn, thu nhỏ, giả vờ đồng ý, rung lắc kịch tính, dịch chuyển tức thời, meme phản ứng).
    - **14+ Tương tác trêu đùa ngọt ngào**: Xe ôm trọn đời, kèo trà sữa full-topping, dỗ dành siêu cấp, cam kết bảo hành người yêu 10/10, phó nháy riêng, drama quay chậm, hợp đồng tình yêu, v.v.
    - **Chụp ảnh Giấy chứng nhận tình yêu**: Tạo và tải file PNG trực tiếp trên máy client bằng HTML5 Canvas mà không cần server.
    - **Bộ tổng hợp âm thanh Web Audio**: Hiệu ứng Pop, Boing, Ding, Fanfare sống động 100% bằng code, không sợ lỗi file âm thanh bên ngoài.

---

## 5. HƯỚNG DẪN TÙY CHỈNH KHI CẦN

### Thay đổi tên, ngày yêu, nội dung thư tình:
Mở file `js/config.js`:
- Tên bạn nam / bạn nữ: `partnerOne: "Trường Sơn"`, `partnerTwo: "Diễm Quỳnh"`.
- Ngày bắt đầu yêu: `anniversaryDate: "2024-10-17"`.
- Ngày nhắn tin đầu tiên: `firstChatDate: "2024-06-10"`.
- Nội dung thư tình: Chỉnh sửa các câu trong mảng `CONFIG.letter.content`.

### Truy cập trang Mini-Game:
- Nhấn vào nút **"Góc vui: Tỏ Tình Lươn Lẹo"** ở cuối trang chính, hoặc truy cập trực tiếp:
  `http://localhost:5500/tre-trau.html`
- Trang có nút quay lại album chính bất cứ lúc nào.

### Thay đổi bài hát:
1. Thả file nhạc định dạng `.mp3` của bạn vào thư mục `assets/music/`.
2. Mở `js/config.js` để thêm hoặc sửa đổi danh sách playlist.

# Anniversary

