import * as http from 'http'
import { IncomingMessage, ServerResponse } from 'http'
import * as fs from 'fs'

const server = http.createServer()

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  console.log('method', request.method)
  console.log('url', request.url)
  console.log('headers', request.headers)
  const arr = []
  request.on('data', (chunk) => {
    arr.push(chunk)
  })
  request.on('end', () => {
    // body: post请求的参数
    const body = Buffer.concat(arr).toString()
    response.statusCode = 200
    response.setHeader('X-Guo', `I'm guo`)
    response.setHeader('Content-Type', 'image/png')
    const img = fs.readFileSync('./11.png', 'binary')
    response.write(img, 'binary')
    response.end()
  })
})

server.listen(8888, () => {
  console.log(server.address())
})
