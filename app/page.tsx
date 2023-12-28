"use client";
import React, { useEffect, useState } from "react";
import { INPUTSTYLE } from "./constants";
import generate from "shortid";
import { HeroSection } from "./hero-section";
import { downloadJSON } from "./utility";
import { GrLicense } from "react-icons/gr";
import { GoOrganization } from "react-icons/go";
import { IoLanguage } from "react-icons/io5";
import { IoCodeSlash } from "react-icons/io5";
import { IconType } from "react-icons";
import { text } from "stream/consumers";
import { StringLiteral } from "typescript";

interface License {
    id: string;
    name: string;
}

interface Language {
    id: string;
    name: string;
    licenses: string[];
    url: string;
    description: string
}

interface Organization {
    id: string;
    name: string;
    description: string;
    url: string;
}

interface Software {
    id: string;
    name: string;
    description: string;
    categories: string[];
    languages: string[];
    organizations: string[];
    licenses: string[];
    url_website: string;
    url_sourcecode: string;
    url_docs: string;
}

const getLicenses = (licenses: License[]) => {
    return licenses.map((license: License) => license.name)
}

const getOrganizations = (orgs: Organization[]) => {
    return orgs.map((org: Organization) => org.name)
}

const getLanguages = (langs: Language[]) => {
    return langs.map((lang: Language) => lang.name)
}

const InputLabelView: React.FC<{ text: string }> = ({
    text
}) => {
    return <p className="pb-2"> {text} </p>
}

interface TagsViewProps {
    tags: string[];
    onDelete: (text: string) => void
}

const TagsView: React.FC<TagsViewProps> = ({
    tags, onDelete
}) => {
    return (
        <div className="flex gap-2 mt-2">
            {
                tags.map((tag: string) => {
                    return (
                        <p className="bg-gray-200 px-2 rounded-md" key={tag}>
                            {tag} <span className="text-red-500 pl-2 
                                            hover:text-red-800 hover:cursor-pointer 
                                            hover:font-bold"
                                onClick={() => onDelete(tag)}
                            > x </span></p>
                    )
                })
            }
        </div>
    )
}


interface SearchViewProps {
    searchTexts: string[];
    onAdd: (text: string) => void
}

const SearchView: React.FC<SearchViewProps> = ({
    searchTexts, onAdd
}) => {
    const [searchVal, setSearchVal] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const filteredSearchTexts = searchTexts.filter((stext: string) =>
        stext.toLowerCase().includes(searchVal.toLowerCase()))
        .slice(0, 5);

    return (<>
        <div className="w-full relative">
            <div className="flex">
                <input
                    className={`${INPUTSTYLE} pl-10`}
                    value={searchVal}
                    onChange={(e) => {
                        setShowFilters(true)
                        setSearchVal(e.target.value)
                    }}
                    placeholder="Search for categories" />
                {searchTexts.includes(searchVal) && <button className="bg-gray-500 p-1 
                mx-1 rounded-md text-white w-[100px]
                hover:cursor-pointer hover:bg-orange-500 disabled"
                    onClick={() => onAdd(searchVal)}
                > + add </button>}
            </div>
            <span className="absolute top-1.5 left-2 
            text-gray-600 cursor-pointer">&#128269;</span>

            {showFilters && filteredSearchTexts.length > 0 && <div className="absolute top-0 left-0 w-full 
            bg-white -translate-y-full shadow-md px-3 py-1">
                {
                    filteredSearchTexts.map((item: string) => {
                        return <p className="hover:cursor-pointer 
                        hover:text-blue-500"
                            key={item}
                            onClick={() => {
                                setShowFilters(false)
                                setSearchVal(item)
                            }}
                        > {item} </p>
                    })
                }
            </div>}
        </div>
    </>
    )
}


interface LicenseViewProps {
    licenses: License[];
    setLicenses: React.Dispatch<React.SetStateAction<License[]>>
}

