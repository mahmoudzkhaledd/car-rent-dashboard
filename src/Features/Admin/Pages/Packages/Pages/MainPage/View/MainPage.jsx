
import SearchBar from "../Components/SearchBar";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import { adminAxios } from "@/Utils/AdminAxios";
import { useSearchParams } from "react-router-dom";

import { useQuery } from "react-query";
import DataTable from "@/Features/Admin/GeneralComponents/DataTable/DataTable";

const header = [
    {
        title: "كود الباقة",
        ref: ['_id'],
        link: "",
    },
    {
        title: "الاسم",
        ref: ['name'],
        link: "",
    },
    {
        title: "السعر",
        ref: ['price'],
        link: "",
    },

    {
        title: "تاريخ الإضافة",
        ref: ['createdAt'],
        date: true,
    },
    {
        title: "عرض",
        ref: [''],
        link: "/packages/",
        linkRef: "_id"
    },
]
export default function MainPage({ }) {
    const [searchParams, setSearch] = useSearchParams({

        search: "",
        state: "all",
    });

    const search = searchParams.get('search');
    const state = searchParams.get('state');

    const { isLoading, isError, data } = useQuery(
        ['get-packages', search, state],
        () => adminAxios.get(`packages?search=${search || ""}&state=${state || "all"}`),
        {
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            retry: 0,
        }
    );

    const onSearch = (se) => {

        setSearch({
            page: 1,
            search: se.search || "",
            state: se.state || "all",
        });
    };


    if (isLoading) {
        return <Spinner />;
    }
    if (isError) {
        return <SorryDiv message="الرجاء المحاولة مرة اخرى" />
    }
    return (

        <>
            <h5 className=" mb-5">الباقات</h5>
            <SearchBar selectedState={state} onSearch={onSearch} value={search || ""} />
            <DataTable header={header} data={data.data.packages} />
        </>
    )
}

