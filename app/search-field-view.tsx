import { useState } from "react";
import { INPUTSTYLE } from "./constants";
import {InputLabelView} from "./input-label-view";

interface SearchViewProps {
    searchTexts: string[];
    onAdd: (text: string) => void
}

const SearchView: React.FC<SearchViewProps> = ({
    searchTexts, onAdd
}) => {
    const [searchVal, setSearchVal] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const getFilteredTexts = () => searchTexts.filter((stext: string) =>
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

            {showFilters && getFilteredTexts().length > 0 && <div className="absolute top-0 left-0 w-full 
            bg-white -translate-y-full shadow-md px-3 py-1">
                {
                    getFilteredTexts().map((item: string) => {
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

interface SearchableFieldViewProps {
    fieldName: string;
    availTags: string[];
    attachedTags: string[];
    onAdd: (text: string) => void;
    onDelete: (text: string) => void;
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

export default SearchableFieldView;

