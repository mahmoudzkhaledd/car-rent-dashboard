
export default function CheckBox({ className = "", onChanged, id, defaultValue, defaultChecked, text = "", name = "" }) {

    id = id || `${Math.random() * Math.random()}`;
    return (
        <div className={className}>
            <input
                id={id}
                type="checkbox"
                defaultValue={defaultValue}
                name={name}
                onChange={onChanged}
                defaultChecked={defaultChecked}
                className="w-4 h-4 text-inherit bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  "
            />
            <label
                htmlFor={id}
                className="ml-2 text-sm font-medium text-inherit"
            >
                {text}
            </label>
        </div>
    )
}
