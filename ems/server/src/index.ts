import express from 'express'
import server from '@agrzes/yx-ems-express'
import { MemoryEMS } from '@agrzes/yx-ems-core'
import cors from 'cors'

const ems = new MemoryEMS()
const app = express()
app.use(cors())
app.use(server(ems, ems))
app.listen(process.env.PORT || 3000)
