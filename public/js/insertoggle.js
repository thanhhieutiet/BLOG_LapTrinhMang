(() => {
  // <stdin>
  (function() {
    const toggleButtons = document.querySelectorAll(".toggle-button");
    function hideAllExcept(targetElement) {
      document.querySelectorAll(".hidden").forEach((element) => {
        if (element !== targetElement) {
          element.classList.add("close");
          element.classList.remove("open");
        }
      });
    }
    function toggleElement(targetElement) {
      const isHidden = targetElement.classList.contains("close");
      hideAllExcept(targetElement);
      targetElement.classList.toggle("close", !isHidden);
      targetElement.classList.toggle("open", isHidden);
    }
    const observerOptions = {
      threshold: 0.1,
      // Kích hoạt khi 10% của element hiển thị trên màn hình
      rootMargin: "0px 0px -50px 0px"
      // Có thể điều chỉnh để element hiển thị sớm hơn hoặc muộn hơn
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("open");
          entry.target.classList.remove("close");
        } else {
          entry.target.classList.remove("open");
          entry.target.classList.add("close");
        }
      });
    }, observerOptions);
    document.querySelectorAll(".hidden").forEach((element) => {
      observer.observe(element);
    });
    toggleButtons.forEach((button) => {
      button.addEventListener("click", function() {
        const targetIds = this.getAttribute("data-target").split(" ");
        targetIds.forEach((targetId) => {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            toggleElement(targetElement);
          }
        });
      });
    });
    document.addEventListener("click", function(event) {
      const targetElements = Array.from(document.querySelectorAll(".open"));
      const clickedOutsideAllTargets = targetElements.every((element) => {
        return !element.contains(event.target) && !event.target.closest(".toggle-button");
      });
      if (clickedOutsideAllTargets) {
        targetElements.forEach((element) => {
          element.classList.remove("open");
          element.classList.add("close");
        });
      }
    });
  })();
})();
