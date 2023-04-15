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
    }).catch(() => {
      this.#persist()
    })
  }

  select(table, search) {
    let data = this.#database[table] ?? []
    if(search){
      data = data.filter(row =>{
        /*Object entries ele transforma o objeto em um array 
        {Name:Matias} = ["name", "Matias"]  */
        return Object.entries(search).some(([key, value])=>{
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }
    return data
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)
    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }

  }
  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)
    if (rowIndex > -1) {
      this.#database[table][rowIndex] = {id, ...data}
      this.#persist()
    }

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