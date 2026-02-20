gsap.registerPlugin(ScrollTrigger);

// =========================================================
// 1. DATA PROJECT
// =========================================================
const projectData = {
    "myportofolio": {
        title: "My Portofolio",
        desc: "Website portofolio pribadi yang dirancang dengan desain responsif dan antarmuka modern menggunakan HTML, CSS, JavaScript dan GSAP Animation.",
        techCount: 5,
        images: ["images/porto.png"], 
        features: ["Desain Responsif", "Animasi GSAP", "Dark Mode Ready", "Form Contact Active"],
        githubLink: "https://github.com/Satriodwiyandaarifin/PortofolioSatrio"
    },
    "navigasikampus": { 
        title: "Navigasi Kampus",
        desc: "Website pemetaan untuk membantu mahasiswa baru menemukan letak dan rute ruangan terbaik di seluruh area kampus.",
        techCount: 7,
        images: ["images/navi.png", "images/navi2.png"], 
        features: ["Map Interaktif", "Search Filter", "Informasi Gedung", "Real-time Location"],
        githubLink: "https://github.com/Satriodwiyandaarifin/navigasi-kampus" 
    },
    "conkhd": {
        title: "ConkHD",
        desc: "Aplikasi web ringan untuk membuat gambar atau foto yang buram (low-res) menjadi kualitas HD secara instan menggunakan proses AI.",
        techCount: 4,
        images: ["images/conkhd.png"], 
        features: ["AI Enhancement", "Fast Render", "Image Download", "Privacy Secure"],
        githubLink: "https://github.com/Satriodwiyandaarifin/conkHD" 
    }
};

// =========================================================
// 2. EFEK KETIK (TYPING ANIMATION) 
// =========================================================
const textArray = ["UI/UX Enthusiast", "Frontend Developer"];
let textIndex = 0, charIndex = 0, isDeleting = false;

function typeWriterEffect() {
    const el = document.getElementById("typewriter");
    if(!el) return; 

    const currentText = textArray[textIndex];
    el.textContent = isDeleting ? currentText.substring(0, charIndex - 1) : currentText.substring(0, charIndex + 1);
    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

    let speed = isDeleting ? 50 : 100;
    if (!isDeleting && charIndex === currentText.length) { speed = 2000; isDeleting = true; }
    else if (isDeleting && charIndex === 0) { isDeleting = false; textIndex = (textIndex + 1) % textArray.length; speed = 500; }
    setTimeout(typeWriterEffect, speed);
}

// =========================================================
// 3. FUNGSI ANIMASI SCROLL REVEAL (IN & OUT UNTUK JUDUL)
// =========================================================
function handleScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-text');
    reveals.forEach(el => {
        const revealTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Jika elemen masuk ke layar, tambahkan class active (Animasi IN)
        if (revealTop < windowHeight - 100) {
            el.classList.add('active');
        } 
        // Jika elemen keluar dari layar (scroll ke atas), hapus class active (Animasi OUT)
        else {
            el.classList.remove('active');
        }
    });
}

