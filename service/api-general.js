import { ApiGeneral } from '@/service/api.service'

const perPage = 15

export const ExampleSvc = {
  getList(params) {
    let query = ''

    query += 'page=' + params.page
    query += params.perpage ? `&perpage=${params.perpage}` : `&perpage=${perPage}`
    query += params.title ? `&title=${params.title}` : ''
    query += params.type ? `&type=${params.type}` : ''

    return ApiGeneral.get(`examples?${query}`)
  },
  getDetail(id) {
    return ApiGeneral.get(`examples/${id}`)
  },
  insert(params) {
    params.is_active = params.is_active == true ? 1 : 0
    return ApiGeneral.post(`examples`, params)
  },
  update(id, params) {
    params.is_active = params.is_active == true ? 1 : 0
    return ApiGeneral.put(`examples/${id}`, params)
  },
  delete(id) {
    return ApiGeneral.delete(`examples/${id}`)
  }
}

export const PoHistorySvc = {
  getList(params) {
    let query = ''

    query += 'page=' + params.page
    query += params.perpage ? `&perpage=${params.perpage}` : `&perpage=${perPage}`

    query += params.po_number ? `&po_number=${params.po_number}` : ''
    query += params.mapping_status ? `&mapping_status=${params.mapping_status}` : ''

    return ApiGeneral.get(`purchase-orders?${query}`)
  }
}

export const PoUploadHistorySvc = {
  getList(params) {
    let query = ''

    query += 'page=' + params.page
    query += params.perpage ? `&perpage=${params.perpage}` : `&perpage=${perPage}`

    query += params.filename ? `&filename=${params.filename}` : ''
    query += params.mapping_status ? `&mapping_status=${params.mapping_status}` : ''

    return ApiGeneral.get(`purchase-order-uploads?${query}`)
  }
}
