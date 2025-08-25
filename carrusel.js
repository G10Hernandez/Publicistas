let slideIndex = 0;
let autoSlideInterval;

fetch("data.json")
  .then(response => response.json())
  .then(data => {
    const contenedor = document.getElementById("carrusel-contenedor");
    data.banners.forEach(banner => {
      const img = document.createElement("img");
      img.src = banner.src;
      img.alt = banner.alt;
      contenedor.appendChild(img);
    });

    // animación automática
    let index = 0;
    const slides = contenedor.querySelectorAll("img");
    function mostrarSlide() {
      slides.forEach((slide, i) => {
        slide.style.display = (i === index) ? "block" : "none";
      });
      index = (index + 1) % slides.length;
    }
    mostrarSlide();
    setInterval(mostrarSlide, 3000);
  })
  .catch(err => console.error("Error cargando banners:", err));


function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicators button');
    if (!slides.length) return;

    // Ajustar índice circular
    if (index >= slides.length) slideIndex = 0;
    if (index < 0) slideIndex = slides.length - 1;

    // Mover contenedor
    document.getElementById('carousel-container').style.transform =
        `translateX(-${slideIndex * 100}%)`;

    // Actualizar indicadores
    indicators.forEach((btn, i) => {
        btn.classList.toggle("active", i === slideIndex);
    });
}

function moveSlide(n) {
    slideIndex += n;
    showSlide(slideIndex);
    resetAutoSlide();
}

function goToSlide(n) {
    slideIndex = n;
    showSlide(slideIndex);
    resetAutoSlide();
}

function autoSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(autoSlide, 4000);
}

// Inicializar carrusel
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicatorsContainer = document.querySelector('.carousel-indicators');

    // Crear indicadores
    slides.forEach((_, i) => {
        const btn = document.createElement("button");
        btn.addEventListener("click", () => goToSlide(i));
        indicatorsContainer.appendChild(btn);
    });

    showSlide(slideIndex);
    autoSlideInterval = setInterval(autoSlide, 4000);
});

