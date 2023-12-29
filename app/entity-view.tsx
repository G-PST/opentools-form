import DeleteEntityView from "./delete-entity-view";
import { EntityType, NormalFieldModel, SearchFieldModel } from "./entity-interfaces";
import { getErrorString } from "./entity-operations";
import { FormFieldView } from "./form-field-view";
import SearchableFieldView from "./search-field-view";


interface EntityViewProps {
    normalFields: NormalFieldModel[];
    searchFields: SearchFieldModel[];
    entities: EntityType[];
    errors: Record<string, string>[];
    setEntityFunc: React.Dispatch<React.SetStateAction<EntityType[]>>
    deleteEntity: (id_: string, setFunc: React.Dispatch<React.SetStateAction<EntityType[]>>) => void
}

export const EntityView: React.FC<EntityViewProps> = ({
    normalFields, searchFields, entities, errors, setEntityFunc, deleteEntity
}) => {

    const onTagDelete = (
        text: string,
        id_: string,
        property_: string
    ) => {
        setEntityFunc(currentEnt => currentEnt.map(
            (x) => x.id === id_ ?
                { ...x, [property_]: (x as any)[property_].filter((l) => l !== text) } : x
        ))
    };

    const onTagAdd = (
        text: string,
        id_: string,
        property_: string
    ) => {
        setEntityFunc(currentEnt => currentEnt.map((x) => x.id === id_ ?
            { ...x, [property_]: (x as any)[property_].includes(text) ? (x as any)[property_] : [...(x as any)[property_], text] } : x))
    };

    const onValueChange = (
        text: string,
        id_: string,
        property_: string
    ) => {
        setEntityFunc((currentEnt) => currentEnt.map(
            (x) => x.id === id_ ? { ...x, [property_]: text } : x
        ))
    };

    return (
        <>
            {
                entities.map((ent: EntityType) => {
                    return <div key={ent.id} className="mb-3 bg-gray-100 p-5 shadow-md relative 
                grid grid-cols-2 gap-5">

                        <DeleteEntityView onDelete={() => deleteEntity(ent.id, setEntityFunc)} />
                        {
                            normalFields.map((field: NormalFieldModel) => {
                                return (
                                    <FormFieldView
                                        key={field.displayName}
                                        fieldName={field.displayName}
                                        error={getErrorString(errors, ent.id, field.attrName)}
                                        placeholder={field.placeHolderName}
                                        value={(ent as any)[field.attrName]}
                                        onChange={(text: string) => onValueChange(text, ent.id, field.attrName)}
                                    />
                                )
                            })
                        }
                        {
                            searchFields.map((field: SearchFieldModel) => {
                                return (
                                    <SearchableFieldView
                                        key={field.fieldName}
                                        fieldName={field.fieldName}
                                        availTags={field.availableTags}
                                        attachedTags={(ent as any)[field.attrName]}
                                        onAdd={(text: string) => onTagAdd(text, ent.id, field.attrName)}
                                        onDelete={(text: string) => onTagDelete(text, ent.id, field.attrName)}
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