import 'reflect-metadata'
import container from './container'
import { register } from 'ts-node'

export interface Lifecycle {
  init(): Promise<void>
}

async function main() {
  register()
  const c = await container()
  const lifecycle = c.getAll<Lifecycle>('lifecycle')
  for (const l of lifecycle) {
    await l.init()
  }
}

main().catch(console.error)
