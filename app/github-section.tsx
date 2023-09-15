import { useState } from "react"
import axios from "axios"
import { LICENSES } from "./constants"
import { LicenseInterface } from "./interface"

interface GitHubSectionProps {
    setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>
}

export const GitHubSection: React.FC<GitHubSectionProps> = ({
    setFormData,
}) => {
    const [repoURL, setRepoURL] = useState('')
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>,  repoURL: string) => {

        if (e.key === 'Enter') {

            e.preventDefault()
            
            try {
                const owner = repoURL.split('/').slice(-2)[0]
                const reponame = repoURL.split('/').slice(-1)[0]

                const apiURL = `https://api.github.com/repos/${owner}/${reponame}`
                
                axios.get(apiURL).then((response)=> {
                    const data  = response.data 
                    
                    const fetchedData = {
                        name: data.name,
                        url: data.html_url,
                        description: data.description,
                        created: data.created_at.split('T')[0],
                        organization: data.organization.login,
                        language: data.language,
                        license: LICENSES.find((item:LicenseInterface)=> item.id == data.license.spdx_id)?.name
                    }

                    setFormData(fetchedData)

                }).catch((error)=> {
                    console.log(error)
                })

            } catch (error) {
                console.log(error)
            }
        }
        
    }
    // checkAPI('https://api.github.com/repos/nrel/erad')
    return (
        <input className="border-b-2 font-light w-1/2 px-3 
            outline-none h-9 bg-transparent 
            text-orange-700" 
            placeholder="Enter GitHub URL to pull basic information" 
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setRepoURL(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>)=> handleKeyDown(e, repoURL)}
       />
    )
}