import { INPUTSTYLE } from "./constants";
import { InputLabelView } from "./input-label-view";

interface FormFieldViewProps {
    fieldName: string;
    error: string | null;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

export const FormFieldView: React.FC<FormFieldViewProps> = ({
    fieldName, error, value, onChange, placeholder
}) => {
    return (
        <div>
            <InputLabelView text={fieldName} />
            <input
                className={`${INPUTSTYLE} ${error ? 'border-red-500': ''}`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
            {error && <p className="text-red-500 text-sm"> {error} </p>}
        </div>
    )
}
