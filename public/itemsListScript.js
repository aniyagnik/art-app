let itemsList = $('#itemsList')

$('#varities').click(e=>{
    let eventId=e.target.id
    if(eventId==='varities')        //check for invalid id
        return

    //set active class right
    let l=$(`.active`)
    if(l.length>0){
        $(`#${l.attr('id')}`).removeClass('active')
    }
    $(`#${eventId}`).addClass('active');
    
    //modify list
    let itemsListChildren = itemsList.children()
    for(let i = 0; i < itemsListChildren.length ; i++){
        let string= itemsListChildren[i].className
        if(!string.includes(eventId)){
            itemsListChildren[i].style.display = "none"; 
        }
        else{
            itemsListChildren[i].style.display = "block"; 
        }    
    }
})

function checkAvailability(status,index){
    console.log('s ',index)
    if(status==='available'){
        let id=document.getElementById(index).value
        console.log(id)
        window.location='/item?id='+id
    }
    else{
        alert('item is out of stock!!!😓😓')
    }
}