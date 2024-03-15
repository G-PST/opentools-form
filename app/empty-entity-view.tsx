import { IconType } from "react-icons";

interface EmptyViewProps {
    name: string;
    reactIcon: IconType;
}

export const EmptyView: React.FC<EmptyViewProps> = ({
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
                px-5 py-1 rounded-md"> No {name} have been added. Add your first entry by
                clicking <span className="bg-gray-200 rounded-md px-1 mr-1"> Add New</span> on left pane. </p>
        </div>
    )
}