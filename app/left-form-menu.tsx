interface LeftFromMenuProps {
    menu: string[]
    activeMenu: string
    setActiveMenu: React.Dispatch<React.SetStateAction<string>>
  };
  
export const LeftFormMenu: React.FC<LeftFromMenuProps> = ({ menu, activeMenu, setActiveMenu }) => {
return (
    <div className="">
    {
        menu.map((item: string) => {
        return <p key={item}
            className={`pb-5 hover:cursor-pointer hover:text-indigo-500 
                    ${activeMenu === item ? "text-indigo-700 font-bold" : ""}`}
            onClick={() => setActiveMenu(item)}
        > {item[0].toUpperCase() + item.slice(1)}</p>
        })
    }
    </div>
)
};