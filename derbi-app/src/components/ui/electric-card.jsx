"use client";

import { useMemo } from "react";
import PropTypes from 'prop-types';


export const ElectricCard = ({
  variant = "swirl",
  color = "#D4AF37", // Default to Derbi Royal Gold
  badge = "Innovation",
  title = "",
  description = "",
  width = "100%",
  aspectRatio = "4 / 3",
  className = "",
  children,
}) => {
  const ids = useMemo(() => {
    const key = Math.random().toString(36).slice(2, 8);
    return {
      swirl: `swirl-${key}`,
      hue: `hue-${key}`,
    };
  }, []);

  const filterURL = variant === "hue" ? `url(#${ids.hue})` : `url(#${ids.swirl})`;

  return (
    <div className={`ec-wrap w-full h-full ${className}`}>
      <svg className="svg-container" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <filter id={ids.swirl} colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise3" seed="2" />
            <feOffset in="noise3" dx="0" dy="0" result="offsetNoise3">
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise4" seed="2" />
            <feOffset in="noise4" dx="0" dy="0" result="offsetNoise4">
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />

            <feDisplacementMap
              in="SourceGraphic"
              in2="combinedNoise"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>

          <filter id={ids.hue} colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="7" />
            <feColorMatrix type="hueRotate" result="pt1">
              <animate attributeName="values" values="0;360;" dur=".6s" repeatCount="indefinite" calcMode="paced" />
            </feColorMatrix>
            <feComposite />
            <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="7" seed="5" />
            <feColorMatrix type="hueRotate" result="pt2">
              <animate
                attributeName="values"
                values="0; 333; 199; 286; 64; 168; 256; 157; 360;"
                dur="5s"
                repeatCount="indefinite"
                calcMode="paced"
              />
            </feColorMatrix>
            <feBlend in="pt1" in2="pt2" mode="normal" result="combinedNoise" />
            <feDisplacementMap in="SourceGraphic" scale="30" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </defs>
      </svg>

      <div className="card-container w-full h-full" style={{ ["--electric-border-color"]: color, ["--f"]: filterURL }}>
        <div className="inner-container w-full h-full">
          <div className="border-outer w-full h-full">
            <div className="main-card w-full h-full" />
          </div>
          <div className="glow-layer-1" />
          <div className="glow-layer-2" />
        </div>

        <div className="overlay-1" />
        <div className="overlay-2" />
        <div className="background-glow" />

        <div className="content-container z-10">
          {children ? (
            children
          ) : (
            <>
              <div className="content-top">
                {badge && <div className="scrollbar-glass">{badge}</div>}
                {title && <p className="title">{title}</p>}
              </div>
              {(title || badge) && description && <hr className="divider" />}
              <div className="content-bottom">
                {description && <p className="description">{description}</p>}
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        :root {
          --color-neutral-900: oklch(0.145 0 0); /* Match Derbi pitch-black closely */
        }

        .ec-wrap {
          position: relative;
          display: block;
          color-scheme: light dark;
        }

        .svg-container {
          position: absolute;
          width: 0;
          height: 0;
          overflow: hidden;
        }

        .card-container {
          padding: 2px;
          border-radius: 1.5em;
          position: relative;
          --electric-light-color: oklch(from var(--electric-border-color) l c h);
          --gradient-color: oklch(from var(--electric-border-color) 0.3 calc(c / 2) h / 0.4);

          background: linear-gradient(-30deg, var(--gradient-color), transparent, var(--gradient-color)),
            linear-gradient(to bottom, var(--color-neutral-900), var(--color-neutral-900));
          color: white;
        }

        .inner-container {
          position: relative;
        }

        .border-outer {
          border: 2px solid oklch(from var(--electric-border-color) l c h / 0.5);
          border-radius: 1.5em;
          padding-right: 0.15em;
          padding-bottom: 0.15em;
        }

        .main-card {
          width: ${width};
          aspect-ratio: ${aspectRatio};
          border-radius: 1.5em;
          border: 2px solid var(--electric-border-color);
          margin-top: -4px;
          margin-left: -4px;
          filter: var(--f);
          background: var(--color-neutral-900);
        }

        .glow-layer-1,
        .glow-layer-2,
        .overlay-1,
        .overlay-2,
        .background-glow {
          border-radius: 24px;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .glow-layer-1 {
          border: 2px solid oklch(from var(--electric-border-color) l c h / 0.6);
          filter: blur(1px);
        }

        .glow-layer-2 {
          border: 2px solid var(--electric-light-color);
          filter: blur(4px);
        }

        .overlay-1,
        .overlay-2 {
          mix-blend-mode: overlay;
          transform: scale(1.1);
          filter: blur(16px);
          background: linear-gradient(-30deg, white, transparent 30%, transparent 70%, white);
        }

        .overlay-1 {
          opacity: 1;
        }
        .overlay-2 {
          opacity: 0.5;
        }

        .background-glow {
          filter: blur(32px);
          transform: scale(1.1);
          opacity: 0.3;
          z-index: -1;
          background: linear-gradient(
            -30deg,
            var(--electric-light-color),
            transparent,
            var(--electric-border-color)
          );
        }

        .content-container {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .content-top {
          display: flex;
          flex-direction: column;
          padding: 48px;
          padding-bottom: 16px;
          height: 100%;
        }

        .content-bottom {
          display: flex;
          flex-direction: column;
          padding: 48px;
          padding-top: 16px;
        }

        .scrollbar-glass {
          background: radial-gradient(
              47.2% 50% at 50.39% 88.37%,
              rgba(255, 255, 255, 0.12) 0%,
              rgba(255, 255, 255, 0) 100%
            ),
            rgba(255, 255, 255, 0.04);
          position: relative;
          transition: background 0.3s ease;
          border-radius: 14px;
          width: fit-content;
          height: fit-content;
          padding: 0.5em 1em;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 0.85em;
          color: rgba(255, 255, 255, 0.8);
        }
        
        .title {
          font-size: 2.25em;
          font-weight: 500;
          margin-top: auto;
        }

        .description {
          opacity: 0.5;
        }

        .divider {
          margin-top: auto;
          border: none;
          height: 1px;
          background-color: currentColor;
          opacity: 0.1;
          mask-image: linear-gradient(to right, transparent, black, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black, transparent);
        }
      `}</style>
    </div>
  );
};

ElectricCard.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.string,
  badge: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  width: PropTypes.string,
  aspectRatio: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
};

export default ElectricCard;
