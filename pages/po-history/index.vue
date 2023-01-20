<template>
  <div class="container mt-4">

    <div class="row m-3">
      <h3>List History CSV</h3>
    </div>

    <div class="row m-3">
      <div class="card">
        <div class="card-body">
          <h5>Filter</h5>
          <hr/>

          <div class="row">
            <div class="col-sm-6">
              <div class="row">
                <div class="col-sm-3">
                  <label> PO Number </label>
                </div>
                <div class="col-sm-8">
                  <input type="text" v-model="filter.po_number" class="form-control" />
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="row">
                <div class="col-sm-3">
                  <label> Status </label>
                </div>
                <div class="col-sm-8">
                  <el-select v-model="filter.mapping_status" placeholder="Select Status" style="width: 100%;">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>

            <div class="col-sm-12">
              <div class="mt-4 text-center">
                <button type="button" class="btn btn-primary" @click="handleFilter()" style="width: 20%;">
                  Filter
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="row m-3">
      <div class="card" v-loading="isLoading">
        <div class="card-body table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>No</th>
                <th>PO Number</th>
                <th>PO Date</th>
                <th>Vendor Name</th>
                <th>Buyer Code</th>
                <th>Status Mapping</th>
                <th>Upload PO Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(x, index) in list" :key="x.id">
                <td>{{ resolveNo(index) }}</td>
                <td>
                  <div v-if="x.po_url">
                    <a :href="x.po_url" target="_blank">
                      {{ x.po_number }}
                    </a>
                  </div>
                  <div v-else>
                    {{ x.po_number }}
                  </div>
                </td>
                <td>{{ formatDateISO(x.po_date) }}</td>
                <td>{{ x.vendor_name }}</td>
                <td>Buyer Code</td>
                <td>
                  <b :class="{'text-danger' : x.mapping_status == 'failed', 'text-success' : x.mapping_status == 'success', 'text-primary' : x.mapping_status == 'waiting'}">
                    {{ capitalize(x.mapping_status) }}
                  </b>
                </td>
                <td>{{ x.upload_po_date ? formatDateISO(x.upload_po_date) : '-' }}</td>
              </tr>

              <tr v-if="list.length == 0 && isLoading == false">
                <td class="text-center" colspan="99">No data</td>
              </tr>
            </tbody>
          </table>

          <div class="my-3">
            <el-pagination :current-page="pagination.current_page" background layout="prev, pager, next"
              :page-count="pagination.total_pages" @current-change="getData">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    PoHistorySvc
  } from '@/service/api-general'
  export default {
    middleware: 'auth',
    data() {
      return {
        isLoading: false,
        isOpenModal: false,
        breadcrumbs: [],
        list: [],
        pagination: {
          current_page: 1,
          total_pages: 0,
          per_page: 0
        },
        filter: {
          page: '',
          po_number: '',
          mapping_status: '',
        },
        options: [{
          value: '',
          label: 'All'
        }, {
          value: 'success',
          label: 'Success'
        }, {
          value: 'waiting',
          label: 'Waiting'
        }],
      }
    },
    methods: {
      handleFilter() {
        this.getData()
      },
      async getData(page = 1) {
        this.isLoading = true
        this.list = []
        try {
          this.filter.page = page
          let res = await PoHistorySvc.getList(this.filter)
          this.list = res.data.data
          this.pagination = res.data.meta.pagination
        } catch (err) {
          this.makeToast("error", err)
        }
        this.isLoading = false
      },
    },
    mounted() {
      this.getData()
    },
  }
</script>
