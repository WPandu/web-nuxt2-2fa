import { Api } from '@/service/api.service'

export const AuthSvc = {
  getBarcodeGoogle() {
    return Api.get('auth/google-barcode')
  },
  registerBarcodeGoogle(params) {
    return Api.post('auth/google-barcode', params)
  },
}
