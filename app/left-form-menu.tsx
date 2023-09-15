import { FormMenuInterface } from "./interface"

interface LeftFromMenuProps {
    menu: FormMenuInterface[]
    activeMenu: string
    setActiveMenu: React.Dispatch<React.SetStateAction<string>>
  };
  
export const LeftFormMenu: React.FC<LeftFromMenuProps> = ({ menu, activeMenu, setActiveMenu }) => {
return (
    <div className="">
    {
        menu.map((item: FormMenuInterface) => {
        return <p key={item.name}
            className={`pb-5 hover:cursor-pointer hover:text-indigo-500 
                    ${activeMenu === item.name ? "text-indigo-700 font-bold" : ""}`}
            onClick={() => setActiveMenu(item.name)}
        > {item.name}</p>
        })
    }
    </div>
)
};