const LicenseView: React.FC<LicenseViewProps> = ({ licenses, setLicenses }) => {
    return (<>
        {
            licenses.map((license: License) => {
                return <div key={license.id} className="mb-3 bg-gray-100 p-5 shadow-md relative">
                    <p className="absolute right-10 top-3 h-8 w-8 bg-blue-500 rounded-full 
                flex items-center justify-center hover:bg-red-500 
                text-white hover:cursor-pointer"
                        onClick={() => setLicenses((currentLicense: License[]) =>
                            currentLicense.filter((x: License) => x.id !== license.id))}
                    > x </p>
                    <p className="pb-2"> License Name </p>
                    <input
                        className={INPUTSTYLE}
                        value={license.name}
                        onChange={(e) => {
                            const licenseName = e.target.value;
                            setLicenses((currentLicense: License[]) => currentLicense.map(
                                (x: License) => x.id === license.id ? { ...x, name: licenseName } : x
                            ))
                        }}
                        placeholder="Enter name of license."
                    />
                </div>
            })
        }</>)
}


interface OrganizationViewProps {
    organizations: Organization[];
    setOrganizations: React.Dispatch<React.SetStateAction<Organization[]>>
}
const OrganizationView: React.FC<OrganizationViewProps> = ({ organizations, setOrganizations }) => {
    return (
        <>
            {
                organizations.map((org: Organization) => {
                    return (<div key={org.id} className="mb-3 bg-gray-100 p-5 shadow-md relative 
                                grid grid-cols-2 gap-5">
                        <p className="absolute right-10 top-3 h-8 w-8 bg-blue-500 rounded-full 
                            flex items-center justify-center hover:bg-red-500 
                            text-white hover:cursor-pointer"
                            onClick={() => setOrganizations(currentOrganization =>
                                currentOrganization.filter((x: Organization) => x.id !== org.id))}
                        > x </p>
                        <div>
                            <p className="pb-2"> Organization Name </p>
                            <input
                                className={INPUTSTYLE}
                                value={org.name}
                                onChange={(e) => {
                                    const orgName = e.target.value;
                                    setOrganizations((currentOrg) => currentOrg.map(
                                        (x: Organization) => x.id === org.id ? { ...x, name: orgName } : x
                                    ))
                                }}
                                placeholder="Enter name of the organization."
                            />
                        </div>
                        <div>
                            <p className="pb-2"> Organization Description </p>
                            <input
                                className={INPUTSTYLE}
                                value={org.description}
                                onChange={(e) => {
                                    const description = e.target.value;
                                    setOrganizations((currentOrg) => currentOrg.map(
                                        (x: Organization) => x.id === org.id ? { ...x, description } : x
                                    ))
                                }}
                                placeholder="Enter organization description."
                            />
                        </div>
                        <div>
                            <p className="pb-2"> Organization URL </p>
                            <input
                                className={INPUTSTYLE}
                                value={org.url}
                                onChange={(e) => {
                                    const url = e.target.value;
                                    setOrganizations((currentOrg) => currentOrg.map(
                                        (x: Organization) => x.id === org.id ? { ...x, url } : x
                                    ))
                                }}
                                placeholder="Enter url of the organization."
                            />
                        </div>
                    </div>)
                })
            }


        </>
    )
}

interface LangugaeViewProps {
    languages: Language[];
    availLicenses: string[];
    setLanguages: React.Dispatch<React.SetStateAction<Language[]>>
}

