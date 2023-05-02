<template>
  <v-card id="account-setting-card">
    <!-- tabs -->
    <v-tabs v-model="tab" show-arrows>
      <v-tab v-for="tab in tabs" :key="tab.icon">
        <v-icon size="20" class="me-3">
          {{ tab.icon }}
        </v-icon>
        <span>{{ tab.title }}</span>
      </v-tab>
    </v-tabs>

    <!-- tabs item -->
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <account-settings-account :information-data="accountSettingData.information"></account-settings-account>
      </v-tab-item>

      <v-tab-item>
        <account-settings-website :website-data="accountSettingData.website"></account-settings-website>
      </v-tab-item>

      <v-tab-item>
        <account-settings-social :social-data="accountSettingData.social"></account-settings-social>
      </v-tab-item>

      <v-tab-item>
        <account-settings-contact-us :contact-data="accountSettingData.contact"></account-settings-contact-us>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import {
  mdiAccountOutline,
  mdiLockOpenOutline,
  mdiInformationOutline,
  mdiWeb,
  mdiAccountHeartOutline,
  mdiCardAccountMailOutline,
} from '@mdi/js'
import { ref } from '@vue/composition-api'

// demos
import AccountSettingsAccount from './AccountSettingsAccount.vue'
import AccountSettingsWebsite from './AccountSettingsWebsite.vue'
import AccountSettingsSocial from './AccountSettingsSocial.vue'
import AccountSettingsContactUs from './AccountSettingsContactUs.vue'

export default {
  components: {
    AccountSettingsAccount,
    AccountSettingsWebsite,
    AccountSettingsSocial,
    AccountSettingsContactUs,
  },
  setup() {
    const tab = ref('')

    // tabs
    const tabs = [
      { title: 'Information', icon: mdiInformationOutline },
      { title: 'Website', icon: mdiWeb },
      { title: 'Social', icon: mdiAccountHeartOutline },
      { title: 'Contact Us', icon: mdiCardAccountMailOutline },
    ]

    // account settings data
    const accountSettingData = {
      information: {
        avatarImg: require('@/assets/images/avatars/1.png'),
        username: 'johnDoe',
        institutename: 'john Doe',
        key: 'john-Doe',
        email: 'johnDoe@example.com',
        mobile: '9033777859',
        street: '',
        city: '',
        zip: '',
        state: '',
        country: '',
        password: '',
      },
      social: {
        instagram: '123',
        facebook: '1234',
        youtube: '12345',
        twitter: '12346',
      },
      website: {
        domainname: 'johnDoe.com',
        series: [
          { id: '1', value: 'Single Page' },
          { id: '2', value: 'Executives' },
        ],
      },
      contact: {
        contactemail: 'hardik@hardiksolanki.com',
        contactphone: 'hardik@hardiksolanki.com',
        contactaddress: 'hardik@hardiksolanki.com',
        contactadminemail: 'hardik@hardiksolanki.com',
        contactembededmap: 'hardik@hardiksolanki.com',
        contactgooglecaptchasitekey: 'hardik@hardiksolanki.com',
        contactgooglecaptchasecretkey: 'hardik@hardiksolanki.com',
      },
    }

    return {
      tab,
      tabs,
      accountSettingData,
      icons: {
        mdiAccountOutline,
        mdiLockOpenOutline,
        mdiWeb,
        mdiInformationOutline,
        mdiCardAccountMailOutline,
      },
    }
  },
}
</script>
