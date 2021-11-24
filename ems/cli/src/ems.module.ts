import { MemoryEMS } from '@agrzes/yx-ems-core'
import { ContainerModule, decorate, injectable } from 'inversify'

const emsModule = new ContainerModule((bind) => {
  decorate(injectable(), MemoryEMS)

  bind(MemoryEMS).toSelf().inSingletonScope()

  bind('ems.Store').toService(MemoryEMS)
  bind('ems.Query').toService(MemoryEMS)
})

export default emsModule
