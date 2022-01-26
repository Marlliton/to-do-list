import NextImage from "next/image";
import styles from "../styles/Image.module.scss";

type ImageProps = {
  src: any;
  width: number;
  height: number;
  alt: string;
};

export function Image(props: ImageProps) {
  return (
    <div className={styles.image}>
      <NextImage
        src={props.src}
        width={props.width}
        height={props.height}
        alt={props.alt}
      />
    </div>
  );
}
