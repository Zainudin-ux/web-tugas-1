  // 1. Logika Toggle Menu Mobile
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');

  btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
  });

  // Tutup menu saat link di-klik pada mobile
  document.querySelectorAll('#mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
          menu.classList.add('hidden');
      });
  });

  // 2. Efek Scroll pada Navbar
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          navbar.classList.add('shadow-md');
          navbar.classList.remove('shadow-sm');
      } else {
          navbar.classList.remove('shadow-md');
          navbar.classList.add('shadow-sm');
      }
  });

  // 3. Efek Mengetik pada Hero Section
  const words = ["Mahasiswa PPG", "Calon Guru Profesional", "Tech Enthusiast"];
  let i = 0;
  let timer;
  const typingEl = document.getElementById('typing-element');

  function typingEffect() {
      let word = words[i].split("");
      var loopTyping = function() {
          if (word.length > 0) {
              typingEl.innerHTML += word.shift();
          } else {
              setTimeout(deletingEffect, 2000);
              return false;
          }
          timer = setTimeout(loopTyping, 100);
      };
      loopTyping();
  }

  function deletingEffect() {
      let word = words[i].split("");
      var loopDeleting = function() {
          if (word.length > 0) {
              word.pop();
              typingEl.innerHTML = word.join("");
          } else {
              if (words.length > (i + 1)) {
                  i++;
              } else {
                  i = 0;
              }
              setTimeout(typingEffect, 500);
              return false;
          }
          timer = setTimeout(loopDeleting, 50);
      };
      loopDeleting();
  }
  
  // Memulai efek ketik saat halaman dimuat
  setTimeout(typingEffect, 1000);

  // 4. Animasi Scroll (Intersection Observer)
  const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
  };
  

  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('appear');
              observer.unobserve(entry.target); // Hanya animasi sekali
          }
      });
  }, observerOptions);

  document.querySelectorAll('.fade-in-up').forEach(el => {
      observer.observe(el);
  });

  // 5. Update Tahun Otomatis di Footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // 6. Logika Slider Tentang Saya
 const aboutTrack = document.getElementById('about-slider-track');
  const aboutDotsContainer = document.getElementById('about-slider-dots');

  if (aboutTrack && aboutDotsContainer) {
      const aboutDots = aboutDotsContainer.children;
      let currentSlide = 0;
      const totalSlides = aboutDots.length;
      let slideInterval;

      function updateSlider() {
          aboutTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
          Array.from(aboutDots).forEach((dot, index) => {
              if (index === currentSlide) {
                  dot.classList.remove('w-3', 'bg-gray-300', 'hover:bg-primary/50');
                  dot.classList.add('w-8', 'bg-primary');
              } else {
                  dot.classList.remove('w-8', 'bg-primary');
                  dot.classList.add('w-3', 'bg-gray-300', 'hover:bg-primary/50');
              }
          });
      }

      function nextSlide() {
          currentSlide = (currentSlide + 1) % totalSlides;
          updateSlider();
      }

      function prevSlide() {
          currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
          updateSlider();
      }

      window.goToSlide = function(index) {
          currentSlide = index;
          updateSlider();
          resetSlideTimer(); 
      }

      function startSlideTimer() {
          slideInterval = setInterval(nextSlide, 15000); // Otomatis tiap 15 detik
      }

      function resetSlideTimer() {
          clearInterval(slideInterval);
          startSlideTimer();
      }
      
      startSlideTimer();

      // --- LOGIKA GESTUR USAP (SWIPE) UNTUK TENTANG SAYA ---
      let aboutStartX = 0;
      let aboutEndX = 0;

      aboutTrack.addEventListener('touchstart', e => {
          aboutStartX = e.changedTouches[0].screenX;
      }, {passive: true});

      aboutTrack.addEventListener('touchend', e => {
          aboutEndX = e.changedTouches[0].screenX;
          handleAboutSwipe();
      }, {passive: true});

      function handleAboutSwipe() {
          const swipeThreshold = 50; // Jarak minimal usapan (pixel)
          if (aboutEndX < aboutStartX - swipeThreshold) {
              // Usap ke kiri -> Slide selanjutnya
              nextSlide();
              resetSlideTimer();
          }
          if (aboutEndX > aboutStartX + swipeThreshold) {
              // Usap ke kanan -> Slide sebelumnya
              prevSlide();
              resetSlideTimer();
          }
      }
  }
  // Script untuk Toggle Kartu Penilaian
const btnTogglePenilaian = document.getElementById('btn-toggle-penilaian');
const ekstraCards = document.querySelectorAll('.penilaian-ekstra');

if (btnTogglePenilaian) {
btnTogglePenilaian.addEventListener('click', () => {
  // Toggle (tambah/hapus) class hidden pada semua kartu ekstra
  ekstraCards.forEach(card => card.classList.toggle('hidden'));
  
  // Mengecek status kartu pertama, apakah sedang tersembunyi atau tidak
  const isHidden = ekstraCards[0].classList.contains('hidden');
  
  // Mengubah teks tombol sesuai kondisi
  if (isHidden) {
      btnTogglePenilaian.textContent = "Lihat Semua Penilaian";
  } else {
      btnTogglePenilaian.textContent = "Sembunyikan Penilaian";
  }
});
}
// 8. Logika Slider Gambar Bagian "Tujuan"
const tujuanTrack = document.getElementById('tujuan-slider-track');
  const tujuanDotsContainer = document.getElementById('tujuan-slider-dots');

  if (tujuanTrack && tujuanDotsContainer) {
      const tujuanDots = tujuanDotsContainer.children;
      let currentTujuanSlide = 0;
      const totalTujuanSlides = tujuanDots.length;
      let tujuanSlideInterval;

      function updateTujuanSlider() {
          tujuanTrack.style.transform = `translateX(-${currentTujuanSlide * 100}%)`;
          
          Array.from(tujuanDots).forEach((dot, index) => {
              if (index === currentTujuanSlide) {
                  dot.className = 'w-8 h-2 rounded-full bg-white shadow-md transition-all duration-300';
              } else {
                  dot.className = 'w-2 h-2 rounded-full bg-white/60 hover:bg-white shadow-md transition-all duration-300';
              }
          });
      }

      window.nextTujuanSlide = function() {
          currentTujuanSlide = (currentTujuanSlide + 1) % totalTujuanSlides;
          updateTujuanSlider();
      }

      window.goToTujuanSlide = function(index) {
          currentTujuanSlide = index;
          updateTujuanSlider();
          resetTujuanSlideTimer();
      }

      function startTujuanSlideTimer() {
          tujuanSlideInterval = setInterval(window.nextTujuanSlide, 10000);
      }

      function resetTujuanSlideTimer() {
          clearInterval(tujuanSlideInterval);
          startTujuanSlideTimer();
      }
      startTujuanSlideTimer();
  }


  
