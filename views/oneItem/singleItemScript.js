$('#pic0').hover(e=>{
        let image=$(`#pic0`).css('background-image')
        $(`#mainPicture`).css('background-image',image)
})

$('#pic1').hover(e=>{
    let image=$(`#pic1`).css('background-image')
    $(`#mainPicture`).css('background-image',image)
})

$('#addToCart').click(()=>{
    alert('added to cart')
})

const mp = document.querySelector("#mainPicture");
const content = document.querySelector("#content");

mp.addEventListener("mousemove", (e) => {
    let image=$(`#mainPicture`).css('background-image')
    $('#content').css('background-image',image)
    let h=parseInt(e.offsetY),w=parseInt(e.offsetX)
    setTimeout(()=>{
        $('#hover').remove()
    },10)
    let thumbnail=$(`<div style='opacity:0.5;background-color:rgb(68, 0, 253);--x:${-e.offsetX}px;--y:${-e.offsetY}px;min-width:20px;min-height:20px;max-width:20px;max-height:20px;position:relative' id='hover'></div>`)
    thumbnail.appendTo('#mainPicture')
    const hover = document.querySelector("#hover");
    console.log(e.offsetX," "+e.offsetY)
    content.style.setProperty('--x', -e.offsetX + "px");
    content.style.setProperty('--y', -e.offsetY + "px");
});
