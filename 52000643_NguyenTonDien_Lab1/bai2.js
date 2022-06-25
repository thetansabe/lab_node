let url = 'https://maivanmanh.github.io/503106/lab01/students.json'

//render DOM
function renderDOM(arr){
    const tbody = document.querySelector('tbody')
    let eachRow = ''

    arr.forEach(element => {
        let tr = document.createElement('tr')
        
        eachRow = `     <th>${element.id}</th>
                        <th>${element.name}</th>
                        <th>${element.age}</th>`

        tr.innerHTML = eachRow

        tbody.appendChild(tr)
    });
}

function getDataAjax(){
    const req = $.ajax(url)
        .done( function(res) {
            const data = res.data
            renderDOM(data)
            console.log(data)
        })
}

function getDataFetch(){
    fetch(url)
        .then(response => response.json())
        .then(result => {
            const data = result.data
            renderDOM(data) 
        })
}