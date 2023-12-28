import DeleteEntityView from "./delete-entity-view";
import { Language } from "./entity-interfaces";
import { FormFieldView } from "./form-field-view";
import SearchableFieldView from "./search-field-view";

interface LangugaeViewProps {
    languages: Language[];
    availLicenses: string[];
    setLanguages: React.Dispatch<React.SetStateAction<Language[]>>;
    deleteEntity: (id_: string, setFunc: React.Dispatch<React.SetStateAction<Language[]>>) => void
}

type LanguageSearchAttrs = ('licenses');
interface LangSearchFieldModel {
    fieldName: string;
    availableTags: string[];
    attrName: LanguageSearchAttrs
};


type NonLangSearchAttrs = ('name' | 'id' | 'description' | 'url');
interface NonLangSearchFieldModel {
    displayName: string;
    placeHolderName: string;
    attrName: NonLangSearchAttrs;
};


export const LanguageView: React.FC<LangugaeViewProps> = ({ languages, availLicenses, setLanguages, deleteEntity }) => {
    
    const onTagDelete = (
        text: string,
        id_: string,
        property_: LanguageSearchAttrs
    ) => {
        setLanguages(currentLang => currentLang.map(
            (x) => x.id === id_ ?
                { ...x, [property_]: x[property_].filter((l) => l !== text) } : x
        ))
    };

    const onTagAdd = (
        text: string,
        id_: string,
        property_: LanguageSearchAttrs
    ) => {
        setLanguages(currentLang => currentLang.map((x: Language) => x.id === id_ ?
            { ...x, [property_]: x[property_].includes(text) ? x[property_] : [...x[property_], text] } : x))
    };


    const onValueChange = (
        text: string,
        id_: string,
        property_: NonLangSearchAttrs
    ) => {
        setLanguages((currentLang) => currentLang.map(
            (x: Language) => x.id === id_ ? { ...x, [property_]: text } : x
        ))
    };

    const nonSearchableFields: NonLangSearchFieldModel[] = [
        {
            displayName: "Unique ID",
            placeHolderName: "Enter unique identifier.",
            attrName: "id"
        },
        {
            displayName: "Language Name",
            placeHolderName: "Enter language name",
            attrName: "name"
        },
        {
            displayName: "Language Description",
            placeHolderName: "Enter language description.",
            attrName: "description"
        },
        {
            displayName: "Language URL",
            placeHolderName: "Enter url of the language",
            attrName: "url"
        }
    ];

    const searchableFields: LangSearchFieldModel[] = [
        {
            fieldName: "Licenses",
            availableTags: availLicenses,
            attrName: "licenses"
        }
    ];

    return (
        <>
            {
                languages.map((lang: Language) => {
                    return <div key={lang.id} className="mb-3 bg-gray-100 p-5 shadow-md relative 
                    grid grid-cols-2 gap-5">
                        
                        <DeleteEntityView onDelete={() => deleteEntity(lang.id, setLanguages)} />
                            {
                                nonSearchableFields.map((field: NonLangSearchFieldModel) => {
                                return (
                                    <FormFieldView
                                        key={field.displayName}
                                        fieldName={field.displayName}
                                        placeholder={field.placeHolderName}
                                        value={lang[field.attrName]}
                                        onChange={(text: string) => onValueChange(text, lang.id, field.attrName)}
                                    />
                                )
                                })
                            }
                            {
                                searchableFields.map((field: LangSearchFieldModel) => {
                                return (
                                    <SearchableFieldView
                                        key={field.fieldName}
                                        fieldName={field.fieldName}
                                        availTags={field.availableTags}
                                        attachedTags={lang[field.attrName]}
                                        onAdd={(text: string) => onTagAdd(text, lang.id, field.attrName)}
                                        onDelete={(text: string) => onTagDelete(text, lang.id, field.attrName)}
                                    />
                                )
                                })
                            }
                    </div>
                })
            }

        </>
    )
}