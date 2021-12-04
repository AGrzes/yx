import { MemoryEMS } from '@agrzes/yx-ems-core'
import { ContainerModule, decorate, inject, injectable } from 'inversify'
import emsExpress from '@agrzes/yx-ems-express'
import { Router } from 'express'
import { PathRouter } from './express.module'
const emsModule = new ContainerModule((bind) => {
  decorate(injectable(), MemoryEMS)

  bind(Router).toDynamicValue((context) => {
    const router: PathRouter = emsExpress(context.container.get('ems.Store'), context.container.get('ems.Query'))
    router.path = '/ems'
    return router
  })

  bind(MemoryEMS).toSelf().inSingletonScope()

  bind('ems.Store').toService(MemoryEMS)
  bind('ems.Query').toService(MemoryEMS)
})

export default emsModule
