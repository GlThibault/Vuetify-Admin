import axios from 'axios'

const apiRequest = () => {
  var environment = window.location.hostname === 'localhost' ? 'dev' : 'prod'
  var universe = window.localStorage.getItem('universe')
  var token = window.localStorage.getItem('JWT')
  var tokenAdmin = window.localStorage.getItem('JWTA')

  const instance = axios.create({
    baseUrl : environment === 'prod'
      ? 'http://192.168.99.102:48080/'
      : 'http://192.168.99.102:48080/',
    timeout : 30000
  })
  if (token) {
    instance.defaults.headers.common['Authorization'] = token
  }
  if (universe) {
    instance.defaults.headers.common['Cleed-Universe'] = universe
  }
  if (tokenAdmin) {
    instance.defaults.headers.common['Admin'] = tokenAdmin
  }
  instance.interceptors.request.use(req => {
    req.url = instance.defaults.baseUrl + req.url
    return req
  })
  return instance
}

export { apiRequest }
