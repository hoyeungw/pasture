import { FEMALE } from '@pasture/enum-genders'

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

