<template>
  <v-card flat class="pa-3 mt-2">
    <v-card-text>
      <v-form class="multi-col-validation mt-6">
        <v-row>
          <v-col md="12" cols="12">
            <v-text-field
              v-model="accountSocialLocale.facebook"
              label="Facebook"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col md="12" cols="12">
            <v-text-field
              v-model="accountSocialLocale.instagram"
              label="Instagram*"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="12">
            <v-text-field
              v-model="accountSocialLocale.youtube"
              label="Youtube"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="12">
            <v-text-field
              v-model="accountSocialLocale.twitter"
              dense
              label="Twitter"
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-btn color="primary" class="me-3 mt-4"> Save changes </v-btn>
            <v-btn color="secondary" outlined class="mt-4" type="reset" @click.prevent="resetForm"> Cancel </v-btn>
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
    socialData: {
      type: Object,
      default: () => {},
    },
  },

  setup(props) {
    const accountSocialLocale = ref(JSON.parse(JSON.stringify(props.socialData)))

    return {
      accountSocialLocale,
    }
  },
}
</script>
