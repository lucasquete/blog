import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import {v4} from "uuid"

const firebaseConfig = {
  apiKey: "AIzaSyA_7fFqG4RaRhotBfvM-Ff1IOB2unlqMfU",
  authDomain: "react-blog-82d06.firebaseapp.com",
  projectId: "react-blog-82d06",
  storageBucket: "react-blog-82d06.appspot.com",
  messagingSenderId: "484063827784",
  appId: "1:484063827784:web:9bef2630b463b7452b057d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file) {
    const storageRef = ref(storage, v4());

    await uploadBytes(storageRef, file);

    const url = await getDownloadURL(storageRef);

    return url;
}