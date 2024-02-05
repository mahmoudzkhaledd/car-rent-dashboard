import { Link } from "react-router-dom";
import { adminConfig } from "../../AdminConfig";
import Logo from "@/GeneralElements/Logo/Logo";
import { useDispatch } from "react-redux";
import { logOut } from "@/hooks/AdminRedux/AdminModelSlice";
import { adminAxios } from "@/Utils/AdminAxios";
import { rolesValidator } from '../../Utils/RolesHelper'
import { store } from "@/hooks/AdminRedux/AdminStore";
export default function Sidebar({ className = "", selected }) {

    const disp = useDispatch();
    return (
        <aside
            id="default-sidebar"
            className={className}
            aria-label="Sidebar"
        >
            <div style={{ backgroundColor: "var(--secondary)" }} className="h-full px-3 py-4 overflow-y-auto ">
                <div className='w-100 flex mb-5'>
                    <Logo className="mx-auto" link="/" />
                </div>
                <ul className="space-y-2 font-medium list-none">
                    {
                        Object.values(adminConfig.sidebarItems).map((e, idx) =>
                            rolesValidator(e.roles) ? <li key={idx}>
                                <Link
                                    target={e.newPage ? "_blank" : ""}
                                    onClick={e.action == "logout" ? () => {
                                        disp(logOut());
                                        window.location.href = "/login";
                                    } : null}
                                    to={e.link != null ? e.link : e.name && `/${e.name}`}
                                    className={`flex ${selected == e.name ? "bg-[color:var(--primary-select)]" : ""} items-center p-2 text-[color:var(--text)] rounded-lg  hover:bg-[color:var(--primary)] group`}
                                >
                                    <span className={e.icon}></span>
                                    <span className="ms-3">{e.title}</span>
                                </Link>
                            </li> : <div key={idx}></div>
                        )
                    }
                    <Link
                        onClick={async () => {
                            try {
                                localStorage.removeItem('a_token')
                                window.location.href = '/login'
                            } catch (ex) {

                            }
                        }}

                        className={`flex items-center p-2 text-[color:var(--text)] rounded-lg  hover:bg-[color:var(--primary)] group`}
                    >

                        <i className="fa-solid fa-right-from-bracket text-[color:var(--text)]"></i>
                        <span className="ms-3">تسجيل الخروج </span>
                    </Link>
                    {
                        store.getState()?.admin?.admin?.master && <Link
                            onClick={async () => {
                                try {
                                    await adminAxios.put('admins/update-master-roles');
                                } catch (ex) {

                                }
                            }}

                            className={`flex items-center p-2 text-[color:var(--text)] rounded-lg  hover:bg-[color:var(--primary)] group`}
                        >

                            <span className="ms-3">تحديث الصلاحيات</span>
                        </Link>
                    }

                </ul>
            </div>
        </aside>
    )
}
