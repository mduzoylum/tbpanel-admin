<template>

  <div class="mb-5">
    <div v-if="open"
         class="relative z-10 mt-2 shadow-lg left-0 right-0 rounded-md transform px-4 sm:px-0 border border-slate-300 dark:border-gray-600 bg-white dark:bg-slate-900 text-sm text-slate-600 dark:text-slate-400 w-full">
      <div class="relative mt-1 p-3 space-y-2">
        <div>


          <div v-for="(row, rowIndex) in filterRows" :key="rowIndex" class="flex flex-wrap -mx-2">
            <div v-for="(filter, index) in row" :key="index" class="w-1/3 px-2 py-1.5">
              <div class="leading-8 text-sm  truncate">
                {{ filter.label }} :
              </div>
              <div class="flex">

                <Multiselect
                    ref="multiselect"
                    v-if="filter.type === 'select'"
                    :mode="filter.searchable ? 'tags' : 'single'"
                    v-model="filter.value"
                    @select="handleFilter"
                    @deselect="handleFilter"
                    @clear="handleFilter"
                    :closeOnSelect="true"
                    :placeholder="filter.searchable || '- Seçiniz -'"
                    :minChars="0"
                    :limit="-1"
                    :delay="0"
                    :searchable="filter.searchable || false"
                    :options="async () => filter.options"
                    :classes="{
                      container: 'relative mx-auto flex items-center justify-end box-border cursor-pointer border border-gray-300 rounded bg-white text-base leading-snug outline-none w-full',
                      containerActive: 'ring ring-'+(filter.color || 'blue')+'-500 ring-opacity-30',
                      tag: 'bg-'+(filter.color || 'blue')+'-900 text-white text-sm font-semibold py-0.5 pl-2 rounded mr-1 mb-1 flex items-center whitespace-nowrap min-w-0 rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1',
                      groupLabelSelected: 'bg-'+(filter.color || 'blue')+'-600 text-white',
                      groupLabelSelectedPointed: 'bg-'+(filter.color || 'blue')+'-600 text-white opacity-90',
                      optionSelected: 'text-white bg-'+(filter.color || 'blue')+'-500',
                      optionSelectedPointed: 'text-white bg-'+(filter.color || 'blue')+'-500/90',
                      optionSelectedDisabled: 'text-'+(filter.color || 'blue')+'-100 bg-'+(filter.color || 'blue')+'-500/50 cursor-not-allowed',
                    }"
                    :noOptionsText="$t('message.noOptions')"
                    :noResultsText="$t('message.noResults')"
                />

                <input v-if="!filter.type || filter.type === 'text'" type="text" v-model="filter.value"
                       class="px-3 py-2 text-sm border border-slate-300 focus:outline-none focus:ring-offset-0 focus:ring-0 rounded-md w-full">
                <input type="date" v-if="filter.type === 'singledate'" v-model="filter.value"
                       class="px-3 py-2 mr-1 text-sm border border-slate-300 focus:outline-none focus:ring-offset-0 focus:ring-0 rounded-md max-w-40"/>
                <div class="flex w-full" v-if="filter.type === 'multidate'">
                  <input type="date" v-model="filter.value"
                         class="px-3 py-2 mr-1 text-sm border border-slate-300 focus:outline-none focus:ring-offset-0 focus:ring-0 rounded-md max-w-40"/>
                  <input type="date" v-model="filter.value2"
                         class="px-3 py-2 text-sm border border-slate-300 focus:outline-none focus:ring-offset-0 focus:ring-0 rounded-md max-w-40"/>
                </div>
                <div class="flex w-full" v-if="filter.type === 'range'">
                  <input type="number" v-model="filter.value" placeholder="min"
                         class="px-3 py-2 mr-1 text-sm border border-slate-300 focus:outline-none focus:ring-offset-0 focus:ring-0 rounded-md max-w-32"/>
                  <input type="number" v-model="filter.value2" placeholder="max"
                         class="px-3 py-2 text-sm border border-slate-300 focus:outline-none focus:ring-offset-0 focus:ring-0 rounded-md  max-w-32"/>
                </div>
              </div>
            </div>
          </div>
          <div class="justify-between flex mt-2">
            <button class="bg-red-500 text-white px-5 py-2 text-sm mr-11 rounded-md" @click="closeFilters">
              Kapat
            </button>
            <button class="bg-gray-600 text-white px-5 py-2 text-sm mr-11 rounded-md" @click="resetFilters">
              Filtrelere Sıfırla
            </button>
            <div class="flex space-x-2">
              <div class="group flex"></div>
              <button v-if="filters.length > 0" @click="filter" :disabled="activeFilterCount > 0 ? false : true"
                      class="bg-blue-500 text-white px-5 py-2 text-sm mr-11 rounded-md"
                      :class="activeFilterCount > 0 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'">
                Filtrele
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import '@vueform/multiselect/themes/default.css';


export default {
  components: {Multiselect},
  props: {
    filters: {
      type: Array,
      default: () => []
    },
    name: {
      type: String
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeFilters: {},
      activeFilterCount: {},
    }
  },
  computed: {
    filterRows() {
      const rows = [];
      for (let i = 0; i < this.filters.length; i += 3) {
        rows.push(this.filters.slice(i, i + 3));
      }
      return rows;
    }
  },

  watch: {
    filters: {
      handler: function (val) {
        this.activeFilterCount = this.filters.filter(filter => filter.value || filter.value2).length;
        this.activeFilters = this.filters.reduce((acc, filter) => {

          if (filter.type === 'range') {
            if (filter.value) {
              acc[filter.index + '_min'] = filter.value;
            }
            if (filter.value2) {
              acc[filter.index + '_max'] = filter.value2;
            }
          } else if (filter.type === 'multidate') {
            if (filter.value) {
              acc[filter.index + '_start'] = filter.value;
            }

            if (filter.value2) {
              acc[filter.index + '_end'] = filter.value2;
            }
          } else if (filter.value) {
            acc[filter.index] = filter.value || filter.value2;
          }

          return acc;
        }, {});

        this.$emit('filterChange', this.activeFilterCount);
      },
      deep: true,
    }
  },
  methods: {
    closeFilters() {
      this.$emit('closeFilters');
    },
    filter() {
      this.$emit('filter', this.activeFilters);
    },
    resetFilters() {
      this.filters.forEach(filter => {
        filter.value = null;
        filter.value2 = null;
      });
    },
  }
}
</script>