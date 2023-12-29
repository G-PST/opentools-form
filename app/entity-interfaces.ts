export interface BaseEntity {
    id: string;
    name: string;
    unique_name: string;
};

export interface License extends BaseEntity {
}

export interface Language extends BaseEntity {
    licenses: string[];
    url: string;
    description: string
}

export interface Organization extends BaseEntity {
    description: string;
    url: string;
}

export interface Software extends BaseEntity {
    description: string;
    categories: string[];
    languages: string[];
    organizations: string[];
    licenses: string[];
    url_website: string;
    url_sourcecode: string;
    url_docs: string;
}

export type EntityType = (Software | License | Language | Organization);

export interface NormalFieldModel {
    displayName: string;
    placeHolderName: string;
    attrName: string;
}

export interface SearchFieldModel {
    fieldName: string;
    availableTags: string[];
    attrName: string;
};


export const LangNormFields: NormalFieldModel[] = [
    {
        displayName: "Unique ID",
        placeHolderName: "Enter unique identifier.",
        attrName: "unique_name"
    },
    {
        displayName: "Language Name",
        placeHolderName: "Enter language name",
        attrName: "name"
    },
    {
        displayName: "Language Description",
        placeHolderName: "Enter language description.",
        attrName: "description"
    },
    {
        displayName: "Language URL",
        placeHolderName: "Enter url of the language",
        attrName: "url"
    }
];

export const OrgNormFields: NormalFieldModel[] = [
    {
        displayName: "Unique ID",
        placeHolderName: "Enter unique identifier.",
        attrName: "unique_name"
    },
    {
        displayName: "Organization Name",
        placeHolderName: "Enter organization name.",
        attrName: "name"
    },
    {
        displayName: "Organization Description",
        placeHolderName: "Enter organization description.",
        attrName: "description"
    },
    {
        displayName: "Organization URL",
        placeHolderName: "Enter organization url.",
        attrName: "url"
    },
];

export const LicNormFields: NormalFieldModel[] = [
    {
        displayName: "Unique ID",
        placeHolderName: "Enter unique identifier.",
        attrName: "unique_name"
    },
    {
        displayName: "License Name",
        placeHolderName: "Enter license name",
        attrName: "name"
    },
];



export const SoftNormFields: NormalFieldModel[] = [
    {
        displayName: "Unique ID",
        placeHolderName: "Enter unique identifier.",
        attrName: "unique_name"
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