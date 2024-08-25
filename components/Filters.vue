<template>
  <div class="relative mt-1space-y-2">
    <div>


      <div v-for="(row, rowIndex) in filterRows" :key="rowIndex" class="flex flex-wrap -mx-2">
        <div v-for="(filter, index) in row" :key="index" class="w-full px-2 py-1.5">
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
        <button class="bg-gray-600 text-white px-5 py-2 text-sm mr-11 rounded-md" @click="resetFilters">
          Filtrelere Sıfırla
        </button>
        <div class="flex space-x-2">
          <div class="group flex"></div>
          <button v-if="filters.length > 0" @click="resetFilters" :disabled="activeFilterCount > 0 ? false : true"
                  class="bg-blue-500 text-white px-5 py-2 text-sm mr-11 rounded-md"
                  :class="activeFilterCount > 0 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'">
            Filtrele
          </button>
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


        this.$emit('filterChange', this.activeFilterCount);
      },
      deep: true,
    }
  },
}
</script>