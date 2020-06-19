import { init } from '@vect/vector-init'
import { iso }  from '@vect/object-init'

export class RanchBulls {
  #n = 0
  #pool = null
  constructor(pool) {
    pool
      ? (this.#pool = pool, this.#n = Object.keys(pool).length)
      : (this.#pool = {}, this.#n = 0)
  }

  get size() { return this.#n }

  * [Symbol.iterator]() { for (let kv of Object.entries(this.#pool)) { yield kv } }

  add(id, member) {
    this.#pool[id] = member
    return ++this.#n
  }

  retire(id) {
    const member = this.#pool[id]
    delete this.#pool[id]
    --this.#n
    return member
  }

  histogram(indicator = 'age', ticksBound = { max: 7, min: 0 }) {
    const { max, min } = ticksBound
    const ticks = init(max - min + 1, i => min + i)
    const histo = iso(ticks, 0)
    Object.values(this.#pool).forEach(x => { histo[x[indicator]]++ })
    return histo
    // const values = Object.values(this.#pool).map(x => x[indicator])
    // return Histo.fromSamples(values, 8).statistics({ keyType: NUM })
  }

  static build(pool) { return new RanchBulls(pool) }
}
