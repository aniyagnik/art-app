
window.addEventListener('load', function () {
  //modal.style.display = "block";
}, false);

// Get the modal
var modal = document.getElementById("myModal");
var addItemModal = document.getElementById("add");
var editTypeModal = document.getElementById("editTypes");

window.onclick = function(event) {
  if (event.target == document.getElementsByClassName('flex-opt')[1]) {
    modal.style.display = "none";
  }
  else if (event.target == document.getElementsByClassName('flex-opt')[0]) {
    window.location='/'
  }
  else if (event.target == addItemModal) {
    addItemModal.style.display = "none";
  }
  else if (event.target == editTypeModal) {
    editTypeModal.style.display = "none";
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


function addNewType(){
  const newType=document.getElementById('newType')
  var deleteTypes = document.getElementById("deleteTypes");
  let x = document.getElementById("typesOpt");
  if(newType.value.length>3){
    //add type
    console.log('adding')
    let l = x.options.length;
    let c = document.createElement("option");
    c.text = newType.value;
    x.options.add(c, l);

    let newSpan = document.createElement('span');
    newSpan.id = newType.value;
    deleteTypes.appendChild(newSpan);

    var element = document.createElement("input");
    element.setAttribute('type','checkbox')
    element.setAttribute("value", newType.value);

    var node = document.createTextNode(newType.value);

    let span = document.getElementById(newType.value);
    span.appendChild(element);
    span.appendChild(node);

    axios.post('/admin/addType',{ type:newType.value })
    .then(response=>{
      console.log(`type added : `, response.data);
    })
    .catch(error => console.error(error));
    newType.value=''
  }
  else{
    //delete types
    console.log('deleting')
    var children = deleteTypes.children;
    for (var i = 0; i < children.length; i++) {
      var tableChild = children[i];
      tableChild=tableChild.children[0]
      if (tableChild.checked){
        document.getElementById(tableChild.value).remove()
        x.options.remove(i);  
        axios.post('/admin/deleteType',{ type:tableChild.value })
        .then(response=>{
          console.log(`type deleted : `, response.data);
        })
        .catch(error => console.error(error));
       }
    }
  }
}