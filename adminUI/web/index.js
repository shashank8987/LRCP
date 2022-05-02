// Import the functions you need from the SDKs you need
import { collection, doc, getDocs,updateDoc, getFirestore, query } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAuth, connectAuthEmulator, signInWithEmailAndPassword ,onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCj_p4himuGnJoG4bMDzVYPmhQ9ZSs_LAQ",
  authDomain: "seems-1d365.firebaseapp.com",
  projectId: "seems-1d365",
  storageBucket: "seems-1d365.appspot.com",
  messagingSenderId: "138172531855",
  appId: "1:138172531855:web:ad2a7b2d81d35b77919cfa",
  measurementId: "G-MQMXETXGHE"
};

const btnLogin = document.getElementById("loginBtn");
const btnLogout = document.querySelector('#logoutBtn');

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const loginEmailPassword = async () => {

    document.getElementById("invalid").style.display = "none";
    const loginEmail = document.getElementById('typeEmailX').value
    const loginPassword = document.getElementById('typePasswordX').value
    console.log(loginEmail);console.log(loginPassword);
    try{
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log(userCredential.user);
    }
    catch(error){
        console.log(error);
        document.getElementById("invalid").style.display = "block";
    }
}

btnLogin.addEventListener("click", loginEmailPassword);

const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
        if(user !== null){    
            console.log(user.uid);
            console.log("logged in");
            document.getElementById("loginSection").style.display = "none";
            document.getElementById("mainSection").style.display = "block";
        }
        else{
            console.log("No user");
            document.getElementById("loginSection").style.display = "block";
            document.getElementById("mainSection").style.display = "none";
        }
    });
}

monitorAuthState();

const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
}

btnLogout.addEventListener('click', logout);

const db = getFirestore(app);

let logs=[];
let today=new Date();
try{
  const q = query(collection(db, "svbh-complaints"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    let st=doc.data().status;
     console.log(doc.data().email, doc.data().name, doc.data().reg_no, doc.data().Room, doc.data().Entry, doc.data().complaint);
    
      // var timestamp = doc.data().Exit;
      logs.push([doc.data().email, doc.data().name, doc.data().reg_no, doc.data().Room, doc.data().Entry, (st===0)?"Pending":"Done",doc.data().complaint]);
    
  });
}
catch(error){
  console.log(error);
}

BuildLogTable(logs);
function BuildLogTable(data){
let b=document.getElementById("tbody");
let c = document.getElementById("random");
for(let i=0;i<logs.length;i++){
  let modal = `<div class="modal fade" id="exampleModal${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> 
  <div class="modal-dialog" role="document">
  <div class="modal-content">
      <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">${data[i][0]}</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
      </button>
      </div>
      
      <div class="modal-body">    
      <h6>Room: ${data[i][3]}</h5>                    
      <h6>Name: ${data[i][1]}</h5>
      <h6>Registration No: ${data[i][2]}</h5>
      
      <hr>
      <h6>Complaint</h6>
      <p id="leave${i}">${data[i][6]}</p>
      </div>
      <div class="modal-footer">
      `
if(data[i][5]!=="Pending"){
  modal+=`<button id="approve${i}" type="button"  class="btn btn-success disabled">Done</button>`
}
else{
  modal+=`<button id="approve${i}" type="button" class="btn btn-success" data-dismiss="modal" >Done</button>`
}

modal+=`</div>
  </div>
  </div>
</div> `

let row=`<tr>
<td>${data[i][0]}</td>
<td>${data[i][1]}</td>                
<td>${data[i][2]}</td>
<td>${data[i][3]}</td>
<td>${data[i][4]}</td>
<td>${data[i][5]}</td>

<td><a data-toggle="modal" data-target="#exampleModal${i}">Click to view</a></td>             
</tr>
`
b.innerHTML+=row;
c.innerHTML+=modal;           
}
};

$("button").click(async function() {
  let ind = -1;
  if(this.id[0]==='a'){
    console.log(logs[this.id[7]][3]);
    const leaveApplication = doc(db, "svbh-complaints", logs[this.id[7]][3]);
    await updateDoc(leaveApplication, {
      status: 1
    });
    ind = this.id[7];
  }
  if(ind!==-1){
    document.getElementById("approve"+ind).disabled = true;
  }
  window.location.reload();
});

// Pagination

$(document).ready(function() {
    $('#data').after('<div id="nav"></div>');
    var rowsShown = 5;
    console.log(rowsShown);
    var rowsTotal = $('#data tbody tr').length;
    var numPages = rowsTotal / rowsShown;    
    $('#nav').append('<ul id="tty" class="pagination"></ul>');
    for (let i = 0; i < numPages; i++) {
      var pageNum = i + 1;
      $('#tty').append('<li class="page-item"><a class="page-link" href="#" rel="' + i + '">' + pageNum + '</a></li>');
    }
    $('#data tbody tr').hide();
    $('#data tbody tr').slice(0, rowsShown).show();
    $('#nav a:first').addClass('active');
    $('#nav a').bind('click', function() {
  
      $('#nav a').removeClass('active');
      $(this).addClass('active');
      var currPage = $(this).attr('rel');
      var startItem = currPage * rowsShown;
      var endItem = startItem + rowsShown;
      $('#data tbody tr').css('opacity', '0.0').hide().slice(startItem, endItem).
      css('display', 'table-row').animate({
        opacity: 1
      }, 300);
    });
  });

//   document.onreadystatechange = function() {
//     if (document.readyState !== "complete") {
//         document.querySelector(
//           "body").style.visibility = "hidden";
//         document.querySelector(
//           "#spinner").style.visibility = "visible";
//           document.querySelector(
//             "#oad").style.visibility = "visible";
//     } else {
//         document.querySelector(
//           "#spinner").style.display = "none";
//           document.querySelector(
//             "#load").style.display = "none";
//         document.querySelector(
//           "body").style.visibility = "visible";
//     }
// };