const LanguageView: React.FC<LangugaeViewProps> = ({ languages, availLicenses, setLanguages }) => {
    return (
        <>
            {
                languages.map((lang: Language) => {
                    return <div key={lang.id} className="mb-3 bg-gray-100 p-5 shadow-md relative 
                    grid grid-cols-2 gap-5">
                        <p className="absolute right-10 top-3 h-8 w-8 bg-blue-500 rounded-full 
                            flex items-center justify-center hover:bg-red-500 
                            text-white hover:cursor-pointer"
                            onClick={() => setLanguages(currentLang =>
                                currentLang.filter((x: Language) => x.id !== lang.id))}
                        > x </p>
                        <div>
                            <p className="pb-2"> Language Name </p>
                            <input
                                className={INPUTSTYLE}
                                value={lang.name}
                                onChange={(e) => {
                                    const name = e.target.value;
                                    setLanguages((currentLang) => currentLang.map(
                                        (x: Language) => x.id === lang.id ? { ...x, name } : x
                                    ))
                                }}
                                placeholder="Enter language name. "
                            />
                        </div>
                        <div>
                            <p className="pb-2"> Language Description </p>
                            <input
                                className={INPUTSTYLE}
                                value={lang.description}
                                onChange={(e) => {
                                    const description = e.target.value;
                                    setLanguages((currentLang) => currentLang.map(
                                        (x: Language) => x.id === lang.id ? { ...x, description } : x
                                    ))
                                }}
                                placeholder="Provide language description."
                            />
                        </div>
                        <div>
                            <p className="pb-2"> Language URL </p>
                            <input
                                className={INPUTSTYLE}
                                value={lang.url}
                                onChange={(e) => {
                                    const url = e.target.value;
                                    setLanguages((currentLang) => currentLang.map(
                                        (x: Language) => x.id === lang.id ? { ...x, url } : x
                                    ))
                                }}
                                placeholder="Provide language URL."
                            />
                        </div>
                        <div>
                            <p className="pb-2"> Licenses </p>
                            <SearchView
                                searchTexts={availLicenses}
                                onAdd={(text: string) => {
                                    setLanguages(currentLang => currentLang.map((x: Language) => x.id === lang.id ?
                                        { ...x, licenses: x.licenses.includes(text) ? x.licenses : [...x.licenses, text] } : x))
                                }}
                            />

                            <TagsView
                                tags={lang.licenses}
                                onDelete={(text: string) => {
                                    setLanguages(currentLang => currentLang.map(
                                        (x) => x.id === lang.id ?
                                            { ...x, licenses: x.licenses.filter((l) => l !== text) } : x
                                    ))
                                }}
                            />

                        </div>
                    </div>
                })
            }

        </>
    )
}

interface LeftSubMenuItemProps {
    name: string
    itemId: string
    activeId: string | null
    activeMenu: string
    itemMenu: string
    setActiveMenu: React.Dispatch<React.SetStateAction<string>>
    setActiveId: React.Dispatch<React.SetStateAction<string | null>>
}

const LeftSubMenuItem: React.FC<LeftSubMenuItemProps> = ({
    name, itemId, activeId, activeMenu, itemMenu, setActiveMenu, setActiveId
}) => {
    return (
        <p
            className={`pb-1 mb-2 hover:cursor-pointer 
                        hover:font-bold text-gray-500 px-2 w-max
                ${(activeId === itemId && activeMenu === itemMenu) &&
                ' text-orange-600 underline'}`}
            key={itemId}
            onClick={() => {
                setActiveMenu(itemMenu)
                setActiveId(itemId)
            }}
        >  {name} (id:{itemId}) </p>
    )
}


interface SearchableFieldViewProps {
    fieldName: string;
    availTags: string[];
    attachedTags: string[];
    onAdd: (text: string) => void;
    onDelete: (text: string) => void;
}

const SearchableFieldView: React.FC<SearchableFieldViewProps> = ({
    fieldName,
    availTags,
    attachedTags,
    onAdd,
    onDelete
}) => {
    return (
        <div>
            <InputLabelView text={fieldName} />
            <SearchView
                searchTexts={availTags}
                onAdd={onAdd}
            />

            <TagsView
                tags={attachedTags}
                onDelete={onDelete}
            />
        </div>

    )
}

