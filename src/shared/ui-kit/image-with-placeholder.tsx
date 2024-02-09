import { css, cva, cx } from "@style/css";
import { memo, useState } from "react";

const rootStyle = css({
  position: "relative",
});

const imageStyle = css({
  position: "relative",
  zIndex: 10,
});

const placeholderStyle = css({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 100,
  bgGradient: "to-r",
  gradientFrom: "#eee",
  gradientTo: "#ccc",
  animationName: "pulse",
  animationDuration: "2s",
  animationIterationCount: "infinite",
});

type ImageWithPlaceholderProps = {
  src: string;
  className?: string;
};

export const ImageWithPlaceholder = memo<ImageWithPlaceholderProps>(
  ({ src, className }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
      <div className={cx(rootStyle, className)}>
        {isLoading && <div className={placeholderStyle}>xxx</div>}

        <img
          className={imageStyle}
          src={src}
          onLoad={() => {
            setIsLoading(false);
          }}
        />
      </div>
    );
  }
);
