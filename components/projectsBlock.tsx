import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import styles from "../styles/ProjectsBlock.module.css";
import { BackButton, ForwardButton } from "./button";
import { SkillCategory, SkillsBlockProps } from "./skillsBlock";
import projectData from "./projectData";
import useWindowDimensions from "../utils/getWindowDimensions";

export interface Project {
  title: string;
  description: string;
  image: string;
  skills: Array<SkillCategory>;
  link?: string;
}

interface ProjectCardProps {
  wideMode: boolean;
  title: string;
  description: string;
  image: string;
  changing: boolean;
  onClick: () => void;
}

const ProjectCard = ({
  wideMode,
  title,
  description,
  image,
  changing,
  onClick,
}: ProjectCardProps) => {
  return (
    <div
      className={`${styles.project_card} ${wideMode ? styles.wide : ""} ${
        changing ? styles.changing : ""
      }`}
      onClick={(event) => {
        onClick();
        event.stopPropagation();
      }}
    >
      <div className={styles.image_container}>
        <img src={image} className={styles.card_image} />
      </div>
      <div className={styles.text_section}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
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
  const [fadeTimeout, setFadeTimeout] = useState<NodeJS.Timeout>(
    setTimeout(() => {}, 1) // set this to some pointless timeout so typing is fine
  );

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
          clearTimeout(fadeTimeout);
          setChanging(true);
          const changingTimeout = setTimeout(() => {
            setChanging(false);
          }, 250);
          setTimeout(() => {
            setPage(page > 0 ? page - 1 : projectData.length / 4 - 1);
          }, 100);
          setFadeTimeout(changingTimeout);
          event.stopPropagation();
        }}
      >
        <BackButton />
      </div>
      <div className={styles.project_block}>
        {page < 4 && (
          <div className={styles.card_container}>
            <ProjectCard
              title={projectData[page * 4].title}
              description={projectData[page * 4].description}
              image={projectData[page * 4].image}
              wideMode={true}
              changing={changing}
              onClick={() => {
                setSelectedProject({
                  projectTitle: projectData[page * 4].title,
                  skillsUsed: projectData[page * 4].skills,
                  link: projectData[page * 4].link,
                });
              }}
            />
            <ProjectCard
              title={projectData[page * 4 + 1].title}
              description={projectData[page * 4 + 1].description}
              image={projectData[page * 4 + 1].image}
              wideMode={true}
              changing={changing}
              onClick={() => {
                setSelectedProject({
                  projectTitle: projectData[page * 4 + 1].title,
                  skillsUsed: projectData[page * 4 + 1].skills,
                  link: projectData[page * 4 + 1].link,
                });
              }}
            />
          </div>
        )}
        {page < 4 && (
          <div className={styles.card_container}>
            <ProjectCard
              title={projectData[page * 4 + 2].title}
              description={projectData[page * 4 + 2].description}
              image={projectData[page * 4 + 2].image}
              wideMode={true}
              changing={changing}
              onClick={() => {
                setSelectedProject({
                  projectTitle: projectData[page * 4 + 2].title,
                  skillsUsed: projectData[page * 4 + 2].skills,
                  link: projectData[page * 4 + 2].link,
                });
              }}
            />
            <ProjectCard
              title={projectData[page * 4 + 3].title}
              description={projectData[page * 4 + 3].description}
              image={projectData[page * 4 + 3].image}
              wideMode={true}
              changing={changing}
              onClick={() => {
                setSelectedProject({
                  projectTitle: projectData[page * 4 + 3].title,
                  skillsUsed: projectData[page * 4 + 3].skills,
                  link: projectData[page * 4 + 3].link,
                });
              }}
            />
          </div>
        )}
      </div>
      <div
        className={styles.button_container}
        onClick={(event) => {
          clearTimeout(fadeTimeout);
          setChanging(true);
          const changingTimeout = setTimeout(() => {
            setChanging(false);
          }, 250);
          setTimeout(() => {
            setPage(page < projectData.length / 4 - 1 ? page + 1 : 0);
          }, 100);
          setFadeTimeout(changingTimeout);
          event.stopPropagation();
        }}
      >
        <ForwardButton />
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <div
        className={styles.button_container}
        onClick={(event) => {
          clearTimeout(fadeTimeout);
          setChanging(true);
          const changingTimeout = setTimeout(() => {
            setChanging(false);
          }, 250);
          setTimeout(() => {
            setPage(page > 0 ? page - 1 : projectData.length - 1);
          }, 100);
          setFadeTimeout(changingTimeout);
          event.stopPropagation();
        }}
      >
        <BackButton />
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
        />
      </div>
      <div
        className={styles.button_container}
        onClick={(event) => {
          clearTimeout(fadeTimeout);
          setChanging(true);
          const changingTimeout = setTimeout(() => {
            setChanging(false);
          }, 250);
          setTimeout(() => {
            setPage(page < projectData.length - 1 ? page + 1 : 0);
          }, 100);
          setFadeTimeout(changingTimeout);
          event.stopPropagation();
        }}
      >
        <ForwardButton />
      </div>
    </div>
  );
};

export default ProjectsBlock;
