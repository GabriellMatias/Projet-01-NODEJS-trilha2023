import http from "node:http"
import { Readable, Transform, Writable } from "node:stream"



class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const inverseNumber = Number(chunk.toString()) * -1
    callback(null, Buffer.from(String(inverseNumber)))
  }

}

/*req pode ser uma readblestream
  res pode ser uma writablestream */
const server =  http.createServer(async (req, res)=>{
  const buffers = []
  for await(const chunk of req){
    buffers.push(chunk)
  }
  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log(fullStreamContent);

  return res.end(fullStreamContent)

})

server.listen(3334)