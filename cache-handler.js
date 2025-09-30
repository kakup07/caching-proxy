import { writeFile, readFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)

class CacheHandler{
  constructor(){
    this.cachedData = []
    this.loadCache();
  }

  async loadCache(){
    try {
      const data = await readFile(path.join(__dirname, './data/cached-requests.json'), 'utf-8')
      this.cachedData = JSON.parse(data)
    } catch (err) {
      console.log(`Failed to load cached data with error -- `, err)
      this.cachedData = []
    }
  }

  find(req) {
    return this.cachedData.find(({request}) => (request === req)) || null  
  }

  async add(data) {
    if(!data || !data.request || !data.data){
      throw new Error('Invalid data for cache')
    }

    const exists = this.cachedData.find((item) => item.request === data.request)
    if(exists){
      console.log(`Data already exists in cache for -- ${data.request}`)
      return
    }
    this.cachedData.push(data)

    try {
      await writeFile(
        path.join(__dirname, './data/cached-requests.json'), 
        JSON.stringify(this.cachedData, null, 2), 
        'utf-8'
      )
      console.log('cache updated')
    } catch (err) {
      console.error('error writing cache', err)
    }
  }
}

export default new CacheHandler();