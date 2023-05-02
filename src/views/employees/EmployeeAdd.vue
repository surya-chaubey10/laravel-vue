<template>
  <div>
    <v-card min-height="500">
      <v-card-title v-if="this.$route.params.uuid">Employee Edit</v-card-title>
      <v-card-title v-else>Employee</v-card-title>
      <v-form @submit.prevent="submitForm($event)" ref="form" lazy-validation v-model="valid">
        <v-container>
          <v-row>
            <v-col class="d-flex" cols="12" sm="12">
              <v-text-field
                v-model="form.firstname"
                :rules="rules"
                label="First Name*"
                outlined
                required
                class="mr-5"
              ></v-text-field>
              <v-text-field v-model="form.lastname" :rules="rules" label="Last Name*" outlined required></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="12">
              <v-select
                :items="jobs"
                v-model="form.job_id"
                item-text="title"
                item-value="id"
                :rules="[v => !!v || 'Job title is required']"
                label="Job Title"
                outlined
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" sm="12">
              <v-text-field
                class="mr-5"
                v-model="form.email"
                :rules="emailRules"
                label="Email*"
                outlined
                required
              ></v-text-field>

              <v-text-field v-model="form.website" :rules="rules" label="Website*" outlined required></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="12">
              <v-text-field
                v-model="form.mobile"
                type="tel"
                :rules="rules"
                label="Mobile*"
                outlined
                required
                class="mr-5"
              ></v-text-field>

              <v-text-field v-model="form.qr_code" :rules="rules" label="QR Code*" outlined required></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="12">
              <v-text-field
                v-model="form.company_name"
                :rules="rules"
                label="Company Name*"
                outlined
                required
                class="mr-5"
              ></v-text-field>

              <v-text-field
                v-model="form.company_address"
                :rules="rules"
                label="Company Address*"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="12">
              <v-text-field
                v-model="form.work_phone"
                type="tel"
                :rules="rules"
                label="Work Phone*"
                outlined
                required
                class="mr-5"
              ></v-text-field>

              <v-text-field
                v-model="form.work_extension"
                :rules="requiredRules"
                label="Work Extension*"
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-switch v-model="form.status" label="Status"></v-switch>

          <v-btn :disabled="!valid" @click="validate" color="primary" type="submit" class="mt-0"> Save employee</v-btn>
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
        firstName: null,
        lastName: null,
        email: null,
        mobile: null,
        qr_code: null,
        company_name: null,
        company_address: null,
        work_phone: null,
        job_id: null,
        work_extension: null,
        website: 'http://',
        status: false,
      },
      jobs: [],
      snackbar: false,
      msg: '',
      timeout: 4000,
      color: 'success',
      rules: [
        value => !!value || 'This field is required.',
        value => (value && value.length >= 5) || 'Min 5 characters',
      ],
      requiredRules: [value => !!value || 'This field is required.'],
      emailRules: [
        value => !!value || 'This field is required.',
        value => !value || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'E-mail must be valid',
      ],
    }
  },

  mounted() {
    axios
      .get(this.$hostname + 'jobs', {
        headers: { Authorization: `Bearer ` + localStorage.getItem('auth') },
      })
      .then(res => {
        console.log(res.data.data)
        if (res.data.status) {
          this.jobs = res.data.data
        }
      })
      .catch(e => {
        console.log(e)
      })
  },

  created() {
    if (this.$route.params.uuid) {
      axios
        .get(this.$hostname + 'employee/edit/' + this.$route.params.uuid, {
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
        var url = this.$hostname + 'employee/add'
        if (this.$route.params.uuid) {
          var url = this.$hostname + 'employee/edit/' + this.$route.params.uuid
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
                  path: '/employees',
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
