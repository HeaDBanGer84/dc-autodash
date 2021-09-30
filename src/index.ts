import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'
import dockerRouter from './router/DockerRouter'
import { DockerController } from './controller/DockerController'

const prisma = new PrismaClient()
const app = express()
const dockerController = new DockerController(prisma);


app.use(express.json())
app.use(express.static('../public'))
app.use('/api/v1/docker',dockerRouter(dockerController));
dockerController.update();

const serverPort:Number = 5000

const server = app.listen(serverPort, () =>
  console.log(`
🚀 Server ready at: http://localhost:5000
⭐️ See sample requests: http://localhost:5000/api/v1/docker`),
)
