## Step One

```
npm create vite@latest app --template vanilla
```

## Step Two

```
npm install tailwindcss postcss autoprefixer daisyui
```

## Step Three

```
npx tailwindcss init -p
```

## Step Four (ONLY ADD DAISYUI info if needed!)

Open tailwind.config.js and add the paths to your HTML files and enable DaisyUI:

```JavaScript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./main.js", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};

```

## Step Five

Open Your CSS file and add

```CSS
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Done now test it!

```HTML
 <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold text-center mb-4">Hello Vite!</h1>
        <button class="btn btn-primary">Click Me</button>
    </div>
```
