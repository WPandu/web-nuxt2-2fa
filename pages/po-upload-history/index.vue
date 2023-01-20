<template>
  <div class="container mt-4">

    <div class="row m-3">
      <h3>List PO Upload History</h3>
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
                  <label> File PO </label>
                </div>
                <div class="col-sm-8">
                  <input type="text" v-model="filter.filename" class="form-control" />
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
                <th>File PO</th>
                <th>Upload Date</th>
                <th>Mapping Date</th>
                <th>Version</th>
                <th>Mapping Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(x, index) in list" :key="x.id">
                <td>{{ resolveNo(index) }}</td>
                <td>{{ x.filename }}</td>
                <td>{{ formatDateISO(x.upload_po_date) }}</td>
                <td>{{ formatDateISO(x.mapping_po_date) }}</td>
                <td>{{ x.version }}</td>
                <td>
                  <b :class="{'text-danger' : x.mapping_status == 'failed', 'text-success' : x.mapping_status == 'success', 'text-primary' : x.mapping_status == 'waiting'}">
                    {{ capitalize(x.mapping_status) }}
                  </b>


                  <el-popover
                    v-if="x.mapping_status == 'failed'"
                    placement="top-start"
                    title="Error Info"
                    width="200"
                    trigger="hover"
                    :content="x.error_message">
                    <el-button slot="reference" type="info" icon="el-icon-info" size="mini" circle></el-button>
                  </el-popover>
                </td>
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
    PoUploadHistorySvc
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
          filename: '',
          mapping_status: '',
        },
        options: [{
          value: '',
          label: 'All'
        }, {
          value: 'waiting',
          label: 'Waiting'
        }, {
          value: 'success',
          label: 'Success'
        }, {
          value: 'failed',
          label: 'Failed'
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
          let res = await PoUploadHistorySvc.getList(this.filter)
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
