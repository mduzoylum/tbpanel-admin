<template>
  <div class="mx-auto sm:px-6 lg:px-8 lg:grid">

    <main class="md:col-span-12">

      <div class="flex flex-wrap w-full">
        <div class="w-full">
          <UiDataTable
              name="products"
              size="medium"
              :api="'products'"
              :apiOpts="{ method: 'GET', body: {  } }"
              :config="config"
              title="Stok Listesi"
              titleIcon="la-ticket"
          >

            <template #actions>
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

export default {
  components: {Filters},
  data() {
    return {
      filtersObject: {},
      config: {
        selectable: true,
        searchable: true,
        columns: [
          {
            'index': 'name',
            'label': "Stok Adı",
          },
          {
            'index': 'quantity',
            'label': "Mevcut Stok",
          },
          {
            'index': 'model_code',
            'label': "Kodu",
          }
        ],
        actions: [
          {
            'label': 'Düzenle',
            'icon': 'la-edit',
            'color': 'blue',
            'action': 'edit'
          },
          {
            'label': 'Sil',
            'icon': 'la-trash',
            'color': 'red',
            'action': 'delete'
          }
        ],

        filters: [
          {
            'index': 'status',
            'label': 'Durum',
            'type': 'select',
            'options': [
              {label: 'Aktif', value: '1'},
              {label: 'Pasif', value: '0'}
            ]
          },
          {
            'index': 'stock_group',
            'label': 'Stok Grubu',
            'type': 'select',
            'options': [
              {label: 'Aktif', value: '1'},
              {label: 'Pasif', value: '0'}
            ]
          },
          {
            'index': 'stock_type',
            'label': 'Stok Tipi',
            'type': 'select',
            'options': [
              {label: 'Aktif', value: '1'},
              {label: 'Pasif', value: '0'}
            ]
          },
          {
            'index': 'seasson',
            'label': 'Sezon',
            'type': 'select',
            'options': [
              {label: 'Aktif', value: '1'},
              {label: 'Pasif', value: '0'}
            ]
          },
          {
            'index': 'supplier',
            'label': 'Tedarikçi',
            'type': 'select',
            'options': [
              {label: 'Aktif', value: '1'},
              {label: 'Pasif', value: '0'}
            ]
          },
          {
            'index': 'brand',
            'label': 'Marka',
            'type': 'select',
            'options': [
              {label: 'Aktif', value: '1'},
              {label: 'Pasif', value: '0'}
            ]
          },
          {
            'index': 'quantity',
            'label': 'Mevcut Stok',
            'type': 'range',
            'min': 0,
          },
          {
            'index': 'demand_quantity',
            'label': 'Talep Edilen',
            'type': 'range',
            'min': 0,
          },
          {
            'index': 'order_quantity',
            'label': 'Sipariş',
            'type': 'range',
            'min': 0,
          },
          {
            'index': 'unit',
            'label': 'Stok Birimi',
            'type': 'select',
            'options': [
              {label: 'Aktif', value: '1'},
              {label: 'Pasif', value: '0'}
            ]
          },
          {
            'index': 'currency',
            'label': 'Para Birimi',
            'type': 'select',
            'options': [
              {label: 'Aktif', value: '1'},
              {label: 'Pasif', value: '0'}
            ]
          },
          {
            'index': 'image',
            'label': 'Resim Durumu',
            'type': 'select',
            'options': [
              {label: 'Aktif', value: '1'},
              {label: 'Pasif', value: '0'}
            ]
          },
          {
            'index': 'sale_date',
            'label': 'Satış',
            'type': 'multidate'
          }
        ],

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