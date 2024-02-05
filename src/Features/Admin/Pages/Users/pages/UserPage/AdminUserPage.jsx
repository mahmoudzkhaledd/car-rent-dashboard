import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import Spinner from "@/GeneralElements/Spinner/Spinner";

import { adminAxios } from "@/Utils/AdminAxios";

import { Link, useParams, } from "react-router-dom";
import { useQuery } from 'react-query';
import moment from 'moment';


import { useState } from "react";
import Button from "@/GeneralElements/Button/Button";
import { toast } from "react-toastify";
import { timeSince } from "@/Utils/Helper";


export default function AdminUserPage({ }) {
    const searchParams = useParams();
    const [loading, setLoading] = useState(null);

    const { isLoading, error, data, refetch } = useQuery(
        `get-user-admin-${searchParams.id || ""}`,
        () => adminAxios.get(`users/${searchParams.id || ""}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
        });

    if (isLoading) {
        return <Spinner />;
    }
    if (error || data == null || data.data.user == null) {
        return <SorryDiv message="هذا المستخدم غير موجودة, الرجاء المحاولة مرة اخرى مع مستخدم اخر" />
    }
    const user = data.data.user;
    const activeAccount = async () => {
        if (window.confirm("هل أنت متأكد؟") && user != null) {

            setLoading('active');
            try {
                const res = await adminAxios.post(`users/${user._id}/active-account`);
                refetch();
                toast("تمت العميلة بنجاح");
            } catch (ex) {
                toast.error(ex.message);

            }
            setLoading(null);
        }
    }
    const banUser = async () => {
        if (window.confirm(`هل أنت متأكد من ${user.banned ? "الغاء حظر" : "حظر"} المستخدم؟`) && user != null) {

            setLoading('ban');
            try {
                const res = await adminAxios.post(`users/${user._id}/ban`);
                refetch();
                toast(`تم ${user.banned ? "الغاء حظر" : "حظر"} المستخدم بنجاح`);
            } catch (ex) {
                toast.error(ex.message);

            }
            setLoading(null);
        }
    }
   

    return (
        <main>
            <div className="flex gap-5">
                <h5>مستخدم رقم {user.number}</h5>
            </div>
            <div className="  px-4 pt-6 gap-6 xl:grid-cols-3 xl:gap-6">

                <div className="col-span-1">
                    <div className="bg-[color:var(--secondary)]   rounded-2xl p-4 mb-6">
                        <div className="flex flex-row justify-between items-center">
                            <h3 className="mb-4 text-xl font-bold">بيانات المستخدم</h3>
                           
                        </div>

                        <dl className="grid mb-5 grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                            <div>
                                <dt className="text-sm font-medium text-fade mb-2">كود المستخدم</dt>
                                <dd className="text-sm font-semibold ">
                                    {user._id}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-fade mb-2"> الاسم الأول </dt>
                                <dd className="text-sm font-semibold ">
                                    {user.firstName}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-fade mb-2"> الاسم الأخير </dt>
                                <dd className="text-sm font-semibold ">
                                    {user.lastName}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-fade mb-2"> اسم الشركة </dt>
                                <dd className="text-sm font-semibold ">
                                    {user.companyName}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-fade mb-2"> تاريخ الولادة  </dt>
                                <dd className="text-sm font-semibold ">
                                    {moment(user.birthdate).format("MMMM Do YYYY")}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-fade mb-2"> الايميل</dt>
                                <dd className="text-sm font-semibold ">
                                    {user.email}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-fade mb-2"> رقم الهاتف</dt>
                                <dd className="text-sm font-semibold ">
                                    {user.phone}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-fade mb-2"> الجنس</dt>
                                <dd className="text-sm font-semibold ">
                                    {user.gender ? "ذكر" : "أنثى"}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-fade mb-2"> حالة الحساب</dt>
                                <dd className="text-sm font-semibold ">
                                    {user.verifiedEmail ? "مفعل" : "غير مفعل"}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-fade mb-2"> اخر تواجد للمستخدم </dt>
                                <dd className="text-sm font-semibold ">
                                    <p>{user.lastActive != null ? timeSince(Date.parse(user.lastActive)) : "لم يدخل بعد"}</p>
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-fade mb-2"> الطلبات   </dt>
                                <dd className="text-sm font-semibold ">
                                    <Link to={'orders'} className="text-[color:var(--primary)] underline">
                                        اضفعط هنا
                                    </Link>
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-fade mb-2">تاريخ إنشاء الحساب</dt>
                                <dd className="text-sm font-semibold ">
                                    {moment(user.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-fade mb-2">أخر تعديل</dt>
                                <dd className="text-sm font-semibold ">
                                    {moment(user.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-fade mb-2">الحالة</dt>
                                <dd className="text-sm font-semibold ">
                                    <i className={`${!user.banned ? "fa-solid fa-circle-check" : "fa-solid fa-circle-xmark"} ml-2`}></i>
                                    {user.banned ? "محظور" : "غير محظور"}
                                </dd>
                            </div>
                        </dl>

                        <div className="flex flex-row gap-4">
                            <Button className=" bg-red-500 hover:bg-red-400" disabled={loading != null} loading={loading == 'ban'} onClick={banUser} >
                                {!user.banned ? "حظر المستخدم" : "الغاء الحظر"}
                            </Button>
                            <Button disabled={loading != null} loading={loading == 'active'} onClick={activeAccount} >
                                {!user.verifiedEmail ? "تفعيل الحساب" : "الغاء تفعيل الحساب"}
                            </Button>
                        </div>
                    </div>

                </div>
                <div>
                    
                </div>
            </div>
        </main>
    )
}
