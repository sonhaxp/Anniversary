/**
 * OUR LOVE STORY - CONFIGURATION FILE
 * Cấu hình dành riêng cho cặp đôi: Trường Sơn & Diễm Quỳnh
 * - Bắt đầu nhắn tin: 10/06/2024
 * - Chính thức yêu nhau: 17/10/2024
 * - Đi chơi xa đầu tiên: Tam Đảo 23/11/2024
 * - Ảnh chụp Áo Dài: Trước Tết âm 2025 (19/01/2025)
 * - Sinh nhật Sơn bên em: 18/04/2025 (Bánh kem chú heo hồng)
 * - Săn mây Tà Xùa: 17 - 18/10/2025 (Kỷ niệm 1 năm yêu)
 * - Chuyến đi Hà Giang: 09 - 11/10/2026
 */

const CONFIG = {
  // 1. THÔNG TIN CẶP ĐÔI
  couple: {
    partnerOne: "Trường Sơn",
    partnerTwo: "Diễm Quỳnh",
    nicknameOne: "Anh",
    nicknameTwo: "Em",
    firstChatDate: "2024-06-10",       // Ngày bắt đầu nhắn tin
    anniversaryDate: "2024-10-17",     // Bắt đầu là người yêu từ 17/10/2024
    displayDate: "17 tháng 10, 2024",
    tagline: "Our Little Universe",
    subtitle: "Thế giới nhỏ của Sơn & Quỳnh",
    openingQuote: "Somewhere between ordinary days, I found my favorite person.",
    openingQuoteVi: "Từ dòng tin nhắn đầu tiên ngày 10/06/2024 đến ngày 17/10/2024 chính thức thành đôi, anh biết mình đã tìm thấy người thương nhất của cuộc đời.",
    heroQuote: "Từ Tam Đảo sương mờ, Tà Xùa biển mây cho đến Hà Giang hùng vĩ, mỗi bước chân đều trọn vẹn khi có em bên cạnh.",
    finalQuote: "And I would choose you, in every lifetime.",
    finalQuoteVi: "Dẫu có bao nhiêu kiếp sống, anh vẫn sẽ chọn em, trọn vẹn và duy nhất."
  },

  // 2. HÌNH ẢNH CHÍNH (Ảnh Áo Dài Tết & Chuyến đi của Sơn & Quỳnh)
  images: {
    openingBg: "assets/images/user/photo_25__MG_8241.jpg",
    hero: "assets/images/user/photo_26__MG_8294.jpg",       // Bộ ảnh Áo Dài Tết 2025 tuyệt đẹp
    finalBg: "assets/images/user/photo_24__MG_7753.jpg",
    avatarOne: "assets/images/user/photo_20_IMG_5933.jpg",  // Tà Xùa săn mây
    avatarTwo: "assets/images/user/photo_02_IMG_1310.jpg"   // Hà Giang
  },

  // 3. NHẠC NỀN LÃNG MẠN (Cung bậc cảm xúc cho Sơn & Quỳnh)
  music: {
    title: "In Love (Giai Điệu Cho Em)",
    artist: "Romantic Piano & Strings",
    src: "assets/music/in_love_piano_strings.mp3",
    autoPlayPrompt: true,
    playlist: [
      {
        id: "in-love",
        title: "In Love (Giai Điệu Cho Em)",
        artist: "Romantic Piano & Strings",
        src: "assets/music/in_love_piano_strings.mp3",
        tag: "Ngọt ngào & Sâu lắng"
      },
      {
        id: "una-mattina",
        title: "Una Mattina",
        artist: "Ludovico Einaudi",
        src: "assets/music/ludovico_einaudi_una_mattina.mp3",
        tag: "Trầm ấm & Bình yên"
      },
      {
        id: "comptine",
        title: "Comptine d'un Autre Été",
        artist: "Yann Tiersen",
        src: "assets/music/yann_tiersen_comptine.mp3",
        tag: "Thơ mộng & Hoài niệm"
      },
      {
        id: "sunset-ballad",
        title: "Romantic Sunset Melody",
        artist: "Acoustic Love Song",
        src: "assets/music/our-song.mp3",
        tag: "Mộc mạc & Dịu dàng"
      }
    ]
  },

  // 4. LÁ THƯ TÌNH
  letter: {
    salutation: "Gửi Diễm Quỳnh thương yêu của anh,",
    date: "17 tháng 10, 2024 — và mãi mãi",
    content: [
      "Nhớ lại ngày 10/06/2024, khi dòng tin nhắn đầu tiên được gửi đi, anh chẳng thể ngờ rằng đó lại là khởi đầu cho câu chuyện tình yêu đẹp nhất cuộc đời mình. Để rồi đến ngày 17/10/2024, hai đứa chính thức nắm tay nhau bước vào một hành trình mới.",
      "Anh nhớ như in chuyến đi xa đầu tiên của chúng mình lên Tam Đảo ngày 23/11/2024 trong làn sương mờ lành lạnh; nhớ bộ ảnh Áo Dài truyền thống trước Tết âm năm 2025 khi em cười rạng rỡ như đóa hoa mai nở rộ; nhớ ngày sinh nhật 18/04/2025 khi em tặng anh chiếc bánh kem chú heo hồng ngọt ngào; và nhớ cả biển mây Tà Xùa 17-18/10/2025 khi hai đứa cùng đón kỷ niệm 1 năm gắn bó.",
      "Và mới đây thôi, chuyến đi Hà Giang những ngày 9, 10, 11/10/2026 trên những cung đèo hùng vĩ, tay anh vẫn luôn nắm chặt tay em qua từng khúc quanh. Cảm ơn Quỳnh vì đã cùng anh viết nên những trang thanh xuân rực rỡ nhất.",
      "Album này là nơi anh gom nhặt từng nụ cười, từng chuyến đi và từng khoảnh khắc bình dị có nhau. Mong rằng chặng đường phía trước, dù có bao nhiêu thử thách, chúng mình vẫn sẽ mãi đồng hành, thương yêu và cùng nhau đi đến tận cùng."
    ],
    closing: "Thương em thật nhiều,",
    signature: "Trường Sơn"
  },

  // 5. CÁC CỘT MỐC ĐẶC BIỆT
  milestones: [
    { title: "Tin nhắn đầu tiên", date: "2024-06-10", note: "Dòng tin nhắn mở lối yêu thương" },
    { title: "Chính thức yêu nhau", date: "2024-10-17", note: "Cái gật đầu thành đôi" },
    { title: "Tam Đảo mù sương", date: "2024-11-23", note: "Chuyến đi xa đầu tiên cùng nhau" },
    { title: "Bộ ảnh Áo Dài đón Tết", date: "2025-01-19", note: "Trước Tết âm năm 2025" },
    { title: "Sinh nhật ấm áp", date: "2025-04-18", note: "Đón tuổi mới cùng em & chiếc bánh kem heo hồng" },
    { title: "Săn mây Tà Xùa", date: "2025-10-17", note: "Kỷ niệm tròn 1 năm yêu nhau" },
    { title: "Hà Giang hùng vĩ", date: "2026-10-09", note: "Chuyến đi 9, 10, 11/10/2026" }
  ]
};

if (typeof Object.freeze === 'function') {
  Object.freeze(CONFIG);
}
