const axios = require("axios");
const cheerio = require("cheerio");

let seasons = [];
let parent = "tt0944947";
let data = [];

function getEpisodeData(parentId) {
  axios
    .get(`https://m.imdb.com/title/${parentId}/episodes/?season=1`)
    .then(response => {
      const $ = cheerio.load(response.data);

      const urlElems = $(".season_box").each(function(i, item) {
        if (parseInt($("a", item).attr("season_number")) <= 0) {
        } else {
          seasons.push($("a", item).attr("season_number"));
        }
      });
      console.table(seasons);
    })
    .then(() => {
      for (var x in seasons) {
        let y = x;
        axios
          .get(
            `https://www.imdb.com/title/${parentId}/episodes?season=${
              seasons[x]
            }&ref_=tt_eps_sn_${seasons[x]}`
          )
          .then(async response => {
            
            const $ = cheerio.load(response.data);
            const urlElems = await $(".info").each(function(i, item) {
              data.push({
                tvId: $("strong a", item).text(),
                test: $(".wtw-option-standalone", item).attr("data-tconst"),
                seasonNumber: seasons[y],
                rating: $(".ipl-rating-star__rating", item)
                  .first()
                  .text(),
                episodeNumber: parseInt($("meta", item).attr("content")),
                parent: parent
              });
            });
              console.table(data);
          });
      }
    });
}

getEpisodeData(parent);
