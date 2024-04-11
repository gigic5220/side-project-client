import React, {FC} from "react";
import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import FavorPageComponent from "@/components/pages/favor/FavorPageComponent";

const FavorPage: FC = () => {
    return (
        <AppLayoutComponent
            isShowHeader
            isShowNavigationBar
        >
            <FavorPageComponent/>
        </AppLayoutComponent>
    );
};

export default FavorPage;