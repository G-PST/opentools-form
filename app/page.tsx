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
import { UploadJSONSection } from "./custom-upload";


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

const useValidators = (ents: EntityType[],
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



const useGetStates = () => {

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
            setter(data[property].map((item: any) => `${item.name} (${item.id})`));
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
        Software: {
            ...softwareState,
            getNew: getNewSoftware,
            normalFields: SoftNormFields,
            searchFields: SoftwareSearchFields,
            icon: IoCodeSlash,
            reqProps: ['name', 'unique_name', 'licenses', 'organizations', 'languages']
        },
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
        }
    };
}

const HomePage: React.FC = () => {

    const entityStates: Record<string, any> = useGetStates();

    // State for managing active menu and pages
    const [activeMenu, setActiveMenu] = useState(Object.keys(entityStates)[0]);
    const [activeId, setActiveId] = useState<null | string>(null);

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

    const handleUploadJSON = (content: Record<any, any>) => {
        if (content.licenses) {
            entityStates.Licenses.setState(content.licenses)
        }
        if (content.organizations) {
            entityStates.Organizations.setState(content.organizations)
        }
        if (content.languages) {
            entityStates.Languages.setState(content.languages)
        }
        if (content.software) {
            entityStates.Software.setState(content.software)
        }
    };

    const getEntityForLeftPane = () => {
        return Object.entries(entityStates).reduce((acc, [key, val]) => {
            (acc as any).push({
                menuName: key,
                errors: val.error,
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

    Object.entries(entityStates).map(([_, val]) => {
        // eslint-disable-next-line
        useValidators(val.state, val.setError, val.reqProps) 
    })

    const hasErrors = () => {
        const hasErrVal = Object.entries(entityStates).reduce((acc, [key, val]) => {
            acc += val.error.map((err: Record<string, string>) => Object.entries(err).reduce(
                (acc_, [key_, val_]) => {
                    if (key_ != 'uuid' && val_ != null) {
                        acc_ += 1
                    }
                    return acc_
                }, 0
            )).reduce((accumulator: number, currentVal: number) => { return accumulator + currentVal }, 0)
            return acc
        }, 0)
        return hasErrVal == 0;
    }

    return (
        <>
            <HeroSection />

            {
                hasErrors() && <div className="flex justify-center gap-x-10 mb-3 items-center">
                    <DownloadJSONButtonView onDownload={handleDownloadJSON} />
                    <UploadJSONSection setFormData={handleUploadJSON} />
                </div>
            }


            <div className="flex flex-col gap-y-5 md:flex-row justify-between gap-x-10 h-[calc(100vh-280px)]">

                <div className="w-full md:w-2/5 bg-gray-100 shadow-md px-2 py-3 
                    md:overflow-y-auto overflow">
                    <LeftPaneView
                        entityMapping={getEntityForLeftPane()}
                        activeMenu={activeMenu}
                        activeId={activeId}
                        setActiveMenu={setActiveMenu}
                        setActiveId={setActiveId}
                    />
                </div>

                <div className="w-full md:w-3/5 md:overflow-y-auto">
                    {getCurrentView(activeMenu)}
                </div>
            </div>
        </>
    )
}


export default function Home() {
    return (
        <>
            <header>
                <div id="header-contents">
                    <a id="header-title" href="{{site.baseurl}}">
                        <img src="https://globalpst.org/wp-content/uploads/GPSTC-logo-blk-x2.png" alt="Global Power System Transformation Consortium" />
                        <h1 >Open Tools Portal</h1>
                    </a>
                    <nav id="header-nav"></nav>
                    <a id="header-button" href="{{site.baseurl}}contribute">Contribute</a>
                </div>
            </header>
            <main>
                <div className="relative py-5 h-screen">
                    <HomePage />
                </div>
            </main>

            <footer><div id="footer-contents">
                <p id="footer-blurb">

                    <a href="https://globalpst.org/">The Global Power Transformation Consortium</a>&apos;s
                    <a href="https://globalpst.org/what-we-do/open-data-tools/">
                        Pillar on Open Data and Tools
                    </a>
                    (&quot;Pillar 5&quot;) works to advance the open source power system
                    modeling and operations ecosystem, and
                    supports the development and application of open tools and data
                    by partner system operators and the open source community.
                </p>
                <div id="footer-socials">
                    <ul>
                        <li><a href="https://www.linkedin.com/company/global-pst/" target="_blank" rel="noopener"><svg data-prefix="fab" data-icon="linkedin-in" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg></a></li>
                        <li><a target="_blank" href="https://twitter.com/global_pst" rel="noopener"><svg data-prefix="fab" data-icon="x-twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path></svg></a></li>
                        <li><a href="https://www.youtube.com/channel/UCNHmlGlkAwcmniv5uJT3Ptg" target="_blank" rel="noopener"><svg data-prefix="fab" data-icon="youtube" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path></svg></a></li>
                    </ul>
                </div>
            </div></footer>
        </>
    )
}