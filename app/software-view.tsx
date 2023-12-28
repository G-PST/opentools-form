import DeleteEntityView from "./delete-entity-view";
import { Software } from "./entity-interfaces";
import { FormFieldView } from "./form-field-view";
import SearchableFieldView from "./search-field-view";

interface SoftwareViewProps {
    software: Software[];
    setSoftware: React.Dispatch<React.SetStateAction<Software[]>>;
    availLicenses: string[];
    availCategories: string[];
    availOrgs: string[];
    availLangs: string[];
    deleteEntity: (id_: string, setFunc: React.Dispatch<React.SetStateAction<Software[]>>) => void
}

type SoftwareSearchAttrs = ('licenses' | 'categories' | 'languages' | 'organizations');
interface SoftSearchFieldModel {
    fieldName: string;
    availableTags: string[];
    attrName: SoftwareSearchAttrs
};


type NonSoftwareSearchAttrs = ('name' | 'id' | 'description' | 'url_website' | 'url_sourcecode' | 'url_docs');
interface NonSoftSearchFieldModel {
    displayName: string;
    placeHolderName: string;
    attrName: NonSoftwareSearchAttrs
};

export const SoftwareView: React.FC<SoftwareViewProps> = ({ software, setSoftware,
    availLicenses, availCategories, availOrgs, availLangs, deleteEntity
}) => {

    const onTagDelete = (
        text: string,
        id_: string,
        property_: SoftwareSearchAttrs
    ) => {
        setSoftware(currentSoft => currentSoft.map(
            (x) => x.id === id_ ?
                { ...x, [property_]: x[property_].filter((l) => l !== text) } : x
        ))
    };

    const onTagAdd = (
        text: string,
        id_: string,
        property_: SoftwareSearchAttrs
    ) => {
        setSoftware(currentSoft => currentSoft.map((x: Software) => x.id === id_ ?
            { ...x, [property_]: x[property_].includes(text) ? x[property_] : [...x[property_], text] } : x))
    };


    const onValueChange = (
        text: string,
        id_: string,
        property_: NonSoftwareSearchAttrs
    ) => {
        setSoftware((currentSoft) => currentSoft.map(
            (x: Software) => x.id === id_ ? { ...x, [property_]: text } : x
        ))
    }

    const nonSearchableFields: NonSoftSearchFieldModel[] = [
        {
            displayName: "Unique ID",
            placeHolderName: "Enter unique identifier.",
            attrName: "id"
        },
        {
            displayName: "Software Name",
            placeHolderName: "Enter software name",
            attrName: "name"
        },
        {
            displayName: "Software Description",
            placeHolderName: "Enter software description.",
            attrName: "description"
        },
        {
            displayName: "Website URL",
            placeHolderName: "Enter url of the website for software.",
            attrName: "url_website"
        },
        {
            displayName: "Sourcecode URL",
            placeHolderName: "Enter url for software codebase.",
            attrName: "url_sourcecode"
        },
        {
            displayName: "Docs URL",
            placeHolderName: "Enter url for software documentation.",
            attrName: "url_docs"
        }
    ];

    const searchableFields: SoftSearchFieldModel[] = [
        {
            fieldName: "Licenses",
            availableTags: availLicenses,
            attrName: "licenses"
        },
        {
            fieldName: "Organizations",
            availableTags: availOrgs,
            attrName: "organizations"
        },
        {
            fieldName: "Languages",
            availableTags: availLangs,
            attrName: "languages"
        },
        {
            fieldName: "Categories",
            availableTags: availCategories,
            attrName: "categories"
        }
    ]


    return (
        <>

            {
                software.map(soft => {
                return  <div
                            key={soft.id}
                            className="mb-3 bg-gray-100 p-5 shadow-md relative 
                                    grid grid-cols-2 gap-5">
                            <DeleteEntityView onDelete={() => deleteEntity(soft.id, setSoftware)} />
                            {
                                nonSearchableFields.map((field: NonSoftSearchFieldModel) => {
                                return (
                                    <FormFieldView
                                        key={field.displayName}
                                        fieldName={field.displayName}
                                        placeholder={field.placeHolderName}
                                        value={soft[field.attrName]}
                                        onChange={(text: string) => onValueChange(text, soft.id, field.attrName)}
                                    />
                                )
                                })
                            }
                            {
                                searchableFields.map((field: SoftSearchFieldModel) => {
                                return (
                                    <SearchableFieldView
                                        key={field.fieldName}
                                        fieldName={field.fieldName}
                                        availTags={field.availableTags}
                                        attachedTags={soft[field.attrName]}
                                        onAdd={(text: string) => onTagAdd(text, soft.id, field.attrName)}
                                        onDelete={(text: string) => onTagDelete(text, soft.id, field.attrName)}
                                    />
                                )
                                })
                            }

                        </div>
                })}
        </>
    )
}
