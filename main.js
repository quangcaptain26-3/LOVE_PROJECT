// ===== LOVE QUOTES ARRAY =====
// 🔧 CUSTOMIZE: Add, remove, or edit quotes here
const quotes = [
  "Every love story is beautiful, but ours is my favorite.",
  "In your eyes, I found my home. In your heart, I found my love.",
  "You are my today and all of my tomorrows.",
  "Together is a wonderful place to be.",
  "I love you not only for what you are, but for what I am when I am with you.",
  "You make my heart smile in ways I never knew were possible.",
  "With you, I am home. With you, I am complete.",
  "Our love is a journey starting at forever and ending at never.",
  "You are the missing piece I never knew my heart needed.",
  "In a sea of people, my eyes will always search for you.",
];

// ===== FLOATING HEARTS ANIMATION =====
class FloatingHearts {
  constructor() {
    this.container = document.getElementById("floating-hearts");
    this.hearts = ["❤️", "💕", "💖", "💗", "💝", "💘"];
    this.init();
  }

  init() {
    // Create hearts every 2 seconds
    setInterval(() => {
      this.createHeart();
    }, 2000);
  }

  createHeart() {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.innerHTML =
      this.hearts[Math.floor(Math.random() * this.hearts.length)];

    // Random horizontal position
    heart.style.left = Math.random() * 100 + "%";

    // Random animation duration (4-8 seconds)
    const duration = 4 + Math.random() * 4;
    heart.style.animationDuration = duration + "s";

    // Random delay
    heart.style.animationDelay = Math.random() * 2 + "s";

    this.container.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
      }
    }, (duration + 2) * 1000);
  }
}

// ===== LOVE QUOTES CAROUSEL =====
class QuotesCarousel {
  constructor() {
    this.quotes = quotes;
    this.currentIndex = 0;
    this.quoteElement = document.getElementById("love-quote");
    this.init();
  }

  init() {
    this.showQuote();
    // Change quote every 4 seconds
    setInterval(() => {
      this.nextQuote();
    }, 4000);
  }

  showQuote() {
    if (this.quoteElement) {
      // Fade out
      this.quoteElement.style.opacity = "0";

      setTimeout(() => {
        // Change text
        this.quoteElement.textContent = this.quotes[this.currentIndex];
        // Fade in
        this.quoteElement.style.opacity = "1";
      }, 250);
    }
  }

