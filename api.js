async function getData() {
  const url = "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

getData();