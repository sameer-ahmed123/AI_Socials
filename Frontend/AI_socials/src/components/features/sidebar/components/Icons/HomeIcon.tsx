import type { IconProps } from "./Icon.types";

const HomeIcon = ({ size = 24, ...props }: IconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <text
        x="50%"
        y="55%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontWeight="700"
        fontSize="18"
      >
        H
      </text>
    </svg>
  );
};

export default HomeIcon;
