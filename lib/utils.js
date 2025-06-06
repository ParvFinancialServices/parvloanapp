import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { upload_doc } from "./actions/file";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function get_upload_promises(fileFields, formData, dataToSubmit) {
  return fileFields.map(async (fieldName) => {
    const file = formData[fieldName];
    if (file instanceof File) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (result) => {
          try {
            const uploadedUrl = await upload_doc({
              file: result.target.result,
              folder: fieldName, // As per your requirement
            });
            console.log(uploadedUrl);
            dataToSubmit[fieldName] = uploadedUrl.secure_url; // Update with the URL
            resolve();
          } catch (error) {
            console.error(`Error uploading ${fieldName}:`, error);
            reject(error);
          }
        };
        reader.onerror = (error) => {
          console.error(`FileReader error for ${fieldName}:`, error);
          reject(error);
        };
        reader.readAsDataURL(file); // Read as Data URL for simplicity, adjust if your upload_doc expects something else
      });
    }
    return Promise.resolve(); // No file to upload for this field
  });
}

export const getUsername = (role, length) => {
  let result = "";
  switch (role) {
    case "Telecaller":
      result = "TC" + String(length).padStart(4, 0);
      break;
    case "RM":
      result = "RM" + String(length).padStart(4, 0);
      break;
    case "Field Staff":
      result = "FS" + String(length).padStart(4, 0);
      break;
  }

  return result;
};

export const multiValueFilter = (row, columnId, filterValue) => {
  console.log(filterValue);
  if (filterValue.includes("all")) {
    return true;
  }
  const rowValue = row.getValue(columnId);
  return filterValue.includes(rowValue);
};
