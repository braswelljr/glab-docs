const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const withImages = require("next-images");
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: "public",
          runtimeCaching
        }
      }
    ],
    [withImages]
  ],
  {
    future: {
      webpack5: true
    }
  }
);
