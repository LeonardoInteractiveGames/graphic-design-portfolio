/* =========================================================
   GRAPHIC DESIGN PORTFOLIO
========================================================= */

/*
    ADD YOUR WORK HERE.

    Put your images inside /images and add an entry below.

    Example:

    {
        image: "images/polaris-01.jpg",
        title: "Polaris Community",
        category: "Campaign Design",
        year: "2026"
    }
*/

const projects = [
    {
        image: "images/Artboard 1.jpg",
        title: "Project One",
        category: "Poster Design",
        year: "2026"
    },
    {
        image: "images/Artboard 2.png",
        title: "Project Two",
        category: "Poster Design",
        year: "2026"
    },
    {
        image: "images/Artboard 3.png",
        title: "Project Three",
        category: "Product Design",
        year: "2026"
    },
    {
        image: "images/CEREAL.png",
        title: "Project Four",
        category: "Product Design",
        year: "2026"
    },
    {
        image: "images/Demonbrew.png",
        title: "Project Five",
        category: "Product Design",
        year: "2026"
    },
    {
        image: "images/logoconcept.png",
        title: "Project Six",
        category: "Logo Design",
        year: "2026"
    },
    {
        image: "images/07.svg",
        title: "Project Seven",
        category: "Social Campaign",
        year: "2026"
    },
    {
        image: "images/08.svg",
        title: "Project Eight",
        category: "Print Design",
        year: "2026"
    }
];

const gallery = document.getElementById("gallery");

const viewer = document.getElementById("viewer");
const viewerImage = document.getElementById("viewerImage");
const viewerTitle = document.getElementById("viewerTitle");
const viewerCategory = document.getElementById("viewerCategory");
const viewerYear = document.getElementById("viewerYear");
const viewerCounter = document.getElementById("viewerCounter");

const viewerClose = document.getElementById("viewerClose");
const viewerPrev = document.getElementById("viewerPrev");
const viewerNext = document.getElementById("viewerNext");

let currentIndex = 0;


/* =========================================================
   BUILD GALLERY
========================================================= */

projects.forEach((project, index) => {
    const item = document.createElement("article");

    item.className = "gallery-item";
    item.tabIndex = 0;
    item.setAttribute("role", "button");
    item.setAttribute("aria-label", `Open ${project.title}`);

    item.innerHTML = `
        <img
            class="gallery-image"
            src="${project.image}"
            alt="${project.title}"
            loading="${index < 8 ? "eager" : "lazy"}"
        >

        <div class="gallery-overlay">
            <div class="gallery-overlay-content">
                <div class="gallery-title">${project.title}</div>
                <div class="gallery-meta">${project.category} · ${project.year}</div>
            </div>
        </div>
    `;

    gallery.appendChild(item);

    const image = item.querySelector(".gallery-image");

    const reveal = () => {
        setTimeout(() => item.classList.add("is-visible"), index * 55);
    };

    if (image.complete) {
        reveal();
    } else {
        image.addEventListener("load", reveal, { once: true });
        image.addEventListener("error", reveal, { once: true });
    }

    item.addEventListener("click", () => openViewer(index));

    item.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openViewer(index);
        }
    });
});


/* =========================================================
   VIEWER
========================================================= */

function updateViewer() {
    const project = projects[currentIndex];

    viewerImage.style.opacity = "0";

    setTimeout(() => {
        viewerImage.src = project.image;
        viewerImage.alt = project.title;

        viewerTitle.textContent = project.title;
        viewerCategory.textContent = project.category;
        viewerYear.textContent = project.year;

        viewerCounter.textContent =
            `${String(currentIndex + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;

        requestAnimationFrame(() => {
            viewerImage.style.opacity = "1";
        });
    }, 120);
}

function openViewer(index) {
    currentIndex = index;

    updateViewer();

    viewer.classList.add("is-open");
    viewer.setAttribute("aria-hidden", "false");

    document.body.classList.add("viewer-open");
}

function closeViewer() {
    viewer.classList.remove("is-open");
    viewer.setAttribute("aria-hidden", "true");

    document.body.classList.remove("viewer-open");

    setTimeout(() => {
        viewerImage.style.opacity = "";
    }, 450);
}

function nextProject() {
    currentIndex = (currentIndex + 1) % projects.length;
    updateViewer();
}

function previousProject() {
    currentIndex =
        (currentIndex - 1 + projects.length) % projects.length;

    updateViewer();
}


/* =========================================================
   BUTTONS
========================================================= */

viewerClose.addEventListener("click", closeViewer);
viewerNext.addEventListener("click", nextProject);
viewerPrev.addEventListener("click", previousProject);


/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener("keydown", event => {
    if (!viewer.classList.contains("is-open")) {
        return;
    }

    if (event.key === "Escape") {
        closeViewer();
    }

    if (event.key === "ArrowRight") {
        nextProject();
    }

    if (event.key === "ArrowLeft") {
        previousProject();
    }
});


/* =========================================================
   CLICK BACKDROP TO CLOSE
========================================================= */

viewer.addEventListener("click", event => {
    if (event.target === viewer) {
        closeViewer();
    }
});


/* =========================================================
   TOUCH SWIPE
========================================================= */

let touchStartX = 0;

viewer.addEventListener("touchstart", event => {
    touchStartX = event.changedTouches[0].clientX;
}, { passive: true });

viewer.addEventListener("touchend", event => {
    const touchEndX = event.changedTouches[0].clientX;
    const distance = touchEndX - touchStartX;

    if (Math.abs(distance) < 50) {
        return;
    }

    if (distance < 0) {
        nextProject();
    } else {
        previousProject();
    }
}, { passive: true });
