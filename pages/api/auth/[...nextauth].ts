import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from 'next-auth/providers/kakao'

const getRefreshedAccessToken = async (refreshToken: string) => {
    const response = await fetch(
        'http://localhost:8000' + '/token/refresh',
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    refreshToken: refreshToken
                }
            )
        }
    )

    return response.json()
}

export const authOptions = {
    pages: {
        signIn: "/login",
    },
    providers: [
        KakaoProvider({
            clientId: process.env.KAKAO_REST_API_KEY!,
            clientSecret: process.env.KAKAO_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                phone: {label: "phone", type: "text"},
                phoneVerifyCode: {label: "phoneVerifyCode", type: "text"},
            },
            async authorize(credentials, req) {
                const response = await fetch(`http://localhost:8000/user/login`, {
                    method: 'POST',
                    body: JSON.stringify({
                        phone: credentials?.phone,
                        code: credentials?.phoneVerifyCode,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const jsonResponse = await response.json()
                if (!response.ok) {
                    throw new Error(jsonResponse.message)
                }
                return jsonResponse
            }
        })
    ],
    session: {
        maxAge: 24 * 60 * 60, // 24 hours in seconds
    },
    callbacks: {
        async jwt(jwtData: any) {
            const {user, token, account} = jwtData
            let userWithTokenInfo = user

            if (account?.provider === 'kakao') {
                await fetch(`http://localhost:8000/user`, {
                    method: 'POST',
                    body: JSON.stringify({
                        userId: user?.email,
                        provider: 'kakao',
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const loginResponse = await fetch(`http://localhost:8000/user/login`, {
                    method: 'POST',
                    body: JSON.stringify({
                        userId: user?.email,
                        password: '',
                        provider: 'kakao'
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const loginJsonResponse = await loginResponse.json()
                if (!loginResponse.ok) {
                    throw new Error(loginJsonResponse.message)
                }
                userWithTokenInfo = loginJsonResponse
            }

            if (userWithTokenInfo) {
                const keys = ['accessToken', 'accessTokenExpireAt', 'refreshToken', 'id', 'userId', 'isActive'];
                keys.forEach(key => {
                    if (userWithTokenInfo[key]) token[key] = userWithTokenInfo[key];
                });
            }
            if (new Date().getTime() > token.accessTokenExpireAt) {
                try {
                    const response = await getRefreshedAccessToken(token.refreshToken)
                    if (!!response?.accessToken) token.accessToken = response.accessToken
                } catch (e) {
                    return {...token, error: 'RefreshAccessTokenError'};
                }
            }

            return token;

        },
        async session(sessionData: any) {
            const {session, token} = sessionData
            session.user = {
                id: token.id,
                userId: token.userId,
                isActive: token.isActive
            };
            session.accessToken = token.accessToken;
            session.accessTokenExpireAt = token.accessTokenExpireAt;
            session.refreshToken = token.refreshToken;
            return session;
        }
    }
}
export default NextAuth(authOptions)