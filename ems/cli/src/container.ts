import { Container } from 'inversify'
import globby from 'globby'
import _ from 'lodash'
import { resolve, dirname } from 'path'
import loadConfig from './config'

async function setup() {
  const { config, filepath } = await loadConfig()
  const container = new Container()
  container.bind('config').toConstantValue(config)
  container.bind('root').toConstantValue(dirname(filepath))
  container.load(
    ...(await Promise.all(
      _.map(
        await globby('target/**/{*.module,module}.js'),
        async (moduleFile) => (await import(resolve(process.cwd(), moduleFile))).default
      )
    ))
  )
  container.loadAsync(
    ...(await Promise.all(
      _.map(
        await globby('target/**/{*.async-module,async-module}.js'),
        async (moduleFile) => (await import(resolve(process.cwd(), moduleFile))).default
      )
    ))
  )
  return container
}

export default setup
