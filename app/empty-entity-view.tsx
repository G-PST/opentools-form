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
                px-5 py-1 rounded-md"> No {name} have been added. First add your license by
                clicking add new on left pane. </p>
        </div>
    )
}