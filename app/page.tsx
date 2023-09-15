"use client";

import React, { useEffect, useState } from "react";
import { HeroSection } from "./hero-section";
import { FormMenuInterface } from "./interface";
import { LeftFormMenu } from "./left-form-menu";
import { GitHubSection } from "./github-section";
import { UploadJSONSection } from "./upload-json-section";
import { MENUS } from "./constants";
import * as Yup from "yup";
import { validateInput } from "./utility";
import { downloadJSON } from "./utility";



const getMenuComponent = (
  menus: FormMenuInterface[], 
  activePage: string, 
  formData:Record<string, any>, 
  setFormData:React.Dispatch<React.SetStateAction<Record<string, any>>>, 
  errors:Record<string, any>
) => {

  const activeMenu = menus.find((item: FormMenuInterface) => item.name === activePage);

  if (activeMenu == undefined) {
    return <div> </div>
  }

  return <activeMenu.component formData={formData} setFormData={setFormData} errors={errors}/>
}

const handleFormSubmit = (
  formData: Record<string, any>
) => {
  console.log(formData)
  downloadJSON(formData, "data.json")
}

const MainBody: React.FC = () => {
  
  const [activePage, setActivePage] = useState<string>(MENUS[0].name);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, any>>({});

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required."),
    url: Yup.string().matches(
                    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                  'Incorrect URL'
        ).required("URL is required."),
    email: Yup.string().required("Email is required.").email("Not a valid email")
  });

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

      <div className="flex gap-x-10 h-2/3">
        <div className="w-1/4 bg-gray-100 p-6 flex flex-col justify-between">
          <LeftFormMenu menu={MENUS} activeMenu={activePage} setActiveMenu={setActivePage} />
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
            {getMenuComponent(MENUS, activePage, formData, setFormData, errors)} </div>
        }
      </div>

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
