import React from "react";
import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import FavorPageComponent from "@/components/pages/favor/FavorPageComponent";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export async function getServerSideProps(context: any) {
    const session = await getServerSession(context.req, context.res, authOptions)
    console.log('session', session);

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/group/me`,
        {
            headers: {
                'Authorization': `Bearer ${session.accessToken}`
            }
        },
    );

    const data = await res.json();

    console.log('res:', res)
    console.log('data:', data)

    return {
        props: {
            myGroupListServerSideData: data,
        },
    };
}

type FavorPageProps = {
    myGroupListServerSideData: any
}

const FavorPage = (props: FavorPageProps) => {
    return (
        <AppLayoutComponent
            isShowHeader
            isShowNavigationBar
        >
            <FavorPageComponent myGroupListServerSideData={props.myGroupListServerSideData}/>
        </AppLayoutComponent>
    );
};

export default FavorPage;