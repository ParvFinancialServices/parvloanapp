'use server';

import { db, storage } from '@/lib/firebaseConfig';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export async function submitDSAForm(formData) {
  try {
    const uploadFile = async (file, fieldName) => {
      const storageRef = ref(storage, `dsa_forms/${fieldName}-${uuidv4()}-${file.name}`);
      const bytes = await file.arrayBuffer();
      const blob = new Uint8Array(bytes);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      return url;
    };

    // Upload all files and replace file with URL
    const fileFields = ['aadhar', 'pan', 'photo', 'bank_doc', 'education_certificate'];
    const uploadedFiles = {};

    for (const field of fileFields) {
      if (formData[field] ) {
        uploadedFiles[field] = await uploadFile(formData[field], field);
      }
    }

    const payload = {
      ...formData,
      ...uploadedFiles,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };

    // Remove file objects
    fileFields.forEach((f) => delete payload[f] instanceof File && payload[f]);
    console.log("working fine");
    
    const docRef = await addDoc(collection(db, 'dsa_forms'), payload);

    return { success: true, id: docRef.id, message: 'Form submitted successfully' };
  } catch (err) {
    console.error(err);
    return { success: false, message: err.message };
  }
}

export async function approveDSAForm(formId) {
  try {
    const docRef = doc(db, 'dsa_forms', formId);
    await updateDoc(docRef, { status: 'approved', approvedAt: new Date().toISOString() });

    return { success: true, message: `Form ${formId} approved` };
  } catch (err) {
    console.error(err);
    return { success: false, message: err.message };
  }
}
