import { collection, doc, getDocs, getFirestore, query, updateDoc, setDoc, arrayUnion} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";
      // TODO: Add SDKs for Firebase products that you want to use
      // https://firebase.google.com/docs/web/setup#available-libraries
    
      // Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      const firebaseConfig = {
        apiKey: "AIzaSyCj_p4himuGnJoG4bMDzVYPmhQ9ZSs_LAQ",
        authDomain: "seems-1d365.firebaseapp.com",
        projectId: "seems-1d365",
        storageBucket: "seems-1d365.appspot.com",
        messagingSenderId: "138172531855",
        appId: "1:138172531855:web:ad2a7b2d81d35b77919cfa",
        measurementId: "G-MQMXETXGHE"
      };
    
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);


const email=document.getElementById("exampleInputEmail1");
const names=document.getElementById("nm");
const reg_no=document.getElementById("rn");
const room=document.getElementById("rm");
const date=document.getElementById("dt");
const complain=document.getElementById("cp");
const submit=document.getElementById("btn");

const database=getFirestore(app);


$(submit).click(async function() {
    console.log("Done");
    const data = {
        name:names.value,
        Room:room.value,
        email:email.value,
        complaint:complain.value,
        reg_no:reg_no.value,
        Entry:date.value,
        status:0
    };
    console.log(data);
    await setDoc(doc(database, "svbh-complaints",String(room.value)), data);
    console.log("Done");
});
