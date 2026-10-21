/**
 * TRE-TRAU.JS — VIRAL LOVE CONFESSION MEME PAGE SCRIPT (SMOOTH & CLEAN EDITION)
 * Mini-game tương tác tỏ tình lươn lẹo dành cho Sơn & Quỳnh
 * - Web Audio Synthesizer (Zero asset dependency)
 * - 60fps GPU-accelerated smooth dodge mechanics
 * - 14+ Rich Meme Events with anti-spam cooldown
 * - HTML5 Canvas Love Certificate Generator
 */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // =========================================================================
  // 1. SOUND SYNTHESIZER (MOBILE-BULLETPROOF DUAL ENGINE)
  // =========================================================================
  class SoundSynth {
    constructor() {
      this.ctx = null;
      this.isMuted = localStorage.getItem("treTrauSoundMuted") === "true";
      this.isUnlocked = false;
      this.wavFallbacks = {};
      this.audioElements = {};
      this.initFallbacks();
      this.bindGlobalUnlock();
    }

    // Generate tiny, pure-JS WAV data URIs as zero-asset fallback for mobile
    initFallbacks() {
      try {
        const createWav = (sampleRate, samples) => {
          const numSamples = samples.length;
          const buffer = new ArrayBuffer(44 + numSamples * 2);
          const view = new DataView(buffer);
          view.setUint32(0, 0x52494646, false); // "RIFF"
          view.setUint32(4, 36 + numSamples * 2, true);
          view.setUint32(8, 0x57415645, false); // "WAVE"
          view.setUint32(12, 0x666d7420, false); // "fmt "
          view.setUint32(16, 16, true);
          view.setUint16(20, 1, true); // PCM
          view.setUint16(22, 1, true); // Mono
          view.setUint32(24, sampleRate, true);
          view.setUint32(28, sampleRate * 2, true);
          view.setUint16(32, 2, true);
          view.setUint16(34, 16, true);
          view.setUint32(36, 0x64617461, false); // "data"
          view.setUint32(40, numSamples * 2, true);
          for (let i = 0; i < numSamples; i++) {
            const s = Math.max(-1, Math.min(1, samples[i]));
            view.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
          }
          let binary = "";
          const bytes = new Uint8Array(buffer);
          const chunk = 8192;
          for (let i = 0; i < bytes.byteLength; i += chunk) {
            binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
          }
          return "data:audio/wav;base64," + btoa(binary);
        };

        const sr = 22050;
        // 1. Pop (chirp)
        const popSamples = new Float32Array(Math.floor(sr * 0.09));
        for (let i = 0; i < popSamples.length; i++) {
          const t = i / sr;
          const freq = 450 + 400 * (t / 0.09);
          popSamples[i] = Math.sin(2 * Math.PI * freq * t) * (1 - t / 0.09) * 0.45;
        }
        this.wavFallbacks.pop = createWav(sr, popSamples);

        // 2. Boing (spring swoop)
        const boingSamples = new Float32Array(Math.floor(sr * 0.16));
        for (let i = 0; i < boingSamples.length; i++) {
          const t = i / sr;
          const freq = 220 + 400 * Math.sin(Math.PI * (t / 0.16));
          boingSamples[i] = Math.sin(2 * Math.PI * freq * t) * (1 - t / 0.16) * 0.5;
        }
        this.wavFallbacks.boing = createWav(sr, boingSamples);

        // Preload HTML5 Audio elements for instant, low-latency mobile playback
        this.audioElements.pop = new Audio(this.wavFallbacks.pop);
        this.audioElements.boing = new Audio(this.wavFallbacks.boing);
        Object.values(this.audioElements).forEach((el) => {
          el.preload = "auto";
        });
      } catch (e) {
        console.warn("WAV synthesis fallback init error:", e);
      }
    }

    bindGlobalUnlock() {
      const unlockHandler = () => {
        this.unlock();
      };
      ["touchstart", "touchend", "click", "pointerdown"].forEach((evt) => {
        window.addEventListener(evt, unlockHandler, { passive: true });
      });
    }

    unlock() {
      // 1. Initialize & resume Web Audio AudioContext
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }

      // 2. Warm up silent Web Audio buffer on mobile
      if (this.ctx) {
        try {
          const buffer = this.ctx.createBuffer(1, 1, 22050);
          const source = this.ctx.createBufferSource();
          source.buffer = buffer;
          source.connect(this.ctx.destination);
          source.start(0);
        } catch (e) {}
      }

      // 3. Unlock HTML5 Audio elements during user gesture
      if (this.audioElements) {
        Object.values(this.audioElements).forEach((el) => {
          try {
            el.load();
          } catch (e) {}
        });
      }

      this.isUnlocked = true;
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      localStorage.setItem("treTrauSoundMuted", this.isMuted.toString());
      return this.isMuted;
    }

    // Play via HTML5 Audio fallback with instant response
    playHtml5Fallback(name) {
      if (this.isMuted || !this.wavFallbacks[name]) return;
      try {
        const audio = this.audioElements[name] || new Audio(this.wavFallbacks[name]);
        audio.currentTime = 0;
        audio.volume = 0.6;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      } catch (e) {}
    }

    // Safe runner: prioritizes Web Audio, falls back immediately on mobile gestures
    _run(action, fallbackName) {
      if (this.isMuted) return;
      this.unlock();

      let playedViaWebAudio = false;
      if (this.ctx && this.ctx.state === "running") {
        try {
          action(Math.max(this.ctx.currentTime, 0.001) + 0.005);
          playedViaWebAudio = true;
        } catch (e) {
          playedViaWebAudio = false;
        }
      }

      // On mobile where AudioContext is suspended or restricted by silent switch,
      // trigger HTML5 audio element immediately inside the current user gesture!
      if (!playedViaWebAudio) {
        if (this.ctx && this.ctx.state === "suspended") {
          this.ctx.resume().catch(() => {});
        }
        if (fallbackName) {
          this.playHtml5Fallback(fallbackName);
        }
      }
    }

    playPop() {
      this._run((now) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(820, now + 0.08);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.25, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      }, "pop");
    }

    playBoing() {
      this._run((now) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(620, now + 0.15);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.3, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
      }, "boing");
    }

    playAlert() {
      this._run((now) => {
        [523.25, 659.25, 783.99].forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "sine";
          const startTime = now + idx * 0.07;
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0.001, startTime);
          gain.gain.exponentialRampToValueAtTime(0.2, startTime + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.14);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(startTime);
          osc.stop(startTime + 0.14);
        });
      }, "pop");
    }

    playVictory() {
      this._run((now) => {
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "triangle";
          const startTime = now + idx * 0.09;
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0.001, startTime);
          gain.gain.exponentialRampToValueAtTime(0.25, startTime + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(startTime);
          osc.stop(startTime + 0.35);
        });
      }, "pop");
    }

    playDrama() {
      this._run((now) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(110, now);
        osc.frequency.linearRampToValueAtTime(75, now + 0.4);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.28, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.45);
      }, "boing");
    }
  }

  const sound = new SoundSynth();

  // =========================================================================
  // 2. STATE & CONFIGURATION (DIRECTLY TIED TO SƠN & QUỲNH)
  // =========================================================================
  const partnerOne = (typeof CONFIG !== "undefined" && CONFIG.couple && CONFIG.couple.partnerOne)
    ? CONFIG.couple.partnerOne
    : "Trường Sơn";
  const partnerTwo = (typeof CONFIG !== "undefined" && CONFIG.couple && CONFIG.couple.partnerTwo)
    ? CONFIG.couple.partnerTwo
    : "Diễm Quỳnh";

  const state = {
    senderName: partnerOne,
    crushName: partnerTwo,
    dodgesCount: 0,
    dodgeCooldown: false,
    isMemeActive: false,
    lastMemeTime: 0,
    hasAccepted: false,
    currentScreen: "intro"
  };

  // Rejection Button Dynamic Texts (Playful proposal & marriage teasing)
  const rejectTexts = [
    "Hụt rồi nha Vợ ơi! 😜",
    "Chưa chịu lấy chồng à? 😝",
    "Định ế cùng anh suốt đời à? 💍",
    "Bấm trượt kìa em ơi!",
    "Nhẫn cưới mua rồi trốn sao được! 💍",
    "Nút này cũng giục em lấy chồng nè!",
    "Bắt được anh thì anh nộp lương! 🏃‍♂️💨",
    "Đừng bướng nữa, làm Nóc Nhà sướng lắm! 🥺",
    "Bé Quỳnh nghĩ kỹ chưa, kèo này hời lắm! 👀",
    "Nút này khóa rồi lêu lêu!",
    "Ủa tính không chịu làm Vợ thật á? 🥺",
    "Bấm nút hồng cưới liền đi em! 💖"
  ];

  // 14+ Rich & Hilarious Marriage Proposal Banter Events (Sơn & Quỳnh) with Lucide Icons
  const memeEvents = [
    {
      id: "nop-luong",
      badge: "TỰ NGUYỆN NỘP LƯƠNG 100%",
      badgeIcon: "wallet",
      iconName: "wallet",
      colorClass: "avatar-amber",
      title: "Thông báo biến động số dư!",
      body: "Ký vào đơn là mỗi mùng 10 tài khoản nổ ting ting chuyển thẳng cho Quỳnh. Sơn chỉ xin giữ lại 50k ăn sáng mỗi ngày thôi. Kèo hời thế này chốt đơn lẹ đi em!",
      sound: "pop"
    },
    {
      id: "rua-bat",
      badge: "MÁY RỬA BÁT CHẠY BẰNG CƠM",
      badgeIcon: "sparkles",
      iconName: "sparkles",
      colorClass: "avatar-rose",
      title: "Cam kết bao trọn việc nhà",
      body: "Sơn hứa quét nhà, lau nhà, cọ toilet, rửa chén bát không chừa một cái. Vợ chỉ việc nằm sofa đắp mặt nạ lướt TikTok thôi!",
      sound: "alert"
    },
    {
      id: "nhan-cuoi",
      badge: "NHẪN KIM CƯƠNG ĐÃ SẴN SÀNG",
      badgeIcon: "gem",
      iconName: "gem",
      colorClass: "avatar-amber",
      title: "Đã đo size tay vừa khít!",
      body: "Anh đã bí mật đo ngón áp út của Quỳnh rồi, nhẫn cưới đang nằm sẵn trong hộp nhung đây này. Gật đầu cái là đeo vào tay liền, chạy đi đâu cho thoát!",
      sound: "pop"
    },
    {
      id: "xe-om",
      badge: "XE ÔM ĐỘC QUYỀN TRỌN ĐỜI",
      badgeIcon: "navigation",
      iconName: "navigation",
      colorClass: "avatar-blue",
      title: "Tài xế riêng của Diễm Quỳnh",
      body: "Mưa không tới mặt, nắng không tới đầu. Cứ gọi 'Chồng ơi' là xe có mặt sau 3 nốt nhạc, phục vụ đưa đón suốt đời không tính phí!",
      sound: "alert"
    },
    {
      id: "nau-an",
      badge: "ĐẦU BẾP ĐỘC QUYỀN GIA ĐÌNH",
      badgeIcon: "utensils-crossed",
      iconName: "utensils-crossed",
      colorClass: "avatar-amber",
      title: "Menu hôm nay có gì?",
      body: "Món Quỳnh thèm, món Quỳnh thích và tất cả món ngon trên đời do chính tay anh Sơn vào bếp nấu. Ăn xong không cần rửa bát luôn!",
      sound: "pop"
    },
    {
      id: "nan-ni",
      badge: "BẮT ĐẦU DỖ DÀNH",
      badgeIcon: "heart-handshake",
      iconName: "heart-handshake",
      colorClass: "avatar-rose",
      title: "Nỡ lòng nào từ chối anh thế?",
      body: "Yêu nhau hơn 2 năm trời, người ta vừa đẹp trai, ngoan ngoãn, chung tình số 1 thế này Quỳnh không lấy làm chồng thì ai lấy đây? Bấm đồng ý đi mà!",
      sound: "alert"
    },
    {
      id: "het-han-dung-thu",
      badge: "HẾT HẠN DÙNG THỬ BẠN GÁI",
      badgeIcon: "clock",
      iconName: "clock",
      colorClass: "avatar-purple",
      title: "Gói 'Người Yêu' đã hết hạn!",
      body: "Thời hạn hợp đồng làm Bạn Gái đã kết thúc sau hơn 2 năm. Vui lòng nâng cấp lên gói 'VỢ YÊU TRỌN ĐỜI' để tiếp tục sử dụng dịch vụ cưng chiều không giới hạn!",
      sound: "pop"
    },
    {
      id: "vay-cuoi",
      badge: "VÁY CƯỚI ĐANG CHỜ QUỲNH",
      badgeIcon: "crown",
      iconName: "crown",
      colorClass: "avatar-rose",
      title: "Cô dâu xinh đẹp nhất trần đời",
      body: "Hình dung xem Quỳnh khoác lên chiếc váy cưới lộng lẫy bước vào lễ đường rạng ngời thế nào? Đừng để chú rể đứng chờ lâu sốt ruột nha!",
      sound: "alert"
    },
    {
      id: "trang-mat",
      badge: "TUẦN TRĂNG MẬT TRONG MƠ",
      badgeIcon: "plane",
      iconName: "plane",
      colorClass: "avatar-blue",
      title: "Vé trăng mật đã sẵn sàng!",
      body: "Lên Tà Xùa săn mây, sang Hà Giang ngắm hoa, hay bay đến những bờ biển cát trắng nắng vàng... Mình đi cùng nhau hết trọn cuộc đời này nhé!",
      isDrama: true,
      sound: "drama"
    },
    {
      id: "the-do-var",
      badge: "THẺ ĐỎ CHO NÚT TỪ CHỐI",
      badgeIcon: "flag",
      iconName: "flag",
      colorClass: "avatar-rose",
      title: "Trọng tài VAR vào cuộc!",
      body: "VAR thông báo: Nút từ chối đã bị truất quyền thi đấu vì cố tình trốn tránh hạnh phúc. Quỳnh bắt buộc phải chọn nút màu đỏ cam bên cạnh!",
      sound: "alert"
    },
    {
      id: "dieu-khoan-vo",
      badge: "ĐIỀU KHOẢN VỢ CHỒNG BẤT HỦ",
      badgeIcon: "scroll",
      iconName: "scroll",
      colorClass: "avatar-amber",
      title: "Hợp đồng hôn nhân chỉ có 2 điều:",
      body: "Điều 1: Vợ luôn luôn đúng.\nĐiều 2: Nếu vợ sai, chồng tự giác quỳ xin lỗi và xem lại Điều 1. Ký hợp đồng bằng nút ĐỒNG Ý ngay!",
      sound: "pop"
    },
    {
      id: "bao-hanh-100-nam",
      badge: "BẢO HÀNH CHÍNH HÃNG 100 NĂM",
      badgeIcon: "shield-check",
      iconName: "shield-check",
      colorClass: "avatar-emerald",
      title: "Cam kết chất lượng trọn đời",
      body: "Sơn cam kết 1 vợ 1 chồng chung thủy tuyệt đối, bảo hành chất lượng đến khi đầu bạc răng long, miễn đổi trả dưới mọi hình thức!",
      sound: "alert"
    },
    {
      id: "nut-bo-chay",
      badge: "NÚT BỎ CHẠY KÊU CỨU",
      badgeIcon: "footprints",
      iconName: "footprints",
      colorClass: "avatar-purple",
      title: "Nút bấm: 'Em chịu thua rồi chị Quỳnh ơi!'",
      body: "Nó bảo: 'Chị Quỳnh bấm hăng quá em chạy rụng chân rồi. Chị bấm nút Cưới anh Sơn đi để em được về hưu đi ăn cỗ cưới!' 😆",
      sound: "boing"
    },
    {
      id: "tin-hieu-trai-tim",
      badge: "TÍN HIỆU TỪ TRÁI TIM",
      badgeIcon: "heart",
      iconName: "heart",
      colorClass: "avatar-rose",
      title: "Định mệnh an bài rồi!",
      body: "Trời sinh Trường Sơn là để làm Chồng của Diễm Quỳnh rồi, em chạy đi đâu cho thoát nữa. Nắm tay anh về chung một nhà nhé em yêu! ❤️",
      sound: "alert"
    }
  ];

  // =========================================================================
  // 3. DOM ELEMENTS
  // =========================================================================
  const DOM = {
    // Screens
    introScreen: document.getElementById("intro-screen"),
    gameScreen: document.getElementById("game-screen"),
    successScreen: document.getElementById("success-screen"),
    // Intro elements
    btnStart: document.getElementById("btn-start"),
    // Game elements
    dodgeCount: document.getElementById("dodge-count"),
    buttonArena: document.getElementById("button-arena"),
    btnAgree: document.getElementById("btn-agree"),
    btnReject: document.getElementById("btn-reject"),
    confessionTargetName: document.getElementById("confession-target-name"),
    confessionSenderName: document.getElementById("confession-sender-name"),
    // Overlay Meme
    memeContainer: document.getElementById("meme-overlay-container"),
    // Success elements
    successSender: document.getElementById("success-sender"),
    successCrush: document.getElementById("success-crush"),
    certSender: document.getElementById("cert-sender"),
    certCrush: document.getElementById("cert-crush"),
    certDate: document.getElementById("cert-date"),
    btnDownloadCert: document.getElementById("btn-download-cert"),
    btnOpenMessageModal: document.getElementById("btn-open-message-modal"),
    btnReplay: document.getElementById("btn-replay"),
    confettiCanvas: document.getElementById("confetti-canvas"),
    // Top bar
    btnSoundToggle: document.getElementById("btn-sound-toggle"),
    soundIcon: document.getElementById("sound-icon"),
    // Modals
    messageModal: document.getElementById("message-modal"),
    messageTextarea: document.getElementById("message-textarea"),
    btnCopyMessage: document.getElementById("btn-copy-message"),
    btnCloseMessageModal: document.getElementById("btn-close-message-modal"),
    // Toast
    toast: document.getElementById("toast-msg")
  };

  // =========================================================================
  // 4. INITIALIZATION
  // =========================================================================
  function initNames() {
    if (DOM.confessionSenderName) DOM.confessionSenderName.textContent = state.senderName;
    if (DOM.confessionTargetName) DOM.confessionTargetName.textContent = state.crushName;
    if (DOM.successSender) DOM.successSender.textContent = state.senderName;
    if (DOM.successCrush) DOM.successCrush.textContent = state.crushName;
    if (DOM.certSender) DOM.certSender.textContent = state.senderName;
    if (DOM.certCrush) DOM.certCrush.textContent = state.crushName;

    const today = new Date();
    const dateStr = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;
    if (DOM.certDate) DOM.certDate.textContent = `Cấp ngày: ${dateStr}`;

    updateSoundIcon();
  }

  function updateSoundIcon() {
    const soundIcon = document.getElementById("sound-icon");
    if (soundIcon) {
      soundIcon.innerHTML = sound.isMuted
        ? '<i data-lucide="volume-x"></i>'
        : '<i data-lucide="volume-2"></i>';
      if (window.lucide) {
        lucide.createIcons({ root: soundIcon });
      }
    }
  }

  // =========================================================================
  // 5. NAVIGATION BETWEEN SCREENS
  // =========================================================================
  function showScreen(screenName) {
    state.currentScreen = screenName;
    DOM.introScreen.hidden = screenName !== "intro";
    DOM.gameScreen.hidden = screenName !== "game";
    DOM.successScreen.hidden = screenName !== "success";

    if (screenName === "game") {
      resetRejectButtonPosition();
      updateMeters();
    }

    if (screenName === "success") {
      startConfetti();
    } else {
      stopConfetti();
    }

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // =========================================================================
  // 6. BUTTERY SMOOTH REJECT BUTTON ENGINE (GPU-ACCELERATED & BOUNDED)
  // =========================================================================
  function resetRejectButtonPosition() {
    if (!DOM.btnReject) return;
    DOM.btnReject.style.position = "static";
    DOM.btnReject.style.transform = "translate3d(0, 0, 0)";
    DOM.btnReject.style.left = "auto";
    DOM.btnReject.style.top = "auto";
    DOM.btnReject.innerHTML = '<i data-lucide="ghost" class="btn-ghost-icon"></i><span id="btn-reject-text">CHƯA THÍCH ĐÂU</span>';
    DOM.btnReject.className = "btn-reject";
    if (window.lucide) lucide.createIcons({ root: DOM.btnReject });
  }

  function triggerDodge(event) {
    if (state.hasAccepted || state.dodgeCooldown || state.isMemeActive) return;

    // Track dodge timestamp for accidental mis-click protection on mobile
    state.lastDodgeTime = Date.now();

    // Fast, responsive 120ms cooldown
    state.dodgeCooldown = true;
    setTimeout(() => {
      state.dodgeCooldown = false;
    }, 120);

    state.dodgesCount++;
    updateMeters();

    // Sound effect
    sound.playBoing();

    // Random dodge behavior
    const modes = ["runAway", "tinyMode", "fakeAccept", "dramaticShake", "teleport", "memeReaction"];
    const mode = modes[Math.floor(Math.random() * modes.length)];

    // Randomize text with vector icon preservation
    const text = rejectTexts[Math.floor(Math.random() * rejectTexts.length)];
    const textSpan = DOM.btnReject.querySelector("#btn-reject-text");
    if (textSpan) {
      textSpan.textContent = text;
    } else {
      DOM.btnReject.innerHTML = `<i data-lucide="ghost" class="btn-ghost-icon"></i><span id="btn-reject-text">${text}</span>`;
      if (window.lucide) lucide.createIcons({ root: DOM.btnReject });
    }

    calculateSafePositionAndMove(mode);

    // Keep Agree button sleek & compact (subtle scale, max 1.05x instead of 1.4x)
    const scaleFactor = 1 + Math.min(state.dodgesCount * 0.005, 0.05);
    DOM.btnAgree.style.transform = `scale(${scaleFactor})`;

    // Check meme trigger
    checkMemeTrigger();
  }

  function calculateSafePositionAndMove(mode) {
    if (!DOM.buttonArena || !DOM.btnReject) return;

    const arenaRect = DOM.buttonArena.getBoundingClientRect();
    const btnRect = DOM.btnReject.getBoundingClientRect();
    const agreeRect = DOM.btnAgree.getBoundingClientRect();

    DOM.btnReject.style.position = "absolute";

    const padding = 10;
    const maxLeft = Math.max(padding, arenaRect.width - btnRect.width - padding);
    const maxTop = Math.max(padding, arenaRect.height - btnRect.height - padding);

    let targetLeft, targetTop;
    let attempts = 0;
    let safeFound = false;

    const agreeLeftRel = agreeRect.left - arenaRect.left;
    const agreeTopRel = agreeRect.top - arenaRect.top;
    const agreeRightRel = agreeLeftRel + agreeRect.width;
    const agreeBottomRel = agreeTopRel + agreeRect.height;

    while (attempts < 20 && !safeFound) {
      targetLeft = Math.max(padding, Math.floor(Math.random() * maxLeft));
      targetTop = Math.max(padding, Math.floor(Math.random() * maxTop));

      const targetRight = targetLeft + btnRect.width;
      const targetBottom = targetTop + btnRect.height;

      const buffer = 32; // Generous distance buffer from agree button
      const overlapsAgree = !(
        targetRight < agreeLeftRel - buffer ||
        targetLeft > agreeRightRel + buffer ||
        targetBottom < agreeTopRel - buffer ||
        targetTop > agreeBottomRel + buffer
      );

      if (!overlapsAgree) {
        safeFound = true;
      }
      attempts++;
    }

    if (!safeFound) {
      targetLeft = padding;
      targetTop = padding;
    }

    DOM.btnReject.classList.remove("is-shaking", "is-fake-agree", "is-tiny");

    // Random slight rotation for natural physical feel
    const randomAngle = Math.floor(Math.random() * 12 - 6);

    if (mode === "dramaticShake") {
      DOM.btnReject.classList.add("is-shaking");
      sound.playDrama();
    } else if (mode === "tinyMode") {
      DOM.btnReject.classList.add("is-tiny");
      setTimeout(() => {
        DOM.btnReject.classList.remove("is-tiny");
      }, 600);
    } else if (mode === "fakeAccept") {
      DOM.btnReject.classList.add("is-fake-agree");
      DOM.btnReject.innerHTML = '<i data-lucide="heart" class="btn-ghost-icon"></i><span id="btn-reject-text">Đồng ý... à không! 😝</span>';
      if (window.lucide) lucide.createIcons({ root: DOM.btnReject });
      setTimeout(() => {
        DOM.btnReject.classList.remove("is-fake-agree");
      }, 750);
    } else if (mode === "teleport") {
      DOM.btnReject.style.opacity = "0";
      setTimeout(() => {
        DOM.btnReject.style.left = `${targetLeft}px`;
        DOM.btnReject.style.top = `${targetTop}px`;
        DOM.btnReject.style.transform = `rotate(${randomAngle}deg)`;
        DOM.btnReject.style.opacity = "1";
      }, 70);
      return;
    }

    DOM.btnReject.style.left = `${targetLeft}px`;
    DOM.btnReject.style.top = `${targetTop}px`;
    DOM.btnReject.style.transform = `rotate(${randomAngle}deg)`;
  }

  function updateMeters() {
    if (DOM.dodgeCount) {
      DOM.dodgeCount.textContent = state.dodgesCount;
    }
  }

  // =========================================================================
  // 7. MEME EVENT ENGINE
  // =========================================================================
  function checkMemeTrigger() {
    const now = Date.now();
    if (now - state.lastMemeTime < 3000) return;

    const shouldTrigger =
      state.dodgesCount === 2 ||
      state.dodgesCount === 4 ||
      state.dodgesCount === 7 ||
      state.dodgesCount === 10 ||
      (state.dodgesCount > 10 && Math.random() < 0.45);

    if (shouldTrigger) {
      state.lastMemeTime = now;
      const event = memeEvents[Math.floor(Math.random() * memeEvents.length)];
      showMemeEvent(event);
    }
  }

  function showMemeEvent(event) {
    if (!DOM.memeContainer || state.isMemeActive) return;
    state.isMemeActive = true;

    if (event.sound === "drama") {
      sound.playDrama();
    } else {
      sound.playAlert();
    }

    if (event.isDrama) {
      DOM.gameScreen.classList.add("is-drama");
      setTimeout(() => {
        DOM.gameScreen.classList.remove("is-drama");
      }, 2200);
    }

    DOM.memeContainer.innerHTML = `
      <div class="meme-popup" role="dialog" aria-modal="true">
        <span class="meme-badge"><i data-lucide="${event.badgeIcon || 'sparkles'}"></i> <span>${escapeHTML(event.badge)}</span></span>
        <div class="meme-icon-avatar ${event.colorClass || 'avatar-rose'}">
          <i data-lucide="${event.iconName || 'heart'}" class="meme-svg-icon"></i>
        </div>
        <h3 class="meme-title">${escapeHTML(event.title)}</h3>
        <p class="meme-body">${escapeHTML(event.body).replace(/\n/g, "<br>")}</p>
        <button id="btn-meme-close" class="meme-btn-close" type="button">
          <span>Tiếp tục nè!</span>
          <i data-lucide="sparkles"></i>
        </button>
      </div>
    `;

    if (window.lucide) lucide.createIcons({ root: DOM.memeContainer });

    const closeBtn = document.getElementById("btn-meme-close");
    if (closeBtn) {
      closeBtn.focus();
      closeBtn.addEventListener("click", () => {
        dismissMemeEvent();
      });
    }

    setTimeout(() => {
      if (state.isMemeActive) dismissMemeEvent();
    }, 5500);
  }

  function dismissMemeEvent() {
    const popup = DOM.memeContainer.querySelector(".meme-popup");
    if (popup) {
      popup.classList.add("is-dismissing");
      setTimeout(() => {
        DOM.memeContainer.innerHTML = "";
        state.isMemeActive = false;
      }, 220);
    } else {
      DOM.memeContainer.innerHTML = "";
      state.isMemeActive = false;
    }
  }

  // =========================================================================
  // 8. ACCEPTANCE & SUCCESS
  // =========================================================================
  function handleAgree() {
    if (state.hasAccepted) return;

    // Protection against rapid accidental taps on mobile:
    // If the reject button dodged less than 450ms ago, the user was double-tapping to catch the dodging button!
    if (Date.now() - (state.lastDodgeTime || 0) < 450) {
      return;
    }

    state.hasAccepted = true;
    sound.playVictory();
    dismissMemeEvent();
    showScreen("success");
    showToast("Chúc mừng! Trái tim đã tìm thấy bến đỗ 💖");
  }

  // =========================================================================
  // 9. CLIENT-SIDE CANVAS LOVE MARRIAGE CERTIFICATE
  // =========================================================================
  function downloadLoveCertificate() {
    sound.playPop();
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");

    // 1. Parchment / Warm luxury background
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 800);
    bgGrad.addColorStop(0, "#FFFDF9");
    bgGrad.addColorStop(0.5, "#FFF5F7");
    bgGrad.addColorStop(1, "#FFE8EE");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 800);

    // 2. Borders (Gold filigree & Ruby red double border)
    ctx.strokeStyle = "#E11D48";
    ctx.lineWidth = 14;
    ctx.strokeRect(28, 28, 1144, 744);

    ctx.strokeStyle = "#F59E0B";
    ctx.lineWidth = 5;
    ctx.strokeRect(44, 44, 1112, 712);

    ctx.strokeStyle = "rgba(225, 29, 72, 0.25)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(54, 54, 1092, 692);

    // Corner decorative symbols
    ctx.fillStyle = "#E11D48";
    ctx.font = "38px sans-serif";
    ctx.fillText("💍", 64, 94);
    ctx.fillText("💍", 1096, 94);
    ctx.fillText("💖", 64, 720);
    ctx.fillText("💖", 1096, 720);

    // 3. Header
    ctx.fillStyle = "#B45309";
    ctx.font = "bold 24px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("CỘNG HÒA TÌNH YÊU VIỆT NAM — ĐỘC LẬP TỰ DO HẠNH PHÚC", 600, 115);

    ctx.fillStyle = "#D97706";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText("★ ★ ★", 600, 146);

    ctx.fillStyle = "#991B1B";
    ctx.font = "900 46px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("GIẤY ĐĂNG KÝ KẾT HÔN & BỔ NHIỆM NÓC NHÀ", 600, 215);

    ctx.fillStyle = "#4B5563";
    ctx.font = "22px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("Chứng nhận Diễm Quỳnh chính thức nắm quyền Nóc Nhà và quản lý Trường Sơn trọn đời", 600, 262);

    // 4. Couple Names Banner
    ctx.fillStyle = "#FFFFFF";
    ctx.shadowColor = "rgba(225, 29, 72, 0.22)";
    ctx.shadowBlur = 24;
    ctx.fillRect(140, 305, 920, 150);
    ctx.shadowBlur = 0;

    ctx.strokeStyle = "#F59E0B";
    ctx.lineWidth = 3;
    ctx.strokeRect(140, 305, 920, 150);

    ctx.fillStyle = "#E11D48";
    ctx.font = "bold 60px 'Playfair Display', Georgia, serif";
    ctx.fillText(`${state.senderName}  💍  ${state.crushName}`, 600, 400);

    // 5. Commitments & Quote
    ctx.fillStyle = "#047857";
    ctx.font = "bold 22px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("✓ Tự nguyện nộp lương 100%   •   ✓ Việc nhà bao trọn   •   ✓ Vợ luôn luôn đúng", 600, 495);

    ctx.fillStyle = "#374151";
    ctx.font = "italic 24px 'Playfair Display', Georgia, serif";
    ctx.fillText('"Yêu nhau từ thuở hẹn hò — Kể từ hôm nay em là vợ anh"', 600, 545);

    // 6. Seal / Stamp
    ctx.save();
    ctx.translate(940, 615);
    ctx.rotate((12 * Math.PI) / 180);
    ctx.strokeStyle = "#DC2626";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(0, 0, 78, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "#DC2626";
    ctx.font = "bold 17px sans-serif";
    ctx.fillText("CHÍNH THỨC CÓ CHỒNG", 0, -22);
    ctx.font = "34px sans-serif";
    ctx.fillText("💍", 0, 14);
    ctx.font = "14px sans-serif";
    ctx.fillText("ĐÃ KÝ KẾT", 0, 44);
    ctx.restore();

    // 7. Footer
    const today = new Date();
    const dateStr = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;
    ctx.fillStyle = "#6B7280";
    ctx.font = "20px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`Số lần thử từ chối: ${state.dodgesCount} lần (Thất bại toàn tập vì định mệnh đã an bài)`, 80, 700);
    ctx.fillText(`Ngày cấp: ${dateStr} — Bản cam kết có hiệu lực vĩnh viễn`, 80, 665);

    const imageUri = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `giay-dang-ky-ket-hon-${state.senderName}-${state.crushName}.png`;
    link.href = imageUri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("Đã lưu Giấy Đăng Ký Kết Hôn về máy! 💍📸");
  }

  // =========================================================================
  // 10. CONFETTI PARTICLES ENGINE
  // =========================================================================
  let confettiAnimId = null;
  const confettiParticles = [];

  function startConfetti() {
    if (!DOM.confettiCanvas) return;
    const canvas = DOM.confettiCanvas;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    confettiParticles.length = 0;
    const colors = ["#FF3B69", "#7C3AED", "#FBBF24", "#38BDF8", "#34D399", "#EC4899"];

    for (let i = 0; i < 85; i++) {
      confettiParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        w: Math.random() * 8 + 6,
        h: Math.random() * 5 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vy: Math.random() * 3 + 2,
        vx: Math.random() * 2 - 1,
        rot: Math.random() * 360,
        rotSpeed: Math.random() * 5 - 2.5,
        shape: Math.random() > 0.4 ? "rect" : "heart"
      });
    }

    let frames = 0;
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frames++;

      confettiParticles.forEach(p => {
        p.y += p.vy;
        p.x += p.vx;
        p.rot += p.rotSpeed;

        if (p.y > canvas.height) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;

        if (p.shape === "rect") {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        } else {
          ctx.font = `${p.w + 6}px sans-serif`;
          ctx.fillText("♥", 0, 0);
        }
        ctx.restore();
      });

      if (frames < 380) {
        confettiAnimId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    if (confettiAnimId) cancelAnimationFrame(confettiAnimId);
    confettiAnimId = requestAnimationFrame(render);
  }

  function stopConfetti() {
    if (confettiAnimId) {
      cancelAnimationFrame(confettiAnimId);
      confettiAnimId = null;
    }
    if (DOM.confettiCanvas) {
      const ctx = DOM.confettiCanvas.getContext("2d");
      ctx.clearRect(0, 0, DOM.confettiCanvas.width, DOM.confettiCanvas.height);
    }
  }

  // =========================================================================
  // 11. TOAST HELPER
  // =========================================================================
  function showToast(msg, duration = 2600) {
    if (!DOM.toast) return;
    DOM.toast.textContent = msg;
    DOM.toast.classList.add("show");
    clearTimeout(DOM.toast._timer);
    DOM.toast._timer = setTimeout(() => {
      DOM.toast.classList.remove("show");
    }, duration);
  }

  function escapeHTML(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // =========================================================================
  // 12. EVENT LISTENERS SETUP
  // =========================================================================
  function setupListeners() {
    // 1. Start CTA
    if (DOM.btnStart) {
      DOM.btnStart.addEventListener("click", () => {
        sound.unlock();
        sound.playPop();
        showScreen("game");
      });
    }

    // 2. Reject Button Dodge Handlers
    // CRITICAL for Mobile: DO NOT call e.preventDefault() as that revokes User Activation on WebKit/Safari
    if (DOM.btnReject) {
      DOM.btnReject.addEventListener("mouseenter", triggerDodge);

      DOM.btnReject.addEventListener("pointerdown", (e) => {
        sound.unlock();
        triggerDodge(e);
      });

      DOM.btnReject.addEventListener("click", (e) => {
        sound.unlock();
        triggerDodge(e);
      });
    }

    // Proximity trigger on desktop
    if (DOM.buttonArena) {
      DOM.buttonArena.addEventListener("mousemove", (e) => {
        if (!DOM.btnReject || state.hasAccepted || state.dodgeCooldown || state.isMemeActive) return;
        const rect = DOM.btnReject.getBoundingClientRect();
        const dist = Math.hypot(
          e.clientX - (rect.left + rect.width / 2),
          e.clientY - (rect.top + rect.height / 2)
        );
        if (dist < 65) {
          triggerDodge(e);
        }
      });
    }

    // 3. Agree Button
    if (DOM.btnAgree) {
      DOM.btnAgree.addEventListener("click", (e) => {
        sound.unlock();
        handleAgree(e);
      });
    }

    // 4. Download Certificate
    if (DOM.btnDownloadCert) {
      DOM.btnDownloadCert.addEventListener("click", downloadLoveCertificate);
    }

    // 5. Sound Toggle
    if (DOM.btnSoundToggle) {
      DOM.btnSoundToggle.addEventListener("click", () => {
        sound.unlock();
        const isMuted = sound.toggleMute();
        updateSoundIcon();
        if (isMuted) {
          showToast("Đã tắt âm thanh 🔇");
        } else {
          sound.playPop();
          showToast("Đã bật âm thanh 🔊 (iPhone nhớ gạt cần rung sang Chuông nhé!)", 3800);
        }
      });
    }

    // 6. Replay Button
    if (DOM.btnReplay) {
      DOM.btnReplay.addEventListener("click", () => {
        sound.playPop();
        state.dodgesCount = 0;
        state.hasAccepted = false;
        state.isMemeActive = false;
        DOM.btnAgree.style.transform = "scale(1)";
        showScreen("intro");
        showToast("Đã làm mới trò chơi! Thử lại nha! 🔁");
      });
    }

    // 7. Message Modal
    if (DOM.btnOpenMessageModal) {
      DOM.btnOpenMessageModal.addEventListener("click", () => {
        sound.playPop();
        if (DOM.messageTextarea) {
          DOM.messageTextarea.value = `Gửi anh Sơn thương yêu,\nEm bấm đồng ý làm VỢ anh rồi đấy nhé! Liệu mà ngoan ngoãn nộp lương 100%, chăm rửa bát quét nhà, chở em đi ăn đồ ngon và cưng chiều em suốt đời nghe chưa! 💍💖\n(Ký tên: Vợ yêu ${state.crushName})`;
        }
        DOM.messageModal.removeAttribute("hidden");
      });
    }

    if (DOM.btnCloseMessageModal) {
      DOM.btnCloseMessageModal.addEventListener("click", () => {
        DOM.messageModal.setAttribute("hidden", "");
      });
    }

    if (DOM.btnCopyMessage) {
      DOM.btnCopyMessage.addEventListener("click", () => {
        if (!DOM.messageTextarea) return;
        const text = DOM.messageTextarea.value;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(() => {
            sound.playPop();
            showToast("Đã sao chép! Gửi ngay cho anh Sơn nha! 📋");
            DOM.messageModal.setAttribute("hidden", "");
          }).catch(() => {
            fallbackCopy(text);
          });
        } else {
          fallbackCopy(text);
        }
      });
    }

    function fallbackCopy(text) {
      DOM.messageTextarea.select();
      document.execCommand("copy");
      showToast("Đã sao chép lời nhắn! 📋");
      DOM.messageModal.setAttribute("hidden", "");
    }

    // Close modal clicking outside
    if (DOM.messageModal) {
      DOM.messageModal.addEventListener("click", (e) => {
        if (e.target === DOM.messageModal) {
          DOM.messageModal.setAttribute("hidden", "");
        }
      });
    }

    // Resize window
    window.addEventListener("resize", () => {
      if (state.currentScreen === "game") {
        resetRejectButtonPosition();
      }
    });
  }

  // =========================================================================
  // 13. BOOTSTRAP
  // =========================================================================
  initNames();
  setupListeners();
  showScreen("intro");
  if (window.lucide) {
    lucide.createIcons();
  }
});
