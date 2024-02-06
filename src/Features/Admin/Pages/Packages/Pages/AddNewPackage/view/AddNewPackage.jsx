
import { useEffect, useState } from "react";
import { adminAxios } from "@/Utils/AdminAxios";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import TextBox from "@/GeneralElements/TextBox/TextBox";
import Button from "@/GeneralElements/Button/Button";
import { adminRoles } from "@/Utils/AdminRoles";
import { toast } from "react-toastify";
import { z } from 'zod';
import PricingComponent from "@/GeneralComponents/PricingComponent/PricingComponent";
import CheckBox from "@/GeneralElements/CheckBox/CheckBox";

export default function AddNewPackage({ editMode }) {
    const params = useParams();
    const [loading, setLoading] = useState(null);
    const [packagee, setPackage] = useState({});
    const nav = useNavigate();


    const addPackage = async () => {
        const { name, description, price, advantages } = packagee;
        if (name == null || description == null || price == null || advantages == null) {
            toast.error("من فضلك ادخل كل البيانات")
            return;
        }
        setLoading('add');
        try {
            const res = editMode ? await adminAxios.put(`/packages/${packagee._id}`, packagee)
                : await adminAxios.post('/packages/add', packagee);
            if (editMode) {
                nav(`/packages/${params.id}`);
            } else {
                nav(`/packages/${res?.data?.package?._id}`);
            }
        } catch (ex) {


        }
        setLoading(null);
    }
    const addAdv = () => {
        const desc = document.getElementById('adv').value || "";
        if (desc == "") return;
        if (packagee.advantages) {
            packagee.advantages.push({
                description: desc,
                active: false,
            });
        } else {
            packagee.advantages = [{
                description: desc,
                active: false,
            }];
        }
        setPackage({ ...packagee });
    };


    const { isLoading, error, data, refetch, } = useQuery(
        `get-package-edit-${params.id}`,
        () => adminAxios.get(`packages/${params.id || ""}`).then(p => {
            if (p?.data?.package != null) {
                setPackage(p?.data?.package)
            }
            return p;
        }),
        {
            retry: 0,
            enabled: params.id != null && editMode == true,
            refetchOnWindowFocus: false,
        },
    );

    if (isLoading) {
        return <Spinner />;
    }
    if (error || (data?.data?.package == null && params.id != null && editMode == true)) {
        return <SorryDiv message="هذه الباقة غير موجودة" />
    }

    return (
        <div className="flex flex-col gap-5 md:flex-row">
            <div id="add-package-form" className=" flex-[2] h-fit mb-8 w-full bg-[color:var(--secondary)] rounded-lg shadow  md:mt-0 xl:p-0  ">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                        {
                            editMode ? "تعديل الباقة" : "اضافة باقة "
                        }
                    </h1>

                    <form id="add-admin-form" className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                        <TextBox
                            disabled={loading}
                            value={packagee.name || ""}
                            onChanged={(e) => {
                                packagee.name = e.target?.value || "";
                                setPackage({ ...packagee });
                            }}
                            name="name"
                            placeholder="اسم الباقة"
                            label="اسم الباقة" />
                        <TextBox
                            disabled={loading}
                            area={true}
                            value={packagee.description || ""}
                            onChanged={(e) => {
                                packagee.description = e.target?.value || "";
                                setPackage({ ...packagee });
                            }}
                            name="description"
                            placeholder="وصف الباقة"
                            label="وصف الباقة" />
                        <TextBox
                            disabled={loading}
                            value={packagee.price || 0}
                            onChanged={(e) => {
                                packagee.price = Number(e.target?.value) || 0;
                                setPackage({ ...packagee });
                            }}
                            name="price"
                            type="number"
                            placeholder="السعر "
                            label="السعر" />
                        <TextBox
                            disabled={loading}
                            value={packagee.freePeriod || 0}
                            onChanged={(e) => {
                                packagee.freePeriod = Number(e.target?.value) || 0;
                                setPackage({ ...packagee });
                            }}
                            name="freePeriod"
                            type="number"
                            placeholder="فترة اضافية "
                            label="فترة اضافية " />
                        <div className="flex items-end gap-3 justify-between">
                            <TextBox
                                id={'adv'}
                                className="w-full"
                                disabled={loading}
                                name="price"
                                placeholder="المميزات "
                                label="المميزات" />
                            <Button className="h-[45px]" onClick={addAdv}>
                                اضافة
                            </Button>
                        </div>

                        <div className="p-2 my-2 bg-[color:var(--secondary-select)] rounded-md">
                            <h5 className="mb-3">مميزات الباقة</h5>
                            {
                                packagee?.advantages?.map((e, idx) => <CheckBox

                                    className="flex items-center gap-2 text-[30px]"
                                    key={idx}
                                    onChanged={(e) => {
                                        const chk = !!e.target.checked;
                                        packagee.advantages[idx].active = chk;
                                        setPackage({ ...packagee })
                                    }}
                                    text={e.description}
                                    defaultChecked={e.active} />)
                            }
                        </div>
                        <Button loading={loading == 'add'} disabled={loading != null} className=" mr-auto" onClick={addPackage} >
                            {editMode ? "تعديل الباقة" : "إضافة الباقة"}
                        </Button>
                    </form>
                </div>

            </div>
            <div className="flex-[1]">
                <PricingComponent
                    freePeriod={packagee?.freePeriod}
                    title={packagee?.name}
                    description={packagee?.description}
                    price={packagee?.price}
                    advantages={packagee?.advantages}
                />
            </div>
        </div>
    )
}
