import { ContainerModule, inject, injectable } from 'inversify'
import { Store } from '@agrzes/yx-ems-api'

import 'reflect-metadata'
import * as chokidar from 'chokidar'
import fm from 'front-matter'
import { readFile } from 'fs/promises'
import { join } from 'path'

@injectable()
class BooksLoader {
  constructor(@inject('ems.Store') private store: Store) {}
  async init() {
    const watch = chokidar.watch(join(__dirname, '**/*.mdx'))
    const consume = async (p: string) => {
      this.store.store(p, fm(await readFile(p, 'utf-8')).attributes)
    }
    watch.on('add', consume)
    watch.on('change', consume)
  }
}

const serverModule = new ContainerModule((bind) => {
  bind(BooksLoader).toSelf().inSingletonScope()

  bind('lifecycle').toService(BooksLoader)
})

export default serverModule
