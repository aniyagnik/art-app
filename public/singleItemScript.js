$('#pic0').hover(e=>{
        let image=$(`#pic0`).css('background-image')
        $(`#mainPicture`).css('background-image',image)
})

$('#pic1').hover(e=>{
    let image=$(`#pic1`).css('background-image')
    $(`#mainPicture`).css('background-image',image)
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


$('#addToCart').click(e=>{
    e.preventDefault()
    const itemId=$('#itemId').val()
    let userId=$('#username').val()
    const addBtn=$('#addToCart')
    const value=addBtn.text()
    console.log(value,userId)
    const loader = $(`<i class="fa fa-spinner fa-spin" style="color:white"></i>`)
    if(userId.length>1 && userId && value=='Add To Cart'){
        //logged in to add
        addBtn.html(loader);  
        axios.post('/user/addToCart',{ itemId:itemId, userId:userId })
        .then(response=>{
          console.log(`added to cart`);
          addBtn.html('Delete From Cart')
        })
        .catch(error => console.error(error));
    }
    else if(userId.length>1 && userId && value=='Delete From Cart'){
        //logged in to delete
        addBtn.html(loader);  
        axios.post('/user/deleteFromCart',{ itemId:itemId, userId:userId })
        .then(response=>{
          console.log(`added to cart : `, response.data);
            addBtn.html('Add To Cart')
        })
        .catch(error => console.error(error));
    }
    else{
        if(confirm("you haven't logged in to art-app.Log-in first?")){
            window.location='/login'
        }
    }
})

