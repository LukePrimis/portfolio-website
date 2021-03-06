import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import NameBlock from "../components/nameBlock";
import ProjectsBlock from "../components/projectsBlock";
import SkillsBlock, { SkillsBlockProps } from "../components/skillsBlock";
import styles from "../styles/Home.module.css";
import useWindowDimensions from "../utils/getWindowDimensions";

const DesktopLayout = () => {
  const [selectedProject, setSelectedProject] = useState<
    SkillsBlockProps | undefined
  >(undefined);

  return (
    <div className={styles.wide}>
      <div className={styles.name_block}>
        <NameBlock />
        <SkillsBlock
          projectTitle={selectedProject?.projectTitle}
          skillsUsed={selectedProject?.skillsUsed}
          resetProjectData={() => setSelectedProject(undefined)}
          link={selectedProject?.link}
        />
      </div>
      <div className={styles.projects_block}>
        <ProjectsBlock setSelectedProject={setSelectedProject} />
      </div>
    </div>
  );
};

const MobileLayout = () => {
  const [selectedProject, setSelectedProject] = useState<
    SkillsBlockProps | undefined
  >(undefined);

  return (
    <div className={styles.thin}>
      <NameBlock />
      <ProjectsBlock setSelectedProject={setSelectedProject} />
      <SkillsBlock
        projectTitle={selectedProject?.projectTitle}
        skillsUsed={selectedProject?.skillsUsed}
        resetProjectData={() => setSelectedProject(undefined)}
        link={selectedProject?.link}
      />
    </div>
  );
};

const Home: NextPage = () => {
  const { height, width } = useWindowDimensions();
  const highWidth = width > 1200;
  return (
    <div className={styles.container}>
      <Head>
        <title>Luke Primis</title>
        <meta name="description" content="Luke Primis' Developer Portfolio" />
        <link rel="icon" href="/rocket_26px.png" />
      </Head>

      <main className={styles.main}>
        {highWidth ? <DesktopLayout /> : <MobileLayout />}
      </main>
    </div>
  );
};

export default Home;
