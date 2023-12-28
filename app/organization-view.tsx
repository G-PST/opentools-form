import DeleteEntityView from "./delete-entity-view";
import { Organization } from "./entity-interfaces";
import { FormFieldView } from "./form-field-view";

interface OrganizationViewProps {
    organizations: Organization[];
    setOrganizations: React.Dispatch<React.SetStateAction<Organization[]>>;
    deleteEntity: (id_: string, setFunc: React.Dispatch<React.SetStateAction<Organization[]>>) => void;
};

type NonOrgSearchAttrs = ('name' | 'id' | 'description' | 'url');
interface NonOrgSearchFieldModel {
    displayName: string;
    placeHolderName: string;
    attrName: NonOrgSearchAttrs
};

export const OrganizationView: React.FC<OrganizationViewProps> = ({ organizations, setOrganizations, deleteEntity }) => {

    const nonSearchableFields: NonOrgSearchFieldModel[] = [
        {
            displayName: "Unique ID",
            placeHolderName: "Enter unique identifier.",
            attrName: "id"
        },
        {
            displayName: "Organization Name",
            placeHolderName: "Enter organization name.",
            attrName: "name"
        },
        {
            displayName: "Organization Description",
            placeHolderName: "Enter organization description.",
            attrName: "description"
        },
        {
            displayName: "Organization URL",
            placeHolderName: "Enter organization url.",
            attrName: "url"
        },
    ];

    const onValueChange = (
        text: string,
        id_: string,
        property_: NonOrgSearchAttrs
    ) => {
        setOrganizations((currentOrg) => currentOrg.map(
            (x: Organization) => x.id === id_ ? { ...x, [property_]: text } : x
        ))
    }

    return (
        <>
            {
                organizations.map((org: Organization) => {
                    return (<div key={org.id} className="mb-3 bg-gray-100 p-5 shadow-md relative 
                                grid grid-cols-2 gap-5">

                        <DeleteEntityView onDelete={() => deleteEntity(org.id, setOrganizations)} />
                        {
                            nonSearchableFields.map((field: NonOrgSearchFieldModel) => {
                                return (
                                    <FormFieldView
                                        key={field.displayName}
                                        fieldName={field.displayName}
                                        placeholder={field.placeHolderName}
                                        value={org[field.attrName]}
                                        onChange={(text: string) => onValueChange(text, org.id, field.attrName)}
                                    />
                                )
                            })
                        }
                    </div>)
                })
            }


        </>
    )
}