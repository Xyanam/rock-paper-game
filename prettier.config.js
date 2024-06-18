// https://prettier.io/docs/en/options.html
/** @type {import('prettier').RequiredOptions} */
module.exports = {
  trailingComma: "es5",
  bracketSpacing: true,
  bracketSameLine: true,
  tabWidth: 2,
  semi: false,
  singleQuote: false,
  printWidth: 100,
  arrowParens: "always",
  tailwindConfig: "./tailwind.config.ts",
  plugins: ["prettier-plugin-tailwindcss"],
}
