// Efek mengetik pada judul hero — pengganti vanilla dari <ReactTyped />.
// Strings, typeSpeed, dan backSpeed disamakan dengan konfigurasi React sebelumnya.

const strings = ["Asep Nurdin.", "Founder Mahakarya Digital.", "Fullstack & DevOps Engineer."];
const typeSpeed = 80; // ms per karakter saat mengetik
const backSpeed = 60; // ms per karakter saat menghapus
const pauseAfterType = 1500; // jeda sebelum mulai menghapus
const pauseAfterDelete = 400; // jeda sebelum mulai kata berikutnya

export function initTypedText() {
  const el = document.getElementById("typed-text");
  if (!el) return;

  let stringIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = strings[stringIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, pauseAfterType);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        deleting = false;
        stringIndex = (stringIndex + 1) % strings.length;
        setTimeout(tick, pauseAfterDelete);
        return;
      }
      setTimeout(tick, backSpeed);
    }
  }

  tick();
}
