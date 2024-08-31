<template>
  <div class="mx-auto sm:px-6 lg:px-8">

    <main class="md:col-span-12">

      <div class="flex flex-wrap w-full">
        <div class="w-full">
          <UiDataTable
              name="users"
              size="medium"
              :api="'users'"
              :apiOpts="{ method: 'GET', body: {  } }"
              :config="config"
              title="Kullanıcılar"
              titleIcon="la-users"
          >

            <template #created_at="item">
              <span class="text-sm">{{ this.$date(item.created_at).format('DD-MM-YYYY HH:mm') }}</span>
            </template>

            <template #updated_at="item">
              <span class="text-sm">{{ this.$date(item.created_at).format('DD-MM-YYYY HH:mm') }}</span>
            </template>

          </UiDataTable>
          <UiNotification ref="notify"></UiNotification>
        </div>
      </div>
    </main>
  </div>
</template>

<script>


import Filters from "~/components/Filters.vue";
import Price from "~/components/ui/Data/Price.vue";

export default {
  components: {Price, Filters},
  data() {
    return {
      filtersObject: {},
      config: {
        selectable: true,
        searchable: true,
        columns: [
          {
            'index': 'name',
            'label': "İsim",
            'sortable': true
          },
          {
            'index': 'surname',
            'label': "Soyisim",
            'sortable': true
          },
          {
            'index': 'email',
            'label': "E-Posta",
            'sortable': true
          },
          {
            'index': 'phone',
            'label': "Telefon",
            'sortable': true
          },
          {
            'index': 'created_at',
            'label': 'Oluşturulma Tarihi',
            'slot': 'created_at',
            'sortable': true
          },
          {
            'index': 'updated_at',
            'label': 'Güncelleme Tarihi',
            'slot': 'updated_at',
            'sortable': true
          }
        ],

        filters: [],

      },
      form: null,
      saving: false,
    }
  },
  methods: {},
  mounted() {


  }
}

</script>