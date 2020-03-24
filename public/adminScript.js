
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

function saveDate(){
  let today =  new Date();
  var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
  document.getElementById('date').value=date
  console.log(document.getElementById('date').value)
  return true
}

function deleteItem(id){
  let itemId={id:id}
  let d = document.getElementById("allItemList");
  let d_nested = document.getElementById(`${id}`);
  d.removeChild(d_nested);
  axios.post('/admin/deleteItem', itemId)
  .then(response=>{
    console.log(`item removed`, response.data);
  })
  .catch(error => console.error(error));
}
