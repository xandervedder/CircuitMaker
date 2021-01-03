/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: "/",
    src: "/dist",
  },
  plugins: [["@snowpack/plugin-webpack"], ["@snowpack/plugin-optimize"]],
};
