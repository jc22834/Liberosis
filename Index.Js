document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const navContent = document.querySelector('.content');

            if (mobileMenuBtn && navContent) {
                mobileMenuBtn.addEventListener('click', function() {
                    this.classList.toggle('active');
                    navContent.classList.toggle('active');
                });
            }

            // Back to top button
            const backToTop = document.querySelector('.back-to-top');
            if (backToTop) {
                window.addEventListener('scroll', function() {
                    if (window.pageYOffset > 300) {
                        backToTop.classList.add('active');
                    } else {
                        backToTop.classList.remove('active');
                    }
                });
            }

            // Team Carousel functionality
            const teamMembers = [
                { name: "Sin Sisamuth", role: "Khmer-Pop" },
                { name: "Daniel Caesar", role: "R&B" },
                { name: "Keshi", role: "R&B" },
                { name: "Peach Tree Rascals", role: "Jazz & Funk" },
                { name: "Fuji Kaze", role: "J-Pop" },
                { name: "Joey Bada$$", role: "HIP-HOP" },
            ];

            const cards = document.querySelectorAll(".team-card");
            const dots = document.querySelectorAll(".dot");
            const memberName = document.querySelector(".member-name");
            const memberRole = document.querySelector(".member-role");
            const leftArrow = document.querySelector(".nav-arrow.left");
            const rightArrow = document.querySelector(".nav-arrow.right");
            let currentIndex = 0;
            let isAnimating = false;

            function updateCarousel(newIndex) {
                if (isAnimating) return;
                isAnimating = true;

                currentIndex = (newIndex + cards.length) % cards.length;

                cards.forEach((card, i) => {
                    const offset = (i - currentIndex + cards.length) % cards.length;

                    card.classList.remove(
                        "center",
                        "left-1",
                        "left-2",
                        "right-1",
                        "right-2",
                        "hidden"
                    );

                    if (offset === 0) {
                        card.classList.add("center");
                    } else if (offset === 1) {
                        card.classList.add("right-1");
                    } else if (offset === 2) {
                        card.classList.add("right-2");
                    } else if (offset === cards.length - 1) {
                        card.classList.add("left-1");
                    } else if (offset === cards.length - 2) {
                        card.classList.add("left-2");
                    } else {
                        card.classList.add("hidden");
                    }
                });

                dots.forEach((dot, i) => {
                    dot.classList.toggle("active", i === currentIndex);
                });

                memberName.style.opacity = "0";
                memberRole.style.opacity = "0";

                setTimeout(() => {
                    memberName.textContent = teamMembers[currentIndex].name;
                    memberRole.textContent = teamMembers[currentIndex].role;
                    memberName.style.opacity = "1";
                    memberRole.style.opacity = "1";
                }, 300);

                setTimeout(() => {
                    isAnimating = false;
                }, 800);
            }

            leftArrow.addEventListener("click", () => {
                updateCarousel(currentIndex - 1);
            });

            rightArrow.addEventListener("click", () => {
                updateCarousel(currentIndex + 1);
            });

            dots.forEach((dot, i) => {
                dot.addEventListener("click", () => {
                    updateCarousel(i);
                });
            });

            cards.forEach((card, i) => {
                card.addEventListener("click", () => {
                    updateCarousel(i);
                });
            });

            document.addEventListener("keydown", (e) => {
                if (e.key === "ArrowLeft") {
                    updateCarousel(currentIndex - 1);
                } else if (e.key === "ArrowRight") {
                    updateCarousel(currentIndex + 1);
                }
            });

            let touchStartX = 0;
            let touchEndX = 0;

            document.addEventListener("touchstart", (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });

            document.addEventListener("touchend", (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });

            function handleSwipe() {
                const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;

                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        updateCarousel(currentIndex + 1);
                    } else {
                        updateCarousel(currentIndex - 1);
                    }
                }
            }

            updateCarousel(0);
        });