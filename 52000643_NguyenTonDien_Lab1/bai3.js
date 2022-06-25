
//https://images.unsplash.com/photo-1645957309498-a83793c0f647?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80
let url = ''
let blobURL = ''

function handleSubmitUrl(){
    url = document.querySelector('.url-input').value
    
    loadImg(url)
        .then(xhr => {
            //log nay chua rat nhieu thong tin quan trong
            //luu y 1
            // console.log(xhr)
            // console.log(xhr.getResponseHeader('Content-Type'))
            // //cho nay sieu kho hieu
            // //luu y 2
            // const blob = new Blob([xhr.response],{
            //     type: xhr.getResponseHeader('Content-Type')
            // })
            
            // return blob
            return xhr.response
        })
        .then(blob => {
            
            //reset -> tranh ro ri bo nho
            if(blobURL != '') URL.revokeObjectURL(blobURL)
                    
            blobURL = URL.createObjectURL(blob)

            $('img').attr('src',blobURL)
            $('img').css('cursor','pointer')
            
            console.log(blobURL)
        })
        .catch(err => console.log(err))

}

function loadImg(url){
    return new Promise((resolve,reject) => {
        const xhr = new XMLHttpRequest()

        ////du lieu sau khi send moi' lam dong nay
        //thanh cong
        xhr.onload = function(){
            resolve(xhr)
        }
        //that bai
        xhr.onerror = function(){
            reject(new Error('Fail to load xhr'))
        }

        ////tuong duong voi fetch
        xhr.responseType = 'blob'
        xhr.open('GET',url,true) //true <=> async true
        xhr.send()
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