interface FormFieldViewProps {
    fieldName: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

const FormFieldView: React.FC<FormFieldViewProps> = ({
    fieldName, value, onChange, placeholder
}) => {
    return (
        <div>
            <InputLabelView text={fieldName} />
            <input
                className={INPUTSTYLE}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    )
}

const DeleteEntityView: React.FC<{onDelete: ()=> void}> = ({
    onDelete
}) => {
    return (
        <p className="absolute right-10 top-3 h-8 w-8 bg-blue-500 rounded-full 
        flex items-center justify-center hover:bg-red-500 
        text-white hover:cursor-pointer"
        onClick={() => onDelete()}
    > x </p>
    )
}

interface SoftwareViewProps {
    software: Software[];
    setSoftware: React.Dispatch<React.SetStateAction<Software[]>>;
    availLicenses: string[];
    availCategories: string[];
    availOrgs: string[];
    availLangs: string[];
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

const SoftwareView: React.FC<SoftwareViewProps> = ({ software, setSoftware,
    availLicenses, availCategories, availOrgs, availLangs
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

    const deleteSoft = (
        id_: string
    ) => {
        setSoftware(currentSoft => currentSoft.filter((x: Software) => x.id !== id_))
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
                    return <div key={soft.id} className="mb-3 bg-gray-100 p-5 shadow-md relative 
                    grid grid-cols-2 gap-5">
                        <DeleteEntityView onDelete={()=> deleteSoft(soft.id)}/>
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

const getNewLicense = (id_: string) => {
    return { id: id_, }
}

const getNewSoftware = (id_: string) => {
    return {
        name: '', id: id_, description: '', url_docs: '',
        url_sourcecode: '', url_website: '',
        licenses: [], organizations: [],
        languages: [], categories: []
    }
}

const getNewOrganization = (id_: string) => {
    return { name: '', id: id_, description: '', url: '' }
}

const getNewLanguage = (id_: string) => {
    return { name: '', id: id_, description: '', licenses: [], url: '' }
}

interface entityMappingModel {
    menuName: string;
    items: (Software | License | Organization | Language)[];
    updateFunc: React.Dispatch<React.SetStateAction<any[]>>
    getNew: (id_: string) => Record<any, any>
}

interface EmptyViewProps {
    name: string;
    reactIcon: IconType;
}

const EmptyView: React.FC<EmptyViewProps> = ({
    name, reactIcon
}) => {
    const IconComponent = reactIcon;
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-60 h-60 rounded-full bg-gray-200 flex 
            justify-center items-center">
                <IconComponent size={100} className="text-gray-500" />
            </div>
            <p className="my-10 text-gray-400
                px-5 py-1 rounded-md"> No {name} have been added. First add your license by
                clicking add new on left pane. </p>
        </div>
    )
}

const HomePage: React.FC = () => {

    const [licenses, setLicenses] = useState<License[]>([]);
    const [organizations, setOrganizations] = useState<Organization[]>([])
    const [languages, setLanguages] = useState<Language[]>([])
    const [software, setSoftware] = useState<Software[]>([])

    const [availLicenses, setAvailLicenses] = useState<string[]>([]);
    const [availLangs, setAvailLangs] = useState<string[]>([]);
    const [availCategories, setAvailCategories] = useState<string[]>([]);
    const [availOrgs, setAvailOrgs] = useState<string[]>([]);
    const [availSoftware, setAvailSoftware] = useState<string[]>([])
    const [activeMenu, setActiveMenu] = useState('Software');
    const [activeId, setActiveId] = useState<null | string>(null)

    const filteredLics = !activeId ? licenses : licenses.filter((lic: License) => lic.id == activeId)
    const filteredOrgs = !activeId ? organizations : organizations.filter((org: Organization) => org.id == activeId)
    const filteredSoft = !activeId ? software : software.filter((soft: Software) => soft.id == activeId)
    const filteredLangs = !activeId ? languages : languages.filter((lang: Language) => lang.id == activeId)

    const entityMapping: entityMappingModel[] = [
        {
            menuName: 'Software',
            items: software,
            updateFunc: setSoftware,
            getNew: getNewSoftware
        },
        {
            menuName: 'License',
            items: licenses,
            updateFunc: setLicenses,
            getNew: getNewLicense
        },
        {
            menuName: 'Organization',
            items: organizations,
            updateFunc: setOrganizations,
            getNew: getNewOrganization
        },
        {
            menuName: 'Language',
            items: languages,
            updateFunc: setLanguages,
            getNew: getNewLanguage
        }
    ];
    
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
                if (data.licenses) {
                    setAvailLicenses(data.licenses.map((x: License) => x.name))
                }
                if (data.organizations) {
                    setAvailOrgs(data.organizations.map((x: Organization) => x.name))
                }
                if (data.categories) {
                    setAvailCategories(data.categories.map((x: any) => x.name))
                }
                if (data.languages) {
                    setAvailLangs(data.languages.map((x: Language) => x.name))
                }
                if (data.software) {
                    setAvailSoftware(data.software.map((x: Software) => x.name))
                }
            }
        ).catch(error => console.log(error))
    }, [])

