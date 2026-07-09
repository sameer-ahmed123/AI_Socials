const SketchFilter = () => {
  return (
    <svg
      width="0"
      height="0"
      style={{
        position: "absolute",
      }}
    >
      <defs>
        <filter
          id="hand-drawn-filter"
          x="-2%"
          y="-2%"
          width="104%"
          height="104%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04"
            numOctaves="3"
            // seed="8"
            result="noise"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="3"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default SketchFilter;
