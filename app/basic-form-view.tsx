import { LICENSES, PROGRAMMING_LANGUAGES } from "./constants";
import { FormPageProps, LanguageInterface, LicenseInterface } from "./interface";

export const BasicFormView: React.FC<FormPageProps> = ({
    formData, setFormData, errors
}) => {
    const inputStyle = `outline-none text-orange-700 
      px-2 py-1 border rounded-md outline-none w-full`;
    

    return (
        <>
            <div className="grid grid-cols-2 gap-x-5">

                <div>
                    <p className="pb-2"> Name
                        <span className="text-red-500"> (required) </span></p>
                    <input
                        name="name"
                        value={formData.name}
                        type="text"
                        className={`${inputStyle} ${errors.name ? " border-red-500": ""}`}
                        placeholder="Name of software tool."
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=> 
                            setFormData((prev:any)=> {return {...prev, [e.target.name]: e.target.value}})}
                    />
                    {errors.name && <p className="text-red-500 py-1 text-sm"> {errors.name} </p>}
                </div>

                <div>
                    <p className="pb-2"> URL
                        <span className="text-red-500"> (required) </span></p>
                    <input
                        name="url"
                        value={formData.url}
                        type="text"
                        className={`${inputStyle} ${errors.url ? " border-red-500": ""}`}
                        placeholder="Web URL where the code is hosted."
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=> 
                            setFormData((prev:any)=> {return {...prev, [e.target.name]: e.target.value}})}
                    />
                    {errors.url && <p className="text-red-500 py-1 text-sm"> {errors.url} </p>}
                </div>

            </div>

            <div className="py-5">
                <p className="pb-2"> Description </p>
                <textarea
                    name="description"
                    value={formData.description}
                    className={inputStyle}
                    placeholder="Long description for software tool."
                    onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=> 
                        setFormData((prev:any)=> {return {...prev, [e.target.name]: e.target.value}})}
                />
            </div>

            <div className="grid grid-cols-2 gap-x-5 gap-y-10">

                <div>
                    <p className="pb-2"> Year
                        <span className="text-red-500"> (required) </span></p>
                    <input
                        name="created"
                        type="date"
                        value={formData.created}
                        className={inputStyle}
                        placeholder="Date when software was open sourced."
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=> 
                            setFormData((prev:any)=> {return {...prev, [e.target.name]: e.target.value}})}
                    />
                </div>

                <div>
                    <p className="pb-2"> License
                        <span className="text-red-500"> (required) </span></p>
                    <select className={inputStyle} 
                        name="license" 
                        value={formData.license}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>)=> 
                            setFormData((prev:any)=> {return {...prev, [e.target.name]: e.target.value}})}
                    > 
                        {
                            LICENSES.map((item:LicenseInterface)=> {
                                return <option key={item.id} value={item.name}>
                                        {item.name}
                                </option>
                            })
                        }

                    </select>
                </div>

                <div>
                    <p className="pb-2"> Contact Email
                        <span className="text-red-500"> (required) </span></p>
                    <input
                        name="email"
                        value={formData.email}
                        type="text"
                        className={`${inputStyle} ${errors.email ? " border-red-500": ""}`}
                        placeholder="Contact email if someone wants to reach out to you."
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=> 
                            setFormData((prev:any)=> {return {...prev, [e.target.name]: e.target.value}})}
                    />
                    {errors.email && <p className="text-red-500 py-1 text-sm"> {errors.email} </p>}
                </div>

                <div>
                    <p className="pb-2"> Organization
                        <span className="text-red-500"> (required) </span></p>
                    <input
                        name="organization"
                        value={formData.organization}
                        type="text"
                        className={inputStyle}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=> 
                            setFormData((prev:any)=> {return {...prev, [e.target.name]: e.target.value}})}
                        placeholder="Name of organization which owns the copyright."
                    />
                </div>

                <div>
                    <p className="pb-2"> Programming Language
                        <span className="text-red-500"> (required) </span></p>
                    <select 
                        className={inputStyle}
                        name="language"
                        value={formData.language}
                    > 
                        {
                            PROGRAMMING_LANGUAGES.map((item:LanguageInterface)=> {
                                return <option key={item.name} value={item.name}>
                                        {item.name}
                                </option>
                            })
                        }

                    </select>
                </div>

            </div>

        </>
    )
}