import { intExpon } from '@aryth/math';
import { FEMALE, MALE } from '@pasture/enum-genders';

class IdDistributor {
  constructor(capacity, period) {
    this.fid = 10 ** (intExpon(capacity * period) + 1);
    this.mid = 10 ** (intExpon(capacity * period) + 1) * 2;
  }

  next(gender) {
    if (gender === FEMALE) return ++this.fid;
    if (gender === MALE) return ++this.mid;
    return undefined;
  }

}

export { IdDistributor };
