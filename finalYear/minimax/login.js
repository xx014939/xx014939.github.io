firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in 1.
      document.getElementById("loginDiv").style.display = "none"
      document.getElementById("userDiv").style.display = "block"
    } else {
      // No user is signed in.
      document.getElementById("loginDiv").style.display = "block"
      document.getElementById("userDiv").style.display = "none"
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

function logout() {
    firebase.auth().signOut();
}

function register() {

  var email = document.getElementById("email-field").value;
  var password = document.getElementById("password-field").value;
  
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });


}



document.getElementById("loginButton").onclick = function() {login()};
document.getElementById("logoutButton").onclick = function() {logout()};

document.getElementById("registerButton").onclick = function() {register()};