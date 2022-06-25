const http = require('http')
const url = require('url')

const PORT = 5544

const html = `
<html>
<head>
    <title>Bai 1</title>
</head>

<body>
    <form action="http://localhost:5544/result" method="get">
        <div>
            <label for="">So hang 1: </label>
            <input type="number" name="so_hang_1" id="so_hang_1">
        </div>

        <div>
            <label for="">So hang 2: </label>
            <input type="number" name="so_hang_2" id="so_hang_2">
        </div>

        <div>
            <label for="">Phep tinh: </label>
            <select name="phep_tinh" id="phep_tinh">
                <option value="" selected disabled hidden>Chon phep tinh</option>
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="*">*</option>
                <option value="/">/</option>
            </select>
        </div>

        <button type="submit" class="tinh">Tinh</button>
    </form>
</body>
</html>
`

http.createServer((req,res) => {
    //normalize string
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()

    switch(path){
        case '': 
            res.writeHead(200,{'Content-Type': 'text/html'})
            res.write(html)
            res.end()
            break
        case '/result':
            res.writeHead(200,{'Content-Type': 'text/html'})
            //q = url.parse(req.url, true) -> chuyen string req.url nhan duoc thanh
            //thanh mang nhung string doc. duoc: vd: q.host -> in ra string localhost:8080, ...
            //q.query -> convert mang cac string tren thanh object. vd: {date: 17, month: 'feb'} -> bi. bo di localhost
            const queryObj = url.parse(req.url, true).query

            if(queryObj.so_hang_1 == '' || queryObj.so_hang_2 == '' || queryObj.phep_tinh == '')
                res.write('Nhap thieu thong tin!')
            else{
                const arith = queryObj.so_hang_1 + queryObj.phep_tinh + queryObj.so_hang_2
                const result = eval(arith)

                const out = arith + " = " + result

                
                // console.log(queryObj)
                res.write(out)
            }   
            
            res.end() //.end(string) hoac .end()
            break
        default:
            res.writeHead(404,{'Content-Type': 'text/plain'})
            res.end('Duong dan khong hop le!')
            break
    }

}).listen(PORT)