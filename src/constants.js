const {REACT_APP_API_URL} = process.env
let api = REACT_APP_API_URL

const BACKEND_HEADERS = {
  Accept: 'application/json',
}

export {api, BACKEND_HEADERS}
