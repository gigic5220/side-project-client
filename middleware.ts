import {withAuth} from "next-auth/middleware"

export default withAuth(
    {
        callbacks: {
            authorized: ({token}) => {
                return token != null;
            },
        },
        pages: {
            signIn: '/login',
        },
    },
)

export const config = {
    matcher: ['/((?!login).*)']
}