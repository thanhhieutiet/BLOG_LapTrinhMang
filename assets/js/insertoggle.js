// TOGGLE BUTTON - OVERRIDE VỚI SCROLL ANIMATION
(function () {
  // Get all elements with the "toggle-button" class
  const toggleButtons = document.querySelectorAll(".toggle-button");

  // Function to hide all elements except the target
  function hideAllExcept(targetElement) {
    document.querySelectorAll(".hidden").forEach((element) => {
      if (element !== targetElement) {
        element.classList.add("close");
        element.classList.remove("open");
      }
    });
  }

  // Function to toggle the state of an element (open/close)
  function toggleElement(targetElement) {
    const isHidden = targetElement.classList.contains("close");
    hideAllExcept(targetElement);
    targetElement.classList.toggle("close", !isHidden);
    targetElement.classList.toggle("open", isHidden);
  }

  // === PHẦN MỚI: INTERSECTION OBSERVER ===
  // Observer để detect khi element vào viewport
  const observerOptions = {
    threshold: 0.1, // Kích hoạt khi 10% của element hiển thị trên màn hình
    rootMargin: "0px 0px -50px 0px", // Có thể điều chỉnh để element hiển thị sớm hơn hoặc muộn hơn
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Nếu element vào viewport
      if (entry.isIntersecting) {
        entry.target.classList.add("open");
        entry.target.classList.remove("close");
        // Tùy chọn: bỏ comment nếu chỉ muốn animate một lần
        // observer.unobserve(entry.target);
      } else {
        // Khi scroll ra khỏi viewport, ẩn element
        entry.target.classList.remove("open");
        entry.target.classList.add("close");
      }
    });
  }, observerOptions);

  // Áp dụng observer cho tất cả elements có class "hidden"
  document.querySelectorAll(".hidden").forEach((element) => {
    observer.observe(element);
  });
  // === HẾT PHẦN MỚI ===

  // Click event listeners cho toggle buttons (giữ nguyên chức năng cũ)
  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetIds = this.getAttribute("data-target").split(" ");
      targetIds.forEach((targetId) => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          toggleElement(targetElement);
        }
      });
    });
  });

  // Close elements khi click outside (giữ nguyên chức năng cũ)
  document.addEventListener("click", function (event) {
    const targetElements = Array.from(document.querySelectorAll(".open"));
    const clickedOutsideAllTargets = targetElements.every((element) => {
      return (
        !element.contains(event.target) &&
        !event.target.closest(".toggle-button")
      );
    });

    if (clickedOutsideAllTargets) {
      targetElements.forEach((element) => {
        element.classList.remove("open");
        element.classList.add("close");
      });
    }
  });
})();
