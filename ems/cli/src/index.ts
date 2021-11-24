import express from 'express'
import server from '@agrzes/yx-ems-express'
import { MemoryEMS } from '@agrzes/yx-ems-core'
import cors from 'cors'
import scan from './scan'
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