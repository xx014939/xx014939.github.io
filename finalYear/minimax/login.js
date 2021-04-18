


function login(){

    var userEmail = document.getElementById("email-field").value;
    var userPassword = document.getElementById("password-field").value;
    var db = firebase.database();


    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    //localStorage.setItem("currentUser",userEmail); // upon succesful login save current user to variable


    // create an array object which holds three user interactions
    db.ref().set({
      mostRecentUser : [{
        gameOne: "?",
        gameTwo: "?",
        gameThree: "?"
      }]
      });
  
    window.location.href = "https://xx014939.github.io/finalYear/minimax/home";
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

userCurrent = FirebaseAuth.getInstance().getCurrentUser();
userCurrent.sendEmailVerification();


}




document.getElementById("loginButton").onclick = function() {login()};
document.getElementById("logoutButton").onclick = function() {logout()};

document.getElementById("registerButton").onclick = function() {register()};