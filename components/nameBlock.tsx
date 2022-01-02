import { GitHub, LinkedIn, Mail, Twitter } from "@mui/icons-material";
import { useEffect, useState } from "react";
import styles from "../styles/NameBlock.module.css";

const blurbs = [
  "Aspiring Space Cowboy",
  "GoLang Enthusiast",
  "Kanto Pokemon Champion",
  "GRPC Fanboy",
  "Coruscant Jedi Temple Alumnus",
  "Tinkerer",
  "Jarl of Whiterun",
  "Always Learning",
];

const ContactCard = () => {
  return (
    <div>
      <div className={styles.header}>{`Don't be shy, say hello!`}</div>
      <div>
        <span>
          <a
            href="https://github.com/LukePrimis"
            target="_blank"
            rel="noreferrer"
          >
            <GitHub fontSize="large" className={styles.icon} />
          </a>
          <a
            href="https://twitter.com/tencentdimes"
            target="_blank"
            rel="noreferrer"
          >
            <Twitter fontSize="large" className={styles.icon} />
          </a>
          <a
            href="mailto:luke_primis@brown.edu"
            target="_blank"
            rel="noreferrer"
          >
            <Mail fontSize="large" className={styles.icon} />
          </a>
          <a
            href="https://www.linkedin.com/in/luke-primis-6a85721b8/"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedIn fontSize="large" className={styles.icon} />
          </a>
        </span>
      </div>
    </div>
  );
};

const NameBlock = () => {
  const [fading, setFading] = useState(false);
  const [blurbIndex, setBlurbIndex] = useState(0);

  useEffect(() => {
    const timeout = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setBlurbIndex(blurbIndex + 1 >= blurbs.length ? 0 : blurbIndex + 1);
        setFading(false);
      }, 1500);
    }, 5000);

    return () => clearInterval(timeout);
  });

  return (
    <div className={styles.container}>
      <div className={styles.name}>Luke Primis</div>
      <div className={styles.regular}>
        <div>Fullstack Developer</div>
        <div>Student at Brown University</div>
        <div
          className={`${fading ? styles.fade_out : styles.fade_in} ${
            styles.mobile_mods
          }`}
        >
          {blurbs[blurbIndex]}
        </div>
      </div>
      <ContactCard />
    </div>
  );
};

export default NameBlock;
