import { useState } from "react";
import styles from "../styles/SkillsBlock.module.css";
import LinkButton from "./link";
import Launch from "@mui/icons-material/Launch";

interface skillInterface {
  Languages: Array<string>;
  "Javascript Libraries": Array<string>;
  DevOps: Array<string>;
  "Game Development": Array<string>;
  Blockchain: Array<string>;
}

export interface SkillCategory {
  title: string;
  skills: Array<string>;
}

const skills: Array<SkillCategory> = [
  {
    title: "Languages",
    skills: [
      "Go",
      "Javascript",
      "Python",
      "HTML/CSS",
      "C++",
      "C#",
      "Solidity",
      "Rust",
      "Java",
    ],
  },
  {
    title: "Javascript Libraries",
    skills: [
      "ReactJS",
      "NextJS",
      "Typescript",
      "Electron",
      "Express",
      "Ganache",
      "Mocha",
      "+ More",
    ],
  },
  {
    title: "DevOps",
    skills: [
      "DigitalOcean",
      "AWS EC2",
      "AWS Lambda",
      "GCS Compute Engine",
      "Firebase",
      "MongoDB",
      "Docker",
      "Kubernetes",
      "Nginx",
    ],
  },
  {
    title: "Game Development",
    skills: ["Unreal Engine C++", "Unreal Blueprints", "Unity C#"],
  },
  {
    title: "Blockchain",
    skills: [
      "Ethereum Smart Contracts (Solidity)",
      "ERC20 Tokens",
      "ERC721 Tokens",
      "web3.js",
      "Solana Programs (Rust)",
      "@solana/web3.js",
    ],
  },
];

interface SkillProps {
  skill: string;
}

const Skill = ({ skill }: SkillProps) => {
  return <div className={styles.skill}>{skill}</div>;
};

interface SkillSectionProps {
  title: string;
  skills: Array<string>;
}

const SkillSection = ({ title, skills }: SkillSectionProps) => {
  return (
    <div>
      <div className={styles.skills_title}>{title}</div>
      <div className={styles.skill_section}>
        {skills.map((skill) => (
          <div key={skill}>
            <Skill skill={skill} />
          </div>
        ))}
      </div>
    </div>
  );
};

export interface SkillsBlockProps {
  projectTitle?: string;
  skillsUsed?: Array<SkillCategory>;
  resetProjectData?: () => void;
  link?: string;
}

const SkillsBlock = ({
  projectTitle,
  skillsUsed,
  resetProjectData,
  link,
}: SkillsBlockProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {projectTitle !== undefined ? (
          link !== undefined ? (
            <span>
              {`Here's what I used for`}{" "}
              <a
                className={styles.project_link}
                href={link}
                target={"_blank"}
                rel="noreferrer"
              >
                {projectTitle + " "}
                <Launch />
              </a>
            </span>
          ) : (
            `Here's what I used for ${projectTitle}`
          )
        ) : (
          `Here's what I'm good at:`
        )}
      </div>
      {projectTitle !== undefined && skillsUsed !== undefined && (
        <div>
          <div
            className={styles.clear_button}
            onClick={(event) => {
              resetProjectData && resetProjectData();
              event.stopPropagation();
            }}
          >
            Clear
          </div>
        </div>
      )}
      <div>
        {(skillsUsed !== undefined ? skillsUsed : skills).map((skillCat) => (
          <div key={skillCat.title}>
            <SkillSection
              title={skillCat.title.toUpperCase()}
              skills={skillCat.skills}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsBlock;
