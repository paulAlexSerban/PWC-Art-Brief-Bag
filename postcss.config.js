module.exports = {
  plugins: [
    [
     "postcss-preset-env",
      {
        postcssOptions: {
          parser: "postcss-js",
        },
      },
    ],
  ],
};