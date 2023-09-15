import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const getRefreshedAccessToken = async (refreshToken: string) => {
    return await fetch(
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
}

export const authOptions = {
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {label: "id", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req) {
                const response = await fetch(`http://localhost:8000/user/login`, {
                    method: 'POST',
                    body: JSON.stringify({
                        userId: credentials?.username,
                        password: credentials?.password
                    }),
                    headers: {
                        'Content-Type': 'application/json' +
                            ''
                    }
                })
                const responseData = await response.json();
                if (!response.ok) {
                    console.error("Authentication error:", responseData.message);  // 여기서 서버의 오류 메시지를 로깅합니다.
                    return null;
                }
                if (!!responseData) {
                    return responseData
                } else {
                    return null
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, user}: any) {
            if (user?.accessToken) {
                token.accessToken = user.accessToken;
            }
            if (user?.accessTokenExpireAt) {
                token.accessTokenExpireAt = user.accessTokenExpireAt;
            }
            if (user?.refreshToken) {
                token.refreshToken = user.refreshToken;
            }
            if (user?.id) {
                token.id = user.id;
            }
            if (user?.userId) {
                token.userId = user.userId;
            }
            if (user?.isActive) {
                token.isActive = user.isActive;
            }

            const nowInMilliseconds = new Date().getTime()


            if (nowInMilliseconds > token.accessTokenExpireAt) {
                try {
                    const response = await getRefreshedAccessToken(token.refreshToken)
                    const jsonData = await response.json()
                    token.accessToken = jsonData.data.accessToken
                } catch (e) {
                    return {
                        ...token,
                        error: 'RefreshAccessTokenError'
                    }
                }
            }

            return token;
        },
        async session({session, token}: any) {
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