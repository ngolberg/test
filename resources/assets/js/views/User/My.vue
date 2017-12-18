<template>
  <div class="user__show">
    <div class="user__header">
      <h3>My Profile</h3>
      <div>
        <button class="btn btn__primary" @click="save" :disabled="isProcessing">Save</button>
      </div>
    </div>
    <div class="user__row">
      <div class="user__details">
        <div class="user__details_inner">
          <div class="form__group">
            <label>Name</label>
            <input type="text" class="form__control" v-model="form.name">
            <small class="error__control" v-if="error.name">{{error.name[0]}}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import Vue from 'vue'
  import Flash from '../../helpers/flash'
  import { get, post } from '../../helpers/api'
  import { toMulipartedForm } from '../../helpers/form'

  export default {
    data() {
      return {
        form: {
        },
        error: {},
        isProcessing: false,
        initializeURL: `/api/users/create`,
        storeURL: `/api/users`,
        action: 'Create'
      }
    },
    created() {
      if(this.$route.meta.mode === 'edit') {
        this.initializeURL = `/api/users/${this.$route.params.id}/edit`
        this.storeURL = `/api/users/${this.$route.params.id}?_method=PUT`
        this.action = 'Update'
      }
      get(this.initializeURL)
        .then((res) => {
          Vue.set(this.$data, 'form', res.data.form)
        })
    },
    methods: {
      save() {
        const form = toMulipartedForm(this.form, this.$route.meta.mode)
        post(this.storeURL, form)
          .then((res) => {
            if(res.data.saved) {
              Flash.setSuccess(res.data.message)
              this.$router.push(`/users/${res.data.id}`)
            }
            this.isProcessing = false
          })
          .catch((err) => {
            if(err.response.status === 422) {
              this.error = err.response.data
            }
            this.isProcessing = false
          })
      }
    }
  }
</script>
