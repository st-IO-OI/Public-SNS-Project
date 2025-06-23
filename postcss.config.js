// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // ← 旧 `tailwindcss: {}` から修正
    autoprefixer: {},
  },
};
