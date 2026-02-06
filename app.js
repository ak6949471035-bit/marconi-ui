const KEY = "MARCONI_API_URL";

function getApiUrl() {
  return (localStorage.getItem(KEY) || "").trim();
}

function setApiUrl(v) {
  localStorage.setItem(KEY, (v || "").trim());
}

async function fetchStations() {
  const api = getApiUrl();
  const out = document.getElementById("out");

  if (!api) {
    out.textContent = "Βάλε πρώτα το Worker API URL και πάτα Save.";
    return;
  }

  const url = api.replace(/\/+$/, "") + "/?action=stations";

  out.textContent = "Loading...\n" + url;

  const r = await fetch(url);
  const txt = await r.text();

  out.textContent = "HTTP " + r.status + "\n\n" + txt;
}

document.getElementById("btnSave").addEventListener("click", () => {
  const v = document.getElementById("apiUrl").value;
  setApiUrl(v);
});

document.getElementById("btnRefresh").addEventListener("click", () => {
  fetchStations().catch(err => {
    document.getElementById("out").textContent = String(err);
  });
});

window.addEventListener("load", () => {
  const api = getApiUrl();
  document.getElementById("apiUrl").value = api;
  fetchStations().catch(() => {});
});
