import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import Spinner from "@/GeneralElements/Spinner/Spinner";

import { adminAxios } from "@/Utils/AdminAxios";

import { useParams, } from "react-router-dom";
import { useQuery } from 'react-query';
import moment from 'moment';

import { useState } from "react";
import { toast } from "react-toastify";

import PricingComponent from "@/GeneralComponents/PricingComponent/PricingComponent";


function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export default function PackagePage({ }) {
    const searchParams = useParams();
    const [loading, setLoading] = useState(null);

    const { isLoading, error, data, refetch } = useQuery(
        `get-user-admin-${searchParams.id || ""}`,
        () => adminAxios.get(`packages/${searchParams.id || ""}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
        });

    if (isLoading) {
        return <Spinner />;
    }
    if (error || data == null || data.data.package == null) {
        return <SorryDiv message="هذا المستخدم غير موجودة, الرجاء المحاولة مرة اخرى مع مستخدم اخر" />
    }
    const packagee = data.data.package;
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
                <h5>{packagee.name}</h5>
            </div>
            <div className="grid grid-cols-1 px-4 pt-6 gap-6 xl:grid-cols-3 xl:gap-6">

                <div className="col-span-2">
                    <div className="bg-[color:var(--secondary)]   rounded-2xl p-4 mb-6">
                        <div className="flex flex-row justify-between items-center">
                            <h3 className="mb-4 text-xl font-bold">بيانات الباقة</h3>
                        </div>

                        <dl className="grid mb-5 grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                            <div>
                                <dt className="text-sm font-medium text-fade mb-2">كود الباقة</dt>
                                <dd className="text-sm font-semibold ">
                                    {packagee._id}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-fade mb-2">الاسم</dt>
                                <dd className="text-sm font-semibold ">
                                    {packagee.name}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-fade mb-2">الوصف</dt>
                                <dd className="text-sm font-semibold ">
                                    {packagee.description}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-fade mb-2">السعر</dt>
                                <dd className="text-sm font-semibold ">
                                    {packagee.price}$
                                </dd>
                            </div>



                            <div>
                                <dt className="text-sm font-medium text-fade mb-2">تاريخ إنشاء الحساب</dt>
                                <dd className="text-sm font-semibold ">
                                    {moment(packagee.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-fade mb-2">أخر تعديل</dt>
                                <dd className="text-sm font-semibold ">
                                    {moment(packagee.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                                </dd>
                            </div>

                        </dl>


                    </div>

                </div>
                <div className="flex flex-col gap-4">
                    <PricingComponent 
                    className={'w-full'}
                        title={packagee.name}
                        description={packagee.description}
                        price={packagee.price}
                        advantages={packagee.advantages}
                    />


                </div>
            </div>
        </main>
    )
}
