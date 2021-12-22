import axios from 'axios'
import {api, BACKEND_HEADERS} from '../constants'

/**
 *  Example Route
 */
export const ExampleRoute = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `${api}example-api`,
      headers: BACKEND_HEADERS,
    })
      .then((response) => {
        resolve({response: response})
      })
      .catch((error) => reject(error))
  })
}
