let items =[
    [],[],[],[],[]
]
$('#varities').click(e=>{
    let eventId=e.target.id
    if(eventId==='varities')
        return
    let l=$(`.active`)
    console.log(l.length," "+l.attr('id'))
    if(l.length>0){
        $(`#${l.attr('id')}`).removeClass('active')
    }
    $(`#${eventId}`).addClass('active');
    //empty list
    let itemsList = $('#itemsList').children()
    console.log('sa ',itemsList)
    console.log('event is ',eventId )
    for(let i = 0; i < itemsList.length ; i++){
        let string= itemsList[i].className
        if(!string.includes(eventId)){
            itemsList[i].style.display = "none"; 
        }
        else{
            itemsList[i].style.display = "block"; 
        }    
    }
})