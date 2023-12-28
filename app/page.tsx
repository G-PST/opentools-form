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
                    onBlur={() => setShowFilters(false)}
                    placeholder="Search for categories" />
                {!showFilters && <button className="bg-gray-500 p-1 
                mx-1 rounded-md text-white w-[100px]
                hover:cursor-pointer hover:bg-orange-500 disabled"
                onClick={()=> onAdd(searchVal)}
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
                                onAdd={(text:string)=> {
                                    setLanguages(currentLang => currentLang.map((x: Language) => x.id === lang.id ?
                                        { ...x, licenses: x.licenses.includes(text) ? x.licenses : [...x.licenses, text] } : x))
                                }}
                            />
                            
                            <div className="flex gap-2 mt-2">
                                {
                                    lang.licenses.map((lic: string) => {
                                        return (
                                            <p className="bg-gray-200 px-2 rounded-md" key={lic}>
                                                {lic} <span className="text-red-500 pl-2 
                                            hover:text-red-800 hover:cursor-pointer 
                                            hover:font-bold"
                                                    onClick={() => setLanguages(currentLang => currentLang.map(
                                                        (x) => x.id === lang.id ?
                                                            { ...x, licenses: x.licenses.filter((l) => l !== lic) } : x
                                                    ))}
                                                > x </span></p>
                                        )
                                    })
                                }
                            </div>

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

interface SoftwareViewProps {
    software: Software[];
    setSoftware: React.Dispatch<React.SetStateAction<Software[]>>;
    availLicenses: string[];
    availCategories: string[];
    availOrgs: string[];
    availLangs: string[];
}

const SoftwareView: React.FC<SoftwareViewProps> = ({ software, setSoftware,
    availLicenses, availCategories, availOrgs, availLangs
}) => {
    return (
        <>

            {
                software.map(soft => {
                    return <div key={soft.id} className="mb-3 bg-gray-100 p-5 shadow-md relative 
                    grid grid-cols-2 gap-5">
                        <p className="absolute right-10 top-3 h-8 w-8 bg-blue-500 rounded-full 
                            flex items-center justify-center hover:bg-red-500 
                            text-white hover:cursor-pointer"
                            onClick={() => setSoftware(currentSoft =>
                                currentSoft.filter((x: Software) => x.id !== soft.id))}
                        > x </p>
                        <div>
                            <p className="pb-2"> Software Name </p>
                            <input
                                className={INPUTSTYLE}
                                value={soft.name}
                                onChange={(e) => {
                                    const name = e.target.value;
                                    setSoftware((currentSoft) => currentSoft.map(
                                        (x: Software) => x.id === soft.id ? { ...x, name } : x
                                    ))
                                }}
                                placeholder="Enter software name. "
                            />
                        </div>
                        <div>
                            <p className="pb-2"> Software Description </p>
                            <input
                                className={INPUTSTYLE}
                                value={soft.description}
                                onChange={(e) => {
                                    const description = e.target.value;
                                    setSoftware((currentSoft) => currentSoft.map(
                                        (x: Software) => x.id === soft.id ? { ...x, description } : x
                                    ))
                                }}
                                placeholder="Enter software description. "
                            />
                        </div>
                        <div>
                            <p className="pb-2"> Website URL </p>
                            <input
                                className={INPUTSTYLE}
                                value={soft.url_website}
                                onChange={(e) => {
                                    const url_website = e.target.value;
                                    setSoftware((currentSoft) => currentSoft.map(
                                        (x: Software) => x.id === soft.id ? { ...x, url_website } : x
                                    ))
                                }}
                                placeholder="Enter url of the website for software. "
                            />
                        </div>
                        <div>
                            <p className="pb-2"> Sourcecode URL </p>
                            <input
                                className={INPUTSTYLE}
                                value={soft.url_sourcecode}
                                onChange={(e) => {
                                    const url_sourcecode = e.target.value;
                                    setSoftware((currentSoft) => currentSoft.map(
                                        (x: Software) => x.id === soft.id ? { ...x, url_sourcecode } : x
                                    ))
                                }}
                                placeholder="Enter url for software documentation. "
                            />
                        </div>
                        <div>
                            <p className="pb-2"> Docs URL </p>
                            <input
                                className={INPUTSTYLE}
                                value={soft.url_docs}
                                onChange={(e) => {
                                    const url_docs = e.target.value;
                                    setSoftware((currentSoft) => currentSoft.map(
                                        (x: Software) => x.id === soft.id ? { ...x, url_docs } : x
                                    ))
                                }}
                                placeholder="Enter url for software documentation. "
                            />
                        </div>

                        <div>
                            <p className="pb-2"> Licenses </p>
                            <SearchView 
                                searchTexts={availLicenses}
                                onAdd={(text:string)=> {
                                    setSoftware(currentSoft => currentSoft.map((x: Software) => x.id === soft.id ?
                                        { ...x, licenses: x.licenses.includes(text) ? x.licenses : [...x.licenses, text] } : x))
                                }}
                            />
                         
                            <div className="flex gap-2 mt-2">
                                {
                                    soft.licenses.map((lic: string) => {
                                        return (
                                            <p className="bg-gray-200 px-2 rounded-md" key={lic}>
                                                {lic} <span className="text-red-500 pl-2 
                                            hover:text-red-800 hover:cursor-pointer 
                                            hover:font-bold"
                                                    onClick={() => setSoftware(currentSoft => currentSoft.map(
                                                        (x) => x.id === soft.id ?
                                                            { ...x, licenses: x.licenses.filter((l) => l !== lic) } : x
                                                    ))}
                                                > x </span></p>
                                        )
                                    })
                                }
                            </div>

                        </div>

                        <div>
                            <p className="pb-2"> Organizations </p>
                            <SearchView 
                                searchTexts={availOrgs}
                                onAdd={(text: string)=> {
                                    setSoftware(currentSoft => currentSoft.map((x: Software) => x.id === soft.id ?
                                        { ...x, organizations: x.organizations.includes(text) ? x.organizations : [...x.organizations, text] } : x))
                                }}
                            />

                            
                            <div className="flex gap-2 mt-2">
                                {
                                    soft.organizations.map((org: string) => {
                                        return (
                                            <p className="bg-gray-200 px-2 rounded-md" key={org}>
                                                {org} <span className="text-red-500 pl-2 
                                            hover:text-red-800 hover:cursor-pointer 
                                            hover:font-bold"
                                                    onClick={() => setSoftware(currentSoft => currentSoft.map(
                                                        (x) => x.id === soft.id ?
                                                            { ...x, organizations: x.organizations.filter((l) => l !== org) } : x
                                                    ))}
                                                > x </span></p>
                                        )
                                    })
                                }
                            </div>

                        </div>

                        <div>
                            <p className="pb-2"> Languages </p>
                            <SearchView 
                                searchTexts={availLangs}
                                onAdd={(text:string)=> {
                                    setSoftware(currentSoft => currentSoft.map((x: Software) => x.id === soft.id ?
                                        { ...x, languages: x.languages.includes(text) ? x.languages : [...x.languages, text] } : x))
                                }}
                            />
                
                            <div className="flex gap-2 mt-2">
                                {
                                    soft.languages.map((lang: string) => {
                                        return (
                                            <p className="bg-gray-200 px-2 rounded-md" key={lang}>
                                                {lang} <span className="text-red-500 pl-2 
                                            hover:text-red-800 hover:cursor-pointer 
                                            hover:font-bold"
                                                    onClick={() => setSoftware(currentSoft => currentSoft.map(
                                                        (x) => x.id === soft.id ?
                                                            { ...x, languages: x.languages.filter((l) => l !== lang) } : x
                                                    ))}
                                                > x </span></p>
                                        )
                                    })
                                }
                            </div>

                        </div>
                        <div>
                            <p className="pb-2"> Categories </p>
                            
                            <SearchView searchTexts={availCategories} onAdd={(text:string)=> {
                                    setSoftware(currentSoft => currentSoft.map((x: Software) => x.id === soft.id ?
                                    { ...x, categories: x.categories.includes(text) ? x.categories : [...x.categories, text] } : x))
                            }} />
                            
                            <div className="flex gap-2 mt-2">
                                {
                                    soft.categories.map((cat: string) => {
                                        return (
                                            <p className="bg-gray-200 px-2 rounded-md" key={cat}>
                                                {cat} <span className="text-red-500 pl-2 
                                            hover:text-red-800 hover:cursor-pointer 
                                            hover:font-bold"
                                                    onClick={() => setSoftware(currentSoft => currentSoft.map(
                                                        (x) => x.id === soft.id ?
                                                            { ...x, categories: x.categories.filter((c) => c !== cat) } : x
                                                    ))}
                                                > x </span></p>
                                        )
                                    })
                                }
                            </div>

                        </div>
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

    const [licenses, setLicenses] = useState<License[]>([{
        id: "2", name: "BSD 3 Clause"
    }]);
    const [organizations, setOrganizations] = useState<Organization[]>([
        { id: "3", name: "NREL", url: "www.nrel.gov", description: "Research Non Profit Org" }
    ])
    const [languages, setLanguages] = useState<Language[]>([
        {
            id: "4", name: "MATLAB", url: "https://matlab.org", description: "Matrix Laboratory",
            licenses: ["MATLAB License", "GPL v3"]
        }
    ])
    const [software, setSoftware] = useState<Software[]>([
        {
            id: "5", name: "emerge", description: "Modern tool for DER impact study.", categories: ["Hosting Capacity"],
            languages: ["python", "javascript"], licenses: ["BSD 3 Clause"], organizations: ["NREL"], url_website: "",
            url_sourcecode: "https://github.com/nrel/emerge", url_docs: "https://nrel.github.io/emerge"
        }
    ])

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