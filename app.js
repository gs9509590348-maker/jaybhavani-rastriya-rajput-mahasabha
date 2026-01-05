import {
  auth,db,storage
} from "./firebase.js";

import {
  signInWithPhoneNumber,RecaptchaVerifier,
  signInWithEmailAndPassword,signOut,onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import {
  addDoc,collection,query,where,getDocs
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

import {
  ref,uploadBytes,getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-storage.js";

/* SAVE MEMBER */
window.joinMember=async()=>{
 let file=mPhoto.files[0];
 let r=ref(storage,"photos/"+Date.now());
 await uploadBytes(r,file);
 let url=await getDownloadURL(r);

 await addDoc(collection(db,"members"),{
  name:mName.value,
  father:mFather.value,
  phone:"+91"+mPhone.value,
  email:mEmail.value,
  district:mDistrict.value,
  photo:url
 });

 alert("Member Registered Successfully 🎉");
}

/* OTP LOGIN */
window.recaptchaVerifier=new RecaptchaVerifier(auth,"recaptcha",{size:"normal"});
let c;

window.sendOTP=async()=>{
 c=await signInWithPhoneNumber(auth,"+91"+loginMobile.value,window.recaptchaVerifier);
 alert("OTP Sent");
}

window.verifyOTP=async()=>{
 await c.confirm(otpCode.value);
 loadProfile();
}

/* LOAD PROFILE */
async function loadProfile(){
 const q=query(collection(db,"members"),where("phone","==","+91"+loginMobile.value));
 const s=await getDocs(q);

 s.forEach(d=>{
  memberPanel.classList.remove("hidden");
  pName.innerText=d.data().name;
  pPhone.innerText=d.data().phone;
  pDistrict.innerText=d.data().district;
  profilePic.src=d.data().photo;
  window.memData=d.data();
 });
}

window.memberLogout=()=>signOut(auth);

/* ADMIN LOGIN */
window.adminLogin=()=>signInWithEmailAndPassword(auth,adminEmail.value,adminPass.value);
window.adminLogout=()=>signOut(auth);

/* ADMIN STATUS */
onAuthStateChanged(auth,user=>{
 if(user && user.email==="admin@gmail.com"){
  adminPanel.classList.remove("hidden");
 }else{
  adminPanel.classList.add("hidden");
 }
});

/* PDF */
window.downloadID=()=>{
 const{jsPDF}=window.jspdf;
 let d=new jsPDF();
 d.text("JB RRMS – ID CARD",60,20);
 d.text("Name: "+memData.name,20,40);
 d.text("Phone: "+memData.phone,20,50);
 d.save("ID_CARD.pdf");
}

window.downloadCert=()=>{
 const{jsPDF}=window.jspdf;
 let d=new jsPDF();
 d.text("CERTIFICATE OF MEMBERSHIP",40,40);
 d.text(memData.name+" is a member of JB RRMS",20,60);
 d.save("Certificate.pdf");
}

window.downloadLetter=()=>{
 const{jsPDF}=window.jspdf;
 let d=new jsPDF();
 d.text("APPOINTMENT LETTER",60,40);
 d.text("This certifies "+memData.name,20,60);
 d.save("Appointment_Letter.pdf");
}

/* UI BUTTONS */
window.showObjective=()=>{home.classList.add("hidden");objective.classList.remove("hidden")}
window.showExecutive=()=>{home.classList.add("hidden");executive.classList.remove("hidden")}
window.goBack=()=>{home.classList.remove("hidden");objective.classList.add("hidden");executive.classList.add("hidden")}
