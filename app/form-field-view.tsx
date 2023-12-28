import { INPUTSTYLE } from "./constants";
import { InputLabelView } from "./input-label-view";

interface FormFieldViewProps {
    fieldName: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

export const FormFieldView: React.FC<FormFieldViewProps> = ({
    fieldName, value, onChange, placeholder
}) => {
    return (
        <div>
            <InputLabelView text={fieldName} />
            <input
                className={INPUTSTYLE}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    )
}
