document.addEventListener("DOMContentLoaded", () => {
    const memberModal = document.getElementById("member-modal");
    const modalImage = document.getElementById("modal-image");
    const modalName = document.getElementById("modal-name");
    const modalBio = document.getElementById("modal-bio");
    const modalWebsite = document.getElementById("modal-website");
    const manifestoModal = document.getElementById("manifesto-modal");

    const open = modal => modal.classList.add("open");
    const close = modal => modal.classList.remove("open");

    function swallow(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    // Member modal

    document.querySelectorAll(".member-link").forEach(link => {
        link.addEventListener("click", event => {
            swallow(event);

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

            open(memberModal);
        }, true);
    });

    // Keep the theme's image zoom from grabbing portrait clicks.
    modalImage.addEventListener("click", swallow, true);
    document.querySelectorAll(".member-portrait").forEach(image => {
        image.addEventListener("click", swallow);
    });

    document.getElementById("modal-close").addEventListener("click", () => close(memberModal));

    // Manifesto modal

    if (location.hash === "#manifesto") {
        open(manifestoModal);
    }

    document.getElementById("manifesto-close")?.addEventListener("click", () => close(manifestoModal));

    // Shared modal behaviour: click on backdrop or Escape closes.

    [memberModal, manifestoModal].forEach(modal => {
        modal.addEventListener("click", event => {
            if (event.target === modal) {
                close(modal);
            }
        });
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            close(memberModal);
            close(manifestoModal);
        }
    });

    // Menu links: #manifesto opens the modal, section anchors scroll smoothly.

    const scrollTargets = ["news", "supporters"];

    document.addEventListener("click", event => {
        if (event.target.closest('a[href$="#manifesto"]')) {
            event.preventDefault();
            open(manifestoModal);
            return;
        }

        for (const id of scrollTargets) {
            if (event.target.closest(`a[href$="#${id}"]`)) {
                event.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                return;
            }
        }
    });
});
