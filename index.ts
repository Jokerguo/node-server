import * as http from 'http'
import { IncomingMessage, ServerResponse } from 'http'
import * as fs from 'fs'
import * as p from 'path'

const server = http.createServer()
// public文件绝对路径
const publicDir = p.resolve(__dirname, 'public') //__dirname 当前文件所在目录

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  const { method, url, headers } = request
  switch (url) {
    case '/index.html':
      response.setHeader('Content-Type', 'text/html; charset=utf-8')
      fs.readFile(p.resolve(publicDir, 'index.html'), (error, data) => {
        if (error) throw error
        response.end(data.toString()) //data： Buffer
      })
      break
    case '/style.css':
      response.setHeader('Content-Type', 'text/css; charset=utf-8')
      fs.readFile(p.resolve(publicDir, 'style.css'), (error, data) => {
        if (error) throw error
        response.end(data.toString()) //data： Buffer
      })
      break
    case '/main.js':
      response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
      fs.readFile(p.resolve(publicDir, 'main.js'), (error, data) => {
        if (error) throw error
        response.end(data.toString()) //data： Buffer
      })
      break
  }
})

server.listen(8888)
