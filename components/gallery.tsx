import styles from "../styles/Gallery.module.css";
import { BackButton, ForwardButton } from "./button";

interface GalleryProps {
  images: Array<string>;
}

const Gallery = () => {
  return (
    <div style={{ height: "100%" }}>
      <div style={{ position: "relative", height: "50%" }}>
        <div className={styles.back_button}>
          <BackButton />
        </div>
        <div className={styles.container}>
          <img src="akari_ui_1.png" className={styles.image} />
        </div>
        <div className={styles.forward_button}>
          <ForwardButton />
        </div>
      </div>
      <div className={styles.text_section}>
        <div className={styles.title}>Akari Automation</div>
        <div>Lorem ipsum</div>
      </div>
    </div>
  );
};

export default Gallery;
