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
          x="-5%"
          y="-5%"
          width="110%"
          height="110%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves="2"
            seed="8"
            result="noise"
          />

          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.8" />
        </filter>
      </defs>
    </svg>
  );
};

export default SketchFilter;
