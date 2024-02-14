import {useSession} from "next-auth/react";


export const useUser = () => {
    const {data: session} = useSession();

    if (session?.user?.id || session?.user?.phone) {
        return {
            id: session?.user?.id,
            phone: session?.user?.phone,
        };
    }
    
    return null
}