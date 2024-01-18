import type {Preview} from "@storybook/react";
import {ThemeProvider} from 'styled-components';
import {theme} from '../styles/theme';

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
                    value: '#FFFFFF',
                },
            ]
        },

    },
};

export const decorators = [
    (Story) => (
        <ThemeProvider theme={theme}>
            <Story/>
        </ThemeProvider>
    ),
];

export default preview;
