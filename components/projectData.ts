import { Project } from "./projectsBlock";
import Image from "next/image";

import akariGraphic from "../public/akari_graphic.jpeg";
import brunoventure from "../public/brunoventures.png";
import dlFinalPoster from "../public/dl_final_poster.jpg";
import andrewsBot from "../public/andrews bot.png";
import mediumArticle from "../public/medium_article.png";
import hackerPlaceholder from "../public/hacker_placeholder.jpg";
import cybersecurityStockImage from "../public/cybersecurity_stock_image.jpg";
import remixPlaceholderImg from "../public/remix_placeholder_img.png";
import blockchainStockImg from "../public/blockchain_stock_img.png";
import metamaskGraphic from "../public/metamask_graphic.png";
import solanaStockImage from "../public/solana_stock_image.jpg";
import ethStockImage from "../public/eth_stock_image.jpeg";

const projectData: Array<Project> = [
  {
    title: "Akari Automation",
    description:
      "Akari is a retail checkout-automation bot. The frontend is an Electron desktop application with React. The backend of the bot is a Go binary that checks out desired items. It's code is under NDA, but its success speaks for itself on Twitter!",
    image: akariGraphic,
    skills: [
      {
        title: "Tech Stack",
        skills: ["Go", "ReactJS", "NodeJS", "Electron", "GRPC"],
      },
      {
        title: "Websites Supported",
        skills: [
          "Amazon",
          "Target",
          "Walmart",
          "Best Buy",
          "Corsair",
          "Microsoft",
        ],
      },
      {
        title: "Skills Used",
        skills: [
          "Reverse Engineering",
          "REST API Development",
          "Frontend Development",
          "Application Security",
          "TLS",
          "HTTP Requests",
        ],
      },
    ],
    link: "https://twitter.com/AkariAutomation",
  },
  {
    title: "Bruno Ventures",
    description:
      "Bruno Ventures is website in NextJS with a Firebase backend. I worked on Bruno Ventures for the Brown Entrepeneurship Program. Bruno Ventures helps VC firms, angel investors, and the Brown community to view current student startups.",
    image: brunoventure,
    skills: [
      {
        title: "Tech Stack",
        skills: ["NextJS", "ReactJS", "Google Firebase"],
      },
      {
        title: "Skills Used",
        skills: [
          "Frontend Development",
          "Serverless Functions",
          "Figma Design",
          "Databases",
        ],
      },
    ],
    link: "https://github.com/tech-at-ep/bruno-ventures",
  },
  {
    title: "GCN for RL",
    description:
      "For a Deep Learning research project, I worked with a friend on a Tensorflow RL model that leverages graph convolution to facilitate message passing for multi-agent environments. We are currently modifying some training procedures and are going to retrain the model.",
    image: dlFinalPoster,
    skills: [
      {
        title: "Tech Stack",
        skills: ["Python", "Tensorflow", "NumPy", "PettingZoo"],
      },
      {
        title: "Skills Used",
        skills: [
          "Reinforcement Learning",
          "Neural Networks",
          "Deep Learning",
          "RL Environment APIs",
        ],
      },
    ],
    link: "https://github.com/avitrost/graph-convolutional-reinforcement-learning",
  },
  {
    title: "Andrews Monitor",
    description:
      "Due to Covid protocols last year, Brown's Andrews dining halls was only available through limited online orders. I reverse engineered DUO's login protocol and wrote a scraper to monitor when Andrews was available to order, then notify me via Discord and SMS.",
    image: andrewsBot,
    skills: [
      {
        title: "Tech Stack",
        skills: ["Go", "Discord Webhooks"],
      },
      {
        title: "Skills Used",
        skills: ["HTTP Requests", "Reverse Engineering", "Web Scraping"],
      },
    ],
    link: "https://github.com/LukePrimis/andrews-monitor",
  },
  {
    title: "Footlocker Bypass",
    description:
      "Before working on Akari, which focuses on collectible and tech items, I worked on a shoe bot. While that code is unable to be shared, I recently published a Medium article outlining how I found one method to bypass the queue on Footlocker.com to purchase sneaker releases.",
    image: mediumArticle,
    skills: [
      {
        title: "Skills Used",
        skills: ["Reverse Engineering", "PenTesting", "HTTP Requests"],
      },
    ],
    link: "https://medium.com/@tencentdimes/the-first-queue-bypass-method-i-found-for-footlocker-com-a8bfd61e11cc",
  },
  {
    title: "Binary Exploitation",
    description:
      "For my binary security class, I learned several exploitation techniques through our CTF assignments. We used buffer overflows to launch our self-written shellcode injection attacks. We also did code reuse, inlcuding Ret2LibC and JIT-ROP to bypass ASLR and non-executable memory.",
    image: hackerPlaceholder,
    skills: [
      { title: "Languages", skills: ["C", "Assembly (Shellcode)"] },
      {
        title: "Skills Used",
        skills: [
          "GDB",
          "ROP",
          "JIT-ROP",
          "Ret2LibC",
          "Buffer Overflow Attacks",
          "Shellcoding",
          "Code Injection",
          "Code Reuse",
        ],
      },
    ],
  },
  {
    title: "In-Memory Execution",
    description:
      "A lot of people try to crack the bots I've worked on in order to steal our code or publish pirated copies. I developed a method to authenticate a user, load the program from our secure server over network, then execute it in memory to prevent reverse-engineering and tampering.",
    image: cybersecurityStockImage,
    skills: [
      { title: "Languages", skills: ["Go"] },
      {
        title: "Skills Used",
        skills: [
          "Go C API",
          "Lazy DLL Loading",
          "Application Security",
          "Shellcode Generation",
        ],
      },
    ],
  },
  {
    title: "Redwood",
    description:
      "Redwood is a decentralized exchange I had to develop for my blockchains class. It supports ERC-20 standard tokens on the Ethereum blockchain. Redwood uses an orderbook to match orders, and supports the addition of new token pairs with the creation of the according liquidity pools.",
    image: remixPlaceholderImg,
    skills: [
      { title: "Languages", skills: ["Solidity, NodeJS"] },
      {
        title: "Skills Used",
        skills: [
          "Ganache Test Chain Development",
          "Smart Contracts",
          "Mocha Testing",
          "Decentralized Finance",
          "ERC-20 Development",
        ],
      },
    ],
    link: "https://github.com/LukePrimis/redwood",
  },
  {
    title: "RathDB",
    description:
      "RathDB is a scalable blockchain program based on the Bitcoin blockchain protocol. It is written in C++ as an excercise in understanding the Bitcion ledger, transactions, and blocks. It uses Protobufs to serialize older data for long-term storage to make it scale as the chain grows.",
    image: blockchainStockImg,
    skills: [
      { title: "Language", skills: ["C++"] },
      {
        title: "Skills Used",
        skills: ["Blockchains", "GoogleTest", "Protobufs"],
      },
    ],
  },
  {
    title: "Web3 Desktop Login",
    description:
      "This is an implementation of how to use Metamask to sign in to to a desktop application (i.e. Electron, .NET, etc.) using Websockets. Since Metamask is a Chrome extension, it is unable to interact with desktop apps by default. This method is great for connecting your app to Web3!",
    image: metamaskGraphic,
    skills: [
      { title: "Tech Stack", skills: ["ReactJS", "NodeJS", "Websockets"] },
      {
        title: "Skills Used",
        skills: ["Web3 Development", "Metamask Integration"],
      },
    ],
  },
  {
    title: "Secret Solana Project",
    description:
      "I am currently working on a very exciting, on-chain program for the Solana blockchain in Rust. I can't reveal too much about it right now, but make sure to follow my Twitter that will be the first place to know once it's ready.",
    image: solanaStockImage,
    skills: [
      { title: "Tech Stack", skills: ["ReactJS", "Rust", "Solana Blockchain"] },
      {
        title: "Skills Being Used",
        skills: [
          "Rust Development",
          "Frontend Development",
          "Solana Program Development",
        ],
      },
    ],
  },
  {
    title: "Freeport",
    description:
      "Freeport is another blockchain-based metaverse project I am working on for the Ethereum blockchain. It's currently in progress, so I can't share too much, but this project will be a game-changer so keep an eye on my Twitter!",
    image: ethStockImage,
    skills: [
      {
        title: "Tech Stack",
        skills: [
          "Unreal Engine",
          "C++",
          "Electron",
          "NodeJS",
          "ReactJS",
          "Go",
          "MongoDB",
          "Kubernetes",
        ],
      },
      {
        title: "Skills Being Used",
        skills: [
          "Blockchain Development",
          "ERC 721 Development",
          "Database Management",
          "Frontend Development",
          "Game Development",
          "REST APIs",
          "DevOps",
        ],
      },
    ],
  },
];

export default projectData;
