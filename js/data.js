/**
 * OUR LOVE STORY - DATA STORE
 * Dữ liệu album ảnh thật của Trường Sơn & Diễm Quỳnh
 * - 10/06/2024: Bắt đầu nhắn tin
 * - 17/10/2024: Chính thức yêu nhau
 * - 23/11/2024: Đi chơi xa đầu tiên — Tam Đảo
 * - Trước Tết âm 2025 (19/01/2025): Bộ ảnh Áo Dài đón Tết
 * - 18/04/2025: Sinh nhật ấm áp bên em (Bánh kem chú heo hồng)
 * - 17-18/10/2025: Săn mây Tà Xùa (Kỷ niệm 1 năm yêu)
 * - 09, 10, 11/10/2026: Chuyến đi Hà Giang hùng vĩ
 * - 07/11/2026: Sinh nhật lần thứ 2 bên Quỳnh (Bếp Thái Koh Yam - Thái Hà)
 */

// 1. DÒNG THỜI GIAN CÂU CHUYỆN (TIMELINE STORIES)
const timelineStories = [
  {
    id: 1,
    date: "2024-06-10",
    displayDate: "10 Tháng 06, 2024",
    title: "Dòng tin nhắn đầu tiên",
    subtitle: "The Very First Text",
    description: "Ngày 10/06/2024, dòng tin nhắn đầu tiên ngập ngừng được gửi đi. Lời chào vu vơ ấy chính là chiếc chìa khóa mở ra câu chuyện tình yêu đẹp nhất của Sơn & Quỳnh.",
    image: "assets/images/user/photo_21_IMG_7832.jpg",
    location: "Tin nhắn chờ",
    tag: "Khởi đầu",
    isScreenshot: true
  },
  {
    id: 2,
    date: "2024-10-17",
    displayDate: "17 Tháng 10, 2024",
    title: "Chính thức thành đôi",
    subtitle: "Officially In Love",
    description: "Sau hơn 4 tháng tìm hiểu với biết bao cuộc trò chuyện thâu đêm, ngày 17/10/2024 hai đứa chính thức nói lời yêu, gắn kết hai cuộc đời thành một hành trình chung.",
    image: "assets/images/user/photo_03_IMG_1492.jpg",
    location: "Hà Nội",
    tag: "17.10.2024",
    isScreenshot: false
  },
  {
    id: 3,
    date: "2024-11-23",
    displayDate: "23 Tháng 11, 2024",
    title: "Chuyến đi xa đầu tiên — Tam Đảo",
    subtitle: "Our First Getaway",
    description: "Chuyến du lịch xa đầu tiên cùng nhau tại Tam Đảo mù sương. Cùng nhau cuộn mình trong áo ấm, ngắm hoàng hôn buông trên mây và sưởi ấm đôi bàn tay.",
    image: "assets/images/user/photo_07_IMG_2197.jpg",
    location: "Tam Đảo",
    tag: "Tam Đảo",
    isScreenshot: false
  },
  {
    id: 4,
    date: "2025-01-19",
    displayDate: "Trước Tết Âm 2025",
    title: "Bộ ảnh Áo Dài đón Tết",
    subtitle: "Traditional Spring Elegance",
    description: "Những ngày giáp Tết âm năm 2025, hai đứa diện bộ áo dài truyền thống rực rỡ dạo phố xuân. Nét duyên dáng dịu dàng của Quỳnh khiến Sơn say đắm không thôi.",
    image: "assets/images/user/photo_26__MG_8294.jpg",
    location: "Phố cổ dạo xuân",
    tag: "Tết 2025",
    isScreenshot: false
  },
  {
    id: 5,
    date: "2025-04-18",
    displayDate: "18 Tháng 04, 2025",
    title: "Sinh nhật ấm áp bên em",
    subtitle: "A Sweet Birthday with You",
    description: "Sinh nhật tuổi mới ngập tràn hạnh phúc khi có em ở bên, cùng chiếc bánh kem chú heo hồng ngọt ngào và nụ cười rạng rỡ của người anh thương nhất.",
    image: "assets/images/user/photo_15_IMG_3408.jpg",
    location: "Hà Nội",
    tag: "Sinh nhật 18.04",
    isScreenshot: false
  },
  {
    id: 6,
    date: "2025-10-18",
    displayDate: "17 - 18 Tháng 10, 2025",
    title: "Săn mây Tà Xùa — Kỷ niệm 1 năm yêu",
    subtitle: "1st Anniversary in the Clouds",
    description: "Kỷ niệm tròn 1 năm ngày chính thức yêu nhau (17/10/2024 - 17/10/2025). Đứng trên đỉnh Tà Xùa ngắm biển mây cuồn cuộn, cùng trao nhau những lời hẹn ước tương lai.",
    image: "assets/images/user/photo_20_IMG_5933.jpg",
    location: "Tà Xùa, Sơn La",
    tag: "Tà Xùa",
    isScreenshot: false
  },
  {
    id: 7,
    date: "2026-10-10",
    displayDate: "09 - 11 Tháng 10, 2026",
    title: "Chinh phục Hà Giang & Lời Cầu Hôn",
    subtitle: "Across the Passes & A Sacred Promise",
    description: "Chuyến đi Hà Giang tuyệt đẹp những ngày tháng 10. Vượt qua những khúc cua tay áo hùng vĩ, và đặc biệt là khoảnh khắc thiêng liêng ngày 10/10 khi anh trao em lời cầu hôn chân thành nhất giữa đất trời.",
    image: "assets/images/user/photo_01_IMG_0783.jpg",
    location: "Hà Giang",
    tag: "10.10 Cầu hôn",
    isScreenshot: false
  },
  {
    id: 8,
    date: "2026-11-07",
    displayDate: "07 Tháng 11, 2026",
    title: "Sinh nhật lần thứ 2 bên Quỳnh",
    subtitle: "A Sweet Birthday with You",
    description: "Sinh nhật lần thứ hai hai đứa đón cùng nhau tại Bếp Thái Koh Yam (Thái Hà). Bữa tối ấm cúng ngập tràn tiếng cười, chiếc bánh kem dâu tây ngọt ngào và bó hoa rực rỡ dành riêng cho cô gái anh yêu nhất. Đi kèm là một 'cơn đau đầu ngọt ngào': từ năm sau, chưa đầy 1 tháng sẽ có liên hoàn 4 ngày trọng đại (10/10 Cầu hôn, 17/10 Ngày yêu, 20/10 Phụ nữ VN, 07/11 Sinh nhật em) — nghĩ chuyện tặng quà gì thôi đã thấy đau đầu! =))",
    image: "assets/images/user/photo_27_quynh_birthday.jpg",
    location: "Bếp Thái Koh Yam - Thái Hà",
    tag: "Sinh nhật Quỳnh",
    isScreenshot: false
  },
  {
    id: 9,
    date: "2026-11-07",
    displayDate: "Hôm nay & Mãi về sau",
    title: "Hơn 2 năm bên nhau & Mọi ngày mai",
    subtitle: "Forever & Always",
    description: "Hơn 750 ngày kể từ ngày chính thức thành đôi, từ Tam Đảo, Tà Xùa, Hà Giang cho đến những ngày sinh nhật ấm áp... tình yêu của Sơn & Quỳnh vẫn vẹn nguyên và ngày một đong đầy hơn.",
    image: "assets/images/user/photo_23_SON_7752.jpg",
    location: "Trái Tim Nhau",
    tag: "Tương lai",
    isScreenshot: false
  }
];

