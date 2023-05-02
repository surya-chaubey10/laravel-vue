<template>
  <v-card flat class="pa-3 mt-2">
    <v-card-text>
      <v-form class="multi-col-validation mt-6">
        <v-row>
          <v-col md="6" cols="12">
            <v-text-field
              v-model="accountContactUsLocale.contactemail"
              label="Contact Email"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col md="6" cols="12">
            <v-text-field
              v-model="accountContactUsLocale.contactphone"
              label="Contact Phone"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col md="12" cols="12">
            <v-text-field
              v-model="accountContactUsLocale.contactaddress"
              label="Contact Address"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col md="6" cols="12">
            <v-text-field
              v-model="accountContactUsLocale.contactadminemail"
              label="Contact Admin Email"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col md="6" cols="12">
            <v-text-field
              v-model="accountContactUsLocale.contactembededmap"
              label="Contact Embeded Map"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col md="6" cols="12">
            <v-text-field
              v-model="accountContactUsLocale.contactgooglecaptchasitekey"
              label="Google Captcha Site Key"
              dense
              outlined
              hint="Generate Google Recaptcha Key"
            ></v-text-field>
          </v-col>

          <v-col md="6" cols="12">
            <v-text-field
              v-model="accountContactUsLocale.contactgooglecaptchasecretkey"
              label="Google Captcha Secret Key"
              dense
              outlined
              hint="Generate Google Recaptcha Key"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-btn color="primary" class="me-3 mt-4"> Save changes </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { ref } from '@vue/composition-api'

export default {
  props: {
    contactData: {
      type: Object,
      default: () => {},
    },
  },

  setup(props) {
    const accountContactUsLocale = ref(JSON.parse(JSON.stringify(props.contactData)))

    return {
      accountContactUsLocale,
    }
  },
}
</script>
