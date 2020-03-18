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

  
$.getJSON( "items.json", function( data ) {
  $('#mainImg').css('background-image',`url(${data[0].image})`)
  data.forEach((obj,index)=>{
    let thumbnail=$(`<div class="thumbnail" style='background-image:url(${obj.image})' id='thumb${index}'></div>`)
    thumbnail.appendTo('.thumbnailImgs')
  })
});

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
  var thumbnailBg=$('#'+eventId).css('background-image')
  thumbnailBg=thumbnailBg.split('')
  let l1=thumbnailBg.length
  thumbnailBg.splice(l1-1,l1-1)
  thumbnailBg.splice(0,4)
  thumbnailBg=thumbnailBg.join('')
  console.log(thumbnailBg)
  $('#mainImg').css('background-image',`url(${thumbnailBg})`);
})

$('#testiBullets').click((e)=>{
  let eventId=e.target.id
  
  $.getJSON( "testimonials.json", function( data ) {
    $.each( data, function( key, val ){
      $('#testiPic').attr('src',data[eventId].image)
      $('#testiText').text(data[eventId].testimonials)
      $('#testiName').text(data[eventId].name)
      $('#testiDesignation').text(data[eventId].designation)
    });
  });
})