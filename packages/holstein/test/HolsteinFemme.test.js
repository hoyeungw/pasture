import { HolsteinFemme }                             from '../src/HolsteinFemme'
import { CodeToNames, DELIVERABLE, OVERAGE, VACANT } from '@pasture/enum-being-status'
import { decoSamples, logger }                       from '@spare/logger'

const test = () => {
  const holsteinFemme = new HolsteinFemme(), infants = [], history = []
  for (let i = 0, status; i < 48; i++) {
    status = holsteinFemme.status
    if (status === VACANT) { holsteinFemme.fertilize() }
    else
      if (status === DELIVERABLE) { infants.push(holsteinFemme.deliver()) }
      else
        if (status === OVERAGE) {status = 'should retire'}
    history.push({
      timestamp: i,
      status: CodeToNames[status],
      afterStatus: CodeToNames[holsteinFemme.status],
      product: infants.map(x => x.gender)
    })
    holsteinFemme.grow()
  }
  history |> decoSamples |> logger
}

test()