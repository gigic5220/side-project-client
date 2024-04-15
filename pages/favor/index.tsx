import React from "react";
import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import FavorPageComponent from "@/components/pages/favor/FavorPageComponent";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {callApi} from "@/api/CustomedAxios";

export async function getServerSideProps(context: any) {
    const session = await getServerSession(context.req, context.res, authOptions)

    const response = await callApi(
        'get',
        '/group/me',
        {},
        {
            'Authorization': `Bearer ${session.accessToken}`
        }
    );

    console.log('response', response.data)

    return {
        props: {
            myGroupListServerSideData: response.data
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