<template>
  <div class="upload-page">
    <div class="upload-container">
      <div class="back-green-card" />
      <div class="content-card">
        <div class="content">
          <div class="text-center">
            <img src="/images/logo.png" class="mx-auto" /> <br />
            <span class="content-label">Upload Purchase Order</span>
          </div>
          <div>
            <dropzone
              id="dropzone"
              ref="myDropzone"
              :options="dropzoneOptions"
              @vdropzone-error-multiple="onError"
              @vdropzone-success-multiple="onSuccess"
              @vdropzone-files-added="onFileAdded"
              @vdropzone-complete="onFileComplete"
            />
          </div>

          <!-- <el-progress :percentage="`${this.progressFile.count / this.totalFile * 100}`" :format="`${this.progressFile.count}/${this.totalFile}`"></el-progress> -->

          <div class="mt-3" style="text-align:right">
            <el-button type="info" size="mini" @click="removeAllFiles()">
              Clear Files
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      title="Progress Upload Files"
      :visible.sync="dialogVisible"
      width="50%"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div>
        <el-progress :text-inside="true" :stroke-width="26" :percentage="Math.round(progressFile.count / totalFile * 100)"></el-progress>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false" :disabled="progressFile.count != totalFile">Close</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  middleware: 'auth',
  data () {
    return {
      dropzoneOptions: {
        paramName: 'files',
        maxFiles: 25,
        uploadMultiple: true,
        url: process.env.API_URL + '/purchase-order-uploads',
        thumbnailWidth: 1,
        maxFilesize: 5,
        maxThumbnailFilesize: 5,
        acceptedFiles: 'application/pdf',
        parallelUploads: 2,
        headers: {
          'Authorization': this.$auth.getToken('local')
        }
      },
      totalFile: 0,
      progressFile: {
        success: [],
        failed: [],
        count: 0
      },
      dialogVisible: false
    }
  },
  methods: {
    onFileAdded(files) {
      this.totalFile = files.length
      this.dialogVisible = true
    },
    onFileComplete(file) {
      this.progressFile.count += 1
      if (file.status == 'success') {
        this.progressFile.success.push(file)
      } else {
        this.progressFile.failed.push(file)
      }
    },
    removeAllFiles() {
      this.$refs.myDropzone.removeAllFiles()
      this.totalFile = 0
      this.progressFile = {
        success: [],
        failed: [],
        count: 0
      }
    },
    async onError (files, message, xhr) {
      for (var i in files) {
        setTimeout(function() {
          this.$notify.error({
            title: `Error - ${files[i].name}`,
            message: `${message}`,
            duration: 0
          });
        }.bind(this), 300)
      }
    },
    async onSuccess (files) {
      for (var i in files) {
        this.$notify.success({
          title: `Success - ${files[i].name}`,
          duration: 10000
        });
        await this.$nextTick()
      }
    }
  }
}
</script>
