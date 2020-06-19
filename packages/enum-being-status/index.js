import { mapEntries }   from '@vect/object-mapper'
import * as NameToCodes from './resources/beingStatus'

export
{
  NA,
  UNDERAGE,
  VACANT,
  CARRYING,
  DELIVERABLE,
  ILL,
  EXHAUSTED,
  OVERAGE,
  MISC,
} from './resources/beingStatus'

export const CodeToNames = mapEntries(NameToCodes, ([k, v]) => [v, k])
