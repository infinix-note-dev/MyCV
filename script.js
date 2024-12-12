document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    const sections = document.querySelectorAll(".section");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            } else {
                entry.target.classList.remove("visible");
            }
        });
    }, {
        threshold: 0.2
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    const toggleSwitch = document.createElement("button");
    toggleSwitch.textContent = "🌙 Tryb ciemny";
    toggleSwitch.style.position = "fixed";
    toggleSwitch.style.top = "10px";
    toggleSwitch.style.right = "10px";
    toggleSwitch.style.padding = "0.5rem";
    toggleSwitch.style.border = "none";
    toggleSwitch.style.borderRadius = "5px";
    toggleSwitch.style.background = "#333";
    toggleSwitch.style.color = "#fff";
    toggleSwitch.style.cursor = "pointer";

    document.body.appendChild(toggleSwitch);

    toggleSwitch.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            toggleSwitch.textContent = "☀️ Tryb jasny";
        } else {
            toggleSwitch.textContent = "🌙 Tryb ciemny";
        }
    });

    // Counter Animations
    const counters = document.querySelectorAll(".counter");
    const startCounters = () => {
        counters.forEach(counter => {
            counter.textContent = "0";
            const updateCounter = () => {
                const target = +counter.getAttribute("data-target");
                const current = +counter.textContent;
                const increment = target / 100;

                if (current < target) {
                    counter.textContent = `${Math.ceil(current + increment)}`;
                    setTimeout(updateCounter, 30);
                } else {
                    counter.textContent = target;
                }
            };
            updateCounter();
        });
    };

    const counterSection = document.querySelector("#counters");
    if (counterSection) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                    counterObserver.disconnect();
                }
            });
        }, { threshold: 0.5 });

        counterObserver.observe(counterSection);
    }
});
