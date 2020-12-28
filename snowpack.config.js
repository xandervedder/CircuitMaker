/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: "/",
    src: "/_dist_",
  },
  experiments: {
    optimize: {
      bundle: true,
      minify: true,
      target: "es2020",
    }
  }
  // plugins: [],
  // installOptions: {},
  // devOptions: {},
  // buildOptions: {
  //   "minify": true,
  // },
};
