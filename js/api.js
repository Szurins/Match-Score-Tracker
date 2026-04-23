async function fetchMatches(sport) {
  const endpoints = {
    nfl: "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard",
    nba: "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard",
    mlb: "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard",
    nhl: "https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard",
    "college-football":
      "https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard",
    "soccer-eng.1":
      "https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard",
  };

  try {
    const res = await fetch(endpoints[sport]);
    if (!res.ok) throw new Error("API error");

    const data = await res.json();
    return data.events || [];
  } catch (e) {
    throw e;
  }
}
