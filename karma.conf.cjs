module.exports = function(config) {
  const configuration = {
    basePath: ".",
    frameworks: ["mocha", "chai", "detectBrowsers"],

    files: [
      {
        pattern: "tests/**/*.js",
        type: "module"
      },
      {
        pattern: "src/**/*.js",
        included: false
      }
    ],
    reporters: ["progress"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    // logLevel: config.LOG_DEBUG,
    autoWatch: true,
    singleRun: true,
    concurrency: Infinity,
    detectBrowsers: {
      enabled: true,
      usePhantomJS: false,
      preferHeadless: true,
      postDetection: availableBrowsers => {
        if (process.env.INSIDE_DOCKER) {
          return ["DockerChrome"];
        } else if (process.env.CHROME_ONLY) {
          return ["ChromeHeadless"];
        } else {
          return availableBrowsers.filter(
            browser => browser !== "SafariTechPreview"
          );
        }
      }
    },
    customLaunchers: {
      DockerChrome: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"]
      }
    }
  };

  config.set(configuration);
};
