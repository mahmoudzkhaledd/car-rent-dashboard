import Button from "@/GeneralElements/Button/Button";
import TextBox from "@/GeneralElements/TextBox/TextBox";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const userStates = [
    {
        name: "الكل",
        value: "all",
    },
    {
        name: "غير محظور",
        value: "unbanned",
    },
    {
        name: "محظور",
        value: "banned",
    },
]
export default function SearchBar({ value, onSearch, selectedState }) {
    const textRef = useRef();
    useEffect(() => { textRef.current.value = value; }, []);
    return (
        <div className="w-100 flex justify-between mb-5">
            <div className="flex gap-3  justify-center items-center">
                <TextBox width={200} reference={textRef} placeholder="البحث" />


                <Button className="h-full w-[50px]" onClick={() => onSearch({ search: textRef.current.value, state: document.getElementById('status').value })} >
                    <i className="fa-solid fa-magnifying-glass"></i>
                </Button>
            </div>
            <Link to={`/packages/add-package`}>
                <Button>
                    اضافة باقة
                </Button>
            </Link>
        </div>
    )
}
