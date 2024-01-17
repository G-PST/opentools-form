import { generate } from "shortid";
import { EntityType } from "./entity-interfaces";
import { error } from "console";

export interface entityMappingModel {
    menuName: string;
    errors: Record<string, string>[];
    items: EntityType[];
    updateFunc: React.Dispatch<React.SetStateAction<any[]>>
    getNew: (id_: string) => Record<any, any>
}

interface LeftSubMenuItemProps {
    name: string
    numErr: number
    itemId: string
    highlight: boolean;
    onSubMenuClick: () => void;
}

const LeftSubMenuItem: React.FC<LeftSubMenuItemProps> = ({
    name, numErr, itemId, highlight, onSubMenuClick
}) => {
    return (
        <p
            className={`pb-1 mb-2 hover:cursor-pointer 
                        hover:font-bold text-gray-500 px-2 w-max
                ${highlight &&
                ' text-orange-600 underline'}`}
            key={itemId}
            onClick={() => onSubMenuClick()}
        >  {name} <span className="bg-gray-200 px-1 rounded-md">ID: {itemId} </span>
            {
                numErr> 0 && <span className="ml-2 bg-red-500 
                rounded-full px-2 text-white"> {numErr} </span>
            }
        </p>
    )
}

interface LeftPaneViewProps {
    entityMapping: entityMappingModel[];
    activeMenu: string;
    activeId: string | null;
    setActiveMenu: React.Dispatch<React.SetStateAction<string>>;
    setActiveId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const LeftPaneView: React.FC<LeftPaneViewProps> = ({
    entityMapping, activeMenu, activeId, setActiveMenu, setActiveId
}) => {

    const handleMenuItemClick = (entity: entityMappingModel): void => {
        setActiveMenu(entity.menuName);
        setActiveId(null);
    };

    const handleAddNewClick = (entity: entityMappingModel): void => {
        const randId = generate();
        setActiveMenu(entity.menuName);
        setActiveId(randId);
        entity.updateFunc((currentVal) => [...currentVal, entity.getNew(randId)]);
    };

    const handleSubMenuClick = (itemMenu: string, itemId: string) => {
        setActiveMenu(itemMenu)
        setActiveId(itemId)
    };

    return (
        <>
            {
                entityMapping.map((entity) => {
                    return <>
                        <div className="flex gap-x-3 my-5 mx-5">
                            <p className={`hover:cursor-pointer 
                                rounded-md font-bold hover:text-blue-500
                                    ${activeMenu === entity.menuName ? ' text-orange-500 font-bold' : ''}`}
                                onClick={() => handleMenuItemClick(entity)}
                            >
                                {entity.menuName}
                            </p>
                            <p className="border border-dashed border-2 border-blue-500 px-1 rounded-md text-sm flex 
                                        items-center hover:cursor-pointer hover:bg-blue-500 
                                        hover:text-white"
                                onClick={() => handleAddNewClick(entity)}
                            > + Add New </p>
                        </div>

                        <div className="pl-10">
                            {
                                entity.items.map((subitem) => {
                                    const filteredErr = entity.errors.filter((err) => err.uuid == subitem.id)[0];
                                    
                                    return (
                                        <LeftSubMenuItem
                                            name={subitem.name}
                                            numErr={filteredErr ? Object.entries(filteredErr).reduce((acc, [key, val]) => {
                                                if (key != 'uuid' && val != null) {
                                                    acc += 1
                                                }
                                                return acc
                                            }, 0) : 0}
                                            itemId={subitem.unique_name}
                                            highlight={activeId === subitem.id && activeMenu === entity.menuName}
                                            onSubMenuClick={() => handleSubMenuClick(entity.menuName, subitem.id)}
                                        />
                                    )
                                })
                            }
                        </div>
                    </>

                })
            }
        </>
    )
}

