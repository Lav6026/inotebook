
const mongoose=require('mongoose');
var cors=require('cors')

mongoose.connect("mongodb://localhost:27017/inotebookdb")
const express = require('express')
const app = express()



app.use(cors())
app.use(express.json());

const port = 5000

//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.get('/', (req, res) => {
  res.send('Hello Node!')
})

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})