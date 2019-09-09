import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";
import ReactAutocomplete from "react-autocomplete";
import DeviceOrientation, { Orientation } from "react-screen-orientation";
import {TMDB_KEY} from './env'
var _ = require("lodash");

export class Module extends Component {
  displayName = Module.name;

  constructor(props) {
    super(props);
    this.state = {
      episodes: [],
      external: [],
      search: [],
      loading: true,
      value: "",
      test: [{ label: "loading..." }],
      key: "",
      backgroundPath: "",
      imdbID: "",
      imdbNotFound: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderSearch = this.renderSearch.bind(this);
    this.dothis = this.dothis.bind(this);
  }

  static renderText(external) {
    if (external !== null || []) {
      if (external.tv_results[0]) {
        let bodyText = external.tv_results[0].overview;
        let originCountry = external.tv_results[0].origin_country[0];
        let originalLanguage = external.tv_results[0].original_language;
        let voteAverage = external.tv_results[0].vote_average;
        let firstAirDate = external.tv_results[0].first_air_date;
        //let imdbId = this.state.imdbID
        return (
          <>
            <p className="subtitle is-5">
              <b>Air Date: </b>
              {firstAirDate}
            </p>
            <p className="subtitle is-5">
              <b>Origin: </b>
              {originCountry}
            </p>
            <p className="subtitle is-5">
              <b>Language: </b>
              {originalLanguage}
            </p>
            <p className="subtitle is-5">
              <b>Average Votes: </b>
              {voteAverage}
            </p>
            <p className="subtitle is-5">
              <b>Synopse: </b>
              {bodyText}
            </p>
          </>
        );
      }
    }
  }

  renderSearch() {
    fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_KEY}&language=en-US&query=${
      this.state.value
      }&page=1`
    )
      .then(response => response.json())
      .then(data => {
        let arr = this.state.search;
        let newArr = [];
        for (var i in arr.results) {
          newArr.push({ label: arr.results[i].name, id: arr.results[i].id });
        }
        this.setState({ test: _.flatten(newArr) });
        this.setState({ search: data });
        console.log(this.state.search, this.state.test);
      });
  }

  static renderPageTitle(external) {
    if (external !== null || []) {
      if (external.tv_results[0]) {
        let pageTitle = external.tv_results[0].original_name;

        return (
          <>
            <h1 className="subtitle is-4">{pageTitle}</h1>
          </>
        );
      }
    }
  }

  static renderPoster(external) {
    if (external !== null || []) {
      if (external.tv_results[0]) {
        let posterPath = external.tv_results[0].poster_path;
        return (
          <>
            <img
              src={`https://image.tmdb.org/t/p/w300${posterPath}`}
              alt="..."
              style={{ border: "5px solid #4a4a4a" }}
            />
          </>
        );
      }
      else {
        return (
          <>
            <h2 className="subtitle">No Poster :(</h2>
          </>
        );
      }
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value, loading: true, imdbNotFound: true });
  }

  dothis(event) {
    this.setState({ value: event.target.value, loading: true, imdbNotFound: true });
    this.renderSearch();
    console.log(this.state.key);
  }

  handleSubmit(event) {
    event.preventDefault();

    const request = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_KEY}&language=en-US&query=${
        this.state.value
        }&page=1`
      );
      const json = await response.json();
      console.log(json.results[0].id);
      const tvID = json.results[0].id;
      if (tvID) {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${tvID}/external_ids?api_key=${TMDB_KEY}&language=en-US`
        );
        const json = await response.json();
        console.log(json.imdb_id);
        const imdbID = json.imdb_id;
        this.setState({
          imdbID: json.imdb_id,
          imdbNotFound: false
        })
        console.log(imdbID);
        fetch(
          `https://eppy-aa7fb.firebaseio.com/episode/episodeList.json?orderBy=%22parentTconst%22&equalTo=%22${imdbID}%22`
        )
          .then(response => response.json())
          .then(data => {
            this.setState({ episodes: data, loading: false, imdbNotFound: false });
            console.log(data);
          })
          .then(
            fetch(
              `https://api.themoviedb.org/3/find/${imdbID}?api_key=${TMDB_KEY}&language=en-US&external_source=imdb_id`
            )
              .then(response => response.json())
              .then(data => {
                this.setState({ external: data });
                console.log(data);
              })
          );
      }
    };

    request();
  }

  static testClass(episodes) {
    let arr = [];

    for (var key in episodes) {
      if (episodes.hasOwnProperty(key)) {
        arr.push(episodes[key]);
      }
    }
    for (var i in arr) {
      arr[i].seasonNumber = parseInt(arr[i].seasonNumber);
      arr[i].episodeNumber = parseInt(arr[i].episodeNumber);
      arr[i].averageRating = parseFloat(arr[i].averageRating);
      console.log(arr[i]);
    }
    console.log(_.sortBy(arr, ["seasonNumber", "episodeNumber"]));

    let graphGroups = _.groupBy(
      _.sortBy(arr, ["seasonNumber", "episodeNumber"]),
      "seasonNumber"
    );

    //reformat response object to array
    var result = Object.keys(graphGroups).map(function (key) {
      return [graphGroups[key]];
    });

    //reformat array -- this is the entire response
    var flatten = _.flatten(result);
    console.table(flatten);
    console.log("flatten");
    //map response to new array only including the average rating
    let flattenArr = flatten.map(function (sub) {
      return sub.map(ep => ep.averageRating);
    });

    let flattenEp = flatten.map(function (sub) {
      return sub.map(ep => ep.primaryTitle);
    });
    console.table(flattenEp);
    console.log("flattenEp");
    //find largest amount of episodes
    let largest = 0;

    for (var i = 0; i < flatten.length; i++) {
      if (_.size(flatten[i]) > largest) {
        largest = _.size(flatten[i]);
      }
    }

    //create the labels for the graph
    var dynLabels = [];
    for (var i = 1; i <= largest; i++) {
      dynLabels.push(`Episode ${i}`);
    }

    //create the datasets for the graph
    var dataSetsTest = [];
    for (var i = 0; i < flattenArr.length; i++) {
      dataSetsTest.push({
        label: `Season ${i + 1}`,
        data: flattenArr[i],
        fill: false,
        backgroundColor:
          "#" +
          Math.random()
            .toString(16)
            .slice(2, 8)
      });
    }

    console.table(dataSetsTest);
    //data object for the graph labels/datasets
    const data = {
      labels: dynLabels,
      datasets: dataSetsTest
    };

    let optionsBar = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            display: true,
            ticks: {
              suggestedMin: 0, // minimum will be 0, unless there is a lower value.
              // OR //
              beginAtZero: true // minimum value will be 0.
            }
          }
        ],
        yAxes: [
          {
            display: true,
            ticks: {
              suggestedMin: 0, // minimum will be 0, unless there is a lower value.
              // OR //
              beginAtZero: true // minimum value will be 0.
            }
          }
        ]
      },
      legend: {
        display: false,
        position: "left",
        fullWidth: true
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            var dataset = data.datasets[tooltipItem.datasetIndex];
            var index = tooltipItem.index;
            return `${dataset.label} ${dataset.data[index]} ${
              flattenEp[tooltipItem.datasetIndex][index]
              }`;
          }
        }
      }
    };

    //render the graph
    return (
      <>
        <div className="columns">
          <div className="column is-full">
            <div className="wrapper">
              <Bar data={data} options={optionsBar} />
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-full">
            <div className="wrapper">
              <Line data={data} options={optionsBar} />
            </div>
          </div>
        </div>
      </>
    );
  }

  render() {
    
    let contents = this.state.loading ? (
      <p>
        <em />
      </p>
    ) : (
        Module.testClass(this.state.episodes)
      );

    let poster = this.state.loading ? (
      <p>
        <em />
      </p>
    ) : (
        Module.renderPoster(this.state.external)
      );

    let text = this.state.loading ? (
      <p>
        <em />
      </p>
    ) : (
        Module.renderText(this.state.external)
      );

    let title = this.state.loading ? (
      <p>
        <em />
      </p>
    ) : (
        Module.renderPageTitle(this.state.external)
      );

    return (
      <div>
        <div>
          <h1 className="title has-text-grey-dark">eppy.io</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="columns">
              <div className="column is-one-third">
                <ReactAutocomplete
                  items={this.state.test}
                  shouldItemRender={(item, value) =>
                    item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
                  }
                  getItemValue={item => item.label}
                  renderItem={(item, highlighted) => (
                    <div
                      key={item.id}
                      style={{
                        backgroundColor: highlighted ? "#eee" : "transparent"
                      }}
                    >
                      {item.label}
                    </div>
                  )}
                  inputProps={{
                    class: "form-control",
                    placeholder: "Try me out"
                  }}
                  value={this.state.value}
                  onChange={this.dothis}
                  onSelect={value => this.setState({ value })}
                  wrapperStyle={{}}
                />
              </div>
              <div className="column">
                <input
                  type="submit"
                  value="Submit"
                  className="button is-outlined is-primary"
                />
              </div>
            </div>
          </form>
          {this.state.loading ? (
            <div className="columns">
              <div className="column">
                <h2 className="subtitle">
                  Enter a TV show and click Submit to see the ratings.
                </h2>
              </div>
            </div>
          ) : (
              <>
                <div className="columns">
                  <div className="column is-narrow">{poster}</div>
                  <div className="column is-6">{text}</div>
                  <div className="column">
                    <a href={`https://www.imdb.com/title/${this.state.imdbID}`} className="subtitle">Link to IMDb</a>
                  </div>
                </div>
                <h2 className="subtitle">
                  <b>Series Trends</b>
                </h2>
                <DeviceOrientation lockOrientation={"landscape"}>
                  {/* Will only be in DOM in landscape */}
                  <Orientation orientation="landscape" alwaysRender={false}>
                    <div
                      className="box"
                      style={{ marginBottom: "30px", marginTop: "30px" }}
                    >
                      {contents}
                    </div>
                  </Orientation>
                  {/* Will stay in DOM, but is only visible in portrait */}
                  <Orientation orientation="portrait" alwaysRender={false}>
                    <h2 className="subtitle">
                      If viewing on mobile please rotate your device.{" "}
                      <span role="img">😃</span>
                    </h2>
                  </Orientation>
                </DeviceOrientation>
              </>
            )}
        </div>
      </div>
    );
  }
}
