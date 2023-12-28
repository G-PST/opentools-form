"use client";
import React, { useEffect, useState } from "react";
import { HeroSection } from "./hero-section";
import { downloadJSON } from "./utility";
import { GrLicense } from "react-icons/gr";
import { GoOrganization } from "react-icons/go";
import { IoLanguage } from "react-icons/io5";
import { IoCodeSlash } from "react-icons/io5";
import { EntityType, Language, License, Organization, Software } from "./entity-interfaces";
import { getLanguages, getLicenses, getNewLanguage, getNewLicense, getNewOrganization, 
    getNewSoftware, getOrganizations } from "./entity-operations";
import { EmptyView } from "./empty-entity-view";
import { LanguageView } from "./language-view";
import { LicenseView } from "./license-view";
import { OrganizationView } from "./organization-view";
import { SoftwareView } from "./software-view";
import { LeftPaneView, entityMappingModel } from "./left-pane-view";


const DownloadJSONButtonView: React.FC<{ onDownload: () => void }> = ({
    onDownload
}) => {
    return (
        <button className="bg-indigo-500 px-2 text-white rounded py-1"
            onClick={() => onDownload()}
        > Download JSON </button>
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


    const deleteEntity = (id_: string, setFunc: React.Dispatch<React.SetStateAction<EntityType[]>>) => {
        setActiveId(null)
        setFunc(currentEntity => currentEntity.filter(
            (x: EntityType) => x.id !== id_))
    };

    const handleDownloadJSON = () => {
        const data = {
            licenses: licenses,
            organizations: organizations,
            languages: languages,
            software: software
        };
        downloadJSON(data, "data.json")
    };

    const updateAvailData = (data: any, property: string, 
        setter: React.Dispatch<React.SetStateAction<string[]>>) => {
        if (data && data[property]) {
          setter(data[property].map((item: any) => item.name));
        }
      };

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


    const getCurrentView = (activeMenu_: string) => {
        const MenuViewMapping: Record<string, any> = {
            License: {
                view: <LicenseView licenses={filteredLics} setLicenses={setLicenses} deleteEntity={deleteEntity} />,
                emptyView: <EmptyView name="license" reactIcon={GrLicense} />,
                data: filteredLics,
            },
            Organization: {
                view: <OrganizationView organizations={filteredOrgs} setOrganizations={setOrganizations} deleteEntity={deleteEntity} />,
                emptyView: <EmptyView name="organization" reactIcon={GoOrganization} />,
                data: filteredOrgs,
            },
            Language: {
                view: <LanguageView languages={filteredLangs} setLanguages={setLanguages} availLicenses={[...getLicenses(licenses), ...availLicenses]} deleteEntity={deleteEntity} />,
                emptyView: <EmptyView name="language" reactIcon={IoLanguage} />,
                data: filteredLangs,
            },
            Software: {
                view: <SoftwareView software={filteredSoft} setSoftware={setSoftware} availCategories={availCategories} availLangs={[...getLanguages(languages), ...availLangs]} availLicenses={[...getLicenses(licenses), ...availLicenses]} availOrgs={[...getOrganizations(organizations), ...availOrgs]} deleteEntity={deleteEntity} />,
                emptyView: <EmptyView name="software" reactIcon={IoCodeSlash} />,
                data: filteredSoft,
            },
        };

        const activeMenuData = MenuViewMapping.hasOwnProperty(activeMenu_) ? MenuViewMapping[activeMenu_] : null;
        const activeView = activeMenuData && activeMenuData.data.length > 0 ? activeMenuData.view : activeMenuData.emptyView;

        return activeView;
    }



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
    }, [])

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
                        entityMapping={entityMapping}
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