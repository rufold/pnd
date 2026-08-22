document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("member-modal");
    const modalImage = document.getElementById("modal-image");
    const modalName = document.getElementById("modal-name");
    const modalBio = document.getElementById("modal-bio");
    const modalWebsite = document.getElementById("modal-website");
    const closeButton = document.getElementById("modal-close");
    const manifestoModal = document.getElementById("manifesto-modal");
    const manifestoOpen = document.getElementById("open-manifesto");
    const manifestoClose = document.getElementById("manifesto-close");
    const manifestoMenuLink = document.querySelector(".manifesto-menu-link");

    document.querySelectorAll(".member-link").forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            modalImage.src = link.dataset.image;
            modalImage.alt = link.dataset.name;

            modalName.textContent = link.dataset.name;
            modalBio.textContent = link.dataset.bio;

            if (link.dataset.website) {
                modalWebsite.href = link.dataset.website;
                modalWebsite.style.display = "";
            } else {
                modalWebsite.removeAttribute("href");
                modalWebsite.style.display = "none";
            }

            modal.classList.add("open");
        }, true);
    });

    modalImage.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
    }, true);

    document.querySelectorAll(".member-portrait").forEach(image => {
        image.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();
        })
    })

    closeButton.addEventListener("click", () => {
        modal.classList.remove("open");
    });

    modal.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.classList.remove("open");
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key == "Escape") {
            modal.classList.remove("open");
        }
    });

    function openManifesto(event) {
        event.preventDefault();
        manifestoModal.classList.add("open");
    }


    function closeManifesto() {
        manifestoModal.classList.remove("open");
    }


    if (manifestoOpen) {
        manifestoOpen.addEventListener("click", openManifesto);
    }

    if (location.hash === "#manifesto") {
        manifestoModal.classList.add("open");
    }


    document.addEventListener("click", (event) => {
        const menuLink = event.target.closest('a[href$="#manifesto"]');

        if (menuLink) {
            openManifesto(event);
        }
    });

    if (manifestoClose) {
        manifestoClose.addEventListener("click", closeManifesto);
    }

    manifestoModal.addEventListener("click", (event) => {
        if (event.target === manifestoModal) {
            closeManifesto();
        }
    });


    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeManifesto();
        }
    });

    document.addEventListener("click", (event) => {
        const newsLink = event.target.closest('a[href$="#news"]');

        if (newsLink) {
            event.preventDefault();

            document.getElementById("news")?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
    document.addEventListener("click", (event) => {
        const supportersLink = event.target.closest('a[href$="#supporters"]');

        if (supportersLink) {
            event.preventDefault();

            document.getElementById("supporters")?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});