// components/DesignIcon.js
const DesignIcon = ({ width = 24, height = 24, fill = "black" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 39 46"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_3322_22481)">
      <mask
        id="mask0_3322_22481"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="1"
        y="0"
        width="34"
        height="31">
        <path
          d="M14.0155 5.32269L2.12814 12.4196L1.0636 11.1776L2.12814 6.2098L16.4994 0L31.7578 5.85496L34.4191 26.9683L28.2093 30.6942V27.678V12.4196L27.1448 12.9519L26.4351 12.4196L14.0155 5.32269Z"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_3322_22481)">
        <path
          d="M4.61292 13.4094V23.2272L13.4841 28.8649V19.0931L4.61292 13.4094Z"
          fill="#2F2F2F"
        />
        <path
          d="M19.1611 28.8649L28.0323 23.2272V13.4094L19.1611 19.0931V28.8649Z"
          fill="#2F2F2F"
        />
        <path
          d="M16.3823 33.1024L2.77878 24.6115V9.94969L16.3823 18.5097V33.1024Z"
          stroke="#2F2F2F"
          strokeWidth="1.3"
        />
        <path
          d="M29.5117 24.018L16.9728 31.9357V18.3252L29.5117 10.3431V24.018Z"
          stroke="#2F2F2F"
          strokeWidth="1.3"
        />
        <path
          d="M4.50805 10.192L16.5874 2.65091L28.6667 10.192L16.5874 17.7331L4.50805 10.192Z"
          stroke="#2F2F2F"
          strokeWidth="1.3"
        />
      </g>
      <path
        d="M2.48401 17.1349V26.9526L11.3552 32.5904V22.8185L2.48401 17.1349Z"
        fill="#2F2F2F"
      />
      <path
        d="M17.0322 32.5904L25.9034 26.9526V17.1349L17.0322 22.8185V32.5904Z"
        fill="#2F2F2F"
      />
      <path
        d="M23.0647 13.8508L14.1935 8.24817L5.32239 13.8508L14.1935 19.4534L23.0647 13.8508Z"
        fill="#2F2F2F"
      />
      <path
        d="M14.2535 36.828L0.65 28.337V13.6753L14.2535 22.2353V36.828Z"
        stroke="#2F2F2F"
        strokeWidth="1.3"
      />
      <path
        d="M27.3828 27.7441L14.8438 35.6618V22.0513L27.3828 14.0692V27.7441Z"
        stroke="#2F2F2F"
        strokeWidth="1.3"
      />
      <path
        d="M2.45715 13.8822L14.5365 6.3411L26.6158 13.8822L14.5365 21.4232L2.45715 13.8822Z"
        stroke="#2F2F2F"
        strokeWidth="1.3"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_3322_22481"
        x="0"
        y="1.88464"
        width="38.1617"
        height="44.1152"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="4" dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_3322_22481"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_3322_22481"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default DesignIcon;
