export default function manifest() {
  return {
    name: "GRAND DOM — Real Estate Agency Warsaw",
    short_name: "GRAND DOM",
    description:
      "Real estate agency in Warsaw. Sales, purchases and rentals in Warsaw and Masovia. Investments in Thailand and Northern Cyprus.",
    start_url: "/pl",
    display: "standalone",
    background_color: "#f4f2ee",
    theme_color: "#1d2a25",
    icons: [
      {
        src: "/logo.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
