const express = require('express')
const cors = require('cors')
const methodOverride = require('method-override')

const app = express()
const PORT = 3344

app.use(cors()) //enable all CORS req
app.use(methodOverride('_method'))
app.use(express.urlencoded( {extended: false} ))
app.use(express.json())

/////import model
const Student = require('./models/Student')

//route api
app.get('/students/:mssv?', function(req, res){
    //cb: callback la object tra ve ket qua cua viec tim kiem
    Student.find({nienkhoa: 'K24'}, function(err, students){
        if(err) return res.send(500,  'Internal error')
        if(!students) return res.send(500, 'Not found')

        res.json(students.map(student => {
            //map de lay ra nhung thong tin can thiet
            return {
                hoten: student.hoten,
                khoa: student.khoa,
                nienkhoa: student.nienkhoa
            }
        })) 
    })
})

app.get('/', (req,res) => {
    Student.find({}, (err, students) => {
        if(!err) return res.json(students)
        return res.status(400).json({error: 'DB error'})
    })
})

app.post('/students/add', (req, res) => {
    const newStudent = new Student({
        masv: req.body.mssv,
        hoten: req.body.name,
        lop: req.body.lop,
        khoa: req.body.khoa,
        ngaysinh: req.body.ngaysinh
    })
    newStudent.save()
    .then(() => {
        return res.json({id: newStudent._id})
    })
    .catch(err => {return res.send(500, err)})
})

app.delete('/students/delete', (req, res) => {
    Student.deleteOne({masv: req.body.mssv}, (err, student) => {
        if(err) return res.send(500, 'Error when delete')
        if(!student) return res.send(500, 'Not found student')

        return res.send('Xoa thanh cong SV: ' + student._id)
    })

})

app.put('/students/update', (req, res) => {
    Student.updateOne({masv: req.body.mssv}, {
        hoten: req.body.name,
        lop: req.body.lop,
        khoa: req.body.khoa,
        ngaysinh: req.body.ngaysinh,
        updatedAt: Date.now
    })
    .then(() => {
        return res.send('Update thanh cong')
    })
    .catch(err => {return res.send(500, err)})
})

//custom 404 page
app.use((req,res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
})

//custom 500 page
app.use((err, req, res, next) => {
    console.error(err.message);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Sever Error');
});


app.listen(PORT, ()=> {
    console.log(`App listening on http://localhost:${PORT}`);
});