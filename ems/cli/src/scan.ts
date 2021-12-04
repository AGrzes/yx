import chokidar from 'chokidar'
import { Store } from '@agrzes/yx-ems-api'
import fm from 'front-matter'
import { readFile } from 'fs/promises'

function setup(path: string, store: Store) {
  const watch = chokidar.watch(path)
  const consume = async (p: string) => {
    store.store(p, fm(await readFile(p, 'utf-8')).attributes)
  }
  watch.on('add', consume)
  watch.on('change', consume)
}

export default setup
