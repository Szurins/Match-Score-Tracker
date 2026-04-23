const container = document.querySelector(".match-container");
const paginationDiv = document.getElementById("pagination");
const searchInput = document.getElementById("search");

let matches = [];
let filtered = [];

let currentPage = 1;
const perPage = 6;

function getTeams(event) {
  const comp = event.competitions[0];
  const home = comp.competitors.find((t) => t.homeAway === "home");
  const away = comp.competitors.find((t) => t.homeAway === "away");

  return {
    home: home?.team?.displayName || "Home",
    away: away?.team?.displayName || "Away",
    homeScore: home?.score || "0",
    awayScore: away?.score || "0",
  };
}

function getId(event) {
  return event.id;
}

function getFavorites() {
  return JSON.parse(localStorage.getItem("fav")) || [];
}

function isFav(id) {
  return getFavorites().some((m) => m.id === id);
}

function toggleFavorite(event) {
  let fav = getFavorites();
  const id = getId(event);

  if (isFav(id)) {
    fav = fav.filter((m) => m.id !== id);
  } else {
    fav.push(event);
  }

  localStorage.setItem("fav", JSON.stringify(fav));
  renderPage();
}

function renderPage() {
  container.innerHTML = "";

  const start = (currentPage - 1) * perPage;
  const pageData = filtered.slice(start, start + perPage);

  pageData.forEach((event) => {
    const { home, away, homeScore, awayScore } = getTeams(event);
    const id = getId(event);

    const div = document.createElement("div");
    div.className = "match-tile";

    div.innerHTML = `
    <div class="teams">
    <div class="team">${home}</div>
    <div>${homeScore} - ${awayScore}</div>
    <div class="team">${away}</div>
    </div>

    <div class="match-actions">
    <button class="fav-btn ${isFav(id) ? "active" : ""}">⭐</button>
    <button class="details-btn">Details</button>
    </div>
    `;

    div.querySelector(".fav-btn").onclick = () => toggleFavorite(event);

    div.querySelector(".details-btn").onclick = () => {
      localStorage.setItem("match", JSON.stringify(event));
      window.location.href = "details.html";
    };

    container.appendChild(div);
  });

  renderPagination();
}

function renderPagination() {
  paginationDiv.innerHTML = "";
  const pages = Math.ceil(filtered.length / perPage);

  for (let i = 1; i <= pages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.className = "page-btn" + (i === currentPage ? " active" : "");

    btn.onclick = () => {
      currentPage = i;
      renderPage();
    };

    paginationDiv.appendChild(btn);
  }
}

searchInput.addEventListener("input", () => {
  const val = searchInput.value.toLowerCase();

  filtered = matches.filter((event) => {
    const { home, away } = getTeams(event);
    return home.toLowerCase().includes(val) || away.toLowerCase().includes(val);
  });

  currentPage = 1;
  renderPage();
});

async function init() {
  const sport = localStorage.getItem("sport") || "nfl";

  try {
    const data = await fetchMatches(sport);
    matches = data;
    filtered = data;
    renderPage();
  } catch (e) {
    container.innerHTML = "<p>Error loading data</p>";
  }
}

init();
