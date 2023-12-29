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
    return { id: id_, unique_name: '' }
};

export const getNewSoftware = (id_: string) => {
    return {
        name: '', unique_name: '', id: id_, description: '', url_docs: '',
        url_sourcecode: '', url_website: '',
        licenses: [], organizations: [],
        languages: [], categories: []
    }
};

export const getNewOrganization = (id_: string) => {
    return { name: '', unique_name: '', id: id_, description: '', url: '' }
};

export const getNewLanguage = (id_: string) => {
    return { name: '', unique_name: '', id: id_, description: '', licenses: [], url: '' }
};

export const getErrorString = (errors: Record<string, any>[],id_: string, attr_name: string) => {
    const errObj = errors.filter(val=> val.uuid == id_);
    return errObj.length >0 ? errObj[0][attr_name] : null;
};


