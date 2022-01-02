# My Portfolio Site

This website is a small React app I made as my portfolio. It was coded very quickly, and a lot of the components are not really intended for reusability so excuse some of the hastily written code. I only used MUI for icons, every other component I coded from scratch (project cards, swiping mobile functionality, etc.). If I get some time in the future I'll clean this code up as well as make some of the code for swiping and the project gallery more abstract so I can reuse some of these components!

Also, I did a lot of conditional styling based of width and height in the code, which is not the best as I could have been using media queries in CSS (I did use some). Again, if I have time in the future I'll clean up the stylesheets and get rid of some of the screen size logic in the code in favor of CSS media queries.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
