const SketchFilter = () => {
  return (
    <svg
      width="0"
      height="0"
      style={{
        position: "absolute",
        pointerEvents: "none", // Ensures it doesn't block clicks
      }}
    >
      <defs>
        <filter
          id="hand-drawn-filter"
          /* Expanded bounds to prevent clipping with a larger wobble scale */
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
        >
          <feTurbulence
            type="fractalNoise"
            /* Lower baseFrequency = larger, more sweeping hand-drawn waves.
              0.015 gives excellent natural-looking wobbles along the lines.
            */
            baseFrequency="0.015"
            numOctaves="3"
            result="noise"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            /* Reduced from 12 to 11 to decrease the wobble intensity by 10% */
            scale="11"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default SketchFilter;