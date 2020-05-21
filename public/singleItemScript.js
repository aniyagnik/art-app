const mainPicture = document.querySelector("#mainPicture");

$('#pic0').hover(e=>{
        let image=$(`#pic0`).css('background-image')
        mainPicture.css('background-image',image)
})

$('#pic1').hover(e=>{
    let image=$(`#pic1`).css('background-image')
    mainPicture.css('background-image',image)
})

const content = $('#content')

const container = document.querySelector(".imgBox");

container.addEventListener("mousemove", function(e) {
    let image=$(`#mainPicture`).css('background-image')
    content.css({
        'background-image':image,
        'background-position-x':-e.offsetX * 1.8 + "px",
        'background-position-y':-e.offsetY + 80 + "px"
    })
});

container.addEventListener("mouseout",function(e){
    console.log("sdfsd sd")
    content.css({"background-color":"lightsteelblue","background-image":""});
  });
// container.addEventListener("mouseenter", function() {
  
//   setTimeout(function() {
//     mover.classList.add("no-more-slidey");
//     container.removeEventListener("mouseenter");
//   }, 250);
  
// });

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



$('#buyNow').click(e=>{
    e.preventDefault()
    const itemId=$('#itemId').val()
    let userId=$('#username').val()
    const buyBtn=$('#buyNow')
    const value=addBtn.text()
    console.log(value,userId)
    const loader = $(`<i class="fa fa-spinner fa-spin" style="color:white"></i>`)
    if(userId.length>1 && userId && value=='Add To Cart'){
        //logged in to add
        addBtn.html(loader);  
        axios.post('/user/buyNow',{ itemId:itemId, userId:userId })
        .then(response=>{
          console.log('item bought');
          addBtn.html('Buy Now')
        })
        .catch(error => console.error(error));
    }
    else{
        if(confirm("you haven't logged in to art-app.Log-in first?")){
            window.location='/login'
        }
    }
})

