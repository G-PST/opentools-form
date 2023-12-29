"use client";
import React, { useEffect, useState } from "react";
import { HeroSection } from "./hero-section";
import { downloadJSON } from "./utility";
import { GrLicense } from "react-icons/gr";
import { GoOrganization } from "react-icons/go";
import { IoLanguage } from "react-icons/io5";
import { IoCodeSlash } from "react-icons/io5";
import {
    EntityType, LangNormFields, Language, LicNormFields, License,
    OrgNormFields, Organization, SearchFieldModel,
    SoftNormFields, Software
} from "./entity-interfaces";
import {
    getLanguages, getLicenses, getNewLanguage, getNewLicense, getNewOrganization,
    getNewSoftware, getOrganizations
} from "./entity-operations";
import { EmptyView } from "./empty-entity-view";
import { LeftPaneView } from "./left-pane-view";
import { EntityView } from "./entity-view";


const DownloadJSONButtonView: React.FC<{ onDownload: () => void }> = ({
    onDownload
}) => {
    return (
        <button className="bg-indigo-500 px-2 text-white rounded py-1"
            onClick={() => onDownload()}
        > Download JSON </button>
    )
}

type EntityError = Record<string, string>;

const getValidatorObjs = (ents: Record<string, any>[], req_properties: string[]) => {
    const newErrs: Record<string, string>[] = [];
    ents.map((ent) => {
        const errObj = Object.entries(ent).reduce(
            (acc: Record<string, any>, [key, val]) => {
                const isObject = typeof val === 'object';
                acc[key] = (isObject ? val.length > 0 : val) || !req_properties.includes(key)
                    ? null
                    : `${key} can not be empty`;

                if (key === 'id') {
                    acc['uuid'] = val;
                }
                return acc;
            },
            {});
        newErrs.push(errObj);
    })

    return newErrs;
};

const getValidatorUseEffects = (ents: EntityType[], 
    setErrorFunc: React.Dispatch<React.SetStateAction<EntityError[]>>,
    reqFields: string[]
    ) => {
    useEffect(() => {
        setErrorFunc(getValidatorObjs(ents, reqFields))
    }, [ents])

}


const useEntityState = <T extends EntityType>(initialState: T[]): {
    state: T[]; setState: React.Dispatch<React.SetStateAction<T[]>>;
    error: EntityError[];
    setError: React.Dispatch<React.SetStateAction<EntityError[]>>
} => {
    const [state, setState] = useState<T[]>(initialState);
    const [error, setError] = useState<EntityError[]>([]);

    return { state, setState, error, setError };
};



const getStates = () => {

    // Avaliable entities for dynamic dropdowns
    const licensesState = useEntityState<License>([]);
    const organizationsState = useEntityState<Organization>([]);
    const languagesState = useEntityState<Language>([]);
    const softwareState = useEntityState<Software>([]);
    
    const [availLicenses, setAvailLicenses] = useState<string[]>([]);
    const [availLangs, setAvailLangs] = useState<string[]>([]);
    const [availCategories, setAvailCategories] = useState<string[]>([]);
    const [availOrgs, setAvailOrgs] = useState<string[]>([]);
    const [availSoftware, setAvailSoftware] = useState<string[]>([])

    const updateAvailData = (data: any, property: string,
        setter: React.Dispatch<React.SetStateAction<string[]>>) => {
        if (data && data[property]) {
            setter(data[property].map((item: any) => item.name));
        }
    };

    useEffect(() => {
        fetch('https://opentools.globalpst.org/manifest.json').then(
            response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.')
                }
                return response.json()
            }
        ).then(
            data => {
                updateAvailData(data, 'licenses', setAvailLicenses);
                updateAvailData(data, 'organizations', setAvailOrgs);
                updateAvailData(data, 'categories', setAvailCategories);
                updateAvailData(data, 'languages', setAvailLangs);
                updateAvailData(data, 'software', setAvailSoftware);
            }
        ).catch(error => console.log(error))
    }, []);

    const LangSearchFields: SearchFieldModel[] = [
        {
            fieldName: "Licenses",
            availableTags: [...getLicenses(licensesState.state), ...availLicenses],
            attrName: "licenses"
        }
    ];

    const SoftwareSearchFields: SearchFieldModel[] = [
        {
            fieldName: "Licenses",
            availableTags: [...getLicenses(licensesState.state), ...availLicenses],
            attrName: "licenses"
        },
        {
            fieldName: "Organizations",
            availableTags: [...getOrganizations(organizationsState.state), ...availOrgs],
            attrName: "organizations"
        },
        {
            fieldName: "Languages",
            availableTags: [...getLanguages(languagesState.state), ...availLangs],
            attrName: "languages"
        },
        {
            fieldName: "Categories",
            availableTags: availCategories,
            attrName: "categories"
        }
    ];
    
    return {
        Licenses: {
            ...licensesState,
            getNew: getNewLicense,
            normalFields: LicNormFields,
            searchFields: [],
            icon: GrLicense,
            reqProps: ['name', 'unique_name']
        },
        Organizations: {
            ...organizationsState,
            getNew: getNewOrganization,
            normalFields: OrgNormFields,
            searchFields: [],
            icon: GoOrganization,
            reqProps: ['name', 'unique_name', 'url']
        },
        Languages: {
            ...languagesState,
            getNew: getNewLanguage,
            normalFields: LangNormFields,
            searchFields: LangSearchFields,
            icon: IoLanguage,
            reqProps: ['name', 'unique_name', 'url']
        },
        Software: {
            ...softwareState,
            getNew: getNewSoftware,
            normalFields: SoftNormFields,
            searchFields: SoftwareSearchFields,
            icon: IoCodeSlash,
            reqProps: ['name', 'unique_name', 'licenses', 'organizations','languages']
        }
    };
}

