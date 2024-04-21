import {Favor} from "@/type/favor/type";
import SentFavorCardComponent from "@/components/favor/SentFavorCardComponent";
import ReceivedFavorCardComponent from "@/components/favor/ReceivedFavorCardComponent";
import React from "react";

type MyFavorListComponentProps = {
    myFavorList: Favor[] | undefined
    selectedFavorType: 'received' | 'sent'
    handleClickFavorCompleteStamp: (id: number, isComplete: boolean) => void
    handleClickFavor: (id: number) => void
}

const MyFavorListComponent = (props: MyFavorListComponentProps) => {
    const {
        myFavorList,
        selectedFavorType,
        handleClickFavorCompleteStamp,
        handleClickFavor
    } = props

    return (
        <>
            {
                myFavorList?.map((favor: Favor, index: number) => {
                    if (selectedFavorType === 'sent') {
                        return <SentFavorCardComponent
                            key={index}
                            favorUserAssociationList={favor.favorUserAssociations}
                            favorTitle={favor.title}
                            favorDetail={favor.detail}
                            isImportant={favor.isImportant}
                            handleClickFavor={() => handleClickFavor(favor.id)}
                        />
                    } else {
                        return (
                            <ReceivedFavorCardComponent
                                key={index}
                                favorUserAssociationId={favor.favorUserAssociations[0].id}
                                favorTitle={favor.title}
                                favorDetail={favor.detail}
                                requesterImageUrl={favor.favorUserAssociations[0].fileUrl}
                                requesterName={favor.favorUserAssociations[0].nickName}
                                isImportant={favor.isImportant}
                                isComplete={favor.favorUserAssociations[0].isComplete}
                                onClickComplete={handleClickFavorCompleteStamp}
                            />
                        )
                    }
                })
            }
        </>
    )
}


export default MyFavorListComponent