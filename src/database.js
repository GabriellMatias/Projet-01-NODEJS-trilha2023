import fs from 'node:fs/promises'

/*Lidando com caminhos dentro do node
  import.meta.url*/
const databasePath = new URL("db.json", import.meta.url)
export class DataBase {
  /*Hashtag para que essa variavel seja acessivel apenas aqui na classe [PRIVADA] */
  #database = {}
  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }


  constructor() {
    fs.readFile(databasePath, "utf-8").then(response => {
      this.#database = JSON.parse(response)
    }).catch(()=>{
      this.#persist()
    })
  }

  select(table) {
    const data = this.#database[table] ?? []

    return data
  }


  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }
    /*persistindo dados em arquivo */
    this.#persist()
    return data
  }
}