    return (
        <>
            <HeroSection />
            <div className="flex justify-center my-3">
                <button className="bg-indigo-500 px-2 text-white rounded py-1"
                    onClick={() => {
                        const data = {
                            licenses: licenses,
                            organizations: organizations,
                            languages: languages,
                            software: software
                        };
                        downloadJSON(data, "data.json")
                    }}
                > Download JSON </button>

            </div>


            <div className="flex justify-between gap-x-10 h-[calc(100vh-280px)]">
                <div className="w-1/5 bg-gray-100 shadow-md px-2 py-3 overflow-y-auto overflow">
                    {
                        entityMapping.map((entity) => {
                            return <>
                                <div className="flex gap-x-3 my-5 mx-5">
                                    <p className={`hover:cursor-pointer 
                                rounded-md font-bold hover:text-blue-500
                                    ${activeMenu === entity.menuName ? ' text-orange-500 font-bold' : ''}`}
                                        onClick={() => {
                                            setActiveMenu(entity.menuName)
                                            setActiveId(null)
                                        }}
                                    >
                                        {entity.menuName}
                                    </p>
                                    <p className="border border-dashed border-2 border-blue-500 px-1 rounded-md text-sm flex 
                                        items-center hover:cursor-pointer hover:bg-blue-500 
                                        hover:text-white"
                                        onClick={() => {
                                            const randId = generate()
                                            setActiveMenu(entity.menuName)
                                            setActiveId(randId)
                                            entity.updateFunc((currentVal) => [...currentVal,
                                            entity.getNew(randId)])
                                        }}
                                    > + Add New </p>
                                </div>

                                <div className="pl-10">
                                    {
                                        entity.items.map((subitem) => {
                                            return (
                                                <LeftSubMenuItem name={subitem.name} itemId={subitem.id}
                                                    activeId={activeId} activeMenu={activeMenu} itemMenu={entity.menuName}
                                                    setActiveId={setActiveId} setActiveMenu={setActiveMenu} />
                                            )
                                        })
                                    }
                                </div>
                            </>

                        })
                    }
                </div>
                <div className="w-4/5 overflow-y-auto">
                    {activeMenu === 'License' && <LicenseView
                        licenses={filteredLics}
                        setLicenses={setLicenses}
                    />}

                    {activeMenu === 'License' && filteredLics.length == 0 &&
                        <EmptyView name="license" reactIcon={GrLicense} />
                    }

                    {activeMenu === 'Organization' && <OrganizationView
                        organizations={filteredOrgs}
                        setOrganizations={setOrganizations}
                    />}


                    {activeMenu === 'Organization' && filteredOrgs.length == 0 &&
                        <EmptyView name="organization" reactIcon={GoOrganization} />
                    }

                    {activeMenu === 'Language' && <LanguageView
                        languages={filteredLangs}
                        setLanguages={setLanguages}
                        availLicenses={[...getLicenses(licenses), ...availLicenses]}
                    />}

                    {activeMenu === 'Language' && filteredLangs.length == 0 &&
                        <EmptyView name="language" reactIcon={IoLanguage} />
                    }

                    {activeMenu === "Software" && <SoftwareView
                        software={filteredSoft}
                        setSoftware={setSoftware}
                        availCategories={availCategories}
                        availLangs={[...getLanguages(languages), ...availLangs]}
                        availLicenses={[...getLicenses(licenses), ...availLicenses]}
                        availOrgs={[...getOrganizations(organizations), ...availOrgs]}
                    />}
                    {activeMenu === 'Software' && filteredSoft.length == 0 &&
                        <EmptyView name="software" reactIcon={IoCodeSlash} />
                    }
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