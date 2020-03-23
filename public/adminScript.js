let {insert_itemInList} = require('../database/itemCollection')

window.addEventListener('load', function () {
  //modal.style.display = "block";
}, false);

// Get the modal
var modal = document.getElementById("myModal");
var addModal = document.getElementById("add");

window.onclick = function(event) {
  if (event.target == document.getElementsByClassName('flex-opt')[1]) {
    modal.style.display = "none";
  }
  else if (event.target == document.getElementsByClassName('flex-opt')[0]) {
    window.location='/'
  }
  else if (event.target == addModal) {
    addModal.style.display = "none";
  }
}

