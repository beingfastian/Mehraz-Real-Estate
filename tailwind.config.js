/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: [
  //   "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  //   "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  //   "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
  //   "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  //   "./node_modules/flowbite/**/*.js",
  // ],

  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    screens: {
      "xxl": { max: "1536px" },
      xl: { max: "1280px" },
      lg: { max: "1024px" },
      md: { max: "768px" },
      sm: { max: "576px" },
      xs: { max: "360px" },
      mfxs: "360px",
      mfsm: "576px",
      mfmd: "768px",
      mflg: "1024px",
      mfxl: "1280px",
      mf2xl: "1536px",
      mf3xl: "1720px",
      mf4xl: "1920px",
    },
    extend: {
      fontFamily: {
        "proxima-nova": ["Proxima Nova", "sans-serif"],
      },
      colors: {
        "accent-1-extra-light": "#eeeeee",
        "accent-1-base": "#D9D9D9",
        "bg-dull": "#efefef80",
        dull: "#efefef",
        "accent-1-dark": "#666666",
        "accent-1-extra-dark": "#444444",
        "accent-2-base": "#323232",
        "light-text": "#2f2f2fbf",
        "accent-dark-blue": "#171E4D",
        "accent-sea-green": "#13617C",
        "accent-gold": "#BD9E48",
        "accent-gold-2": "#D9BF77",
        "accent-gold-light": "#DCBB60",
        "accent-gold-lighter": "#FFDDB4",
        "accent-gold-3": "#EDD286",
        "accent-gold-lightest": "#ffebd2",
        "accent-gray": "#3F3F3F",

        "accent-gray-light": "#2e2e2e",
        "accent-gray-lighter": "#f3f3f3",
        "accent-black": "#2F2F2F",
        "accent-green": "#219C70",
        "accent-light-green": "#009032",
        "accent-gray-light-2": "#606060",
        "accent-white": "#fff3e4",
        grey: "#585858",

        danger: "#f00",
        "danger-light": "#FF0000",
      },
      boxShadow: {
        dropdown: "0px 1px 8px 2px rgba(0, 0, 0, 0.3)",
        "dropdown-2": "5px 5px 20px 0px rgba(0, 0, 0, 0.25)",
        btn: "1px 3px 3px 0px rgba(0, 0, 0, 0.25)",
        "btn-shadow": "0px 4px 4px 0 rgba(0,0,0,0.25)",
        "btn-shadow-2": "0px 4px 4px 0 rgba(0,0,0,0.5)",
        "payment-card": "0px 0px 40px 5px rgba(0,0,0,0)",
        "payment-box": "0px 0px 40px 5px rgba(0,0,0,0.1)",
        copy: "1px 1px 4px 0 rgba(0,0,0,0.25)",
        "payment-box-shadow": "2px 2px 4px 0 rgba(0,0,0,0.15)",
      },

      strokeWidth: {
        3: "3",
        4: "4",
      },
      lineHeight: {
        tighter: "1.125",
      },
      letterSpacing: {
        "semi-ultra-wide": "0.2em",
        "ultra-wide": "0.25em",
      },
      maxWidth: {
        "8xl": "90rem",
        "6.5xl": "75rem",
      },
      fontSize: {
        xxxs: "0.5rem",
        xxs: "0.625rem",
        "1.5xl": "1.375rem",
        "1.5xl": "1.375rem",
        "3.5xl": "2rem",
        "4.5xl": "2.5rem",
      },
      transitionProperty: {
        "grid-rows": "grid-template-rows",
        "grid-rows-opacity-padding": "grid-template-rows, opacity, padding",
        padding: "padding",
        "font-weight": "font-weight",
      },
      backgroundImage: {
        "landing-cta-1": "url('/images/user-side/landing-cta-1-bg.webp')",
        "landing-cta-2": "url('/images/user-side/landing-cta-2-bg.webp')",
        "fast-homes": "url('/images/user-side/fast-homes-bg.webp')",
        claim: "url('/images/user-side/claim_bg.jpg')",
        team: "url('/images/user-side/team-lead-bg.jpg')",
        "secondary-cta":
          "linear-gradient(134.82deg, #20254a -7.84%, #154656 108.22%)",
        "primary-cta":
          "linear-gradient(45.32deg, #21254a -0.36%, #1f2b4c 19.9%, #154556 100.92%)",
        login: "url('/images/login-bg.jpg')",
        "terms-and-policy": "url(/images/user-side/terms-bg.png)",
      },
      height: {
        // 100vh - 6rem (admin header + 1rem spacing from bottom) - 6rem (page header)
        "page-container-admin": "calc(100vh - 6rem - 6rem)",
        // 100vh - 6rem (admin header + 3rem spacing from bottom) - 5rem (page header)
        "page-container-admin-xl": "calc(100vh - 6rem - 5rem)",
        // 100vh - 6rem (admin header + 1rem spacing from bottom) - 6rem (page header) - 2rem
        "page-container-admin-inner": "calc(100vh - 6rem - 6rem - 2rem)",
        18: "4.5rem",
      },
      minHeight: {
        "page-container-admin-inner": "600px",
        "page-user-inner": "600px",
        "page-user-inner-xl": "560px",
      },
      maxHeight: {
        "page-container-admin-inner": "800px",
        "page-user-inner": "800px",
        "2/3": "66%",
        "1/3": "33%",
        "1/2": "50%",
        "1/4": "25%",
        "user-header-menu": "calc(100vh - 6rem)",
        "user-header-menu-inner": "calc(100vh - 8rem)",
        "user-header-menu-sm": "calc(100vh - 5rem)",
        "user-header-menu-inner-sm": "calc(100vh - 7rem)",
      },
      alert: "alert-keyframes 5s linear",
      animation: {
        "landing-slide-1": "landing-slide 12s linear infinite 0s",
        "landing-slide-2": "landing-slide 12s linear infinite 4s",
        "landing-slide-3": "landing-slide 12s linear infinite 8s",
      },
      keyframes: {
        "alert-keyframes": {
          from: {
            transform: "translateX(-100%)",
          },
          to: {
            tranform: "translateX(0%)",
          },
        },
        "landing-slide": {
          "0%, 32%": { opacity: 1 },
          "35%, 97%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
