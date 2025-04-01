module.exports = {
    resolve: {
      fallback: {
        crypto: false,
        stream: false,
      },
    },
    ignoreWarnings: [/Failed to parse source map/],
  };
  