import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyA6reO2HPNc8d9nDddFoelVIHU6t82ThoE",
    authDomain: "website-e3714.firebaseapp.com",
    databaseURL: "https://website-e3714-default-rtdb.firebaseio.com/",
    projectId: "website-e3714",
    storageBucket: "website-e3714.appspot.com",
    messagingSenderId: "939847034403",
    appId: "1:939847034403:web:a868ee5d8e25f9304eb396",
    measurementId: "G-Q2S34JVV59"
};

const app = initializeApp(firebaseConfig);

// // تجنب تشغيل التحليلات في بيئات السيرفر (SSR)
// let analytics;
// if (typeof window !== 'undefined') {
//     analytics = getAnalytics(app);
// }

const db = getDatabase(app);

export { db, ref, set, get };