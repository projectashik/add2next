# Add To Next
Easily integrate different packages (tailwindcss for now) into your next.js with a single command.

# Usage

## Adding TailwindCSS
```bash
npx add-to-next@latest tailwind
```
What this command will do?
- First, it will ask you to choose to install tailwindcss community packages.
- Second, it checks if you using app folder or not.
    - If no, then it will install, tailwindcss, postcss, autoprefixer then it add tailwind.config.js file and the tailwind styles decorators in your `styles/globals.css` file.
    - If yes, then it will install, tailwindcss, postcss, autoprefixer then it add tailwind.config.js file and it will append tailwind styles decorators to a `app/globals.css` file.

> Note: If you are using turbopack, then add --turbo flag to the command.
```bash
npx add-to-next@latest tailwind --turbo
```
