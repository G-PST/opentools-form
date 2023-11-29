"use client";
import React, { useEffect, useState } from "react";
import { INPUTSTYLE } from "./constants";
import generate from "shortid";
import { HeroSection } from "./hero-section";
import { downloadJSON } from "./utility";

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


interface LicenseViewProps {
    licenses: License[];
    setLicenses: React.Dispatch<React.SetStateAction<License[]>>
}

const LicenseView: React.FC<LicenseViewProps> = ({ licenses, setLicenses }) => {
    return (<><div>

        <button className="bg-gray-300 px-3 py-1 rounded-md"
            onClick={() => setLicenses((currentLicense: License[]) => [...currentLicense,
            { name: '', id: generate() }
            ])}
        > <span className="text-xl"> + </span>Add License </button>
        <p className="my-5"> Add license if not already present. Note once you add license it will
            also be available to add  when creating new language and software.
        </p>
    </div>

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
            <div>
                <button className="bg-gray-300 px-3 py-1 rounded-md mt-5"
                    onClick={() => setOrganizations((currentOrganization) => [...currentOrganization,
                    { name: '', id: generate(), description: '', url: '' }
                    ])}
                > <span className="text-xl"> + </span>Add Organization </button>
                <p className="my-5"> Add organization if not already present. Note once you add organization
                    it will also be available to add  when creating new software.
                </p>
            </div>
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
            <div>
                <button className="bg-gray-300 px-3 py-1 rounded-md mt-5"
                    onClick={() => setLanguages((currentLang) => [...currentLang,
                    { name: '', id: generate(), description: '', licenses: [], url: '' }
                    ])}
                > <span className="text-xl"> + </span> Add Language </button>
                <p className="my-5"> Add language if not already present. Note once you add language
                    it will also be available to add when creating new software.
                </p>
            </div>
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
                            <div className="flex">
                                <select className={INPUTSTYLE} onChange={(e) => {
                                    const licVal = e.target.value;
                                    setLanguages(currentLang => currentLang.map((x: Language) => x.id === lang.id ?
                                        { ...x, licenses: x.licenses.includes(licVal) ? x.licenses : [...x.licenses, licVal] } : x))
                                }
                                }>
                                    {availLicenses.map((lic: string) => {
                                        return <option value={lic} key={lic}> {lic}</option>
                                    })}
                                </select>
                            </div>
                            <div className="flex gap-2 mt-2">
                                {
                                    lang.licenses.map((lic: string) => {
                                        return (
                                            <p className="bg-gray-200 px-2 rounded-md">
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
            <div>
                <button className="bg-gray-300 px-3 py-1 rounded-md mt-5"
                    onClick={() => setSoftware((currentSoftware) => [...currentSoftware,
                    {
                        name: '', id: generate(), description: '', url_docs: '', url_sourcecode: '', url_website: '',
                        licenses: [], organizations: [], languages: [], categories: []
                    }
                    ])}
                > <span className="text-xl"> + </span>Add Software </button>
                <p className="my-5"> Add software tool if not already present.
                </p>
            </div>

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
                            <div className="flex">
                                <select className={INPUTSTYLE} onChange={(e) => {
                                    const licVal = e.target.value;
                                    setSoftware(currentSoft => currentSoft.map((x: Software) => x.id === soft.id ?
                                        { ...x, licenses: x.licenses.includes(licVal) ? x.licenses : [...x.licenses, licVal] } : x))
                                }
                                }>
                                    {availLicenses.map((lic: string) => {
                                        return <option value={lic} key={lic}> {lic}</option>
                                    })}
                                </select>
                            </div>
                            <div className="flex gap-2 mt-2">
                                {
                                    soft.licenses.map((lic: string) => {
                                        return (
                                            <p className="bg-gray-200 px-2 rounded-md">
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
                            <div className="flex">
                                <select className={INPUTSTYLE} onChange={(e) => {
                                    const orgVal = e.target.value;
                                    setSoftware(currentSoft => currentSoft.map((x: Software) => x.id === soft.id ?
                                        { ...x, organizations: x.organizations.includes(orgVal) ? x.organizations : [...x.organizations, orgVal] } : x))
                                }
                                }>
                                    {availOrgs.map((org: string) => {
                                        return <option value={org} key={org}> {org}</option>
                                    })}
                                </select>
                            </div>
                            <div className="flex gap-2 mt-2">
                                {
                                    soft.organizations.map((org: string) => {
                                        return (
                                            <p className="bg-gray-200 px-2 rounded-md">
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
                            <div className="flex">
                                <select className={INPUTSTYLE} onChange={(e) => {
                                    const langVal = e.target.value;
                                    setSoftware(currentSoft => currentSoft.map((x: Software) => x.id === soft.id ?
                                        { ...x, languages: x.languages.includes(langVal) ? x.languages : [...x.languages, langVal] } : x))
                                }
                                }>
                                    {availLangs.map((lang: string) => {
                                        return <option value={lang} key={lang}> {lang}</option>
                                    })}
                                </select>
                            </div>
                            <div className="flex gap-2 mt-2">
                                {
                                    soft.languages.map((lang: string) => {
                                        return (
                                            <p className="bg-gray-200 px-2 rounded-md">
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
                            <div className="flex">
                                <select className={INPUTSTYLE} onChange={(e) => {
                                    const catVal = e.target.value;
                                    setSoftware(currentSoft => currentSoft.map((x: Software) => x.id === soft.id ?
                                        { ...x, categories: x.categories.includes(catVal) ? x.categories : [...x.categories, catVal] } : x))
                                }
                                }>
                                    {availCategories.map((cat: string) => {
                                        return <option value={cat} key={cat}> {cat}</option>
                                    })}
                                </select>
                            </div>
                            <div className="flex gap-2 mt-2">
                                {
                                    soft.categories.map((cat: string) => {
                                        return (
                                            <p className="bg-gray-200 px-2 rounded-md">
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
    const [availLicenses, setAvailLicenses] = useState<string[]>([]);
    const [availLangs, setAvailLangs] = useState<string[]>([]);
    const [availCategories, setAvailCategories] = useState<string[]>([]);
    const [availOrgs, setAvailOrgs] = useState<string[]>([]);
    const [availSoftware, setAvailSoftware] = useState<string[]>([])
    const [activeMenu, setActiveMenu] = useState('Software');


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
                    setAvailLicenses(data.licenses.map(x => x.name))
                }
                if (data.organizations) {
                    setAvailOrgs(data.organizations.map(x => x.name))
                }
                if (data.categories) {
                    setAvailCategories(data.categories.map(x => x.name))
                }
                if (data.languages) {
                    setAvailLangs(data.languages.map(x => x.name))
                }
                if (data.software) {
                    setAvailSoftware(data.software.map(x => x.name))
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
                        ["Software", "License", "Organization", "Language"].map((item: string) => {
                            return <>
                                <div className="flex gap-x-3 my-5 mx-5">
                                    <p className={`hover:cursor-pointer 
                                rounded-md font-bold hover:text-blue-500
                                    ${activeMenu === item ? ' text-blue-500 font-bold' : ''}`}
                                        onClick={() => setActiveMenu(item)}
                                    >
                                        {item}
                                    </p>
                                    <p className="border border-dashed border-2 border-blue-500 px-1 rounded-md text-sm flex 
                                        items-center hover:cursor-pointer hover:bg-blue-500 
                                        hover:text-white"> + Create </p>
                                </div>
                                <div className="pl-10">
                                    {
                                        item === 'Software' && software.map((soft: Software) => {
                                            return <p className="pb-1 mb-2 border-l-2 border-blue-500 
                                            bg-gray-200 px-2 w-max"> {soft.id} : {soft.name} </p>
                                        })
                                    }
                                    {
                                        item === 'License' && licenses.map((lic: License) => {
                                            return <p className="pb-1 mb-2 border-l-2 border-blue-500 
                                            bg-gray-200 px-2 w-max">{lic.id} : {lic.name} </p>
                                        })
                                    }
                                    {
                                        item === 'Organization' && organizations.map((org: Organization) => {
                                            return <p className="pb-1 mb-2 border-l-2 border-blue-500 
                                            bg-gray-200 px-2 w-max"> {org.id} : {org.name} </p>
                                        })
                                    }
                                    {
                                        item === 'Language' && languages.map((lang: Language) => {
                                            return <p className="pb-1 mb-2 border-l-2 border-blue-500 
                                            bg-gray-200 px-2 w-max"> {lang.id} : {lang.name} </p>
                                        })
                                    }
                                </div>
                            </>

                        })
                    }
                </div>
                <div className="w-4/5 overflow-y-scroll">
                    {activeMenu === 'License' && <LicenseView
                        licenses={licenses}
                        setLicenses={setLicenses}
                    />}

                    {activeMenu === 'Organization' && <OrganizationView
                        organizations={organizations}
                        setOrganizations={setOrganizations}
                    />}

                    {activeMenu === 'Language' && <LanguageView
                        languages={languages}
                        setLanguages={setLanguages}
                        availLicenses={[...getLicenses(licenses), ...availLicenses]}
                    />}

                    {activeMenu === "Software" && <SoftwareView
                        software={software}
                        setSoftware={setSoftware}
                        availCategories={availCategories}
                        availLangs={[...getLanguages(languages), ...availLangs]}
                        availLicenses={[...getLicenses(licenses), ...availLicenses]}
                        availOrgs={[...getOrganizations(organizations), ...availOrgs]}
                    />}
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