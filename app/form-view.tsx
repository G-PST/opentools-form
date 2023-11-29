import { FormPageProps, FormOption } from "./interface"
import { INPUTSTYLE } from "./constants"
import { getKeyName } from "./utility"

export const FormView: React.FC<FormPageProps> = ({ options, formData, setFormData, errors }) => {

    return (
        <div className="grid grid-cols-2 gap-10">

            {
                options.map(
                    (option: FormOption) => {
                        return (
                            <div className="px-3" key={option.name}>

                                <p className="pb-2"> 
                                    {option.displayName}   
                                    <span className="text-red-500"> {option.required ? " (required)": null}</span>  
                                </p>

                                <input
                                name={getKeyName(option)}
                                value={formData[getKeyName(option)]}
                                type={option.type}
                                className={`${INPUTSTYLE} ${errors[getKeyName(option)] ? " border-red-500" : ""}`}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setFormData((prev: any) => { return { ...prev, [e.target.name]: e.target.value } })}
                                />

                                {errors[getKeyName(option)] && <p className="text-red-500 py-1 text-sm"> {errors[getKeyName(option)]} </p>}
                            </div>
                        )
                    }
                )
            }

        </div>
    )
}