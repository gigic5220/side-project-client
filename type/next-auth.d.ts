import "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: number;
            phone: string;
        };
        accessToken?: string;
        accessTokenExpireAt: number;
        refreshToken?: string;
    }
}