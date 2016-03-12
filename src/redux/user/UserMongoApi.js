import axios from 'axios'

function getApiUrl ( id ) {
  const apiKey = 'PGjxbP3NQzS2xXIe8PgSbJBxVzaPlXGe'
  const db = 'products-catalogue'
  const collection = 'products'
  return `https://api.mongolab.com/api/1/databases/${db}/collections/${collection}${id ? `/${  id}` : ''}?apiKey=${apiKey}`
}

export const UserMongoApi = {
  get: ()=>  axios.get( getApiUrl() ),
  post: user=>axios.post( getApiUrl(), user ),
  put: user=> axios.put( getApiUrl( user._id.$oid ), user ),
  delete: user=> axios.delete( getApiUrl( user._id.$oid ) )
}
