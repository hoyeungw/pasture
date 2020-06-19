import { init } from '@vect/vector-init';
import { iso } from '@vect/object-init';

function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = privateMap.get(receiver);

  if (!descriptor) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}

function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = privateMap.get(receiver);

  if (!descriptor) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }

    descriptor.value = value;
  }

  return value;
}

let _Symbol$iterator;
_Symbol$iterator = Symbol.iterator;
class RanchBulls {
  constructor(pool) {
    _n.set(this, {
      writable: true,
      value: 0
    });

    _pool.set(this, {
      writable: true,
      value: null
    });

    pool ? (_classPrivateFieldSet(this, _pool, pool), _classPrivateFieldSet(this, _n, Object.keys(pool).length)) : (_classPrivateFieldSet(this, _pool, {}), _classPrivateFieldSet(this, _n, 0));
  }

  get size() {
    return _classPrivateFieldGet(this, _n);
  }

  *[_Symbol$iterator]() {
    for (let kv of Object.entries(_classPrivateFieldGet(this, _pool))) {
      yield kv;
    }
  }

  add(id, member) {
    _classPrivateFieldGet(this, _pool)[id] = member;
    return _classPrivateFieldSet(this, _n, +_classPrivateFieldGet(this, _n) + 1);
  }

  retire(id) {
    const member = _classPrivateFieldGet(this, _pool)[id];

    delete _classPrivateFieldGet(this, _pool)[id];

    _classPrivateFieldSet(this, _n, +_classPrivateFieldGet(this, _n) - 1);

    return member;
  }

  histogram(indicator = 'age', ticksBound = {
    max: 7,
    min: 0
  }) {
    const {
      max,
      min
    } = ticksBound;
    const ticks = init(max - min + 1, i => min + i);
    const histo = iso(ticks, 0);
    Object.values(_classPrivateFieldGet(this, _pool)).forEach(x => {
      histo[x[indicator]]++;
    });
    return histo; // const values = Object.values(this.#pool).map(x => x[indicator])
    // return Histo.fromSamples(values, 8).statistics({ keyType: NUM })
  }

  static build(pool) {
    return new RanchBulls(pool);
  }

}

var _n = new WeakMap();

var _pool = new WeakMap();

export { RanchBulls };
