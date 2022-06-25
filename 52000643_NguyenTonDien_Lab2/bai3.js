const http = require('http')

const PORT = 5555

let Students = [
    {id: 1, name: 'Student 1', email: 'emaill@student.com'},
    {id: 2, name: 'Student 2', email: 'email2@student.com'},
    {id: 3, name: 'Student 3', email: 'email3@student.com'},
    {id: 4, name: 'Student 4', email: 'email4@student.com'},
    {id: 5, name: 'Student 5', email: 'email5@student.com'},
    
    {id: 6, name: 'Student 6', email: 'email6@student.com'},
    {id: 7, name: 'Student 7', email: 'email7@student.com'},
    {id: 8, name: 'Student 8', email: 'email8@student.com'},
    {id: 9, name: 'Student 9', email: 'email9@student.com'},
    {id: 10,name:'Student 10', email: 'email10@student.com'}
]

let count = 11

http.createServer((req,res) => {
    //normalize string
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
    //console.log(path.split('/')[2])
    if(path == ''){
        res.writeHead(200, {'Content-Type' : 'text/html'})
        res.end('BAI 3')
    }

    else if (path == '/students'){
            //in dsach sv duoi dang json array
            if(req.method == 'GET'){
                res.writeHead(200, {'Content-Type' : 'text/html'})
                res.end(JSON.stringify(Students))
            }

            //them sv moi
            if (req.method == 'POST') {
                let body = '';
        
                req.on('data', function (data) {
                    body += data;
        
                    // Too much POST data, kill the connection!
                    // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
                    if (body.length > 1e6)
                        req.connection.destroy();
                });
        
                req.on('end', function () {
                    Students = [ ...Students, 
                        {id: count, name: `Student ${count}`, email: `email${count}@student.com`}
                    ]
                    
                    count++
                    res.writeHead(200, {'Content-Type' : 'text/html'})
                    res.end(JSON.stringify(Students)) 
                });
            }
    }
    else if (path.match(/\/students\/([0-9]+)/)){
        const studentID = parseInt(path.split('/')[2])
        const getStudentByID = Students.filter(students => {return students.id == studentID})
        
        const updateName = 'test update'
        const updateEmail = 'testupdateemail@gmail.com'

        if(req.method == 'GET'){
            res.writeHead(200, {'Content-Type' : 'text/html'})
            res.end(JSON.stringify(getStudentByID))
        }
        
        if(req.method == 'PUT'){
            getStudentByID[0].name = updateName
            getStudentByID[0].email = updateEmail
            res.writeHead(200, {'Content-Type' : 'text/html'})
            res.end(JSON.stringify(getStudentByID))
        }

        if(req.method == 'DELETE'){
            Students = Students.filter(students => {return students.id != studentID})
            res.end(JSON.stringify(Students))
        }
    }
    else{
        res.writeHead(404,{'Content-Type': 'text/plain'})
        res.end(JSON.stringify('Duong dan khong hop le!'))
    }

}).listen(PORT)
