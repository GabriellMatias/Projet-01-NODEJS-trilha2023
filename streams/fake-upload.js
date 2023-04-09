import { Readable } from "node:stream"
import fetch from "node-fetch"

/*Streams precisam utilizar o tipo buffer, nao aceitam string, int etc */
class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 5) {
        this.push(null)
      } else {
        const buff = Buffer.from(String(i))
        this.push(buff)
      }
    }, 1000)
  }
}

fetch('http://localhost:3334', {
  method: "POST",
  body: new OneToHundredStream(),
  duplex: "half",
}).then(response => {
  return response.text()
}).then(data => {
  console.log(data);
})