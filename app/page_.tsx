"use client";

import React, { useEffect, useState } from "react";
import { HeroSection } from "./hero-section";
import { FormOption } from "./interface";
import { LeftFormMenu } from "./left-form-menu";
import { GitHubSection } from "./github-section";
import { UploadJSONSection } from "./upload-json-section";
import { FORMOPTIONS } from "./constants";
import * as Yup from "yup";
import { validateInput } from "./utility";
import { downloadJSON } from "./utility";
import { FormView } from "./form-view";
import { getKeyName } from "./utility";

const MENUS = FORMOPTIONS.map((el: FormOption)=> el.category);
const YUPMAPPER = {
  'text': Yup.string(),
  'number': Yup.number()
};
let validationObject: Record<string, any> = {};
for (const item of FORMOPTIONS){
  if (item.required) {
    validationObject[getKeyName(item)] = YUPMAPPER[item.type].required(
      `${getKeyName(item).replace('__', ' ')} is required.`)
  }
}
let validationSchema = Yup.object(validationObject);

const handleFormSubmit = (
  formData: Record<string, any>
) => {
  console.log(formData)
  downloadJSON(formData, "data.json")
}

const MainBody: React.FC = () => {
  
  const [activePage, setActivePage] = useState<string>(MENUS[0]);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, any>>({});


  useEffect(()=> {
    validateInput(formData, validationSchema, setErrors)
  }, [formData])

  return (
    <>
      <HeroSection />

      <div className="my-10 flex justify-center gap-x-10">
        <GitHubSection setFormData={setFormData}/>
        <UploadJSONSection setFormData={setFormData}/>
      </div>

      {
        MENUS.length >0 && <div className="flex gap-x-10 h-2/3">
        <div className="w-1/4 bg-gray-100 p-6 flex flex-col justify-between">
          <LeftFormMenu menu={MENUS.filter((value:string, index: number)=> MENUS.indexOf(value)===index)} activeMenu={activePage} setActiveMenu={setActivePage} />
          <button className="bg-indigo-500 w-full text-white rounded py-1"
            onClick={()=> {
              validateInput(formData, validationSchema, setErrors)
              if (JSON.stringify(errors) === '{}') {
                handleFormSubmit(formData)
              }
            }}
          > Download JSON </button>
        </div>
        {
          activePage && <div className="w-3/4 bg-gray-100 p-6 overflow-y-auto">
            
            <FormView options={FORMOPTIONS.filter((item:FormOption)=> item.category == activePage)} formData={formData} setFormData={setFormData} errors={errors}/>
            </div>
        }
      </div>
      }

    </>
  )
}

export default function Home() {
  return (
    <main className="px-20 py-10 h-screen">
      <MainBody />
    </main>
  )
}
