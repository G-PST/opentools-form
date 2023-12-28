import { Language, License, Organization } from "./entity-interfaces";


export const getLicenses = (licenses: License[]) => {
    return licenses.map((license: License) => license.name)
};

export const getOrganizations = (orgs: Organization[]) => {
    return orgs.map((org: Organization) => org.name)
};

export const getLanguages = (langs: Language[]) => {
    return langs.map((lang: Language) => lang.name)
};

export const getNewLicense = (id_: string) => {
    return { id: id_, }
};

export const getNewSoftware = (id_: string) => {
    return {
        name: '', id: id_, description: '', url_docs: '',
        url_sourcecode: '', url_website: '',
        licenses: [], organizations: [],
        languages: [], categories: []
    }
};

export const getNewOrganization = (id_: string) => {
    return { name: '', id: id_, description: '', url: '' }
};

export const getNewLanguage = (id_: string) => {
    return { name: '', id: id_, description: '', licenses: [], url: '' }
};

