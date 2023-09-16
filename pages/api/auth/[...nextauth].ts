import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

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
                const jsonResponse = await response.json()
                if (!response.ok) {
                    throw new Error(jsonResponse.message)
                }
                return jsonResponse
            }
        })
    ],
    callbacks: {
        async jwt({token, user}: any) {
            if (user) {
                const keys = ['accessToken', 'accessTokenExpireAt', 'refreshToken', 'id', 'userId', 'isActive'];
                keys.forEach(key => {
                    if (user[key]) token[key] = user[key];
                });
            }

            if (new Date().getTime() > token.accessTokenExpireAt) {
                try {
                    const response = await getRefreshedAccessToken(token.refreshToken)
                    token.accessToken = response.data.accessToken
                } catch (e) {
                    return {...token, error: 'RefreshAccessTokenError'};
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