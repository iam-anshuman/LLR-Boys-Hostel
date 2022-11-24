// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getDatabase , ref , child , get } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5-N_dprMn91ix3iDUK2CLxHV0MfvW16s",
  authDomain: "llrboyshostel-2f052.firebaseapp.com",
  projectId: "llrboyshostel-2f052",
  storageBucket: "llrboyshostel-2f052.appspot.com",
  messagingSenderId: "218598352167",
  appId: "1:218598352167:web:bc285461d707fb32c5b502",
  measurementId: "G-MPTY2KR5XQ",
  databaseURL:"https://llrboyshostel-2f052-default-rtdb.asia-southeast1.firebasedatabase.app/"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const dbRef = ref(getDatabase());


// Gets Notice Data
function showNotice(){
  let html = ""
  let notice = document.getElementById("notice")
  
  get(child(dbRef,"/Notice/Notice")).then((snapshot)=>{
    if(snapshot.exists()){
      const noticeData = snapshot.val();
      // console.log(noticeData);
      for (const item in noticeData) {
            if (Object.hasOwnProperty.call(noticeData,item)) {
              const element = noticeData[item];
              // console.log(element);
              html+=`
                <li>${element}</li>   
              `
            }
          }
          notice.innerHTML=html
    }else{
      console.log("NO data Found");
    }
  })
  .catch((err)=>{
    console.log(err);
  })
  
}

showNotice();

// Get rules data
function showRules(){
  let html = ""
  let rules = document.getElementById("rules")
  
  get(child(dbRef,"/Notice/Rules")).then((snapshot)=>{
    if(snapshot.exists()){
      const rulesData = snapshot.val();
      // console.log(rulesData);
      for (const item in rulesData) {
            if (Object.hasOwnProperty.call(rulesData,item)) {
              const element = rulesData[item];
              // console.log(element);
              html+=`
                <li>${element}</li>   
              `
            }
          }
          rules.innerHTML=html
    }else{
      console.log("NO data Found");
    }
  })
  .catch((err)=>{
    console.log(err);
  })
  
}

showRules()

// Searching details
let searchtxt = document.getElementById("search-box");
searchtxt.addEventListener("blur",function(){
  let html = ""
  let showDetails = document.getElementById("studentDetails")
  let searchInput = searchtxt.value;
  get(child(dbRef,`/Students/`)).then((snapshot)=>{
    if(snapshot.exists()){
      const StudentData = snapshot.val();
      StudentData.forEach(element => {
        

        if(element.first_name == searchInput){
            console.log(element.room_number);
            console.log(element.gender);
            console.log(element.email);
            html+=`
            <div class="card-container">
            <ul class="contact-card">
            <li><img src="https://cdn.pixabay.com/photo/2014/04/03/10/32/businessman-310819_960_720.png"/>
            <div class="details"><span class="name">${element.first_name+" "+element.last_name}</span><span class="title">${element.gender}</span><a class="phone" href="tel:123-456-789">${element.room_number}</a><a class="email" href="mailto:emilia.jacobs@email.com">&#8377;${element.mess_bill}</a></div>
            </li>`
        }
        showDetails.innerHTML=html;
      });
    }else{
      console.log("NO data Found");
    }
  })
  .catch((err)=>{
    console.log(err);
  })
})


