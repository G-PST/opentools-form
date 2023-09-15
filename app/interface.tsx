export interface FormMenuInterface {
    name: string
    component: React.FC<FormPageProps>
};

export interface LicenseInterface {
    name: string;
    id: string;
}

export interface LanguageInterface {
    name: string;
}

export interface FormPageProps {
    formData: Record<string, any>
    setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>
    errors: Record<string, any>
};