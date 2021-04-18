var questionMark = document.getElementById('questionMark');
var questionMark2 = document.getElementById('questionMark2');
var questionMark3 = document.getElementById('questionMark3');
var db = firebase.database();

function userInteraction() {
    db.ref('mostRecentUser/0/gameOne').set(' ')
    db.ref('mostRecentUser/0/gameOne').on('value', snap => questionMark.innerText = snap.val());
  }

  //userInteraction();

  function userInteraction2() {
    db.ref('mostRecentUser/0/gameTwo').set(' ')
    db.ref('mostRecentUser/0/gameTwo').on('value', snap => questionMark.innerText = snap.val());
  }

  //userInteraction2()

  function userInteraction3() {
    db.ref('mostRecentUser/0/gameThree').set(' ')
    db.ref('mostRecentUser/0/gameThree').on('value', snap => questionMark.innerText = snap.val());
  }

  //userInteraction3()
