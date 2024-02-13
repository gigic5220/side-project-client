import "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            phone: boolean;
        };
        accessToken?: string;
        accessTokenExpireAt: number;
        refreshToken?: string;
    }
}