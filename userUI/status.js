import { collection, doc, getDocs, getFirestore, query, updateDoc, arrayUnion} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCj_p4himuGnJoG4bMDzVYPmhQ9ZSs_LAQ",
  authDomain: "seems-1d365.firebaseapp.com",
  projectId: "seems-1d365",
  storageBucket: "seems-1d365.appspot.com",
  messagingSenderId: "138172531855",
  appId: "1:138172531855:web:ad2a7b2d81d35b77919cfa",
  measurementId: "G-MQMXETXGHE"
};

// const btnLogout = document.querySelector('#logoutBtn');

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// const monitorAuthState = async () => {
//     onAuthStateChanged(auth, user => {
//         if(user !== null){    
//             console.log(user.uid);
//             console.log("logged in");
//         }
//         else{
//             console.log("No user");
//         }
//     });
// }

// monitorAuthState();

// const logout = async () => {
//     console.log("here");
//     await signOut(auth);
//     localStorage.removeItem("user");
// }

// btnLogout.addEventListener('click', logout);

const db = getFirestore(app);


let leaves=[];

try{
  const q = query(collection(db, "svbh-leave"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // var start = doc.data().Start; start = new Date(start.seconds*1000); 
    // let startDate = start.getFullYear() + "/" + start.getMonth() + "/" + start.getDate();
    // var end = doc.data().End; end = new Date(end.seconds*1000); 
    // let endDate = end.getFullYear() + "/" + end.getMonth() + "/" + end.getDate();
    var st = doc.data().status;
    leaves.push([doc.data().email, doc.data().name, doc.data().reg_no, doc.data().leave_date, doc.data().return_date, (st===0)?"Received":(st===1)?"Approved":"Rejected"]);
  });
}
catch(error){
  console.log(error);
}
console.log(leaves);

BuildLeaveTable(leaves);
function BuildLeaveTable(data){

let b = document.getElementById("tbody");
let c = document.getElementById("random");

for(let i=0;i<data.length;i++){
    // let modal = `<div class="modal fade" id="exampleModal${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> 
    //                 <div class="modal-dialog" role="document">
    //                 <div class="modal-content">
    //                     <div class="modal-header">
    //                     <h5 class="modal-title" id="exampleModalLabel">${data[i][0]}</h5>
    //                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    //                         <span aria-hidden="true">&times;</span>
    //                     </button>
    //                     </div>
                        
    //                     <div class="modal-body">                        
    //                     <h6>Name: ${data[i][1]}</h5>
    //                     <h6>Registration No: ${data[i][2]}</h5>
                        
    //                     <hr>
    //                     <h6>Reason</h6>
    //                     <p id="leave${i}">${data[i][6]}</p>
    //                     </div>
    //                     <div class="modal-footer">
    //                     `
    // if(data[i][5]!=="Received"){
    //   modal+=`<button id="approve${i}" type="button" class="btn btn-success disabled">Approve</button>
    //           <button id="reject${i}" type="button" class="btn btn-danger disabled" data-dismiss="modal">Reject</button>`
    // }
    // else{
    //   modal+=`<button id="approve${i}" type="button" class="btn btn-success">Approve</button>
    //           <button id="reject${i}" type="button" class="btn btn-danger" data-dismiss="modal">Reject</button>`
    // }
    // modal+=`</div>
    //                 </div>
    //                 </div>
    //             </div> `

    let row=`<tr>
                <td>${data[i][0]}</td>
                <td>${data[i][1]}</td>                
                <td>${data[i][2]}</td>
                <td>${data[i][3]}</td>
                <td>${data[i][4]}</td>
                <td>${data[i][5]}</td>
                             
            </tr>
            `
            b.innerHTML+=row;
            // c.innerHTML+=modal;           
    }
};

// $("button").click(async function() {
//   let ind = -1;
//   if(this.id[0]==='a'){
//     console.log(leaves[this.id[7]][0]);
//     const leaveApplication = doc(db, "svbh-leave", leaves[this.id[7]][2]);
//     await updateDoc(leaveApplication, {
//       status: 1
//     });
//     ind = this.id[7];
//   }
//   else if(this.id[0]==='r'){
//     console.log(leaves[this.id[6]][0]);
//     const leaveApplication = doc(db, "svbh-leave", leaves[this.id[6]][2]);
//     await updateDoc(leaveApplication, {
//       status: 2
//     });
//     ind = this.id[6];
//   }
//   if(ind!==-1){
//     document.getElementById("approve"+ind).disabled = true;
//     document.getElementById("reject"+ind).disabled = true;
//   }
// });


// Pagination

$(document).ready(function() {
    $('#data').after('<div id="nav"></div>');
    var rowsShown = 7;
    console.log(rowsShown);
    var rowsTotal = $('#data tbody tr').length;
    var numPages = rowsTotal / rowsShown;
    for (let i = 0; i < numPages; i++) {
      var pageNum = i + 1;
      $('#nav').append('<a href="#" rel="' + i + '">' + pageNum + '</a> ');
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