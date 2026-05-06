const urlInput = document.getElementById("urlInput");
const loadBtn = document.getElementById("loadBtn");
const reloadBtn = document.getElementById("reloadBtn");
const openBtn = document.getElementById("openBtn");
const statusEl = document.getElementById("status");
const viewer = document.getElementById("viewer");

function normalizeUrl(raw) {
  const value = (raw || "").trim();
  if (!value) {
    return "https://vue-chat-7c2c5.web.app/";
  }

  try {
    return new URL(value).toString();
  } catch {
    return new URL(`https://${value}`).toString();
  }
}

function setStatus(message) {
  statusEl.textContent = message;
}

function loadUrl() {
  const url = normalizeUrl(urlInput.value);
  urlInput.value = url;
  viewer.src = url;
  setStatus(`Loading ${url}`);
}

loadBtn.addEventListener("click", loadUrl);

reloadBtn.addEventListener("click", () => {
  try {
    viewer.contentWindow?.location.reload();
    setStatus("Reloaded current page.");
  } catch {
    viewer.src = viewer.src;
    setStatus("Reloaded current page.");
  }
});

openBtn.addEventListener("click", () => {
  const url = normalizeUrl(urlInput.value);
  window.open(url, "_blank", "noopener,noreferrer");
});

urlInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    loadUrl();
  }
});

viewer.addEventListener("load", () => {
  setStatus("Page loaded. If nothing appears, the site may block being framed.");
});

viewer.src = "https://vue-chat-7c2c5.web.app/";
setStatus("Ready.");