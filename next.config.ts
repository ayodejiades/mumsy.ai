import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
});

const nextConfig = {
  reactStrictMode: true,
  // Add other Next.js config options here
};

export default withSerwist(nextConfig);