// =========================================================
// 4. MAIN LOGIC (LOADER & NAVIGASI)
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeWriterEffect, 1000); 
    window.addEventListener('scroll', handleScrollReveal);
    handleScrollReveal(); 

    const enterBtn = document.getElementById("enter-btn");
    const gateScreen = document.getElementById("gate-screen");
    const splashScreen = document.getElementById("splash-screen");

    if (enterBtn && gateScreen && splashScreen) {
        if (sessionStorage.getItem("hasEntered") === "true") {
            gateScreen.style.display = "none"; splashScreen.style.display = "none";
            document.body.style.overflow = "auto";
            if(document.querySelector(".tab-glider")) updateGlider(); 
            initScrollAnimations(); 
        } else {
            document.body.style.overflow = "hidden"; window.scrollTo(0, 0);
            enterBtn.addEventListener("click", () => {
                sessionStorage.setItem("hasEntered", "true");
                gateScreen.style.opacity = "0"; setTimeout(() => gateScreen.style.display = "none", 800);
                splashScreen.style.visibility = "visible"; splashScreen.style.opacity = "1";
                gsap.timeline({ onComplete: () => { document.body.style.overflow = "auto"; if(document.querySelector(".tab-glider")) updateGlider(); initScrollAnimations(); } })
                    .fromTo(".splash-logo", { opacity: 0, y: 30, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 1 })
                    .to(".progress", { width: "100%", duration: 2.5 })
                    .to("#splash-screen", { opacity: 0, display: "none", duration: 0.8 });
            });
        }
    } else {
        if(document.querySelector(".tab-glider")) updateGlider(); 
        initScrollAnimations();
    }

    // HAMBURGER MENU
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            hamburgerBtn.querySelector("i").classList.toggle("fa-bars");
            hamburgerBtn.querySelector("i").classList.toggle("fa-times");
        });
        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                hamburgerBtn.querySelector("i").className = "fas fa-bars";
            });
        });
    }

    // DARK MODE
    const themeBtn = document.getElementById("theme-toggle");
    if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark-mode");
    themeBtn?.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    });
});

