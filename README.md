# Summary
Global crises lack visibility, limiting individual action and corporate impact in fostering peace and inclusion. We help individuals and corporations partner and donate to vetted nonprofits.

[Dev Post](https://devpost.com/software/relief-map)

## App Screenshots
![img-1](https://github.com/user-attachments/assets/f906d747-091b-4287-b48b-9faaf830a43b)
![img-2](https://github.com/user-attachments/assets/3ca34e4e-f23f-433c-8a6a-d5c22d5ce309)


## Pitch
![1](https://github.com/user-attachments/assets/c1e558a2-bc84-487a-aebd-9a51068fa2c7)
![Relief Map  pdf](https://github.com/user-attachments/assets/68f932f5-0bea-4dc5-a5b5-95201608f6b7)
![3](https://github.com/user-attachments/assets/dededfe6-aa75-4486-968b-5bfe10775d36)
![4](https://github.com/user-attachments/assets/c3391835-6a3c-4802-94c1-9795b800d779)
![5](https://github.com/user-attachments/assets/b7378ed0-9649-4d48-8952-3bc13cfe2e47)
![6](https://github.com/user-attachments/assets/70f4b8e4-6a4d-4a70-b6a2-aaa30b981d4d)
![7](https://github.com/user-attachments/assets/5d1e2cc9-2059-47a7-885d-6baf61b67ff1)
![8](https://github.com/user-attachments/assets/36be5850-6b8f-451a-a8eb-d92ad0631912)
![9](https://github.com/user-attachments/assets/08a0f06d-0d9c-4a36-a6aa-c5d4f63eaae0)
![10](https://github.com/user-attachments/assets/236ed178-d29c-42eb-9c2b-1b9e69ef66e9)
![11](https://github.com/user-attachments/assets/dc80bc69-d9e5-41f9-9474-014794640e29)


# Our Project
We chose the prompt of promoting peace and inclusion in the world. We promote peace by streamlining support for crisis relief efforts and foster inclusivity by amplifying marginalized voices and enabling equal opportunities for individuals and businesses to contribute.

## Inspiration

While interning as an accountant at the Further Education Society, Sajwal Pageni analyzed the financial performance of donations and noticed a clear pattern: corporate matching programs significantly outperformed regular donations, both in total funds raised and donor engagement. Inspired by this insight, Sajwal envisioned ReliefMap, a platform to connect individuals, non-profits, and businesses, making corporate matching accessible and amplifying impact for global crises.

## What it does
We showcase all the crises happening in the world and non-profits that support the crisis. We contact corporations for the possibility of matching the people's donation as part of their Corporate Social Responsibility initiative. Users get to donate money to their crisis / non profit, corporate get to do their CSR part by matching donations and get great marketing and brand recognition, and non profits get more funds at the end.


## How we built it
We use two main APIs to pull active crises and non profit organizations around the world onto an open street map in Next.js. We then used Gemini to map each crises to corresponding non profits, based on specific criteria including themes and location.

## Challenges we ran into
The ReliefWeb data and Global Giving data has different disaster types. We had to come up with a way to match these types to correctly show non-profits that help a disaster. This is what our Gemini integration solves.

## Accomplishments that we're proud of
Learning many new APIs for the first time and integrating them all into one cohesive dataset. Using Gemini to connect this data and finally display it in an aesthetic form-factor on a modern website.
Hosting the website with API caching to improve UX, and doing all this in under 24 hours.

## What we learned
We learned how to properly communicate and collaborate as a team to successfully take an idea from 0 to 1 while learning new technical skills such as SSR, Gemini & LLMs and mapping different ideas together onto our NextJS app


## What's next for ReliefMap
- Building non profit platform so all the communications and transactions can happen within the platform.
- Advanced filters for individuals and corporations to exactly find the crisis / non profit they want to submit
- Transparency reports in terms of donation matchings


# Next.js Docs
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
