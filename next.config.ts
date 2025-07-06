import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */

    webpack: (config) => {
        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            '@/components': path.resolve(__dirname, 'components'),
            '@/utils:': path.resolve(__dirname, 'utils'),
            // 필요 시 더 추가
        };
        return config;
    },
};

export default nextConfig;
