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
  onLoadingComplete: () => void;
  onAnimationEnd: () => void;
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
  onLoadingComplete,
  onAnimationEnd,
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
      onTransitionEnd={onAnimationEnd}
    >
      <div className={styles.image_container}>
        <Image
          layout={"fill"}
          placeholder={"blur"}
          src={image}
          className={styles.card_image}
          priority={true}
          // Note: onLoadingComplete event is firing way more than once
          // idk why but hence the extra handling in the prop function i pass in
          // also had to do opacity: 1% instead of 0 in the css to trick next.js
          // into loading my images in, makes it look way smoother
          onLoadingComplete={onLoadingComplete}
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
}

const ProjectSection = ({
  projects,
  changing,
  clickable,
  hidden,
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
            onClick={() => {}}
            onLoadingComplete={() => {}}
            onAnimationEnd={() => {}}
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
            onClick={() => {}}
            onLoadingComplete={() => {}}
            onAnimationEnd={() => {}}
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
  const [imagesFaded, setImagesFaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [changeDirection, setChangeDirection] = useState(direction.back);
  const [clickable, setClickable] = useState(true);

  const onCardImageLoaded = () => {
    if (imagesFaded) {
      if (imagesLoaded < 3) {
        setImagesLoaded(imagesLoaded + 1);
      } else {
        setImagesLoaded(0);
        setChanging(false);
        setImagesFaded(false);
      }
    }
  };

  const onCardTransitionEnd = () => {
    if (changing) {
      switch (changeDirection) {
        case direction.forward:
          setPage(page < projectData.length / 4 - 1 ? page + 1 : 0);
          break;
        case direction.back:
          setPage(page > 0 ? page - 1 : projectData.length / 4 - 1);
          break;
        default:
          setPage(page > 0 ? page - 1 : projectData.length / 4 - 1);
          break;
      }
      setImagesFaded(true);
    } else if (!clickable) {
      setClickable(true);
    }
  };

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
          // if (!changing) {
          //   setChangeDirection(direction.back);
          //   setChanging(true);
          //   setClickable(false);
          //   event.stopPropagation();
          // }
          setPage(page - 1);
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
          key={i}
        />
      ))}

      <div
        className={styles.button_container}
        onClick={(event) => {
          // if (!changing) {
          //   setChangeDirection(direction.forward);
          //   setClickable(false);
          //   setChanging(true);
          //   event.stopPropagation();
          // }
          setPage(page + 1);
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