// 2. ALBUM ẢNH (PHOTO GALLERY)
const galleryMemories = [
  {
    id: 1,
    title: "Nét duyên Áo Dài đón Tết 2025",
    date: "19.01.2025",
    category: "together",
    image: "assets/images/user/photo_26__MG_8294.jpg",
    caption: "Bộ ảnh Áo Dài trước Tết âm 2025 — khoảnh khắc đẹp và rạng rỡ nhất của hai đứa.",
    location: "Phố xuân",
    aspect: "landscape"
  },
  {
    id: 2,
    title: "Chinh phục đèo Hà Giang",
    date: "10.10.2026",
    category: "travel",
    image: "assets/images/user/photo_01_IMG_0783.jpg",
    caption: "Những ngày tháng 10/2026 lộng gió trên mảnh đất Hà Giang địa đầu Tổ quốc.",
    location: "Hà Giang",
    aspect: "portrait"
  },
  {
    id: 3,
    title: "Tam Đảo trong làn sương sớm",
    date: "23.11.2024",
    category: "travel",
    image: "assets/images/user/photo_07_IMG_2197.jpg",
    caption: "Chuyến đi chơi xa đầu tiên cùng nhau — Tam Đảo ngày 23/11/2024.",
    location: "Tam Đảo",
    aspect: "landscape"
  },
  {
    id: 4,
    title: "Nụ cười rạng ngời ở Hà Giang",
    date: "09.10.2026",
    category: "travel",
    image: "assets/images/user/photo_02_IMG_1310.jpg",
    caption: "Nụ cười rạng rỡ của Quỳnh giữa thiên nhiên hùng vĩ miền cao nguyên đá.",
    location: "Hà Giang",
    aspect: "portrait"
  },
  {
    id: 5,
    title: "Săn mây Tà Xùa — 1 năm yêu",
    date: "18.10.2025",
    category: "special",
    image: "assets/images/user/photo_20_IMG_5933.jpg",
    caption: "Kỷ niệm tròn 1 năm bên nhau (17-18/10/2025) giữa biển mây trắng bồng bềnh Tà Xùa.",
    location: "Tà Xùa",
    aspect: "portrait"
  },
  {
    id: 6,
    title: "Ánh mắt trao nhau ngày xuân",
    date: "19.01.2025",
    category: "together",
    image: "assets/images/user/photo_25__MG_8241.jpg",
    caption: "Trong tà áo dài truyền thống, nụ cười của em là điều ngọt ngào nhất ngày giáp Tết.",
    location: "Ngoại cảnh",
    aspect: "landscape"
  },
  {
    id: 7,
    title: "Bữa tối ấm cúng trước thềm sinh nhật",
    date: "17.04.2025",
    category: "dates",
    image: "assets/images/user/photo_14_IMG_3386.jpg",
    caption: "Bữa tối bên nhau ngày 17/04/2025, cùng chia sẻ những khoảnh khắc ngọt ngào trước thềm sinh nhật tuổi mới.",
    location: "Hà Nội",
    aspect: "portrait"
  },
  {
    id: 8,
    title: "Hoàng hôn Tam Đảo",
    date: "23.11.2024",
    category: "travel",
    image: "assets/images/user/photo_09_IMG_2358.jpg",
    caption: "Tam Đảo chiều hoàng hôn se lạnh, có bàn tay ai nắm thật chặt sưởi ấm.",
    location: "Tam Đảo",
    aspect: "portrait"
  },
  {
    id: 9,
    title: "Gió đại ngàn Hà Giang",
    date: "11.10.2026",
    category: "travel",
    image: "assets/images/user/photo_04_IMG_1544.jpg",
    caption: "Những khúc cua tay áo và trời mây Hà Giang những ngày 9, 10, 11/10/2026.",
    location: "Hà Giang",
    aspect: "portrait"
  },
  {
    id: 10,
    title: "Tà áo dài và nụ cười rạng rỡ",
    date: "19.01.2025",
    category: "together",
    image: "assets/images/user/photo_24__MG_7753.jpg",
    caption: "Bức ảnh kỷ niệm trước Tết âm 2025 lưu giữ trọn vẹn nét thanh xuân của hai đứa.",
    location: "Phố cổ",
    aspect: "landscape"
  },
  {
    id: 11,
    title: "Đỉnh gió Tà Xùa",
    date: "17.10.2025",
    category: "travel",
    image: "assets/images/user/photo_19_IMG_5150.jpg",
    caption: "Đứng giữa thiên nhiên bao la Tà Xùa, kỷ niệm ngày tròn 1 năm chính thức yêu nhau.",
    location: "Tà Xùa, Sơn La",
    aspect: "portrait"
  },
  {
    id: 12,
    title: "Chiếc bánh kem heo hồng ngọt ngào",
    date: "18.04.2025",
    category: "special",
    image: "assets/images/user/photo_15_IMG_3408.jpg",
    caption: "Sinh nhật ngày 18/04/2025 — chiếc bánh kem chú heo hồng siêu cưng và nụ cười ngọt ngào của Quỳnh.",
    location: "Hà Nội",
    aspect: "portrait"
  },
  {
    id: 13,
    title: "Nắm tay nhau qua những vùng đất",
    date: "10.10.2026",
    category: "together",
    image: "assets/images/user/photo_12_IMG_3175.jpg",
    caption: "Từ Tam Đảo, Tà Xùa cho đến Hà Giang — bước chân nào cũng có nhau đồng hành.",
    location: "Hà Giang",
    aspect: "portrait"
  },
  {
    id: 14,
    title: "Tam Đảo ngày đầu đông",
    date: "23.11.2024",
    category: "dates",
    image: "assets/images/user/photo_06_IMG_2189.jpg",
    caption: "Cái lạnh đầu đông Tam Đảo 2024 bỗng hóa ấm áp khi có em bên cạnh.",
    location: "Tam Đảo",
    aspect: "portrait"
  },
  {
    id: 15,
    title: "Bức ảnh chụp vội đầy đáng yêu",
    date: "23.11.2024",
    category: "moments",
    image: "assets/images/user/photo_08_IMG_2213.jpg",
    caption: "Tấm ảnh ngẫu hứng ở Tam Đảo nhưng bắt trọn vẻ tự nhiên và nụ cười của em.",
    location: "Tam Đảo",
    aspect: "portrait"
  },
  {
    id: 16,
    title: "Dòng tin nhắn thức trọn đêm",
    date: "10.06.2024",
    category: "moments",
    image: "assets/images/user/photo_22_IMG_7833.jpg",
    caption: "Những dòng tin nhắn đầu tiên ngày 10/06/2024 — nơi mọi cảm xúc bắt đầu nở hoa.",
    location: "Màn hình tin nhắn",
    aspect: "portrait"
  },
  {
    id: 17,
    title: "Sinh nhật tuổi mới của Quỳnh",
    date: "07.11.2026",
    category: "special",
    image: "assets/images/user/photo_27_quynh_birthday.jpg",
    caption: "Sinh nhật lần thứ 2 đón tuổi mới cùng nhau tại Bếp Thái Koh Yam — chiếc bánh kem dâu tây ngọt ngào và nụ cười rạng rỡ của em.",
    location: "Bếp Thái Koh Yam - Thái Hà",
    aspect: "portrait"
  },
  {
    id: 18,
    title: "Bó hoa hồng pastel tặng em",
    date: "07.11.2026",
    category: "moments",
    image: "assets/images/user/photo_28_birthday_flowers.jpg",
    caption: "Bó hoa pastel rực rỡ điểm xuyết chú thỏ bông nhỏ xinh xắn anh dành tặng riêng cho Quỳnh ngày sinh nhật.",
    location: "Bếp Thái Koh Yam",
    aspect: "portrait"
  }
];

