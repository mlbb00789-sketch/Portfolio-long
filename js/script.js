/* ==========================================================
   Portfolio – Chiv Menglong
   1. Your projects       5. Navbar & back-to-top
   2. Build the gallery   6. Fade-in on scroll
   3. Filter buttons      7. Footer year
   4. Project popup
   ========================================================== */

/* ---------- 1. YOUR PROJECTS ----------
   To add a project: copy one { ... } block, change the values and save.
   category must be one of: poster, social, photo, video
   For a video, add a YouTube "embed" link (youtube.com/embed/VIDEO_ID). */
const projects = [
  {
    title: "Coffee Shop Poster",
    category: "poster",
    image: "images/projects/poster-1.jpg",
    tools: "Photoshop",
    description: "A promotional poster for a local coffee shop's new drinks menu."
  },
  {
    title: "Restaurant Promo Post",
    category: "social",
    image: "images/projects/social-1.jpg",
    tools: "Canva",
    description: "A Facebook and Instagram post announcing a weekend food promotion."
  },
  {
    title: "Street Portrait",
    category: "photo",
    image: "images/projects/photo-1.jpg",
    tools: "Camera, Photoshop",
    description: "A natural-light portrait series taken and edited in the city."
  },
  {
    title: "Music Night Poster",
    category: "poster",
    image: "images/projects/poster-2.jpg",
    tools: "Photoshop",
    description: "An event poster with bold typography for a live music night."
  },
  {
    title: "Product Promo Video",
    category: "video",
    image: "images/projects/video-1.jpg",
    // To show a video in the popup, add: video: "https://www.youtube.com/embed/VIDEO_ID",
    tools: "CapCut",
    description: "A short promo video edited for TikTok and Facebook Reels."
  },
  {
    title: "Phone Shop Sale Banner",
    category: "social",
    image: "images/projects/social-2.jpg",
    tools: "Canva, Photoshop",
    description: "A sale banner and matching story design for a phone shop."
  },
  {
    title: "Landscape Collection",
    category: "photo",
    image: "images/projects/photo-2.jpg",
    tools: "Camera, Photoshop",
    description: "Landscape photos with simple color grading for a calm mood."
  },
  {
    title: "Instagram Story Set",
    category: "social",
    image: "images/projects/social-3.jpg",
    tools: "Canva",
    description: "A set of story templates with a consistent brand style."
  },
  {
    title: "Food Photography",
    category: "photo",
    image: "images/projects/photo-3.jpg",
    tools: "Camera, Photoshop",
    description: "Menu photos for a small restaurant, shot and retouched."
  }
];

const categoryNames = {
  poster: "Poster",
  social: "Social Media",
  photo: "Photography",
  video: "Video"
};

/* ---------- 2. BUILD THE GALLERY ---------- */
const gallery = document.getElementById("gallery");

projects.forEach((project, index) => {
  const col = document.createElement("div");
  col.className = "col-sm-6 col-lg-4 work-item";
  col.dataset.category = project.category;

  const playIcon = project.video
    ? '<span class="play-icon"><i class="bi bi-play-fill"></i></span>'
    : "";

  col.innerHTML = `
    <button class="work-card" data-index="${index}"
            data-bs-toggle="modal" data-bs-target="#projectModal">
      <img src="${project.image}" alt="${project.title}" loading="lazy">
      ${playIcon}
      <div class="work-overlay">
        <span class="work-cat">${categoryNames[project.category]}</span>
        <h3 class="work-title">${project.title}</h3>
      </div>
    </button>`;

  gallery.appendChild(col);
});

/* ---------- 3. FILTER BUTTONS ---------- */
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    document.querySelectorAll(".work-item").forEach((item) => {
      const show = filter === "all" || item.dataset.category === filter;
      item.classList.toggle("d-none", !show);
    });
  });
});

/* ---------- 4. PROJECT POPUP (Bootstrap modal) ---------- */
const modal = document.getElementById("projectModal");
const modalMedia = document.getElementById("modalMedia");

// Runs every time a card is clicked, just before the popup opens
modal.addEventListener("show.bs.modal", (event) => {
  const project = projects[event.relatedTarget.dataset.index];

  document.getElementById("modalTitle").textContent = project.title;
  document.getElementById("modalCategory").textContent = categoryNames[project.category];
  document.getElementById("modalDesc").textContent = project.description;
  document.getElementById("modalTools").textContent = project.tools;

  if (project.video) {
    modalMedia.innerHTML = `
      <div class="ratio ratio-16x9">
        <iframe src="${project.video}" title="${project.title}" allowfullscreen></iframe>
      </div>`;
  } else {
    modalMedia.innerHTML = `<img src="${project.image}" alt="${project.title}">`;
  }
});

// Clear the popup when it closes (this also stops a playing video)
modal.addEventListener("hidden.bs.modal", () => {
  modalMedia.innerHTML = "";
});

/* ---------- 5. NAVBAR & BACK-TO-TOP ---------- */
const nav = document.getElementById("mainNav");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 50);
  backToTop.classList.toggle("show", window.scrollY > 500);
});

// Close the mobile menu after a link is clicked
const navMenu = document.getElementById("navMenu");

document.querySelectorAll("#navMenu .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = bootstrap.Collapse.getInstance(navMenu);
    if (menu) menu.hide();
  });
});

/* ---------- 6. FADE-IN ON SCROLL ---------- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* ---------- 7. FOOTER YEAR ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
