document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Navigation & Header Effect
  const header = document.getElementById("header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // 2. Reveal Scroll Animation
  const reveals = document.querySelectorAll(".reveal");
  function revealElements() {
    reveals.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 70) {
        el.classList.add("active");
      }
    });
  }
  window.addEventListener("scroll", revealElements);
  revealElements(); // Exécution initiale au chargement

  // 3. Logique Diaporamas Multi-Projets (Autonomes)
  document.querySelectorAll('.project-image-slider').forEach(slider => {
    const track = slider.querySelector('.slider-track');
    const images = slider.querySelectorAll('img');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    let index = 0;

    if (images.length <= 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      return;
    }

    function updateSlider() {
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        index = (index + 1) % images.length;
        updateSlider();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        index = (index - 1 + images.length) % images.length;
        updateSlider();
      });
    }
  });

  // 4. Grand Diaporama Ateliers (Bas de section)
  const slidesEl = document.getElementById("slides");
  const dotsEl = document.getElementById("slideDots");
  const slideItems = document.querySelectorAll(".slide");
  let currentSlide = 0;

  if (slidesEl && slideItems.length > 0 && dotsEl) {
    slideItems.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.className = "dot" + (i === 0 ? " active" : "");
      dot.addEventListener("click", () => goToSlide(i));
      dotsEl.appendChild(dot);
    });

    function goToSlide(index) {
      currentSlide = (index + slideItems.length) % slideItems.length;
      slidesEl.style.transform = `translateX(-${currentSlide * 100}%)`;
      document.querySelectorAll(".dot").forEach((d, i) => {
        d.classList.toggle("active", i === currentSlide);
      });
    }

    const prevSlideBtn = document.getElementById("prevSlide");
    const nextSlideBtn = document.getElementById("nextSlide");

    if (prevSlideBtn) prevSlideBtn.addEventListener("click", () => goToSlide(currentSlide - 1));
    if (nextSlideBtn) nextSlideBtn.addEventListener("click", () => goToSlide(currentSlide + 1));
    
    // Défilement automatique toutes les 6 secondes
    setInterval(() => goToSlide(currentSlide + 1), 6000);
  }

  // 5. Visionneuse Lightbox (Agrandissement interactif au clic)
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  
  if (lightboxModal && lightboxImg) {
    document.querySelectorAll(".zoomable-img").forEach(img => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightboxModal.style.display = "flex";
      });
    });
    lightboxModal.addEventListener("click", () => {
      lightboxModal.style.display = "none";
    });
  }
});

// 6. Script de secours global (au cas où appel d'ID spécifiques en ligne)
let sliderPositions = {};

function moveSlider(projectId, direction) {
  const track = document.getElementById(`track-${projectId}`);
  if (!track) return;
  
  const images = track.querySelectorAll('img');
  const totalImages = images.length;
  
  if (!sliderPositions[projectId]) {
    sliderPositions[projectId] = 0;
  }
  
  sliderPositions[projectId] += direction;
  
  if (sliderPositions[projectId] < 0) {
    sliderPositions[projectId] = totalImages - 1;
  } else if (sliderPositions[projectId] >= totalImages) {
    sliderPositions[projectId] = 0;
  }
  
  const percentage = -(sliderPositions[projectId] * 100);
  track.style.transform = `translateX(${percentage}%)`;
}