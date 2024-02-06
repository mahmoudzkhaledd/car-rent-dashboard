
export default function PricingComponent({ freePeriod, title, description, price, advantages, className }) {


    return (
        <div className={`${className} flex flex-col p-6 mx-auto  text-center text-gray-900 bg-[color:var(--secondary)] rounded-lg border border-gray-100 shadow `}>
            <h3 className="mb-4 text-2xl font-semibold">{title || "اسم الباقة"}</h3>
            <h4 className="mb-4 text-xl ">أحصل على {freePeriod || 0} شهر مجاني</h4>
            
            <p className="font-light text-fade sm:text-lg ">
                {description || "التفاصيل"}
            </p>
            <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">${price || 0}</span>
            </div>
            <hr className="mb-4" />
            <ul role="list" className="mb-8 space-y-4 text-left">
                {
                    advantages?.map((e, idx) => <li key={idx} className="flex items-center gap-3">
                        <i className={`fa-solid fa-${e.active ? "check" : "xmark"} text-[color:var(--primary)]`}></i>
                        <span>{e?.description}</span>
                    </li>)
                }

            </ul>
        </div>
    )
}
