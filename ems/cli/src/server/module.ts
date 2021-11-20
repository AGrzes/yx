import { ContainerModule } from 'inversify'

const serverModule = new ContainerModule(() => {
  console.log('Server module loaded')
})

export default serverModule
