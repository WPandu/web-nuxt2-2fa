import { Api } from '@/service/api.service'

export const AuthSvc = {
  getQRCode() {
    return Api.get('auth/2fa-qr-code')
  },
  registerQRCode(params) {
    return Api.post('auth/2fa-qr-code', params)
  },
}
