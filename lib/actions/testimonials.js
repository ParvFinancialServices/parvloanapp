'use server';

// import { getApp } from '@/lib/firebase/serverApp'; // Adjust path to your firebase admin init
import admin from 'firebase-admin';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { getApp } from './common';

export async function createTestimonial(data) {
  getApp(); // initialize Firebase Admin if not already
  const db = admin.firestore();

  try {
    let avatarUrl = '';

    // // Save avatar file if present
    // if (data.avatar) {
    //   const buffer = Buffer.from(await data.avatar.arrayBuffer());
    //   const filename = `${uuid()}-${data.avatar.name}`;
    //   const filePath = path.join(process.cwd(), 'public', 'uploads', filename);
    //   await writeFile(filePath, buffer);
    //   avatarUrl = `/uploads/${filename}`;
    // }

    // console.log(avatarUrl);
    

    const id = uuid();
    const doc = {
      id,
      name: data?.name,
      message: data?.message,
      date: data?.date,
      avatar: avatarUrl,
      createdAt: new Date().toISOString(),
    };
console.log("hello world");

    await db.collection('testimonials').doc(id).set(doc);
    console.log("hello");
    

    return { success: true, data: doc };
  } catch (err) {
    console.error('[TESTIMONIAL_ERROR]', err);
    return { success: false, message: 'Failed to submit testimonial' };
  }
}




export async function getAllTestimonials() {
  getApp(); // ensure Firebase Admin is initialized
  const db = admin.firestore();

  try {
    const snapshot = await db.collection('testimonials').orderBy('createdAt', 'desc').get();
    const data = snapshot.docs.map((doc) => doc.data());

    return { success: true, testimonials: data };
  } catch (error) {
    console.error('[GET_TESTIMONIALS_ERROR]', error);
    return { success: false, message: 'Failed to fetch testimonials' };
  }
}
