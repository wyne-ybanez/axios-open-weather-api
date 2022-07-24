"use strict";

const logger = require("../utils/logger");
const axios = require("axios");

const dashboard = {
  // index
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "Template 1 Dashboard",
    };
    response.render("dashboard", viewData);
  },

  // add report
  async addreport(request, response) {
    logger.info("rendering new report");

    // contains api results
    let report = {};

    const lat = request.body.lat;
    const lng = request.body.lng;

    const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=a689aa387e68aba199413708fbb2bea9
`;
    const result = await axios.get(requestUrl);

    if (result.status == 200) {
      const reading = result.data.current;
      report.code = reading.weather[0].id;
      report.temperature = reading.temp;
      report.windSpeed = reading.wind_speed;
      report.pressure = reading.pressure;
      report.windDirection = reading.wind_deg;
    }

    console.log(report);

    const viewData = {
      title: "Weather Report",
      reading: report,
    };
    response.render("dashboard", viewData);
  },
};

module.exports = dashboard;
