import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "../styles/ProjectsBlock.module.css";
import { BackButton, ForwardButton } from "./button";
import { SkillCategory, SkillsBlockProps } from "./skillsBlock";
import projectData from "./projectData";
import useWindowDimensions from "../utils/getWindowDimensions";
import Image from "next/image";

export interface Project {
  title: string;
  description: string;
  image: StaticImageData;
  skills: Array<SkillCategory>;
  link?: string;
}

interface ProjectCardProps {
  wideMode: boolean;
  title: string;
  description: string;
  image: StaticImageData;
  changing: boolean;
  onClick: () => void;
  clickable: boolean;
}

enum direction {
  back,
  forward,
}

const ProjectCard = ({
  wideMode,
  title,
  description,
  image,
  changing,
  onClick,
  clickable,
}: ProjectCardProps) => {
  return (
    <div
      className={`${styles.project_card} ${wideMode ? styles.wide : ""} ${
        changing ? styles.changing : ""
      } ${clickable ? styles.clickable : ""}`}
      onClick={(event) => {
        onClick();
        event.stopPropagation();
      }}
    >
      <div className={styles.image_container}>
        <Image
          layout={"fill"}
          placeholder={"blur"}
          src={image}
          className={styles.card_image}
          priority={true}
        />
      </div>
      <div className={styles.text_section}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};

interface ProjectSectionProps {
  projects: Array<Project>;
  changing: boolean;
  clickable: boolean;
  hidden: boolean;
  setSelectedProject: Dispatch<SetStateAction<SkillsBlockProps | undefined>>;
}

const ProjectSection = ({
  projects,
  changing,
  clickable,
  hidden,
  setSelectedProject,
}: ProjectSectionProps) => {
  if (projects.length !== 4) {
    throw "ProjectSection needs to take exactly 4 projects as input";
  }
  return (
    <div className={`${styles.project_block} ${hidden ? styles.hidden : ""}`}>
      <div className={styles.project_row}>
        {projects.slice(0, 2).map((proj) => (
          <ProjectCard
            wideMode={false}
            title={proj.title}
            description={proj.description}
            image={proj.image}
            changing={changing}
            onClick={() => {
              setSelectedProject({
                projectTitle: proj.title,
                skillsUsed: proj.skills,
                link: proj.link,
              });
            }}
            clickable={clickable}
            key={proj.title}
          />
        ))}
      </div>
      <div className={styles.project_row}>
        {projects.slice(2, 4).map((proj) => (
          <ProjectCard
            wideMode={false}
            title={proj.title}
            description={proj.description}
            image={proj.image}
            changing={changing}
            onClick={() => {
              setSelectedProject({
                projectTitle: proj.title,
                skillsUsed: proj.skills,
                link: proj.link,
              });
            }}
            clickable={clickable}
            key={proj.title}
          />
        ))}
      </div>
    </div>
  );
};

interface ProjectsBlockProps {
  setSelectedProject: Dispatch<SetStateAction<SkillsBlockProps | undefined>>;
}

const ProjectsBlock = ({ setSelectedProject }: ProjectsBlockProps) => {
  const { height, width } = useWindowDimensions();
  const [page, setPage] = useState(0);
  const [changing, setChanging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [fadeTimeout, setFadeTimeout] = useState<NodeJS.Timeout>(
    setTimeout(() => {}, 1) // set this to some pointless timeout so typing is fine
  );
  const [clickable, setClickable] = useState(true);

  //not sure if i like this solution, it works but i might try to rework this lataer
  useEffect(() => {
    const handleResize = () => {
      const { innerWidth: newWidth } = window;
      if (newWidth > 850 && page > 3) {
        setPage(0);
      }
    };
    window.addEventListener("resize", handleResize);
  });

  return width > 850 ? (
    <div className={styles.container}>
      <div
        className={styles.button_container}
        onClick={(event) => {
          if (!changing) {
            setChanging(true);
            // the timeouts here are not the most elegant solution, but the transitionEnd
            // was giving me a ton of issues with firing multiple times. so i went back to this
            setTimeout(() => {
              setPage(page > 0 ? page - 1 : projectData.length / 4 - 1);
              setChanging(false);
            }, 200);
            setClickable(false);
            setTimeout(() => {
              setClickable(true);
            }, 350);
            event.stopPropagation();
          }
        }}
      >
        <BackButton />
      </div>
      {Array.from({ length: projectData.length / 4 }, (x, i) => i).map((i) => (
        <ProjectSection
          projects={projectData.slice(4 * i, 4 * (i + 1))}
          changing={changing}
          clickable={clickable}
          hidden={i !== page}
          setSelectedProject={setSelectedProject}
          key={i}
        />
      ))}

      <div
        className={styles.button_container}
        onClick={(event) => {
          if (!changing) {
            setChanging(true);
            setTimeout(() => {
              setPage(page < projectData.length / 4 - 1 ? page + 1 : 0);
              setChanging(false);
            }, 200);
            setClickable(false);
            setTimeout(() => {
              setClickable(true);
            }, 350);
            event.stopPropagation();
          }
        }}
      >
        <ForwardButton />
      </div>
    </div>
  ) : (
    <div
      className={styles.container}
      onTouchStart={(event) => {
        setStartX(event.touches[0].clientX);
        setStartY(event.touches[0].clientY);
      }}
      onTouchMove={(event) => {
        setCurrentX(event.touches[0].clientX);
        setCurrentY(event.touches[0].clientY);
      }}
      onTouchEnd={(event) => {
        if (currentX !== 0 && Math.abs(currentY - startY) < 50) {
          if (currentX - startX < -150 && currentX !== 0) {
            clearTimeout(fadeTimeout);
            setChanging(true);
            const changingTimeout = setTimeout(() => {
              setChanging(false);
            }, 250);
            setTimeout(() => {
              setPage(page < projectData.length - 1 ? page + 1 : 0);
            }, 100);
            setFadeTimeout(changingTimeout);
          } else if (currentX - startX > 150 && currentX !== 0) {
            clearTimeout(fadeTimeout);
            setChanging(true);
            const changingTimeout = setTimeout(() => {
              setChanging(false);
            }, 250);
            setTimeout(() => {
              setPage(page > 0 ? page - 1 : projectData.length - 1);
            }, 100);
            setFadeTimeout(changingTimeout);
          }
        }

        setStartX(0);
        setCurrentX(0);
        setStartY(0);
        setCurrentY(0);
      }}
    >
      <div style={{ marginTop: "1rem" }}>
        Swipe through some of my projects!
      </div>
      <div className={styles.project_block}>
        <ProjectCard
          title={projectData[page].title}
          description={projectData[page].description}
          image={projectData[page].image}
          wideMode={true}
          changing={changing}
          onClick={() => {
            setSelectedProject({
              projectTitle: projectData[page].title,
              skillsUsed: projectData[page].skills,
              link: projectData[page].link,
            });
          }}
          onAnimationEnd={onCardTransitionEnd}
          onLoadingComplete={onCardImageLoaded}
          clickable={clickable}
        />
      </div>
    </div>
  );
};

export default ProjectsBlock;
