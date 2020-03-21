document.getElementById('inputUsername').value=''
document.getElementById('inputAddress').value=''
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

document.getElementById('editName').addEventListener('click',(e)=>{
    document.getElementById('userValue').style.display='none'
    document.getElementById('inputUsername').style.display='block'
    document.getElementById('editName').style.display='none'
    document.getElementById('saveUsername').style.display='inline-block'    
})

document.getElementById('saveUsername').addEventListener('click',(e)=>{
    document.getElementById('userValue').innerHTML=document.getElementById('inputUsername').value
    document.getElementById('userValue').style.display='block'
    document.getElementById('inputUsername').style.display='none'
    document.getElementById('editName').style.display='inline'
    document.getElementById('saveUsername').style.display='none'
})

document.getElementById('editAddress').addEventListener('click',(e)=>{
    document.getElementById('addressValue').style.display='none'
    document.getElementById('inputAddress').style.display='block'
    document.getElementById('editAddress').style.display='none'
    document.getElementById('saveAddress').style.display='inline-block'    
})


document.getElementById('saveAddress').addEventListener('click',(e)=>{
    document.getElementById('addressValue').innerHTML=document.getElementById('inputAddress').value
    document.getElementById('addressValue').style.display='block'
    document.getElementById('inputAddress').style.display='none'
    document.getElementById('editAddress').style.display='inline'
    document.getElementById('saveAddress').style.display='none'
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