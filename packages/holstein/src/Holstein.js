import {nullish}                                                     from '@typen/nullish'
import {FEMALE, MALE}                                                from '../resources/gender'
import {CARRYING, DELIVERABLE, EXHAUSTED, OVERAGE, UNDERAGE, VACANT} from '../resources/status'

export const LIFE_EXPECTANCY = 72
export const ADULT_AGE = 18
export const PREGNANCY = 9
export const CREDIT = 4

export class Holstein {
  /**
   *
   * @param {number} [gender=FEMALE]
   * @param {number} [age=0]
   */
  constructor(gender, age) {
    this.gender = gender ?? FEMALE
    this.age = age ?? 0
  }
  get inService() { return this.age <= LIFE_EXPECTANCY }
}

/**
 *
 * @param {HolstainFem} fem
 * @param {HolstainHom} hom
 */
export function marry(fem, hom) { fem.fertilize(), hom.fertilize() }

export class HolstainHom extends Holstein {
  constructor(gender, age) {
    super(gender, age)
    this.credit = 0
  }
  get status() {
    if (this.age < ADULT_AGE) return UNDERAGE
    if (this.age > LIFE_EXPECTANCY) return OVERAGE
    if (this.credit > 0) { return VACANT } else { return EXHAUSTED }
  }
  grow() { if (++this.age >= ADULT_AGE) this.credit = CREDIT }
  fertilize() { this.credit-- }
}

export class HolstainFem extends Holstein {
  constructor(gender, age) {
    super(gender, age)
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
      ? rand <= 0.98 ? new HolstainFem : new HolstainHom
      : rand <= 0.5 ? new HolstainFem : new HolstainHom
  }
}