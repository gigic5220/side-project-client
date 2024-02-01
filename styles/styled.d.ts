import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        backgroundColors: {
            primary: string;
        }
        colors: {
            primary: string;
            secondary: string;
            white: string;
            gray: string;
            black: string;
        };
        fontColors: {
            primary: string;
            secondary: string;
            white: string;
            error: string;
            placeholder: string;
        }
        disabledColors: {
            primary: string;
        }
        favorCardColors: {
            redPrimary: string;
            redSecondary: string;
            blue: string;
            green: string;
            purple: string;
        }
    }
}