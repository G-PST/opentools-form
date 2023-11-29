export interface FormOption {
    name: string
    type: "text" | "number"
    displayName: string
    required: boolean
    category: string
}

export interface FormMenuInterface {
    name: string
    options: FormOption[]
};

export interface LicenseInterface {
    name: string;
    id: string;
}

export interface LanguageInterface {
    name: string;
}

export interface FormPageProps {
    options: FormOption[]
    formData: Record<string, any>
    setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>
    errors: Record<string, any>
};