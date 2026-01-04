<script>
let members = JSON.parse(localStorage.getItem("members") || "[]");

function register(){
 let m = {
  name: document.getElementById("name").value,
  mobile: document.getElementById("mobile").value,
  address: document.getElementById("address").value,
  role: document.getElementById("role").value,
  id: "JBNRM" + (members.length+1)
 };
 members.push(m);
 localStorage.setItem("members",JSON.stringify(members));
 alert("पंजीकरण सफल — आपका आई-कार्ड तैयार है");
}

function login(){
 let mob = document.getElementById("loginMobile").value;
 let m = members.find(x=>x.mobile==mob);
 if(!m) return alert("सदस्य नहीं मिला");

 document.getElementById("memberArea").classList.remove("hidden");

 document.getElementById("mname").innerText = "नाम: " + m.name;
 document.getElementById("mrole").innerText = "पद: " + m.role;
 document.getElementById("idc").innerText = "सदस्य ID: " + m.id;
 document.getElementById("cert").innerText =
 "यह प्रमाणित किया जाता है कि " + m.name + " संगठन का अधिकृत सदस्य है।";

 if(m.role!="सदस्य"){
  document.getElementById("apptBox").classList.remove("hidden");
  document.getElementById("appt").innerText =
   m.name + " को " + m.role + " पद पर नियुक्त किया जाता है।";
 }
}

function adminLogin(){
 let u = document.getElementById("adminUser").value;
 let p = document.getElementById("adminPass").value;

 if(u=="admin" && p=="12345"){
  document.getElementById("adminPanel").classList.remove("hidden");
  showMembers();
 } else alert("गलत विवरण");
}

function showMembers(){
 members = JSON.parse(localStorage.getItem("members")||"[]");
 let membersDiv = document.getElementById("members");
 membersDiv.innerHTML="";
 members.forEach(m=>{
  membersDiv.innerHTML += `<div class='card'>
  नाम: ${m.name}<br>मोबाइल: ${m.mobile}<br>
  पद: <input value="${m.role}" onchange="changeRole('${m.mobile}',this.value)">
  </div>`;
 });
}

function changeRole(mobile,newRole){
 let m = members.find(x=>x.mobile==mobile);
 m.role = newRole;
 localStorage.setItem("members",JSON.stringify(members));
 alert("पद अपडेट हुआ");
}
</script>
