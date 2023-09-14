import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: {label: "id", type: "text", placeholder: "jsmith"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                console.log('@@@@credentials', credentials)

                const response = await fetch(`http://localhost:8000/users/login`, {
                    method: 'POST',
                    body: JSON.stringify({
                        userId: credentials?.username,
                        password: credentials?.password
                    }),
                    headers: {'Content-Type': 'application/json'}
                })

                console.log('request', response)
                const responseData = await response.json();

                if (!response.ok) {
                    console.error("Authentication error:", responseData.message);  // 여기서 서버의 오류 메시지를 로깅합니다.
                    return null;  // 인증 오류로 간주하고 null을 반환합니다.
                }


                const user = {id: "1", name: "J Smith", email: "jsmith@example.com"}

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ]
}
export default NextAuth(authOptions)