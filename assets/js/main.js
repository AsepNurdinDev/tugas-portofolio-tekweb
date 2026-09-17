import { renderNavbar } from "./components/navbar.js";
import { initTypedText } from "./components/typed-text.js";
import { renderAbout } from "./components/about.js";
import { renderTools } from "./components/tools.js";
import { renderProjects } from "./components/projects.js";
import { renderContactForm } from "./components/contact-form.js";
import { renderFooter } from "./components/footer.js";

function init() {
  // Render seluruh section ke dalam DOM
  renderNavbar();
  renderAbout();
  renderTools();
  renderProjects();
  renderContactForm();
  renderFooter();

  // Efek mengetik pada judul hero
  initTypedText();

  // Icon set (pengganti lucide-react)
  if (window.lucide) window.lucide.createIcons();

  // Scroll reveal animation (AOS), setara AOS.init() pada useEffect App.jsx
  if (window.AOS) {
    window.AOS.init({
      duration: 1000,
      once: true,
    });
  }
}

document.addEventListener("DOMContentLoaded", init);
