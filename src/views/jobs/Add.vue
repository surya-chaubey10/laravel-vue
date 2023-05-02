<template>
  <div>
    <v-card min-height="500">
      <v-card-title v-if="this.$route.params.uuid">Job Edit</v-card-title>
      <v-card-title v-else>Job Add</v-card-title>
      <v-form @submit.prevent="submitForm($event)" ref="form" lazy-validation v-model="valid">
        <v-container>
          <v-text-field
            v-model="form.title"
            :rules="rules"
            label="Title*"
            outlined
            required
            class="mr-5"
          ></v-text-field>
          <v-switch v-model="form.status" label="Status"></v-switch>

          <v-btn :disabled="!valid" @click="validate" color="primary" type="submit" class="mt-0"> Save Job</v-btn>
          <v-snackbar v-model="snackbar" :timeout="timeout" :color="color" right top>
            {{ msg }}
          </v-snackbar>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      panel: 0,
      valid: true,
      form: {
        title: null,
        status: false,
      },
      snackbar: false,
      msg: '',
      timeout: 4000,
      color: 'success',
      rules: [
        value => !!value || 'This field is required.',
        value => (value && value.length >= 5) || 'Min 5 characters',
      ],
    }
  },

  created() {
    if (this.$route.params.uuid) {
      axios
        .get(this.$hostname + 'job/edit/' + this.$route.params.uuid, {
          headers: { Authorization: `Bearer ` + localStorage.getItem('auth') },
        })
        .then(res => {
          console.log(res.data.data)
          this.form = res.data.data
        })
        .catch(e => {
          this.msg = e
          this.snackbar = true
          this.color = 'red accent-2'
          console.log(e)
        })
    }
  },

  methods: {
    validate() {
      this.$refs.form.validate()
    },
    submitForm() {
      if (this.$refs.form.validate()) {
        var url = this.$hostname + 'job/add'
        if (this.$route.params.uuid) {
          var url = this.$hostname + 'job/edit/' + this.$route.params.uuid
        }

        axios
          .post(url, this.form, {
            headers: { Authorization: `Bearer ` + localStorage.getItem('auth') },
          })
          .then(res => {
            if (res.data.status) {
              this.msg = res.data.message
              this.snackbar = true
              setTimeout(() => {
                this.$router.push({
                  path: '/jobs',
                })
              }, 4000)
            }
            console.log(res)
          })
          .catch(e => {
            this.msg = e
            this.snackbar = true
            this.color = 'red accent-2'
            console.log(e)
          })
      }
    },
  },
}
</script>
