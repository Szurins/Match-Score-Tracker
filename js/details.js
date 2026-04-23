const container = document.getElementById("details");

const event = JSON.parse(localStorage.getItem("match"));

if (!event) {
  container.innerHTML = "No data";
} else {
  const comp = event.competitions[0];

  const home = comp.competitors.find((t) => t.homeAway === "home");
  const away = comp.competitors.find((t) => t.homeAway === "away");

  function renderStats(team) {
    if (!team.statistics) return "<p>No stats</p>";

    return team.statistics
      .slice(0, 6)
      .map(
        (stat) => `
<div class="stat-row">
<span>${stat.abbreviation}</span>
<span>${stat.displayValue}</span>
</div>
`,
      )
      .join("");
  }

  function renderLeaders(team) {
    if (!team.leaders) return "";

    return team.leaders
      .map(
        (l) => `
<div class="leader">
<strong>${l.displayName}:</strong>
${l.leaders[0]?.displayValue}
</div>
`,
      )
      .join("");
  }

  container.innerHTML = `
<div class="detail-card">

<h2>${home.team.displayName} vs ${away.team.displayName}</h2>

<div class="big-score">
${home.score} - ${away.score}
</div>

<p>Status: ${event.status.type.description}</p>

<h3>Stats</h3>

<div class="stats-grid">

<div>
<h4>${home.team.shortDisplayName}</h4>
${renderStats(home)}
</div>

<div>
<h4>${away.team.shortDisplayName}</h4>
${renderStats(away)}
</div>

</div>

<h3>Leaders</h3>

<div class="stats-grid">
<div>${renderLeaders(home)}</div>
<div>${renderLeaders(away)}</div>
</div>

</div>
`;
}
