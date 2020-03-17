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
