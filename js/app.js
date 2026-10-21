/**
 * OUR LOVE STORY — MAIN APPLICATION SCRIPT (ES6+)
 * Quản lý toàn bộ tính năng tương tác, animation, đếm ngày yêu,
 * gallery filter, lightbox modal, music player và hạt bay lung linh.
 */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // =========================================================================
  // 1. GLOBAL STATE & REFERENCES
  // =========================================================================
  const state = {
    currentCategory: "all",
    filteredMemories: [...galleryMemories],
    currentLightboxIndex: 0,
    isPlayingMusic: false,
    hasCountedUp: false,
    touchStartX: 0,
    touchStartY: 0,
    touchEndX: 0,
    touchEndY: 0
  };

  // DOM Elements
  const DOM = {
    body: document.body,
    // Opening screen
    openingScreen: document.getElementById("opening-screen"),
    btnEnter: document.getElementById("btn-enter"),
    openingImg: document.getElementById("opening-img"),
    // Hero
    heroTagline: document.getElementById("hero-tagline"),
    heroPartnerOne: document.getElementById("hero-partner-one"),
    heroPartnerTwo: document.getElementById("hero-partner-two"),
    heroAnniversaryText: document.getElementById("hero-anniversary-text"),
    heroQuoteText: document.getElementById("hero-quote-text"),
    heroImg: document.getElementById("hero-img"),
    heroParallax: document.getElementById("hero-parallax"),
    // Counter
    counterSinceDate: document.getElementById("counter-since-date"),
    counterTotalDays: document.getElementById("counter-total-days"),
    countYears: document.getElementById("count-years"),
    countMonths: document.getElementById("count-months"),
    countDays: document.getElementById("count-days"),
    countHours: document.getElementById("count-hours"),
    countMinutes: document.getElementById("count-minutes"),
    countSeconds: document.getElementById("count-seconds"),
    // Timeline & Content
    timelineContainer: document.getElementById("timeline-container"),
    galleryFilters: document.getElementById("gallery-filters"),
    galleryGrid: document.getElementById("gallery-grid"),
    momentsGrid: document.getElementById("moments-grid"),
    // Letter
    letterSalutation: document.getElementById("letter-salutation"),
    letterContent: document.getElementById("letter-content"),
    letterDate: document.getElementById("letter-date"),
    letterClosing: document.getElementById("letter-closing"),
    letterSignature: document.getElementById("letter-signature"),
    btnToggleLetter: document.getElementById("btn-toggle-letter"),
    letterParchment: document.getElementById("letter-parchment"),
    // Final
    finalImg: document.getElementById("final-img"),
    finalQuoteEn: document.getElementById("final-quote-en"),
    finalQuoteVi: document.getElementById("final-quote-vi"),
    finalPartnerOne: document.getElementById("final-partner-one"),
    finalPartnerTwo: document.getElementById("final-partner-two"),
    finalDateDisplay: document.getElementById("final-date-display"),
    btnBackTop: document.getElementById("btn-back-top"),
    btnSendHeart: document.getElementById("btn-send-heart"),
    // Music Player
    musicPlayer: document.getElementById("music-player"),
    audioElement: document.getElementById("audio-element"),
    btnDiscToggle: document.getElementById("btn-disc-toggle"),
    btnHeaderMusic: document.getElementById("btn-header-music"),
    musicTitle: document.getElementById("music-title"),
    musicArtist: document.getElementById("music-artist"),
    musicPlayIcon: document.getElementById("music-play-icon"),
    btnCollapseMusic: document.getElementById("btn-collapse-music"),
    musicErrorTip: document.getElementById("music-error-tip"),
    // Lightbox
    lightboxModal: document.getElementById("lightbox-modal"),
    lightboxBackdrop: document.getElementById("lightbox-backdrop"),
    lightboxImg: document.getElementById("lightbox-img"),
    btnCloseLightbox: document.getElementById("btn-close-lightbox"),
    btnPrevPhoto: document.getElementById("btn-prev-photo"),
    btnNextPhoto: document.getElementById("btn-next-photo"),
    lbCurrent: document.getElementById("lb-current"),
    lbTotal: document.getElementById("lb-total"),
    lbTitle: document.getElementById("lb-title"),
    lbCaption: document.getElementById("lb-caption"),
    lbDate: document.getElementById("lb-date"),
    lbLocText: document.getElementById("lb-loc-text"),
    lightboxStage: document.getElementById("lightbox-stage"),
    // Nav
    mobileNav: document.getElementById("mobile-nav"),
    mobileNavItems: document.querySelectorAll(".mobile-nav-item"),
    desktopNavLinks: document.querySelectorAll(".nav-link"),
    // Particles
    ambientCanvas: document.getElementById("ambient-canvas"),
    heartBurstContainer: document.getElementById("heart-burst-container")
  };

  // =========================================================================
  // 2. INITIALIZE FROM CONFIG
  // =========================================================================
  function initFromConfig() {
    if (typeof CONFIG === "undefined") return;

    // Couple info
    if (DOM.heroPartnerOne) DOM.heroPartnerOne.textContent = CONFIG.couple.partnerOne;
    if (DOM.heroPartnerTwo) DOM.heroPartnerTwo.textContent = CONFIG.couple.partnerTwo;
    if (DOM.heroTagline) DOM.heroTagline.textContent = CONFIG.couple.tagline.toUpperCase();
    if (DOM.heroAnniversaryText) DOM.heroAnniversaryText.textContent = `Since ${CONFIG.couple.anniversaryDate.split("-").reverse().join(".")}`;
    if (DOM.heroQuoteText) DOM.heroQuoteText.textContent = `"${CONFIG.couple.heroQuote}"`;

    if (DOM.counterSinceDate) DOM.counterSinceDate.textContent = CONFIG.couple.displayDate;

    // Final section
    if (DOM.finalQuoteEn) DOM.finalQuoteEn.textContent = `"${CONFIG.couple.finalQuote}"`;
    if (DOM.finalQuoteVi) DOM.finalQuoteVi.textContent = CONFIG.couple.finalQuoteVi;
    if (DOM.finalPartnerOne) DOM.finalPartnerOne.textContent = CONFIG.couple.partnerOne;
    if (DOM.finalPartnerTwo) DOM.finalPartnerTwo.textContent = CONFIG.couple.partnerTwo;
    if (DOM.finalDateDisplay) DOM.finalDateDisplay.textContent = `Since ${CONFIG.couple.anniversaryDate.split("-").reverse().join(".")}`;

    // Images
    if (DOM.heroImg && CONFIG.images.hero) DOM.heroImg.src = CONFIG.images.hero;
    if (DOM.openingImg && CONFIG.images.openingBg) DOM.openingImg.src = CONFIG.images.openingBg;
    if (DOM.finalImg && CONFIG.images.finalBg) DOM.finalImg.src = CONFIG.images.finalBg;

    // Letter
    if (DOM.letterSalutation) DOM.letterSalutation.textContent = CONFIG.letter.salutation;
    if (DOM.letterDate) DOM.letterDate.textContent = CONFIG.letter.date;
    if (DOM.letterClosing) DOM.letterClosing.textContent = CONFIG.letter.closing;
    if (DOM.letterSignature) DOM.letterSignature.textContent = CONFIG.letter.signature;

    if (DOM.letterContent && Array.isArray(CONFIG.letter.content)) {
      DOM.letterContent.innerHTML = CONFIG.letter.content.map(p => `<p>${escapeHTML(p)}</p>`).join("");
    }

    // Music
    if (DOM.musicTitle) DOM.musicTitle.textContent = CONFIG.music.title;
    if (DOM.musicArtist) DOM.musicArtist.textContent = CONFIG.music.artist;
    if (DOM.audioElement && CONFIG.music.src) {
      DOM.audioElement.src = CONFIG.music.src;
    }
  }

  // =========================================================================
  // 3. OPENING SCREEN LOGIC
  // =========================================================================
  function initOpeningScreen() {
    if (!DOM.btnEnter || !DOM.openingScreen) return;

    // Kiểm tra xem đã mở trong phiên chưa (Session storage)
    const hasEntered = sessionStorage.getItem("loveStoryEntered");
    if (hasEntered === "true") {
      DOM.openingScreen.classList.add("is-hidden");
      DOM.body.classList.remove("is-intro-active");
      triggerInitialReveals();
      return;
    }

    DOM.btnEnter.addEventListener("click", () => {
      DOM.openingScreen.classList.add("is-hidden");
      DOM.body.classList.remove("is-intro-active");
      sessionStorage.setItem("loveStoryEntered", "true");

      // Spawn một chùm hạt tim chúc mừng
      spawnHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 10);

      // Trigger reveals
      setTimeout(() => {
        triggerInitialReveals();
      }, 300);
    });
  }

  // =========================================================================
  // 4. RELATIONSHIP COUNTER (ĐẾM NGÀY YÊU)
  // =========================================================================
  function getAnniversaryDate() {
    if (typeof CONFIG !== "undefined" && CONFIG.couple && CONFIG.couple.anniversaryDate) {
      const d = new Date(CONFIG.couple.anniversaryDate);
      if (!isNaN(d.getTime())) return d;
    }
    return new Date("2024-10-17T00:00:00");
  }

  function updateCounter() {
    const startDate = getAnniversaryDate();
    const now = new Date();
    let diffMs = now - startDate;

    if (diffMs < 0) {
      // Ngày tương lai
      diffMs = 0;
    }

    // Tổng số ngày
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    // Tính chi tiết Năm, Tháng, Ngày
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    if (!state.hasCountedUp) {
      // Khi chưa chạy hoạt ảnh tăng dần
      DOM.counterTotalDays.textContent = totalDays.toLocaleString("vi-VN");
    }

    if (DOM.countYears) DOM.countYears.textContent = Math.max(0, years);
    if (DOM.countMonths) DOM.countMonths.textContent = Math.max(0, months);
    if (DOM.countDays) DOM.countDays.textContent = Math.max(0, days);
    if (DOM.countHours) DOM.countHours.textContent = String(hours).padStart(2, "0");
    if (DOM.countMinutes) DOM.countMinutes.textContent = String(minutes).padStart(2, "0");
    if (DOM.countSeconds) DOM.countSeconds.textContent = String(seconds).padStart(2, "0");
  }

  function animateCountUp() {
    if (state.hasCountedUp) return;
    state.hasCountedUp = true;

    const startDate = getAnniversaryDate();
    const now = new Date();
    const targetDays = Math.max(0, Math.floor((now - startDate) / (1000 * 60 * 60 * 24)));

    const duration = 1800; // 1.8 giây
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeProgress * targetDays);

      DOM.counterTotalDays.textContent = currentVal.toLocaleString("vi-VN");

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        DOM.counterTotalDays.textContent = targetDays.toLocaleString("vi-VN");
      }
    }

    requestAnimationFrame(step);
  }

  function initCounter() {
    updateCounter();
    setInterval(updateCounter, 1000);

    // Observer để kích hoạt hoạt ảnh đếm khi cuộn tới
    const counterSec = document.getElementById("counter");
    if (counterSec && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCountUp();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25 });
      observer.observe(counterSec);
    } else {
      animateCountUp();
    }
  }

  // =========================================================================
  // 5. TIMELINE STORIES RENDERING
  // =========================================================================
  function renderTimeline() {
    if (!DOM.timelineContainer || typeof timelineStories === "undefined") return;

    DOM.timelineContainer.innerHTML = timelineStories.map((story) => `
      <div class="timeline-item reveal-elem" data-id="${story.id}">
        <div class="timeline-node" aria-hidden="true"></div>
        <article class="timeline-card">
          <div class="timeline-media ${story.isScreenshot ? 'is-screenshot' : ''}">
            <img src="${story.image}" alt="${escapeHTML(story.title)}" class="${story.isScreenshot ? 'timeline-screenshot-img' : 'timeline-img'}" loading="lazy">
            <span class="timeline-tag-pill">${escapeHTML(story.tag)}</span>
          </div>
          <div class="timeline-body">
            <div class="timeline-meta">
              <span class="timeline-date">${escapeHTML(story.displayDate)}</span>
              <span class="timeline-location">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                ${escapeHTML(story.location)}
              </span>
            </div>
            <h3 class="timeline-title">${escapeHTML(story.title)}</h3>
            <p class="timeline-subtitle">${escapeHTML(story.subtitle)}</p>
            <p class="timeline-desc">${escapeHTML(story.description)}</p>
          </div>
        </article>
      </div>
    `).join("");
  }

  // =========================================================================
  // 6. PHOTO GALLERY & FILTERING
  // =========================================================================
  function renderGalleryFilters() {
    if (!DOM.galleryFilters || typeof galleryCategories === "undefined") return;

    DOM.galleryFilters.innerHTML = galleryCategories.map(cat => `
      <button 
        type="button" 
        class="filter-btn ${cat.id === state.currentCategory ? 'active' : ''}" 
        data-category="${cat.id}"
        role="tab"
        aria-selected="${cat.id === state.currentCategory}">
        <span class="filter-name">${escapeHTML(cat.label)}</span>
        <span class="filter-count">${cat.count}</span>
      </button>
    `).join("");

    // Event listeners
    const buttons = DOM.galleryFilters.querySelectorAll(".filter-btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const cat = btn.getAttribute("data-category");
        if (cat === state.currentCategory) return;

        buttons.forEach(b => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");

        state.currentCategory = cat;
        filterGallery(cat);
      });
    });
  }

  function renderGalleryGrid() {
    if (!DOM.galleryGrid || !Array.isArray(state.filteredMemories)) return;

    DOM.galleryGrid.innerHTML = state.filteredMemories.map((photo, index) => {
      const isFeature = photo.aspect === 'landscape' || (index % 5 === 0);
      return `
        <div 
          class="gallery-item aspect-${photo.aspect || 'portrait'} ${isFeature ? 'is-feature' : ''} reveal-elem" 
          data-index="${index}" 
          role="button" 
          tabindex="0" 
          aria-label="Xem ảnh: ${escapeHTML(photo.title)}">
          <div class="gallery-item-aspect">
            <img src="${photo.image}" alt="${escapeHTML(photo.title)}" class="gallery-thumb-img" loading="lazy">
            <div class="gallery-item-overlay">
              <div class="gallery-item-meta">
                <span class="gallery-item-date">${escapeHTML(photo.date)}</span>
                <span class="gallery-item-loc">${escapeHTML(photo.location || '')}</span>
              </div>
              <h4 class="gallery-item-title">${escapeHTML(photo.title)}</h4>
              <p class="gallery-item-caption">${escapeHTML(photo.caption)}</p>
            </div>
            <span class="gallery-expand-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
            </span>
          </div>
        </div>
      `;
    }).join("");

    // Lightbox click triggers
    const items = DOM.galleryGrid.querySelectorAll(".gallery-item");
    items.forEach(item => {
      item.addEventListener("click", () => {
        const idx = parseInt(item.getAttribute("data-index"), 10);
        openLightbox(idx);
      });
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const idx = parseInt(item.getAttribute("data-index"), 10);
          openLightbox(idx);
        }
      });
    });

    // Re-observe scroll reveal
    observeRevealElements();
  }

  function filterGallery(category) {
    if (!DOM.galleryGrid) return;

    // Smooth transition
    DOM.galleryGrid.style.opacity = "0.3";

    setTimeout(() => {
      if (category === "all") {
        state.filteredMemories = [...galleryMemories];
      } else {
        state.filteredMemories = galleryMemories.filter(m => m.category === category);
      }
      renderGalleryGrid();
      DOM.galleryGrid.style.opacity = "1";
    }, 180);
  }

  // =========================================================================
  // 7. FULLSCREEN LIGHTBOX MODAL
  // =========================================================================
  function openLightbox(index) {
    if (!state.filteredMemories || !state.filteredMemories.length) return;

    state.currentLightboxIndex = index;
    updateLightboxUI();

    DOM.lightboxModal.removeAttribute("hidden");
    DOM.body.classList.add("lightbox-open");

    // Add entry animation
    if (DOM.lightboxImg) {
      DOM.lightboxImg.style.transform = "scale(0.92)";
      DOM.lightboxImg.style.opacity = "0";
      setTimeout(() => {
        DOM.lightboxImg.style.transform = "scale(1)";
        DOM.lightboxImg.style.opacity = "1";
      }, 30);
    }
  }

  function closeLightbox() {
    if (!DOM.lightboxModal) return;

    DOM.lightboxModal.setAttribute("hidden", "");
    DOM.body.classList.remove("lightbox-open");
  }

  function updateLightboxUI() {
    const photo = state.filteredMemories[state.currentLightboxIndex];
    if (!photo) return;

    if (DOM.lightboxImg) {
      DOM.lightboxImg.src = photo.image;
      DOM.lightboxImg.alt = photo.title;
    }
    if (DOM.lbCurrent) DOM.lbCurrent.textContent = state.currentLightboxIndex + 1;
    if (DOM.lbTotal) DOM.lbTotal.textContent = state.filteredMemories.length;
    if (DOM.lbTitle) DOM.lbTitle.textContent = photo.title;
    if (DOM.lbCaption) DOM.lbCaption.textContent = photo.caption;
    if (DOM.lbDate) DOM.lbDate.textContent = photo.date;
    if (DOM.lbLocText) DOM.lbLocText.textContent = photo.location || "Yêu thương";
  }

  function nextPhoto() {
    if (!state.filteredMemories.length) return;
    state.currentLightboxIndex = (state.currentLightboxIndex + 1) % state.filteredMemories.length;

    animatePhotoSwitch("next");
  }

  function prevPhoto() {
    if (!state.filteredMemories.length) return;
    state.currentLightboxIndex = (state.currentLightboxIndex - 1 + state.filteredMemories.length) % state.filteredMemories.length;

    animatePhotoSwitch("prev");
  }

  function animatePhotoSwitch(direction) {
    if (!DOM.lightboxImg) {
      updateLightboxUI();
      return;
    }

    DOM.lightboxImg.style.opacity = "0.2";
    DOM.lightboxImg.style.transform = direction === "next" ? "translateX(-15px) scale(0.96)" : "translateX(15px) scale(0.96)";

    setTimeout(() => {
      updateLightboxUI();
      DOM.lightboxImg.style.transform = direction === "next" ? "translateX(15px) scale(0.96)" : "translateX(-15px) scale(0.96)";

      setTimeout(() => {
        DOM.lightboxImg.style.opacity = "1";
        DOM.lightboxImg.style.transform = "translateX(0) scale(1)";
      }, 20);
    }, 120);
  }

  function initLightboxListeners() {
    if (!DOM.lightboxModal) return;

    // Buttons
    if (DOM.btnCloseLightbox) DOM.btnCloseLightbox.addEventListener("click", closeLightbox);
    if (DOM.lightboxBackdrop) DOM.lightboxBackdrop.addEventListener("click", closeLightbox);
    if (DOM.btnNextPhoto) DOM.btnNextPhoto.addEventListener("click", (e) => { e.stopPropagation(); nextPhoto(); });
    if (DOM.btnPrevPhoto) DOM.btnPrevPhoto.addEventListener("click", (e) => { e.stopPropagation(); prevPhoto(); });

    // Keyboard navigation
    window.addEventListener("keydown", (e) => {
      if (DOM.lightboxModal.hasAttribute("hidden")) return;

      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        nextPhoto();
      } else if (e.key === "ArrowLeft") {
        prevPhoto();
      }
    });

    // Touch Swipe Gestures for Mobile
    if (DOM.lightboxStage) {
      DOM.lightboxStage.addEventListener("touchstart", (e) => {
        state.touchStartX = e.changedTouches[0].screenX;
        state.touchStartY = e.changedTouches[0].screenY;
      }, { passive: true });

      DOM.lightboxStage.addEventListener("touchend", (e) => {
        state.touchEndX = e.changedTouches[0].screenX;
        state.touchEndY = e.changedTouches[0].screenY;
        handleSwipeGesture();
      }, { passive: true });
    }
  }

  function handleSwipeGesture() {
    const deltaX = state.touchEndX - state.touchStartX;
    const deltaY = state.touchEndY - state.touchStartY;
    const thresholdX = 45;
    const thresholdY = 60;

    // Horizontal swipe (next/prev)
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > thresholdX) {
        if (deltaX < 0) {
          nextPhoto(); // Swipe left -> next
        } else {
          prevPhoto(); // Swipe right -> prev
        }
      }
    } else {
      // Vertical swipe down to close
      if (deltaY > thresholdY) {
        closeLightbox();
      }
    }
  }

  // =========================================================================
  // 8. OUR LITTLE MOMENTS (SCRAPBOOK)
  // =========================================================================
  function renderLittleMoments() {
    if (!DOM.momentsGrid || typeof littleMoments === "undefined") return;

    DOM.momentsGrid.innerHTML = littleMoments.map(moment => `
      <div class="scrapbook-card reveal-elem" style="transform: rotate(${moment.rotation || '0deg'});">
        <div class="scrapbook-tape" aria-hidden="true"></div>
        <div class="scrapbook-media">
          <img src="${moment.image}" alt="${escapeHTML(moment.title)}" class="scrapbook-img" loading="lazy">
        </div>
        <div class="scrapbook-info">
          <div class="scrapbook-header-row">
            <span class="scrapbook-date">${escapeHTML(moment.date)}</span>
            <span class="scrapbook-sticker" aria-hidden="true">${moment.sticker || '✨'}</span>
          </div>
          <h4 class="scrapbook-title">${escapeHTML(moment.title)}</h4>
          <p class="scrapbook-note">${escapeHTML(moment.note)}</p>
        </div>
      </div>
    `).join("");
  }

  // =========================================================================
  // 9. LOVE LETTER INTERACTIONS
  // =========================================================================
  function initLoveLetter() {
    if (!DOM.btnToggleLetter || !DOM.letterParchment) return;

    let isExpanded = true;

    DOM.btnToggleLetter.addEventListener("click", () => {
      isExpanded = !isExpanded;
      if (isExpanded) {
        DOM.letterParchment.style.maxHeight = "1200px";
        DOM.letterParchment.style.opacity = "1";
        DOM.letterParchment.style.overflow = "visible";
        DOM.btnToggleLetter.querySelector(".seal-text").textContent = "GẤP LẠI";
      } else {
        DOM.letterParchment.style.maxHeight = "160px";
        DOM.letterParchment.style.overflow = "hidden";
        DOM.letterParchment.style.opacity = "0.75";
        DOM.btnToggleLetter.querySelector(".seal-text").textContent = "MỞ THƯ";
      }
    });
  }

  // =========================================================================
  // 10. MUSIC PLAYER
  // =========================================================================
  function initMusicPlayer() {
    if (!DOM.audioElement) return;

    function togglePlay() {
      if (state.isPlayingMusic) {
        DOM.audioElement.pause();
      } else {
        const playPromise = DOM.audioElement.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              hideMusicError();
            })
            .catch(err => {
              console.warn("Audio playback issue:", err);
              showMusicError();
            });
        }
      }
    }

    // Audio Event listeners
    DOM.audioElement.addEventListener("play", () => {
      state.isPlayingMusic = true;
      if (DOM.musicPlayer) DOM.musicPlayer.classList.add("is-playing");
      updatePlayIcons(true);
    });

    DOM.audioElement.addEventListener("pause", () => {
      state.isPlayingMusic = false;
      if (DOM.musicPlayer) DOM.musicPlayer.classList.remove("is-playing");
      updatePlayIcons(false);
    });

    DOM.audioElement.addEventListener("error", () => {
      showMusicError();
      state.isPlayingMusic = false;
      updatePlayIcons(false);
    });

    // Disc click
    if (DOM.btnDiscToggle) DOM.btnDiscToggle.addEventListener("click", togglePlay);
    // Header music click
    if (DOM.btnHeaderMusic) DOM.btnHeaderMusic.addEventListener("click", togglePlay);

    // Minimize / Expand
    if (DOM.btnCollapseMusic) {
      DOM.btnCollapseMusic.addEventListener("click", (e) => {
        e.stopPropagation();
        DOM.musicPlayer.classList.toggle("is-collapsed");
      });
    }
  }

  function updatePlayIcons(isPlaying) {
    const pauseSvg = `<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>`;
    const playSvg = `<polygon points="5 3 19 12 5 21 5 3"/>`;

    if (DOM.musicPlayIcon) {
      DOM.musicPlayIcon.innerHTML = isPlaying ? pauseSvg : playSvg;
    }

    if (DOM.btnHeaderMusic) {
      const headerIcon = DOM.btnHeaderMusic.querySelector(".icon-play");
      if (headerIcon) {
        headerIcon.innerHTML = isPlaying ? pauseSvg : playSvg;
      }
      const label = DOM.btnHeaderMusic.querySelector(".header-music-label");
      if (label) {
        label.textContent = isPlaying ? "Tạm dừng" : "Giai điệu";
      }
    }
  }

  function showMusicError() {
    if (DOM.musicErrorTip) {
      DOM.musicErrorTip.classList.add("show");
      setTimeout(() => {
        DOM.musicErrorTip.classList.remove("show");
      }, 5000);
    }
  }

  function hideMusicError() {
    if (DOM.musicErrorTip) {
      DOM.musicErrorTip.classList.remove("show");
    }
  }

  // =========================================================================
  // 11. NAVIGATION & SCROLL SPY
  // =========================================================================
  function initNavigation() {
    const navLinks = [...DOM.mobileNavItems, ...DOM.desktopNavLinks];

    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href");
        if (targetId && targetId.startsWith("#")) {
          e.preventDefault();
          const targetSection = document.querySelector(targetId);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });

    // Scroll Spy using IntersectionObserver
    const sections = ["hero", "counter", "story", "gallery", "moments", "letter"];
    const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean);

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const currentId = entry.target.id;
            updateActiveNav(currentId);
          }
        });
      }, {
        rootMargin: "-20% 0px -50% 0px",
        threshold: 0
      });

      sectionElements.forEach(sec => observer.observe(sec));
    }

    // Back to top button
    if (DOM.btnBackTop) {
      DOM.btnBackTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  function updateActiveNav(activeId) {
    // Map counter or moments to appropriate nav if not direct
    let navKey = activeId;
    if (activeId === "counter") navKey = "counter";
    if (activeId === "moments") navKey = "moments";

    DOM.mobileNavItems.forEach(item => {
      const target = item.getAttribute("data-nav");
      if (target === navKey || (activeId === "moments" && target === "gallery")) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    DOM.desktopNavLinks.forEach(link => {
      const target = link.getAttribute("data-nav");
      if (target === navKey) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  // =========================================================================
  // 12. HEART BURST EFFECT (TƯƠNG TÁC THẢ TIM)
  // =========================================================================
  function spawnHeartBurst(x, y, count = 7) {
    if (!DOM.heartBurstContainer) return;

    const colors = ["#8E4356", "#B56075", "#F4DCE2", "#D4AF37", "#642B3A"];

    for (let i = 0; i < count; i++) {
      const heart = document.createElement("span");
      heart.className = "floating-burst-heart";
      heart.textContent = Math.random() > 0.4 ? "♥" : "✦";

      const dx = (Math.random() - 0.5) * 120 + "px";
      const rot = (Math.random() - 0.5) * 60 + "deg";
      const color = colors[Math.floor(Math.random() * colors.length)];

      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      heart.style.setProperty("--dx", dx);
      heart.style.setProperty("--rot", rot);
      heart.style.color = color;
      heart.style.fontSize = `${0.9 + Math.random() * 0.9}rem`;

      DOM.heartBurstContainer.appendChild(heart);

      setTimeout(() => {
        if (heart.parentNode) {
          heart.parentNode.removeChild(heart);
        }
      }, 1200);
    }
  }

  function initHeartBurstTriggers() {
    // Nút thả tim ở phần cuối
    if (DOM.btnSendHeart) {
      DOM.btnSendHeart.addEventListener("click", (e) => {
        const rect = DOM.btnSendHeart.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top;
        spawnHeartBurst(x, y, 14);
      });
    }

    // Chạm vào hero section để hiện tim nhẹ nhàng
    const heroSec = document.getElementById("hero");
    if (heroSec) {
      heroSec.addEventListener("click", (e) => {
        // Chỉ khi không bấm nút hoặc link
        if (!e.target.closest("button") && !e.target.closest("a")) {
          spawnHeartBurst(e.clientX, e.clientY, 4);
        }
      });
    }
  }

  // =========================================================================
  // 13. AMBIENT PARTICLES (CANVAS HẠT SÁNG LUNG LINH)
  // =========================================================================
  function initAmbientCanvas() {
    const canvas = DOM.ambientCanvas;
    if (!canvas) return;

    // Tắt canvas nếu người dùng bật chế độ giảm chuyển động
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      canvas.style.display = "none";
      return;
    }

    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    // Hạt nhẹ nhàng, tối đa 24 hạt trên màn hình để tiết kiệm pin di động
    const particleCount = window.innerWidth < 768 ? 16 : 28;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        speedY: Math.random() * 0.4 + 0.15,
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2,
        isHeart: Math.random() > 0.65
      });
    }

    function renderCanvas() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y -= p.speedY;
        p.x += p.speedX;

        // Reset khi bay quá màn hình
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.globalAlpha = p.opacity;

        if (p.isHeart) {
          ctx.fillStyle = "#8E4356";
          ctx.font = `${Math.floor(p.radius * 3.5)}px serif`;
          ctx.fillText("♥", p.x, p.y);
        } else {
          ctx.fillStyle = "#E8C8D0";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      requestAnimationFrame(renderCanvas);
    }

    requestAnimationFrame(renderCanvas);
  }

  // =========================================================================
  // 14. SCROLL REVEAL OBSERVER
  // =========================================================================
  function observeRevealElements() {
    const revealElements = document.querySelectorAll(".reveal-elem:not(.is-revealed)");

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach(el => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: "0px 0px -60px 0px",
      threshold: 0.1
    });

    revealElements.forEach(el => observer.observe(el));
  }

  function triggerInitialReveals() {
    const heroReveals = document.querySelectorAll("#hero .reveal-elem");
    heroReveals.forEach((el, idx) => {
      setTimeout(() => {
        el.classList.add("is-revealed");
      }, idx * 120);
    });
  }

  // Utility XSS Escaper
  function escapeHTML(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // =========================================================================
  // 15. BOOTSTRAP APPLICATION
  // =========================================================================
  initFromConfig();
  initOpeningScreen();
  initCounter();
  renderTimeline();
  renderGalleryFilters();
  renderGalleryGrid();
  initLightboxListeners();
  renderLittleMoments();
  initLoveLetter();
  initMusicPlayer();
  initNavigation();
  initHeartBurstTriggers();
  initAmbientCanvas();
  observeRevealElements();
});
