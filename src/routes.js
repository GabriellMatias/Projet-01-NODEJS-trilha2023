import { buildRoutePath } from "./Utils/build-route-path.js"
import { DataBase } from "./database.js"
import { v4 } from "uuid"

const database = new DataBase()
export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const { search } = req.Query
      const users = database.select('users', search ?{
        name: search,
        email: search
      }: null)

      return res.end(JSON.stringify(users))
    }
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const { name, email } = req.body

      const user = {
        id: v4(),
        name,
        email,
      }

      database.insert('users', user)

      return res.writeHead(201).end()
    }
  },
  {
    method: "DELETE",
    path: buildRoutePath("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params
      database.delete("users", id)


      return res.writeHead(204).end()
    }
  },
  {
    method: "PUT",
    path: buildRoutePath("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params
      const { name, email } = req.body
      database.update("users", id, {
        name, email
      })


      return res.writeHead(204).end()
    }
  }
]