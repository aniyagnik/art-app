
let userValue=document.getElementById('userValue')
let inputUsername=document.getElementById('inputUsername')
let editName=document.getElementById('editName')
let saveUsername=document.getElementById('saveUsername')

let passwardValue=document.getElementById('passwardValue')
let inputPassward=document.getElementById('inputPassward')
let editPassward=document.getElementById('editPassward')
let savePassward=document.getElementById('savePassward')

let addressValue=document.getElementById('addressValue')
let inputAddress=document.getElementById('inputAddress')
let editAddress=document.getElementById('editAddress')
let saveAddress=document.getElementById('saveAddress')

let phoneValue=document.getElementById('phoneValue')
let inputValue=document.getElementById('inputPhone')
let editPhone=document.getElementById('editPhone')
let savePhone=document.getElementById('savePhone')

inputUsername.value=userValue.innerHTML
inputPassward.value=''
inputAddress.value=addressValue.innerHTML
inputValue.value=phoneValue.innerHTML

document.getElementById('cartList').addEventListener('click',(e)=>{
    console.log('ds')
    let eventId=e.target.id
    if(eventId=='0' || eventId=='1' || eventId=='2'){

    }
})

document.getElementById('deleteCart').addEventListener('click',(e)=>{
    document.getElementById('tableCart').innerHTML='<br><br>NO ITEM IN CART<br><br>'
    alert('cart emptied...')
})

editName.addEventListener('click',(e)=>{
    userValue.style.display='none'
    inputUsername.style.display='block'
    editName.style.display='none'
    saveUsername.style.display='inline-block'    
})

saveUsername.addEventListener('click',(e)=>{    
    userValue.innerHTML=inputUsername.value
    userValue.style.display='block'
    inputUsername.style.display='none'
    editName.style.display='inline'
    saveUsername.style.display='none'
})


editPassward.addEventListener('click',(e)=>{
    passwardValue.style.display='none'
    inputPassward.style.display='block'
    editPassward.style.display='none'
    savePassward.style.display='inline-block'    
})

savePassward.addEventListener('click',(e)=>{    
    alert('passward changed')
    passwardValue.style.display='block'
    inputPassward.style.display='none'
    editPassward.style.display='inline'
    savePassward.style.display='none'
})


editAddress.addEventListener('click',(e)=>{
    addressValue.style.display='none'
    inputAddress.style.display='block'
    editAddress.style.display='none'
    saveAddress.style.display='inline-block'    
})


saveAddress.addEventListener('click',(e)=>{
    addressValue.innerHTML=inputAddress.value
    addressValue.style.display='block'
    inputAddress.style.display='none'
    editAddress.style.display='inline'
    saveAddress.style.display='none'
})


editPhone.addEventListener('click',(e)=>{
    phoneValue.style.display='none'
    inputValue.style.display='block'
    editPhone.style.display='none'
    savePhone.style.display='inline-block'    
})


savePhone.addEventListener('click',(e)=>{
    phoneValue.innerHTML=inputValue.value
    phoneValue.style.display='block'
    inputValue.style.display='none'
    editPhone.style.display='inline'
    savePhone.style.display='none'
})


// Get the modal
var modal = document.getElementById('id01');
var modal2 = document.getElementById('id02');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal){
        modal.style.display = "none";
    }
    else if (event.target == modal2) {
        modal2.style.display = "none";
    } 
}