// =========================================================
// 5. ANIMASI GSAP SCROLL CONTENT (EFEK IN & OUT)
// =========================================================
function initScrollAnimations() {
    // Pengaturan global scroll untuk In & Out
    const scrollConfig = (triggerEl) => ({
        trigger: triggerEl,
        start: "top 85%", // Mulai animasi saat elemen mencapai 85% dari atas layar
        toggleActions: "play reverse play reverse" // PLAY saat scroll turun, REVERSE saat scroll naik
    });

    // Animasi Avatar About (Membesar & Muncul)
    gsap.fromTo(".about-avatar", 
        { scale: 0.5, opacity: 0 }, 
        { scrollTrigger: scrollConfig(".about"), scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.5)" }
    );

    // Animasi Teks About (Naik dari bawah)
    gsap.fromTo(".about-text", 
        { y: 50, opacity: 0 }, 
        { scrollTrigger: scrollConfig(".about"), y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }
    );

    // Animasi Timeline (Muncul berurutan dari kiri)
    gsap.fromTo(".timeline-item", 
        { x: -50, opacity: 0 }, 
        { scrollTrigger: scrollConfig(".experience"), x: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: "power3.out" }
    );

    // Animasi Project Card (Muncul berurutan dari bawah)
    gsap.fromTo(".project-card", 
        { y: 60, opacity: 0 }, 
        { scrollTrigger: scrollConfig(".portfolio"), y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" }
    );

    // Animasi Contact Section (Teks dari Kiri, Form dari Kanan)
    gsap.fromTo(".contact-info", 
        { x: -50, opacity: 0 }, 
        { scrollTrigger: scrollConfig(".contact"), x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
    gsap.fromTo(".contact-form-card", 
        { x: 50, opacity: 0 }, 
        { scrollTrigger: scrollConfig(".contact"), x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
}

// =========================================================
// 6. TABS SYSTEM
// =========================================================
const tabBtns = document.querySelectorAll(".tab-btn");
const glider = document.querySelector(".tab-glider");

function updateGlider() {
    const activeBtn = document.querySelector(".tab-btn.active");
    if (activeBtn && glider) { 
        glider.style.width = activeBtn.offsetWidth + "px"; 
        glider.style.left = activeBtn.offsetLeft + "px"; 
    }
}

tabBtns.forEach(btn => {
    btn.addEventListener("click", function() {
        const target = this.dataset.tab;
        
        tabBtns.forEach(b => b.classList.remove("active")); 
        this.classList.add("active"); 
        updateGlider();
        
        document.querySelectorAll(".tab-panel").forEach(p => { 
            p.classList.remove("active"); 
            p.style.display = "none"; 
        });
        
        const targetPanel = document.getElementById(target + "-content");
        if(targetPanel) { 
            targetPanel.style.display = "block"; 
            setTimeout(() => targetPanel.classList.add("active"), 10); 
            ScrollTrigger.refresh(); 

            // Efek In untuk Tech Stack dan Sertifikat saat di-klik
            if (target === "tech") {
                gsap.fromTo(".tech-item", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 });
            } else if (target === "sertifikat") {
                gsap.fromTo(".cert-card", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 });
            }
        }
    });
});
window.addEventListener("resize", updateGlider);

// =========================================================
// 7. MODAL SYSTEM
// =========================================================
const modal = document.getElementById("project-modal");
let currentImageIndex = 0, currentProjectImages = []; 

function updateModalImage() { 
    const imgEl = document.getElementById("modal-img"); 
    if(imgEl && currentProjectImages.length > 0){ 
        gsap.fromTo(imgEl, { opacity: 0.3 }, { opacity: 1, duration: 0.3 }); 
        imgEl.src = currentProjectImages[currentImageIndex]; 
    } 
}

document.addEventListener("click", (e) => { 
    if (e.target.closest(".btn-details")) { 
        e.preventDefault(); 
        let titleRaw = e.target.closest(".project-card").querySelector("h4").innerText;
        let titleKey = titleRaw.toLowerCase().replace(/ /g, "").replace(/_/g, "");
        
        const data = projectData[titleKey] || projectData["myportofolio"]; 
        
        document.getElementById("modal-title").innerText = data.title;
        document.getElementById("modal-desc").innerText = data.desc;
        document.getElementById("modal-tech-count").innerText = data.techCount;
        document.getElementById("modal-feature-count").innerText = data.features ? data.features.length : 0;
        
        const list = document.getElementById("modal-features-list");
        if(list) { 
            list.innerHTML = ""; 
            if(data.features) {
                data.features.forEach(f => { 
                    const li = document.createElement("li"); 
                    li.innerText = f; 
                    list.appendChild(li); 
                }); 
            }
        }

        const githubBtn = document.querySelector(".btn-git");
        if (githubBtn) { 
            githubBtn.href = data.githubLink; 
            githubBtn.target = "_blank"; 
        }

        currentProjectImages = data.images || []; 
        currentImageIndex = 0; 
        updateModalImage();

        const prevBtn = document.getElementById("prev-btn");
        const nextBtn = document.getElementById("next-btn");
        if (currentProjectImages.length > 1) { 
            prevBtn.style.display = "flex"; 
            nextBtn.style.display = "flex"; 
        } else { 
            prevBtn.style.display = "none"; 
            nextBtn.style.display = "none"; 
        }

        modal.style.display = "block";
    } 
    
    if (e.target.classList.contains("close-modal") || e.target === modal) {
        modal.style.display = "none";
    }
});

document.getElementById("prev-btn")?.addEventListener("click", () => { 
    if(currentProjectImages.length > 0) {
        currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length; 
        updateModalImage(); 
    }
});
document.getElementById("next-btn")?.addEventListener("click", () => { 
    if(currentProjectImages.length > 0) {
        currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length; 
        updateModalImage(); 
    }
});

// =========================================================
// 8. PREVIEW SERTIFIKAT FULLSCREEN
// =========================================================
const previewWrap = document.getElementById("cert-preview-wrap"), previewImg = document.getElementById("img-preview");
document.addEventListener("click", (e) => {
    const certCard = e.target.closest(".cert-card");
    if (certCard) { 
        const imgElement = certCard.querySelector(".cert-img-container img");
        if(imgElement) {
            previewImg.src = imgElement.src; 
            previewWrap.style.display = "flex"; 
            gsap.fromTo(previewImg, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" }); 
        }
    }
    if (e.target.classList.contains("close-preview") || e.target === previewWrap) {
        previewWrap.style.display = "none";
    }
});