import type {Preview} from "@storybook/react";

const preview: Preview = {
    parameters: {
        actions: {argTypesRegex: "^on[A-Z].*"},
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        backgrounds: {
            default: "primary",
            values: [
                {
                    name: 'primary',
                    value: '#000000',
                },
            ]
        },

    },
};

export default preview;
