<template>
  <v-card min-height="500">
    <v-flex justify-space-between class="d-flex">
      <v-card-title>Jobs</v-card-title>
      <div class="pa-4">
        <router-link to="/job/add">
          <v-btn color="primary" elevation="2" class="align-center">Add new</v-btn>
        </router-link>
      </div>
    </v-flex>
    <v-data-table
      v-if="desserts.length > 0"
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>

      <template v-slot:item.status="{ item }">
        <span small class="mr-2 success--text" v-if="item.status"> Active </span>
        <span small class="mr-2 error--text" v-else> In-Active </span>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item.uuid)"> {{ icons.mdiPencilOutline }} </v-icon>
        <v-icon small @click="deleteItem(item.uuid)"> {{ icons.mdiDelete }} </v-icon>
      </template>
    </v-data-table>
    <div v-else class="_blan">
      <router-link to="/employee/add">
        <v-btn color="primary" text outlined x-large> Add First Jobs</v-btn>
      </router-link>
    </div>
  </v-card>
</template>

<script>
import { mdiPencilOutline, mdiDelete } from '@mdi/js'
import axios from 'axios'

export default {
  data() {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        {
          text: 'Title',
          align: 'start',
          sortable: true,
          value: 'title',
        },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      icons: {
        mdiPencilOutline,
        mdiDelete,
      },
      desserts: [],
      editedItem: {
        title: '',
      },
      dialog: false,
      dialogDelete: false,
    }
  },

  mounted() {
    axios
      .get(this.$hostname + 'jobs', {
        headers: { Authorization: `Bearer ` + localStorage.getItem('auth') },
      })
      .then(res => {
        this.desserts = res.data.data
      })
      .catch(e => {
        console.log(e)
      })
  },
  methods: {
    editItem(item) {
      this.$router.push({ name: 'job-edit', params: { uuid: item } })
    },
    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm(uuid) {
      console.log(uuid)
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>

<style>
._blan {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  border: 1px solid #ddd;
  margin: 20px;
  margin-top: 100px;
  border-radius: 0;
}
</style>