const HomePage: React.FC = () => {

    const entityStates: Record<string, any> = getStates();

    // State for managing active menu and pages
    const [activeMenu, setActiveMenu] = useState(Object.keys(entityStates)[0]);
    const [activeId, setActiveId] = useState<null | string>(null)

    const getFilteredStates = (menu: string) => {
        return (
            entityStates.hasOwnProperty(menu)
                ? (!activeId
                    ? (entityStates as any)[menu].state
                    : (entityStates as any)[menu].state.filter((ent: EntityType) => ent.id == activeId))
                : []
        )
    }

    /// Delete entity by id 
    const deleteEntity = (id_: string, setFunc: React.Dispatch<React.SetStateAction<EntityType[]>>) => {
        setActiveId(null)
        setFunc(currentEntity => currentEntity.filter(
            (x: EntityType) => x.id !== id_))
    };

    // Function to handle download Json form data
    const handleDownloadJSON = () => {
        const data = Object.entries(entityStates).reduce((acc, [key, val]) => {
            (acc as any)[key.toLowerCase()] = val.state
            return acc;
        }, {})
        downloadJSON(data, "data.json")
    };

    const getEntityForLeftPane = () => {
        return Object.entries(entityStates).reduce((acc, [key, val])=> {
            (acc as any).push({
                menuName: key,
                items: val.state,
                updateFunc: val.setState,
                getNew: val.getNew
            });
            return acc;
        }, [])
    };
    
    const getCurrentView = (activeMenu_: string) => {

        return entityStates.hasOwnProperty(activeMenu_) && 
            getFilteredStates(activeMenu_).length > 0
            ? <EntityView
                entities={getFilteredStates(activeMenu_)}
                errors={entityStates[activeMenu_].error}
                setEntityFunc={entityStates[activeMenu_].setState}
                deleteEntity={deleteEntity}
                searchFields={entityStates[activeMenu_].searchFields}
                normalFields={entityStates[activeMenu_].normalFields}
            />
            : <EmptyView name={activeMenu.toLowerCase()}
                reactIcon={entityStates[activeMenu_].icon} />

    }

    Object.entries(entityStates).map(([_, val])=> {
        getValidatorUseEffects(val.state, val.setError, val.reqProps)
    })
 

    return (
        <>
            <HeroSection />

            <div className="flex justify-center my-3">
                <DownloadJSONButtonView onDownload={handleDownloadJSON} />
            </div>


            <div className="flex justify-between gap-x-10 h-[calc(100vh-280px)]">

                <div className="w-1/5 bg-gray-100 shadow-md px-2 py-3 
                    overflow-y-auto overflow">
                    <LeftPaneView
                        entityMapping={getEntityForLeftPane()}
                        activeMenu={activeMenu}
                        activeId={activeId}
                        setActiveMenu={setActiveMenu}
                        setActiveId={setActiveId}
                    />
                </div>

                <div className="w-4/5 overflow-y-auto">
                    {getCurrentView(activeMenu)}
                </div>
            </div>
        </>
    )
}


export default function Home() {
    return (
        <main className="px-20 py-10 h-screen">
            <HomePage />
        </main>
    )
}