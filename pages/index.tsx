import AppLayout from "@/components/layout/AppLayout";
import {useGetTest} from "@/query/userHooks";

const Main = () => {

    const {
        data,
        refetch
    } = useGetTest(
        {
            enabled: false
        }
    )

    const test = () => {
        refetch()
    }
    return (
        <AppLayout
            isShowHeader={true}
        >
            <button
                onClick={test}
            >
                test
            </button>
        </AppLayout>
    )
}

export default Main