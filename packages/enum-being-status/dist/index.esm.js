import { mapEntries } from '@vect/object-mapper';

const NA = -1,
      UNDERAGE = 0,
      VACANT = 1,
      CARRYING = 2,
      DELIVERABLE = 3,
      ILL = 4,
      EXHAUSTED = 6,
      OVERAGE = 7,
      MISC = 8;

var NameToCodes = /*#__PURE__*/Object.freeze({
  __proto__: null,
  NA: NA,
  UNDERAGE: UNDERAGE,
  VACANT: VACANT,
  CARRYING: CARRYING,
  DELIVERABLE: DELIVERABLE,
  ILL: ILL,
  EXHAUSTED: EXHAUSTED,
  OVERAGE: OVERAGE,
  MISC: MISC
});

const CodeToNames = mapEntries(NameToCodes, ([k, v]) => [v, k]);

export { CARRYING, CodeToNames, DELIVERABLE, EXHAUSTED, ILL, MISC, NA, OVERAGE, UNDERAGE, VACANT };
