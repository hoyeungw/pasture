import { EXHAUSTED, OVERAGE, UNDERAGE, VACANT }         from '@pasture/enum-being-status'
import { ADULT_AGE, CREDIT, Holstein, LIFE_EXPECTANCY } from './Holstein'
import { MALE }                                         from '@pasture/enum-genders'

export class HolsteinHomme extends Holstein {
  constructor(age) {
    super(MALE, age)
    this.credit = 0
  }
  get status() {
    if (this.age < ADULT_AGE) return UNDERAGE
    if (this.age > LIFE_EXPECTANCY) return OVERAGE
    if (this.credit > 0) { return VACANT }
    else { return EXHAUSTED }
  }
  grow() { if (++this.age >= ADULT_AGE) this.credit = CREDIT }
  fertilize() { this.credit-- }
}
