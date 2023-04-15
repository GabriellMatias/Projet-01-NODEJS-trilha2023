import http from "node:http"

/*Quando o type do package e module tem que especificar o tipo do arquiv */
import { json } from "./middlawares/json.js"
import { routes } from "./routes.js"

/*
Query Params
  - Vem na URL -> url/users:userId=1&name:matias 
  - Usa quando a URL tem que ser StateFull
    - Faco um filtro e mando para algum amigo, esse filtro tem que continuar ali
    - Nao pode ser STATELESS
  - Filtros, busca, paginacao (Nao Obrigatorios)
  
Route Params
  - vem na URL -> url/users/1 
  - esse 1 serve para identificar qual user de acordo com o ID dele
  - Normalmente vem para identificacao de algum recurso
  - de acordo com a o tipo de requisicao vai entender o que a rota quer dizer

Request Body
  - Envio de informacoes de frmulario, pode ser varias
  - Nome, email etc
  - Infos mais dificeis de serem interceptadas

  */
const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find((route) => {
    /*Testando se a regex que passou bte com a url que foi recebida */
    return route.method === method && route.path.test(url)
  })
  if (route) {
    /*Executa a regex na rul para retornar qual daados a regex encontrou na rota */
    const routeParams = req.url.match(route.path)
    
    req.params = {...routeParams.groups}


    return route.handler(req, res)
  }
  return res.writeHead(404).end()


})

server.listen(3333)


/*Buffer transforma o dado em um hexadecimal ou um binario
assim fica mais facil o computador ler e guardar o dado */