'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var enumGenders = require('@pasture/enum-genders');
var enumBeingStatus = require('@pasture/enum-being-status');
var nullish = require('@typen/nullish');

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
    this.gender = gender ?? enumGenders.FEMALE;
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
    if (this.age < ADULT_AGE) return enumBeingStatus.UNDERAGE;
    if (this.age > LIFE_EXPECTANCY) return enumBeingStatus.OVERAGE;

    if (this.credit > 0) {
      return enumBeingStatus.VACANT;
    } else {
      return enumBeingStatus.EXHAUSTED;
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
    if (this.age < ADULT_AGE) return enumBeingStatus.UNDERAGE;

    if (!nullish.nullish(this.pregnant)) {
      return this.age < this.pregnant + PREGNANCY ? enumBeingStatus.CARRYING : enumBeingStatus.DELIVERABLE;
    }

    if (this.age > LIFE_EXPECTANCY) return enumBeingStatus.OVERAGE;
    return enumBeingStatus.VACANT;
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

exports.Holstein = Holstein;
exports.HolsteinFemme = HolsteinFemme;
exports.HolsteinHomme = HolsteinHomme;
exports.marry = marry;
