import { ContainerModule, injectable, multiInject, optional } from 'inversify'
import express, { Router } from 'express'
import { Lifecycle } from '.'
import cors from 'cors'

export type PathRouter = Router & { path?: string }

@injectable()
class ExpressLifecycle implements Lifecycle {
  private app = express()
  constructor(@multiInject(Router) @optional() private routes: PathRouter[]) {}

  async init(): Promise<void> {
    this.app.use(cors())
    this.routes.forEach((route) => {
      if (route.path) {
        this.app.use(route.path, route)
      } else {
        this.app.use(route)
      }
    })
    this.app.listen(process.env.PORT || 3000)
  }
}

const serverModule = new ContainerModule((bind) => {
  bind(ExpressLifecycle).toSelf().inSingletonScope()

  bind('lifecycle').toService(ExpressLifecycle)
})

export default serverModule
