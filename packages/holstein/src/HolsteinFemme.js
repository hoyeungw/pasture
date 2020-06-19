import { CARRYING, DELIVERABLE, OVERAGE, UNDERAGE, VACANT } from '@pasture/enum-being-status'
import { nullish }                                          from '@typen/nullish'
import { ADULT_AGE, Holstein, LIFE_EXPECTANCY, PREGNANCY }  from './Holstein'
import { HolsteinHomme }                                    from './HolsteinHomme'
import { FEMALE }                                           from '@pasture/enum-genders'


export class HolsteinFemme extends Holstein {
  constructor(age) {
    super(FEMALE, age)
    this.record = 0
    this.pregnant = undefined
  }
  get status() {
    if (this.age < ADULT_AGE) return UNDERAGE
    if (!nullish(this.pregnant)) { return this.age < this.pregnant + PREGNANCY ? CARRYING : DELIVERABLE}
    if (this.age > LIFE_EXPECTANCY) return OVERAGE
    return VACANT
  }
  grow() { ++this.age }
  fertilize() { this.pregnant = this.age }
  deliver() {
    const rand = Math.random()
    this.pregnant = undefined
    return this.record++ === 0
      ? rand <= 0.98 ? new HolsteinFemme : new HolsteinHomme
      : rand <= 0.5 ? new HolsteinFemme : new HolsteinHomme
  }
}