const http = require('http')
// const url = require('url')
const fs = require('fs')
const qs = require('querystring')

const PORT = 5522

http.createServer((req,res) => {
    //normalize string
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()

    switch(path){
        case '':
            serveStaticFile(res, '/login_form.html','text/html',200)
            break

        case '/login':
            if (req.method == 'POST') {
                let body = '';
        
                req.on('data', function (data) {
                    body += data.toString();
        
                    // Too much POST data, kill the connection!
                    // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
                    if (body.length > 1e6)
                        req.connection.destroy();
                });
        
                req.on('end', function () {
                    //fixed password
                    const user = 'admin@gmail.com'
                    const pass = 'admin123'

                    console.log(body)

                    const queryObj = qs.parse(body);
                    //console.log(queryObj)

                    if(queryObj.email != user && queryObj.password != pass){
                        console.log('in here')
                        serveStaticFile(res,'/fail.html','text/html',200)
                        
                    }
                    else{
                        console.log('inelse')
                        serveStaticFile(res,'/success.html','text/html',200)
                        // res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                        // res.end(JSON.stringify('success'));
                    }
                    
                });
            }
            break

        default:
            res.writeHead(404,{'Content-Type': 'text/plain'})
            res.end('Duong dan khong hop le!')
            break
    }
        

}).listen(PORT)

function serveStaticFile(res, path, contentType, responseCode){
    if(!responseCode) responseCode = 200

    fs.readFile(__dirname + path, function(err,data) {
        if(err){
            res.writeHead(500, {'Content-Type' : 'text/plain'})
            res.end('500 - Internal Error')
        }else{
            res.writeHead(responseCode, {'Content-Type': contentType})
            //data la du lieu file html
            res.end(data)
        }
    })
}