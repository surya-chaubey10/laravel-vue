<template>
  <div>
    <v-card min-height="500">
      <v-card-title>Documents</v-card-title>
      <v-form @submit.prevent="submitForm($event)">
        <v-container>
          <v-text-field v-model="form.title" :rules="requiredRules" label="Full Name" outlined required></v-text-field>

          <v-file-input v-model="form.document" label="Documents" outlined dense></v-file-input>

          <v-btn color="primary" type="submit" class="mt-0"> Save </v-btn>

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
      form: {
        title: null,
        document: null,
      },
      snackbar: false,
      msg: '',
      timeout: 4000,
      color: 'success',
    }
  },
  methods: {
    submitForm() {
      axios
        .post(this.$hostnamepost + 'document-add', this.form, {
          headers: {
            'X-Jigesh': 'test',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          if (res.data.code == 200) {
            this.msg = res.data.message
            this.snackbar = true
            setTimeout(() => {
              this.$router.push({
                path: '/documents',
              })
            }, 4000)
          }
        })
        .catch(e => {
          this.msg = e
          this.snackbar = true
          this.color = 'red accent-2'
          console.log(e)
        })
    },
  },
}
</script>
