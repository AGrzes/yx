import { AsyncContainerModule } from 'inversify'

const serverModule = new AsyncContainerModule(async () => {
  console.log('Async Server module loaded')
})

export default serverModule
