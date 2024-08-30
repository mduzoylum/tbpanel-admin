<template>
  <div class="mx-auto sm:px-6 lg:px-8">

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
              titleIcon="la-shopping-bag"
          >
            <template #image="item">
              <img :src="'https://fabrika.toptancimburada.com/img/C/' + item.stock_code" alt="" class="w-full">
            </template>
            <template #stock_name="item">
              <div class="">
                <p class="text-xs text-gray-500">{{ item.model_code }}</p>
                <p class="font-medium">{{ item.name }}</p>
                <p v-if="item.attributes && item.attributes.length > 0" class="text-size-base text-bold text-black">
                  <i class="las la-tag text-blue-500"></i>
                  {{ item.attributes[0].attribute_option?.name }}
                </p>
              </div>

            </template>

            <template #unit="item">
              <span class="text-sm">{{ item.unit?.name }}</span>
            </template>

            <template #status="item">
              <span class="text-sm">{{ item.status?.name ?? '---' }}</span>
            </template>

            <template #cost_price="item">
              <span class="text-sm">{{ item.prices?.cost_price }}</span>
            </template>

            <template #market_cost_price="item">
              <UiDataPrice :prices="item.prices" type="market_cost_price"/>
            </template>

            <template #online_sale_price="item">
              <UiDataPrice :prices="item.prices" type="online_sale_price"/>
            </template>

            <template #discounted_online_sale_price="item">
              <UiDataPrice :prices="item.prices" type="discounted_online_sale_price"/>
            </template>

            <template #credit_card_sale_price="item">
              <UiDataPrice :prices="item.prices" type="credit_card_sale_price"/>
            </template>

            <template #store_sale_price="item">
              <UiDataPrice :prices="item.prices" type="store_sale_price"/>
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
            'index': 'code',
            'label': "",
            'slot': 'image',
            'headClass': 'max-w-16',
            'class': 'w-16'
          },
          {
            'index': 'name',
            'label': "Stok Adı",
            'slot': 'stock_name',
          },
          {
            'index': 'demand_quantity',
            'label': "Talep Edilen",
            'headClass': 'w-8',
            'class': 'text-center'
          },
          {
            'index': 'quantity',
            'label': "Mevcut Stok",
            'headClass': 'w-8',
            'class': 'text-center'
          },
          {
            'index': 'quantity',
            'label': "Sipariş",
            'headClass': 'w-8',
            'class': 'text-center'
          },
          {
            'index': 'target_quantity',
            'label': "İstenilen Stok",
            'headClass': 'w-8',
            'class': 'text-center'
          },
          {
            'index': 'entered_quantity',
            'label': "Giren Miktarı",
            'headClass': 'w-8',
            'class': 'text-center'
          },
          {
            'index': 'sale_quantity',
            'label': "Satış",
            'headClass': 'w-8',
            'class': 'text-center'
          },
          {
            'index': 'unit',
            'label': "Birim",
            'slot': 'unit'
          },
          {
            'index': 'status',
            'label': "Durum",
            'slot': 'status'
          },
          {
            'index': 'prices',
            'label': "Alış F.",
            'slot': 'cost_price'
          },
          {
            'index': 'prices',
            'label': "Piy. Al. F.",
            'slot': 'market_cost_price'
          },
          {
            'index': 'prices',
            'label': "İnt. Sat. F.",
            'slot': 'online_sale_price'
          },
          {
            'index': 'prices',
            'label': "İnt. İnd. Sat. F.",
            'slot': 'discounted_online_sale_price'
          },
          {
            'index': 'prices',
            'label': "K. Kartı Sat. F.",
            'slot': 'credit_card_sale_price'
          },
          {
            'index': 'prices',
            'label': "Mağ. Sat. F.",
            'slot': 'store_sale_price'
          },

        ],

        filters: [
          {
            'index': 'status',
            'label': 'Durum',
            'base': true,
            'type': 'select',
            'api': '/products'
          },
          {
            'index': 'stock_group',
            'label': 'Stok Grubu',
            'base': true,
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
            'base': true,
            searchable: true,
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