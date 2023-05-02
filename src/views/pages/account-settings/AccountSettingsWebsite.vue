<template>
  <v-card flat class="pa-3 mt-2">
    <v-card-text>
      <v-form class="multi-col-validation mt-6">
        <v-row>
          <v-col md="12" cols="12">
            <v-text-field
              v-model="accountWebsiteLocale.domainname"
              label="Domain Name*"
              dense
              :rules="requiredRules"
              outlined
            ></v-text-field>
          </v-col>

          <v-col md="12" cols="12">
            <v-select
              v-model="accountWebsiteLocale.seriesid"
              outlined
              dense
              label="Series"
              item-text="value"
              item-value="id"
              :items="accountWebsiteLocale.series"
            ></v-select>
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
    websiteData: {
      type: Object,
      default: () => {},
    },
  },

  setup(props) {
    const accountWebsiteLocale = ref(JSON.parse(JSON.stringify(props.websiteData)))

    return {
      accountWebsiteLocale,
      requiredRules: [v => !!v || 'This field is required'],
    }
  },
}
</script>
