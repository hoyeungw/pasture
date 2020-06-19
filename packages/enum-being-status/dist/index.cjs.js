'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var objectMapper = require('@vect/object-mapper');

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

const CodeToNames = objectMapper.mapEntries(NameToCodes, ([k, v]) => [v, k]);

exports.CARRYING = CARRYING;
exports.CodeToNames = CodeToNames;
exports.DELIVERABLE = DELIVERABLE;
exports.EXHAUSTED = EXHAUSTED;
exports.ILL = ILL;
exports.MISC = MISC;
exports.NA = NA;
exports.OVERAGE = OVERAGE;
exports.UNDERAGE = UNDERAGE;
exports.VACANT = VACANT;
