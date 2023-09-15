"use client";
const readFileAsText = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        resolve(reader.result);
      };
  
      reader.onerror = () => {
        reject(reader.error);
      };
  
      reader.readAsText(file);
    });
  }

import { useRef, RefObject } from "react";

interface UploadJSONSectionProps {
    setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>
}

export const UploadJSONSection: React.FC<UploadJSONSectionProps> = ({setFormData}) => {

    const spanTextRef: RefObject<HTMLSpanElement> = useRef(null);
    
    const  handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {

        if (spanTextRef.current && e.target.files) {
            spanTextRef.current.textContent = e.target.files[0].name
        }

        if (e.target.files){
            const fileContent =  await readFileAsText(e.target.files[0]);
            
            if (typeof(fileContent)==='string') {
                setFormData(JSON.parse(fileContent))
            }
        }

        
    }

    return (
        <label className="custom-upload">
            <input 
                type="file" 
                id="fileInput" 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(e)} 
            />

            <div className="custom-button">
                <span ref={spanTextRef}>Upload JSON</span>
            </div>
        </label>
    )
}