import http from "node:http"

/*Quando o type do package e module tem que especificar o tipo do arquiv */
import { json } from "./middlawares/json.js"
import { routes } from "./routes.js"


const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find((route) => {
    return route.method === method && route.path === url
  })
  if (route) {
    return route.handler(req, res)
  }
  return res.writeHead(404).end()


})

server.listen(3333)


/*Buffer transforma o dado em um hexadecimal ou um binario
assim fica mais facil o computador ler e guardar o dado */