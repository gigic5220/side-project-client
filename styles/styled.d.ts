import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        backgroundColors: {
            primary: string;
        }
        colors: {
            primary: string;
            secondary: string;
        };
        fontColors: {
            primary: string;
            secondary: string;
            white: string;
            error: string;
        }
        disabledColors: {
            primary: string;
        }
    }
}