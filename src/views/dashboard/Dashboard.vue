<template>
  <v-row>
    <v-col cols="12" md="4">
      <dashboard-congratulation-john></dashboard-congratulation-john>
    </v-col>
    <v-col cols="12" md="8">
      <dashboard-statistics-card></dashboard-statistics-card>
    </v-col>

    <v-col cols="12" sm="6" md="4">
      <dashboard-weekly-overview></dashboard-weekly-overview>
    </v-col>

    <v-col cols="12" md="4" sm="6">
      <dashboard-card-total-earning></dashboard-card-total-earning>
    </v-col>

    <v-col cols="12" md="4">
      <dashboard-card-sales-by-countries></dashboard-card-sales-by-countries>
    </v-col>
    <v-col cols="12" md="8">
      <dashboard-card-deposit-and-withdraw></dashboard-card-deposit-and-withdraw>
    </v-col>
    <v-col cols="12">
      <dashboard-datatable></dashboard-datatable>
    </v-col>
  </v-row>
</template>

<script>

import axios from 'axios'
// eslint-disable-next-line object-curly-newline
import { mdiPoll, mdiLabelVariantOutline, mdiCurrencyUsd, mdiHelpCircleOutline } from '@mdi/js'

// demos
import DashboardCongratulationJohn from './DashboardCongratulationJohn.vue'
import DashboardStatisticsCard from './DashboardStatisticsCard.vue'
import DashboardCardTotalEarning from './DashboardCardTotalEarning.vue'
import DashboardCardDepositAndWithdraw from './DashboardCardDepositAndWithdraw.vue'
import DashboardCardSalesByCountries from './DashboardCardSalesByCountries.vue'
import DashboardWeeklyOverview from './DashboardWeeklyOverview.vue'
import DashboardDatatable from './DashboardDatatable.vue'


export default {
  components: {
    DashboardCongratulationJohn,
    DashboardStatisticsCard,
    DashboardCardTotalEarning,
    DashboardCardDepositAndWithdraw,
    DashboardCardSalesByCountries,
    DashboardWeeklyOverview,
    DashboardDatatable,
  },
  setup() {
    const totalProfit = {
      statTitle: 'Total Profit',
      icon: mdiPoll,
      color: 'success',
      subtitle: 'Weekly Project',
      statistics: '$25.6k',
      change: '+42%',
    }

    const totalSales = {
      statTitle: 'Refunds',
      icon: mdiCurrencyUsd,
      color: 'secondary',
      subtitle: 'Past Month',
      statistics: '$78',
      change: '-15%',
    }

    // vertical card options
    const newProject = {
      statTitle: 'New Project',
      icon: mdiLabelVariantOutline,
      color: 'primary',
      subtitle: 'Yearly Project',
      statistics: '862',
      change: '-18%',
    }

    const salesQueries = {
      statTitle: 'Sales Quries',
      icon: mdiHelpCircleOutline,
      color: 'warning',
      subtitle: 'Last week',
      statistics: '15',
      change: '-18%',
    }

    return {
      totalProfit,
      totalSales,
      newProject,
      salesQueries,
      user: null,
    }
  },
  mounted() {
    axios
      .get(this.$hostname + 'user', {
        headers: { Authorization: `Bearer ` + localStorage.getItem('auth') },
      })
      .then(res => {
        console.log(res.data.data)
        this.desserts = res.data.data
      })
      .catch(e => {
        console.log(e)
      })
  },
}
</script>
