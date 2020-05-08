fetch('https://picsum.photos/v2/list?page=2&limit=10')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach(image=>{
        let img = $('<img class="marqueeImg" alt="image here">'); //Equivalent: $(document.createElement('img'))
        img.attr('src', image.download_url);
        img.appendTo('#marqueeContiner');  
    })  
  });
/*
Handlebars.registerHelper('json', function(context) {
  return JSON.stringify(context);
});

$.getJSON( "../../database/showItems.json", function( data ) {
  $('#mainImg').css('background-image',`url(${data[0].image})`)
  data.forEach((obj,index)=>{
    let thumbnail=$(`<div class="thumbnail" style='background-image:url(${obj.image})' id='thumb${index}'><input type='hidden' id='objId' value='${obj._id}'></div>`)
    thumbnail.appendTo('.thumbnailImgs')
  })
});
*/

let i=0;
setInterval(()=>{
  changeTestimonials(i);
  i++;
  if(i==6)
    i=0
},5000)

function changeTestimonials(i){
  console.log("value of i ",i)
  $.getJSON( "../../database/testimonials.json", function( data ) {
    $('#testiPic').attr('src',data[i].image)
    $('#testiText').text(data[i].testimonials)
    $('#testiName').text(data[i].name)
    $('#testiDesignation').text(data[i].designation)
  });
}

let navTop=$('.navbar').offset().top
if(navTop!=0){
    $('.navbar').css({
        'background-color':'black',
        opacity:0.8,
        transition:  'all 0.5s'
    });
}    


$(window).scroll(function(){
    var currentScroll = $(window).scrollTop();
        if(currentScroll!=0){
            $('.navbar').css({
                'background-color':'black',
                opacity:0.8,
                transition:  'all 0.5s'
                });
        }
        else{
            $('.navbar').css({
                'background-color':'transparent',
                opacity:0.9,
                transition:  'all 0.5s'
                });
        }
});

$('.thumbnailImgs').click((e)=>{
  let eventId=e.target.id
  eventId=eventId.split('')
  eventId.splice(0,5)
  eventId=eventId.join('')
  $.getJSON( "../../database/showItems.json", function( data ) {
    let obj=data[eventId]
    $('#summaryText').html(obj.summary)
    $('#itemStatus').html(`<b>Status</b> : ${obj.status}`)
    $('#mainImg').css('background-image',`url(${obj.image})`)   
  });
})

$('#testiBullets').click((e)=>{
  let eventId=e.target.id
  i=eventId
  $.getJSON( "../../database/testimonials.json", function( data ) {
    $('#testiPic').attr('src',data[eventId].image)
    $('#testiText').text(data[eventId].testimonials)
    $('#testiName').text(data[eventId].name)
    $('#testiDesignation').text(data[eventId].designation)
  });
})

$('#viewCurrItem').click(()=>{
  let id=document.getElementById("objId").value
  window.location=window.location='/item?id='+id
})