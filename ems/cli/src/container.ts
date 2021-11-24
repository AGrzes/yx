import { AsyncContainerModule, Container, ContainerModule } from 'inversify'
import globby from 'globby'
import _ from 'lodash'
import { resolve, dirname, posix } from 'path'
import loadConfig from './config'

async function modules<T = ContainerModule | AsyncContainerModule>(...glob: readonly string[]): Promise<T[]> {
  return await Promise.all(
    _.map(await globby(glob), async (moduleFile) => (await import(resolve(process.cwd(), moduleFile))).default)
  )
}

async function setup() {
  const { config, filepath } = await loadConfig()
  const root = dirname(filepath)
  const container = new Container()
  container.bind('config').toConstantValue(config)
  container.bind('root').toConstantValue(root)
  container.load(
    ...(await modules<any>(
      'target/**/{*.module,module}.{js,ts}',
      ...(config.modules ? _.map(config.modules, (module) => posix.join(root, module)) : []),
      ...(config.modulePaths
        ? _.map(config.modulePaths, (modulePath) => posix.join(root, modulePath, '{*.module,module}.{js,ts}'))
        : [])
    ))
  )
  container.loadAsync(
    ...(await modules<AsyncContainerModule>(
      'target/**/{*.async-module,async-module}.{js,ts}',
      ...(config.asyncModules ? _.map(config.modules, (module) => posix.join(root, module)) : []),
      ...(config.asyncModulesPaths
        ? _.map(config.modulesPaths, (modulePath) =>
            posix.join(root, modulePath, '{*.async-module,async-module}.{js,ts}')
          )
        : [])
    ))
  )
  return container
}

export default setup
