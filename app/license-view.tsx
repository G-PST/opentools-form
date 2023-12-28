import DeleteEntityView from "./delete-entity-view";
import { License } from "./entity-interfaces";
import { FormFieldView } from "./form-field-view";

interface LicenseViewProps {
    licenses: License[];
    setLicenses: React.Dispatch<React.SetStateAction<License[]>>
    deleteEntity: (id_: string, setFunc: React.Dispatch<React.SetStateAction<License[]>>) => void
}

type NonLicSearchAttrs = ('name' | 'id' );
interface NonLicSearchFieldModel {
    displayName: string;
    placeHolderName: string;
    attrName: NonLicSearchAttrs
};


export const LicenseView: React.FC<LicenseViewProps> = ({ licenses, setLicenses, deleteEntity }) => {
    
    const nonSearchableFields: NonLicSearchFieldModel[] = [
        {
            displayName: "Unique ID",
            placeHolderName: "Enter unique identifier.",
            attrName: "id"
        },
        {
            displayName: "License Name",
            placeHolderName: "Enter license name",
            attrName: "name"
        },
    ];

    const onValueChange = (
        text: string,
        id_: string,
        property_: NonLicSearchAttrs
    ) => {
        setLicenses((currentLic) => currentLic.map(
            (x: License) => x.id === id_ ? { ...x, [property_]: text } : x
        ))
    }
    
    return (<>
        {
            licenses.map((license: License) => {
                return <div key={license.id} className="mb-3 bg-gray-100 p-5 shadow-md relative">
                    <DeleteEntityView onDelete={() => deleteEntity(license.id, setLicenses)} />
                    {
                        nonSearchableFields.map((field: NonLicSearchFieldModel) => {
                        return (
                        <FormFieldView
                                    key={field.displayName}
                                    fieldName={field.displayName}
                                    placeholder={field.placeHolderName}
                                    value={license[field.attrName]}
                                    onChange={(text: string) => onValueChange(text, license.id, field.attrName)}
                                />
                                )
                        })
                    }
                </div>
            })
        }</>)
};
