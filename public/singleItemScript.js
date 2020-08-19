// const mainPicture = document.querySelector("#mainPicture");

// $('#pic0').hover(e=>{
//         let image=$(`#pic0`).css('background-image')
//         mainPicture.css('background-image',image)
// })

// $('#pic1').hover(e=>{
//     let image=$(`#pic1`).css('background-image')
//     mainPicture.css('background-image',image)
// })

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


function checkBuyingItem(){
    const itemId=$('#itemId').val()
    let userId=$('#username').val()
    const buyBtn=$('#buyNow')
    const value=$('#addToCart').text()
    console.log(value,userId)
    console.log(itemId)
    const loader = $(`<i class="fa fa-spinner fa-spin" style="color:white"></i>`)
    if(userId.length>1 && userId && value=='Add To Cart'){
        //logged in to add
        buyBtn.html(loader);
        return true
    }
    else{
        if(confirm("you haven't logged in to art-app.Log-in first?")){
            window.location='/login'
        }
        else{
            return false
        }
    }
}
