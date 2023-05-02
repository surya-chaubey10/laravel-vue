<template>
  <div>
    <v-card min-height="500">
      <v-card-title>Team</v-card-title>
      <v-form @submit.prevent="submitForm($event)">
        <v-container>
          <v-select
            v-model="form.series"
            item-text="name"
            item-value="id"
            :items="serieses"
            label="Series"
            outlined
          ></v-select>

          <v-text-field v-model="form.name" :rules="requiredRules" label="Team Name*" outlined required></v-text-field>

          <v-file-input v-model="form.logo" label="Tema Logo" outlined dense></v-file-input>

          <v-text-field
            v-model="form.location"
            :rules="requiredRules"
            label="City / Location*"
            outlined
            required
          ></v-text-field>

          <v-text-field
            v-model="form.email"
            type="email"
            :rules="requiredRules"
            label="Administrator's E-Mail*"
            outlined
            required
          ></v-text-field>

          <v-text-field
            v-model="form.mobile"
            type="tel"
            :rules="requiredRules"
            label="Administrator's Mobile*"
            outlined
            required
          ></v-text-field>

          <v-text-field
            v-model="form.squad_size"
            type="number"
            :rules="requiredRules"
            label="Max Allowed Players in the Squad*"
            outlined
            required
          ></v-text-field>

          <v-btn color="primary" type="submit" class="mt-0"> Save team</v-btn>

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
        name: null,
        series: null,
        logo: null,
        location: null,
        email: null,
        mobile: null,
        squad_size: false,
      },
      requiredRules: [v => !!v || 'This field is required'],
      serieses: [],
      color: 'success',
      snackbar: false,
      msg: '',
      timeout: 4000,
    }
  },

  mounted() {
    axios
      .get(this.$hostname + 'series')
      .then(res => {
        this.serieses = res.data.data.series
        // console.log(res.data.data.series)
      })
      .catch(e => {
        this.msg = e
        this.snackbar = true
        this.color = 'red accent-2'
        console.log(e)
      })
  },

  created() {
    if (this.$route.params.id != 'undefined') {
      axios
        .get(this.$hostname + 'team/edit/' + this.$route.params.id)
        .then(res => {
          this.form = res.data.data.file
          // this.serieses = res.data.serieses
          this.form.series = res.data.data.file.seriess
          console.log('end')
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
    submitForm() {
      axios
        .post(this.$hostnamepost + 'team/add', this.form, {
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
                path: '/team/list',
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
    },
  },
}
</script>
