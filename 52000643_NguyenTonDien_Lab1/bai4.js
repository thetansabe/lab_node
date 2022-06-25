let localCount = 1
let sessionCount = 1

function handleLocalStorage(){
    const name = document.querySelector('.name-input').value 
    const age = document.querySelector('.age-input').value 
    const tbody = document.querySelector('.local-storage_table-body')

    if(name != '')
        localStorage.setItem('name', name)
    if(age != '')
        localStorage.setItem('age', age)

    let tr = document.createElement('tr')
    let content = ` <th>${localCount}</th>
                    <th>${localStorage.getItem('name')}</th>
                    <th>${localStorage.getItem('age')}</th>`

    tr.innerHTML = content
    tbody.appendChild(tr)

    localCount++
}

function handleSessionStorage(){
    const name = document.querySelector('.name-input').value 
    const age = document.querySelector('.age-input').value 
    const tbody = document.querySelector('.session-storage_table-body')

    if(name != '')
        sessionStorage.setItem('name', name)
    if(age != '')
        sessionStorage.setItem('age', age)

    let tr = document.createElement('tr')
    let content = ` <th>${sessionCount}</th>
                    <th>${sessionStorage.getItem('name')}</th>
                    <th>${sessionStorage.getItem('age')}</th>`

    tr.innerHTML = content
    tbody.appendChild(tr)

    sessionCount++
}