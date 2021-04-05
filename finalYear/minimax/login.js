import firebase from 'firebase'
require('firebase/auth')

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      document.getElementById("loginDiv").style.display = "block"
      document.getElementById("userDiv").style.display = "none"
    } else {
      // No user is signed in.
      document.getElementById("loginDiv").style.display = "none"
      document.getElementById("userDiv").style.display = "block"
    }
  });


function login(){

    var userEmail = document.getElementById("email-field").value;
    var userPassword = document.getElementById("password-field").value;


    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("ERROR: "+ errorMessage);
  });
    
}