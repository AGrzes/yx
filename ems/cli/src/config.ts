import { cosmiconfig } from 'cosmiconfig'

async function config() {
  return await cosmiconfig('yellow').search()
}

export default config
