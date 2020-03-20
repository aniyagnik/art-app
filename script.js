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