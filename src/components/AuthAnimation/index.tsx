import Lottie from "react-lottie-player";

import styles from "./Animation.module.scss";

type AnimationData = {
  animation: any;
};

export function Animation(props: AnimationData) {
  return (
    <div className={styles.lottie}>
      <Lottie
        loop={false}
        animationData={props.animation}
        play
        style={{ width: 250, height: 250 }}
      />
    </div>
  );
}
