document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.remove("fade-out");
});

document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", function (e) {
    const target = this.getAttribute("href");
    if (!target || target.startsWith("http")) return;
    e.preventDefault();

    document.body.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = target;
    }, 400);
  });
});

// time display
function getGreeting(hour) {
  if (hour < 12) return "Good morning!";
  if (hour < 18) return "Good afternoon!";
  return "Good evening!";
}

function formatTime(date, options) {
  return date.toLocaleTimeString([], options);
}

function updateTime() {
  const now = new Date();
  const myTimeZone = "Asia/Manila";
  const myTime = now.toLocaleTimeString("en-PH", {
    timeZone: myTimeZone,
    hour: "2-digit",
    minute: "2-digit"
  });
  const userTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
  const myHour = new Date(
    now.toLocaleString("en-US", { timeZone: myTimeZone })
  ).getHours();
  const greeting = getGreeting(myHour);
  
  document.getElementById("my-time").textContent = myTime;
  document.getElementById("user-time").textContent = userTime;
  document.getElementById("greeting").textContent = greeting;
}

setInterval(updateTime, 1000);
updateTime();

const track = document.getElementById("toolsTrack");
const items = document.querySelectorAll(".tool");

let index = 0;

function updateCarousel() {
  const itemWidth = items[0].offsetWidth + 20;
  const containerWidth = track.parentElement.offsetWidth;
  const offset = (containerWidth / 2) - (itemWidth / 2);

  track.style.transform = `translateX(${offset - index * itemWidth}px)`;
  items.forEach(item => item.classList.remove("active"));
  items[index].classList.add("active");
  index = (index + 1) % items.length;
}

setInterval(updateCarousel, 3000);
updateCarousel();

document.addEventListener("DOMContentLoaded", () => {
  const emailLink = document.getElementById("email-link");
  const popover = new bootstrap.Popover(emailLink, {
    trigger: "manual"
  });

  emailLink.addEventListener("click", (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(emailLink.textContent).then(() => {
      popover.show();
      setTimeout(() => popover.hide(), 1500);
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".project-card");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    cards.forEach(card => {
        observer.observe(card);
    });
});
