import { CounterFolioModel } from '../modules/services/models/counterFolioModel.js'

export default async function createFolio({ date }) {
  const counter = await CounterFolioModel.findCounterByDate({ date })
  let count = 1

  if (counter.length > 0) {
    count = counter[0].contador + 1
    await CounterFolioModel.updateCounter({ count, date })
  } else await CounterFolioModel.createCounter({ date, count })

  return `${date}-${count.toString().padStart(4, '0')}`
}
