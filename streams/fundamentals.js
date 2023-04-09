import { Readable, Transform, Writable } from "node:stream"

/*Streams precisam utilizar o tipo buffer, nao aceitam string, int etc */
class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(()=>{
      if (i > 100) {
        this.push(null)
      } else {
        const buff = Buffer.from(String(i))
        this.push(buff)
      }
    }, 1000)
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const inverseNumber = Number(chunk.toString()) * -1
    callback(null, Buffer.from(String(inverseNumber)))
  }

}

class multiplyByTenStream extends Writable {
  /*chunk = pedaco que leu do read
    enconding = como a info ta codificada
    callback = funcao que chama quando termina de fazer o que necessitava fazer com a info */
  _write(chunk, encoding, callback) {
    console.log(
      Number(chunk.toString()) * 10
    )
    callback()

  }
}
new OneToHundredStream().pipe(new InverseNumberStream()).pipe(new multiplyByTenStream())