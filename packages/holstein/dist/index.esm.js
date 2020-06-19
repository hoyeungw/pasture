import { FEMALE } from '@pasture/enum-genders';
import { UNDERAGE, OVERAGE, VACANT, EXHAUSTED, CARRYING, DELIVERABLE } from '@pasture/enum-being-status';
import { nullish } from '@typen/nullish';

const LIFE_EXPECTANCY = 72;
const ADULT_AGE = 18;
const PREGNANCY = 9;
const CREDIT = 4;
class Holstein {
  /**
   *
   * @param {number} [gender=FEMALE]
   * @param {number} [age=0]
   */
  constructor(gender, age) {
    this.gender = gender ?? FEMALE;
    this.age = age ?? 0;
  }

  get inService() {
    return this.age <= LIFE_EXPECTANCY;
  }

}

class HolsteinHomme extends Holstein {
  constructor(gender, age) {
    super(gender, age);
    this.credit = 0;
  }

  get status() {
    if (this.age < ADULT_AGE) return UNDERAGE;
    if (this.age > LIFE_EXPECTANCY) return OVERAGE;

    if (this.credit > 0) {
      return VACANT;
    } else {
      return EXHAUSTED;
    }
  }

  grow() {
    if (++this.age >= ADULT_AGE) this.credit = CREDIT;
  }

  fertilize() {
    this.credit--;
  }

}

class HolsteinFemme extends Holstein {
  constructor(gender, age) {
    super(gender, age);
    this.record = 0;
    this.pregnant = undefined;
  }

  get status() {
    if (this.age < ADULT_AGE) return UNDERAGE;

    if (!nullish(this.pregnant)) {
      return this.age < this.pregnant + PREGNANCY ? CARRYING : DELIVERABLE;
    }

    if (this.age > LIFE_EXPECTANCY) return OVERAGE;
    return VACANT;
  }

  grow() {
    ++this.age;
  }

  fertilize() {
    this.pregnant = this.age;
  }

  deliver() {
    const rand = Math.random();
    this.pregnant = undefined;
    return this.record++ === 0 ? rand <= 0.98 ? new HolsteinFemme() : new HolsteinHomme() : rand <= 0.5 ? new HolsteinFemme() : new HolsteinHomme();
  }

}

/**
 *
 * @param {HolsteinFemme} fem
 * @param {HolsteinHomme} hom
 */
function marry(fem, hom) {
  fem.fertilize(), hom.fertilize();
}

export { Holstein, HolsteinFemme, HolsteinHomme, marry };
