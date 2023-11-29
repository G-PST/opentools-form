import { FormOption } from "./interface"

export const getKeyName = (item:FormOption) => {
    return item.category + '__' + item.name
}

export const validateInput = (data: any, schema: any, setErrorFunc: any) => {
    schema.validate(data, { abortEarly: false }).then(
        (value: any) => {
            setErrorFunc({})
        }
    ).catch((err: any) => {
        setErrorFunc(err.inner.reduce((result: any, item: any) => {
            result[item.path] = item.message
            return result
        }, {}))
    })
}

export const downloadJSON = (jsonData: Record<string, any>, fileName: string) => {
    // Convert the JSON object to a JSON string
    const jsonString = JSON.stringify(jsonData);
  
    // Create a Blob object from the JSON string
    const blob = new Blob([jsonString], { type: 'application/json' });
  
    // Create a URL for the Blob
    const blobUrl = URL.createObjectURL(blob);
  
    // Create a temporary anchor element
    const anchor = document.createElement('a');
    anchor.href = blobUrl;
    anchor.download = fileName || 'data.json'; // Set the default file name
  
    // Trigger a click event on the anchor to start the download
    anchor.click();
  
    // Clean up by revoking the Blob URL
    URL.revokeObjectURL(blobUrl);
  }