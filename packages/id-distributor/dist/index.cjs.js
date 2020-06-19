'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var math = require('@aryth/math');
var enumGenders = require('@pasture/enum-genders');

class IdDistributor {
  constructor(capacity, period) {
    this.fid = 10 ** (math.intExpon(capacity * period) + 1);
    this.mid = 10 ** (math.intExpon(capacity * period) + 1) * 2;
  }

  next(gender) {
    if (gender === enumGenders.FEMALE) return ++this.fid;
    if (gender === enumGenders.MALE) return ++this.mid;
    return undefined;
  }

}

exports.IdDistributor = IdDistributor;
