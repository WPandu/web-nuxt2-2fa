import axios from 'axios'

function BaseApi(config) {
  const obj = {}

  obj.init = function () {
    const service = axios.create({
      baseURL: config.baseUrl,
      headers: {
        'X-Platform': 'web'
      }
    })

    service.interceptors.request.use(
      (config) => {
        const token = window.localStorage.getItem('auth._token.local')

        if (token !== null) {
          config.headers.Authorization = token
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    service.interceptors.response.use(this.handleSuccess, this.handleError)
    this.service = service
  }

  obj.handleSuccess = function (response) {
    return response
  }

  obj.handleError = function (error) {
    return Promise.reject(error.response)
  }

  obj.redirectTo = function (document, path) {
    document.location = path
  }

  obj.get = function (path) {
    return this.service.request({
      method: 'GET',
      url: path,
      responseType: 'json',
    })
  }

  obj.downloadFile = function (path) {
    return this.service.request({
      method: 'GET',
      url: path,
      responseType: 'blob',
    })
  }

  obj.downloadFilePost = function (path) {
    return this.service.request({
      method: 'POST',
      url: path,
      responseType: 'blob',
    })
  }

  obj.put = function (path, payload) {
    return this.service.request({
      method: 'PUT',
      url: path,
      responseType: 'json',
      data: payload,
    })
  }

  obj.post = function (path, payload) {
    return this.service.request({
      method: 'POST',
      url: path,
      responseType: 'json',
      data: payload,
    })
  }

  obj.postFormData = function (path, payload) {
    return this.service.request({
      method: 'POST',
      url: path,
      responseType: 'json',
      data: this.generateFormData(payload),
    })
  }

  obj.patch = function (path, payload) {
    return this.service.request({
      method: 'PATCH',
      url: path,
      responseType: 'json',
      data: payload,
    })
  }

  obj.delete = function (path, payload) {
    return this.service.request({
      method: 'DELETE',
      url: path,
      responseType: 'json',
      data: payload,
    })
  }

  obj.generateFormData = function (payload) {
    const formData = new FormData()
    for (const key in payload) {
      if (payload[key] !== undefined) {
        if (payload[key].constructor === Array) {
          for (const i in payload[key]) {
            formData.append(`${key}[${i}]`, payload[key][i])
          }
        } else {
          formData.append(key, payload[key])
        }
      }
    }
    return formData
  }

  return obj
}

export const Api = new BaseApi({
  baseUrl: process.env.API_URL
})

export const ApiService = {
  init() {
    Api.init()
  }
}
