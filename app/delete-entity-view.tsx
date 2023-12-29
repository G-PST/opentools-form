const DeleteEntityView: React.FC<{ onDelete: () => void }> = ({
    onDelete
}) => {
    return (
        <p className="absolute right-10 top-3 h-8 w-8 bg-blue-500 rounded-full 
        flex items-center justify-center hover:bg-red-500 
        text-white hover:cursor-pointer"
            onClick={() => onDelete()}
        > x </p>
    )
};

export default DeleteEntityView;
