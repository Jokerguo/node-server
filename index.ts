import * as http from 'http'
import { IncomingMessage, ServerResponse } from 'http'
import * as fs from 'fs'
import * as p from 'path'
import * as url from 'url'

const server = http.createServer()
// public文件绝对路径
const publicDir = p.resolve(__dirname, 'public') //__dirname 当前文件所在目录

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  const { method, url: path, headers } = request
  const { pathname, search } = url.parse(path) // url.parse处理查询参数

  if (method !== 'GET') {
    response.statusCode = 405
    response.end()
    return
  }

  let fileName = pathname.substring(1)
  if (fileName === '') {
    fileName = 'index.html'
  }
  // response.setHeader('Content-Type', 'text/plain; charset=utf-8')
  fs.readFile(p.resolve(publicDir, fileName), (error, data) => {
    if (error) {
      if (error.errno === -4058) {
        response.statusCode = 404
        fs.readFile(p.resolve(publicDir, '404.html'), (error, data) => {
          response.end(data)
        })
      } else {
        response.statusCode = 500
        response.end('服务器繁忙！！')
      }
    } else {
      response.setHeader('Cache-Control', 'public, max-age=31536000') //缓存（除首页都缓存）
      response.end(data)
    }
  })
})

server.listen(8888)
