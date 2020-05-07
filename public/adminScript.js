
window.addEventListener('load', function () {
  //modal.style.display = "block";
}, false);

// Get the modal
var modal = document.getElementById("myModal");
var addItemModal = document.getElementById("add");
var thumbImgModal = document.getElementById("thumb");
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
  else if (event.target == thumbImgModal) {
    thumbImgModal.style.display = "none";
  }
}

function saveDate(){
  let today =  new Date();
  var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
  document.getElementById('date').value=date
  console.log(document.getElementById('date').value)
  return true
}


function editItem(id){
  let edit = document.getElementById(id)
  let divList=edit.children[0].children
  document.getElementsByName('Uname')[0].value=divList[0].innerHTML
  document.getElementsByName('Utype')[0].value=divList[1].innerHTML
  document.getElementsByName('Usummary')[0].value=divList[2].innerHTML
  document.getElementsByName('Uid')[0].value=id
  document.getElementsByName('Uprice')[0].value=divList[5].innerHTML
  if(divList[7].innerHTML==='available'){
    document.getElementsByName('Uavailable')[0].checked=true
    document.getElementsByName('Usoldout')[0].checked=false
  }
  else{
    document.getElementsByName('Usoldout')[0].checked=true
    document.getElementsByName('Uavailable')[0].checked=false
  }
  document.getElementById('update').style.display='block'
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
        axios.post('/admin/deleteType',{ type:tableChild.value })
        .then(response=>{
          if(response.status==200){
            console.log(tableChild.value+' type is deleted');    
            document.getElementById(tableChild.value).remove()
            x.options.remove(i);  
          }
          else{ console.log('failed to deleted type as item with type already exists')}
        })
        .catch(error => console.error(error));
       }
    }
  }
}

function check(){
  document.getElementsByName("Usoldout")[0].checked=false
}

function uncheck(){
  document.getElementsByName("Uavailable")[0].checked=false
}

function removeThumbnailItem(id){
  let d = document.getElementById("thumbnailItems");
  let d_nested = document.getElementById(`${id}`);
  d.removeChild(d_nested);
}
let thumbIds=[]
let total=0;
function addThumbnail(id){
  let button=document.getElementById(id)
  if(thumbIds.includes(id)){
    //item exist already
    console.log('item exist already')
    total--;
    let temp=[]
    thumbIds.forEach(ele=>{
      if(ele!==id){
        temp.push(ele)
      }
    })
    thumbIds=temp;
    button.innerHTML='select'
    button.style.backgroundColor="darkred";
    button.style.color='lightseagreen';
  }
  else{
    //item doesn't exist 
    console.log('item doesn"t exist')
    total++;
    thumbIds.push(id)
    button.innerHTML='deselect'
    button.style.backgroundColor="lightseagreen";
    button.style.color='darkred';
  }
  console.log(total)
  document.getElementById("selectedThumbnail").innerHTML=(total)
}

function saveThumbnails(){
  console.log("saving thumbnails")
  axios.post('/admin/saveThumbnails',{ ids:thumbIds })
  .then(response=>{
    console.log(`save thumbnails`);
    alert("saved to server")
  })
  .catch(error => console.error(error));
}