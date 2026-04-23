const container = document.getElementById("fav-container");

/* ---------------------------
   SAFE DATA ACCESS
---------------------------- */
function getTeams(event) {
  const comp = event?.competitions?.[0];

  if (!comp) {
    return {
      home: "Unknown",
      away: "Unknown",
      homeScore: "-",
      awayScore: "-",
    };
  }

  const home = comp.competitors?.find((t) => t.homeAway === "home");
  const away = comp.competitors?.find((t) => t.homeAway === "away");

  return {
    home: home?.team?.displayName || "Home",
    away: away?.team?.displayName || "Away",
    homeScore: home?.score || "0",
    awayScore: away?.score || "0",
  };
}

function getFavorites() {
  try {
    const data = JSON.parse(localStorage.getItem("fav"));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function getId(event) {
  return event?.id;
}

function isFav(id) {
  return getFavorites().some((m) => m?.id === id);
}

/* ---------------------------
   TOGGLE FAVORITE (TAK SAMO JAK W SCORES)
---------------------------- */
function toggleFavorite(event) {
  let fav = getFavorites();
  const id = getId(event);

  if (isFav(id)) {
    fav = fav.filter((m) => m.id !== id);
  } else {
    fav.push(event);
  }

  localStorage.setItem("fav", JSON.stringify(fav));
  renderFavorites();
}

/* ---------------------------
   RENDER
---------------------------- */
function renderFavorites() {
  container.innerHTML = "";

  const favs = getFavorites().filter(
    (event) => event?.competitions?.length > 0,
  );

  if (favs.length === 0) {
    container.innerHTML = "<p>No favorite matches yet</p>";
    return;
  }

  favs.forEach((event) => {
    const { home, away, homeScore, awayScore } = getTeams(event);
    const id = getId(event);

    const div = document.createElement("div");
    div.className = "match-tile";

    div.innerHTML = `
            <div class="teams">
                <div class="team">${home}</div>

                <div>
                    ${homeScore} - ${awayScore}
                </div>

                <div class="team">${away}</div>
            </div>

            <div class="match-actions">
                <button class="fav-btn ${isFav(id) ? "active" : ""}">⭐</button>
                <button class="details-btn">Details</button>
            </div>
        `;

    div.querySelector(".fav-btn").onclick = () => {
      toggleFavorite(event);
    };

    div.querySelector(".details-btn").onclick = () => {
      localStorage.setItem("match", JSON.stringify(event));
      window.location.href = "details.html";
    };

    container.appendChild(div);
  });
}

renderFavorites();
