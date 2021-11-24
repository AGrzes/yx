import { ContainerModule } from 'inversify'

const serverModule = new ContainerModule(() => {
  console.log('Server module loaded from docs')
})

export default serverModule
