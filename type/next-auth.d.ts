import "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        refreshToken?: string;
    }
}