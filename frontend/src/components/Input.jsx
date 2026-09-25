function Input({
    label,
    type = "text",
    placeholder , 
    value , 
    onChange,
    name
}){
    return(
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input 
                type = {type} 
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
        </div>
    );
}

export default Input;