let items =[
    [],[],[],[],[]
]
$.getJSON( "items.json", function( data ) {
    
    data.forEach((obj,index)=>{
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
      items[obj.typeNo].push(obj)
      items[0].push(obj)
    })
    $('.1').css('border-bottom',`2px solid darkblue;`)
});
  

$('#varities').click(e=>{
    let eventId=e.target.id
    if(eventId==='varities')
        return

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