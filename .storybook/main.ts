import type {StorybookConfig} from "@storybook/nextjs";
import * as path from "path";

const config: StorybookConfig = {
    stories: [
        "../stories/**/*.mdx",
        "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-onboarding",
        "@storybook/addon-interactions",
        "@storybook/addon-backgrounds"
    ],
    framework: {
        name: "@storybook/nextjs",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    webpackFinal: async (config, {configType}) => {
        // `@` 경로를 src 디렉토리로 설정
        config.resolve.alias['@'] = path.resolve(__dirname, '../');

        return config;
    },
};
export default config;