// 3. NHỮNG ĐIỀU NHỎ BÉ (SCRAPBOOK & MOMENTS)
const littleMoments = [
  {
    id: 1,
    title: "Sinh nhật tuổi mới ấm áp (18/04/2025)",
    date: "18.04.2025",
    note: "Chiếc bánh kem heo hồng, chiếc mũ sinh nhật đáng yêu và nụ cười rạng ngời của Quỳnh — sinh nhật ấm áp và đáng nhớ nhất của anh.",
    image: "assets/images/user/photo_16_IMG_3421.jpg",
    sticker: "🎂",
    rotation: "-2deg"
  },
  {
    id: 2,
    title: "Chuyến đi xa đầu tiên — Tam Đảo (23/11/2024)",
    date: "23.11.2024",
    note: "Mới yêu nhau hơn 1 tháng, hai đứa kéo nhau lên Tam Đảo trốn gió đông. Ăn đồ nướng nóng hổi và dạo phố mù sương.",
    image: "assets/images/user/photo_09_IMG_2358.jpg",
    sticker: "☁️",
    rotation: "1.8deg"
  },
  {
    id: 3,
    title: "Kỷ niệm 1 năm săn mây Tà Xùa (17-18/10/2025)",
    date: "18.10.2025",
    note: "Đón ngày kỷ niệm 1 năm yêu nhau giữa biển mây Tà Xùa bồng bềnh. Sáng thức dậy mở cửa thấy mây tràn vào tận phòng.",
    image: "assets/images/user/photo_19_IMG_5150.jpg",
    sticker: "✨",
    rotation: "-1.5deg"
  },
  {
    id: 4,
    title: "Chuyến đi Hà Giang (09-11/10/2026)",
    date: "10.10.2026",
    note: "Những ngày tháng 10 vừa qua cùng nhau chinh phục Hà Giang hùng vĩ. Tay lái vững vàng, phía sau có Quỳnh ôm chặt.",
    image: "assets/images/user/photo_04_IMG_1544.jpg",
    sticker: "🏍️",
    rotation: "2.2deg"
  },
  {
    id: 5,
    title: "Sinh nhật lần thứ 2 bên Quỳnh (07/11/2026)",
    date: "07.11.2026",
    note: "Bữa tối ấm cúng tại Bếp Thái Koh Yam, chiếc bánh kem dâu xinh xắn và bó hoa ngọt ngào. Chúc em tuổi mới luôn rạng rỡ và mãi bình yên bên anh!",
    image: "assets/images/user/photo_27_quynh_birthday.jpg",
    sticker: "🎂",
    rotation: "-1.8deg"
  },
  {
    id: 6,
    title: "Fact đau đầu: 'Combo 4 ngày lễ trong 1 tháng'",
    date: "Fact từ năm sau",
    note: "Nghĩ về từ năm sau mà toát mồ hôi hột: Chưa đầy 1 tháng mà dính 4 ngày lễ liên tiếp: 10/10 Cầu hôn, 17/10 Ngày yêu, 20/10 Phụ nữ VN, 07/11 Sinh nhật em... Chưa biết tặng quà gì, nghĩ thôi đã đau đầu! =))",
    image: "assets/images/user/photo_28_birthday_flowers.jpg",
    sticker: "🤯",
    rotation: "2.1deg"
  }
];

// Danh mục gallery
const galleryCategories = [
  { id: "all", label: "Tất cả kỷ niệm", count: galleryMemories.length },
  { id: "together", label: "Áo Dài & Bên nhau", count: galleryMemories.filter(m => m.category === "together").length },
  { id: "travel", label: "Chuyến đi xa", count: galleryMemories.filter(m => m.category === "travel").length },
  { id: "special", label: "Dịp đặc biệt", count: galleryMemories.filter(m => m.category === "special").length },
  { id: "dates", label: "Hẹn hò", count: galleryMemories.filter(m => m.category === "dates").length },
  { id: "moments", label: "Khoảnh khắc nhỏ", count: galleryMemories.filter(m => m.category === "moments").length }
];
