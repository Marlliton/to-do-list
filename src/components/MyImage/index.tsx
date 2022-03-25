import NextImage from "next/image";
import styles from "./Image.module.scss";

type ImageProps = {
  src: any;
  width?: number;
  height?: number;
  alt: string;

  className: string;
};

export function Image(props: ImageProps) {
  return (
    <div
      className={`
      ${props.className == "authenticate-login" ? styles.authenticate : ""}
      ${styles.image}
    `}
    >
      <NextImage
        src={props.src}
        width={props?.width}
        height={props?.height}
        alt={props.alt}
      />
    </div>
  );
}
