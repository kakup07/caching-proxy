import express from 'express';
const app = express();
import axios from 'axios';
import cache from './cache-handler.js'

const PORT =  process.env.PORT || 3000;
const mainServerUrl = process.env.ORIGIN ||'https://dummyjson.com';

app.use(express.json());

app.get('/:path', async (req, res) => {
  try {
      const { path } = req.params

      const cachedData = cache.find(path)

      if(cachedData){
        res.set('X-cache', 'HIT')
        return res.status(200).json(cachedData.data)
      }      

      try {
        let originalServerRes = await axios.get(`${mainServerUrl}/${path}`)
        await cache.add({
          request: path,
          data: originalServerRes.data
        })

        res.set('X-cache', 'MISS')
        return res.status(200).json(originalServerRes.data)
      } catch (err){
        console.error(err)
        return res.status(404).json({error: 'Data not found'})
      }
      
  } catch(err) {
    console.error(err)
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port - ${PORT}`)
});