  nextQuote() {
    this.currentIndex = (this.currentIndex + 1) % this.quotes.length;
    this.showQuote();
  }
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
  // Smooth scroll for scroll indicator
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const quotesSection = document.querySelector(".quotes-section");
      if (quotesSection) {
        quotesSection.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe timeline items
  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(item);
  });

  // Observe gallery items
  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = `opacity 0.6s ease ${
      index * 0.1
    }s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
  });
}

// ===== LOVE CHOICE BUTTONS FUNCTIONALITY =====
let noLoveTimeout;
let originalPosition = { top: 0, left: 0 };
let isMoving = false;

function initLoveChoiceButtons() {
  const loveBtn = document.getElementById("love-btn");
  const noLoveBtn = document.getElementById("no-love-btn");

  // Store original position of "no love" button
  if (noLoveBtn) {
    setTimeout(() => {
      const rect = noLoveBtn.getBoundingClientRect();
      originalPosition = {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      };
    }, 100);
  }

  // Love button functionality - scroll to gallery
  if (loveBtn) {
    loveBtn.addEventListener("click", function () {
      // Add some celebration effects
      createLoveExplosion();

      // Scroll to gallery section
      setTimeout(() => {
        const gallerySection = document.querySelector(".gallery-section");
        if (gallerySection) {
          gallerySection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 500);
    });
  }

  // No love button functionality - move away when clicked/hovered
  if (noLoveBtn) {
    // Move button when trying to hover or click
    noLoveBtn.addEventListener("mouseenter", moveNoLoveButton);
    noLoveBtn.addEventListener("click", moveNoLoveButton);

    // Return to original position after 0.5 seconds if not hovered
    noLoveBtn.addEventListener("mouseleave", function () {
      if (!isMoving) return;

      clearTimeout(noLoveTimeout);
      noLoveTimeout = setTimeout(() => {
        returnToOriginalPosition();
      }, 500);
    });
  }
}

function moveNoLoveButton() {
  const noLoveBtn = document.getElementById("no-love-btn");
  if (!noLoveBtn || isMoving) return;

  isMoving = true;
  noLoveBtn.classList.add("moving");

  // Clear any existing timeout
  clearTimeout(noLoveTimeout);

  // Calculate random position within viewport
  const maxX = window.innerWidth - noLoveBtn.offsetWidth - 50;
  const maxY = window.innerHeight - noLoveBtn.offsetHeight - 50;

  const newX = Math.random() * maxX + 25;
  const newY = Math.random() * maxY + 25;

  // Move button to new position
  noLoveBtn.style.position = "fixed";
  noLoveBtn.style.left = newX + "px";
  noLoveBtn.style.top = newY + "px";
  noLoveBtn.style.zIndex = "1000";

  // Add shake effect
  noLoveBtn.classList.add("shake");
  setTimeout(() => {
    noLoveBtn.classList.remove("shake");
  }, 500);
}

function returnToOriginalPosition() {
  const noLoveBtn = document.getElementById("no-love-btn");
  if (!noLoveBtn) return;

  isMoving = false;
  noLoveBtn.classList.remove("moving");
  noLoveBtn.classList.add("returning");

  // Return to original position
  noLoveBtn.style.position = "relative";
  noLoveBtn.style.left = "";
  noLoveBtn.style.top = "";
  noLoveBtn.style.zIndex = "";

  setTimeout(() => {
    noLoveBtn.classList.remove("returning");
  }, 1000);
}

function createLoveExplosion() {
  // Create multiple hearts explosion effect
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.innerHTML = ["💖", "💕", "💗", "💘", "💝"][
        Math.floor(Math.random() * 5)
      ];
      heart.style.position = "fixed";
      heart.style.left = "50%";
      heart.style.top = "50%";
      heart.style.fontSize = "2rem";
      heart.style.pointerEvents = "none";
      heart.style.zIndex = "9999";
      heart.style.transform = "translate(-50%, -50%)";

      document.body.appendChild(heart);

      // Animate heart explosion
      const angle = (i / 20) * 2 * Math.PI;
      const distance = 200 + Math.random() * 100;
      const endX = Math.cos(angle) * distance;
      const endY = Math.sin(angle) * distance;

      heart.animate(
        [
          {
            transform: "translate(-50%, -50%) scale(0) rotate(0deg)",
            opacity: 1,
          },
          {
            transform: `translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) scale(1.5) rotate(360deg)`,
            opacity: 0,
          },
        ],
        {
          duration: 1500,
          easing: "ease-out",
        }
      ).onfinish = () => {
        heart.remove();
      };
    }, i * 50);
  }
}

// ===== INITIALIZE EVERYTHING =====
document.addEventListener("DOMContentLoaded", () => {
  // Initialize floating hearts
  new FloatingHearts();

  // Initialize quotes carousel
  new QuotesCarousel();

  // Initialize smooth scrolling
  initSmoothScrolling();

  // Initialize scroll animations
  initScrollAnimations();

  // Initialize love choice buttons
  initLoveChoiceButtons();

  console.log("💕 Love website initialized successfully! 💕");
});

// ===== UTILITY FUNCTIONS =====
// 🔧 CUSTOMIZE: You can add more interactive features here

// Example: Add click effects to gallery images
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("gallery-img")) {
    // Add a heart burst effect on image click
    createHeartBurst(e.clientX, e.clientY);
  }
});

function createHeartBurst(x, y) {
  for (let i = 0; i < 6; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = "💖";
    heart.style.position = "fixed";
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "9999";
    heart.style.fontSize = "20px";

    const angle = (i * 60 * Math.PI) / 180;
    const distance = 50 + Math.random() * 50;

    heart.style.animation = `heartBurst 1s ease-out forwards`;
    heart.style.setProperty("--end-x", Math.cos(angle) * distance + "px");
    heart.style.setProperty("--end-y", Math.sin(angle) * distance + "px");

    document.body.appendChild(heart);

    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
      }
    }, 1000);
  }
}

// Add the heart burst animation to CSS (you can add this to your CSS file)
const style = document.createElement("style");
style.textContent = `
    @keyframes heartBurst {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--end-x), var(--end-y)) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
