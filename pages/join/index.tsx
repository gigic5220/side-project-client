import React, {FC} from "react";
import {useGetEmailDuplication} from "@/query/userHooks";

const JoinComponent: FC = () => {

    const {data} = useGetEmailDuplication('gigic5220@gmail.com',
        {
            enabled: true,
            onSuccess: (data) => {
                console.log('data', data)
            },
            onError: (error) => {

            }
        }
    )

    return (
        <>
        </>
    );
};

export default JoinComponent;
