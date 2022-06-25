
//https://images.unsplash.com/photo-1645957309498-a83793c0f647?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80
let url = ''
let blobURL = ''
function handleSubmitUrl(){
    url = $('.url-input').val() 

    $.ajax({
        url: url,
        cache: false,
        xhr: function(){
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 2) {
                    if (xhr.status == 200) {
                        xhr.responseType = "blob";
                    } else {
                        xhr.responseType = "text";
                    }
                }
            };
            return xhr;
        },
        success: function(data){
            console.log('xhr: ',data)
            //reset -> tranh ro ri bo nho
            if(blobURL != '') URL.revokeObjectURL(blobURL)
            
            blobURL = URL.createObjectURL(data)

            $('img').attr('src',blobURL)
            $('img').css('cursor','pointer')
            
            console.log(blobURL)
        }
    })
}

function handleSaveImg(){
    const words = blobURL.split('/')
    // console.log(words[3]+'.jpg')
    const imgName = words[3]+'.jpg'

    let a = document.createElement('a')
    a.setAttribute('download', imgName)
    // phai co href moi tai duoc
    a.setAttribute('href', blobURL)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}