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
        console.log('in if')
        $(`#${l.attr('id')}`).removeClass('active')
    }
    $(`#${eventId}`).addClass('active');
    //empty list
    $('#itemsList').html('')
    
    //filling the list
    items[eventId].forEach(obj=>{
        let thumbnail=$(`
        <div class="flex-itemL">
            <div class="itemCard" style="background-image: url(${obj.image});">
                <div class="itemDiscription">
                    ${obj.type} &nbsp;&nbsp;&nbsp;&nbsp;
                    <b style="color:black;font-style:oblique;">price </b>: ${obj.price}
                    <br>
                    ${obj.status}
                </div>
            </div>    
         </div>`)
      thumbnail.appendTo('#itemsList')
    })
})