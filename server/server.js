import path from 'path'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import connectDB from './config.js'
import userRoutes from './routes/userRoutes.js'


const __dirname = path.resolve(path.dirname(''))
dotenv.config({path:__dirname+'/env.env'})
connectDB()
const app = express()
app.use(cors())

app.use(express.json())
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use('/api/users', userRoutes)
app.use('/', (req, res)=> res.send('api is running'))


const PORT = 5000

app.listen(PORT, console.log(`server is running in ${process.env.NODE_ENV} on ${PORT}`.yellow.bold))


