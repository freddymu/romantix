# What is this?

`base-payload` is PayloadCMS configured with default TailwindCSS. 

Reference: https://tailwindcss.com/docs/guides/nextjs

## How I setup this basecode?

```shell
pnpm create payload-app
pnpm install -D tailwindcss postcss autoprefixer
pnpm dlx tailwindcss init -p
```

edit file `tailwind.config.js`:
```
...
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"]
...
```

```shell
cd ./src/app
mkdir '(my-app)'
cd '(my-app)'
touch globals.css
```

create file `globals.css` with the following content:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Enable `standalone` output to align with the Dockerfile setup. Edit file `next.config.mjs`:
```javascript
...
 output: 'standalone',
...
```
Read more about `standalone` https://nextjs.org/docs/app/api-reference/config/next-config-js/output

Then I use GitHub CLI to create the repository.

```shell
cd ~/base-payload

git init

gh repo create sololeveling-quest/base-payload --public

git remote add origin git@github.com:sololeveling-quest/base-payload.git

git branch -M main

git add .

git commit -am 'init'

git push -u origin main
```

## What If I want to update PayloadCMS to latest version?

```shell
pnpm -g npm-check
npm-check -u
```


## Attributes

- **Database**: mongodb
- **Storage Adapter**: localDisk
