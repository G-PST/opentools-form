export interface BaseEntity {
    id: string;
    name: string;
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
