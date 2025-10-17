// ==================== ABOUT PAGE ANIMATIONS ====================

document.addEventListener("DOMContentLoaded", function () {
  // ==================== SMOOTH SCROLL FOR SIDEBAR NAVIGATION ====================
  const sidebarLinks = document.querySelectorAll(".sidebar-nav a");

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Smooth scroll to target
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Update active state
        sidebarLinks.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });

  // ==================== SCROLL SPY - HIGHLIGHT CURRENT SECTION ====================
  const sections = document.querySelectorAll(".section");

  function updateActiveLink() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    sidebarLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);

  // Set initial active state
  if (sidebarLinks.length > 0) {
    sidebarLinks[0].classList.add("active");
  }

  // ==================== COUNTER ANIMATION FOR STATS ====================
  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        // Format number based on whether it has decimals
        if (target % 1 !== 0) {
          element.textContent = current.toFixed(2);
        } else {
          element.textContent = Math.floor(current);
        }
      }
    }, 16);
  }

  // ==================== INTERSECTION OBSERVER FOR STATS ====================
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statNumbers = entry.target.querySelectorAll(".stat-number");

          statNumbers.forEach((stat) => {
            const targetValue = stat.getAttribute("data-target");
            if (targetValue) {
              const target = parseFloat(targetValue);
              animateCounter(stat, target);
            }
          });

          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  const statsGrid = document.querySelector(".stats-grid");
  if (statsGrid) {
    statsObserver.observe(statsGrid);
  }

  // ==================== ANIMATE SECTIONS ON SCROLL ====================
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => {
    // Set initial state
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";

    // Observe
    sectionObserver.observe(section);
  });

  // ==================== ANIMATE ACHIEVEMENT CARDS ====================
  const achievements = document.querySelectorAll(".achievement");

  const achievementObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateX(0)";
          }, index * 100);

          achievementObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  achievements.forEach((achievement) => {
    achievement.style.opacity = "0";
    achievement.style.transform = "translateX(-30px)";
    achievement.style.transition =
      "opacity 0.5s ease-out, transform 0.5s ease-out";

    achievementObserver.observe(achievement);
  });

  // ==================== ANIMATE SKILL ITEMS ====================
  const skillItems = document.querySelectorAll(".skill-item");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, index * 80);

          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  skillItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
    item.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";

    skillObserver.observe(item);
  });

  // ==================== ANIMATE TIMELINE ITEMS ====================
  const timelineItems = document.querySelectorAll(".timeline-item");

  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateX(0)";
          }, index * 150);

          timelineObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  timelineItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-30px)";
    item.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";

    timelineObserver.observe(item);
  });

  // ==================== PARALLAX EFFECT FOR HEADER ====================
  const headerSection = document.querySelector(".header-section");

  if (headerSection) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.5;

      if (scrolled < headerSection.offsetHeight) {
        headerSection.style.transform = `translateY(${rate}px)`;
      }
    });
  }

  // ==================== ADD HOVER EFFECT TO CONTACT BUTTONS ====================
  const contactButtons = document.querySelectorAll(".contact-btn");

  contactButtons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-4px) scale(1.05)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // ==================== KEYBOARD NAVIGATION ====================
  document.addEventListener("keydown", function (e) {
    // Press 'T' to scroll to top
    if (e.key === "t" || e.key === "T") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // Arrow keys for section navigation
    if (e.key === "ArrowDown") {
      const currentSection = getCurrentSection();
      const nextSection = getNextSection(currentSection);
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
        e.preventDefault();
      }
    }

    if (e.key === "ArrowUp") {
      const currentSection = getCurrentSection();
      const prevSection = getPrevSection(currentSection);
      if (prevSection) {
        prevSection.scrollIntoView({ behavior: "smooth", block: "start" });
        e.preventDefault();
      }
    }
  });

  function getCurrentSection() {
    let current = null;
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
        current = section;
      }
    });
    return current;
  }

  function getNextSection(currentSection) {
    if (!currentSection) return sections[0];
    const index = Array.from(sections).indexOf(currentSection);
    return sections[index + 1] || null;
  }

  function getPrevSection(currentSection) {
    if (!currentSection) return null;
    const index = Array.from(sections).indexOf(currentSection);
    return sections[index - 1] || null;
  }

  // ==================== CONSOLE EASTER EGG ====================
  console.log(
    "%c👋 Hi there! Welcome to my About page!",
    "color: #667eea; font-size: 20px; font-weight: bold;"
  );
  console.log(
    "%c🚀 Interested in the code? Check out my GitHub!",
    "color: #764ba2; font-size: 14px;"
  );
  console.log(
    "%c💻 Built with Hugo, CSS3, and vanilla JavaScript",
    "color: #495057; font-size: 12px;"
  );
});

// ==================== UTILITY: DEBOUNCE FUNCTION ====================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ==================== PAGE VISIBILITY - PAUSE ANIMATIONS WHEN TAB IS HIDDEN ====================
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    // Pause animations when tab is not visible
    document.body.style.animationPlayState = "paused";
  } else {
    // Resume animations when tab becomes visible
    document.body.style.animationPlayState = "running";
  }
});
