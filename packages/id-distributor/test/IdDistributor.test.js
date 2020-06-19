import { IdDistributor } from '..'
import { FEMALE }        from '@pasture/enum-genders'
import { delogger }      from '@spare/logger'

const test = () => {
  const CAPACITY = 1000, PERIOD = 2
  const idDistributor = new IdDistributor(CAPACITY, PERIOD)
  const thresholds = CAPACITY * PERIOD + 2
  for (let i = 0; i < thresholds; i++) {
    idDistributor.next(FEMALE) |> delogger
  }
}

test()