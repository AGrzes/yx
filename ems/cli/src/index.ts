import express from 'express'
import server from '@agrzes/yx-ems-express'
import { MemoryEMS } from '@agrzes/yx-ems-core'
import cors from 'cors'
import scan from './scan'
import container from './container'
import { register } from 'ts-node'
register()
container()
