<template>
  <div>
    <div class="flex rtl:flex-row-reverse rounded-md">
      <FilterInputSearch :placeholder="placeholder" v-model="query" @filter="filter()"/>

      <FilterBase v-for="(f, i) in filters?.filter((f) => f.base)" :filter="f" :key="i" :idx="i" @filter="filter()"/>

      <div class="hidden md:block relative">
        <button type="button" @click="this.$refs.detail_filters.show()"
                class=" rounded-r-md -ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-200 text-sm font-medium  text-gray-700 bg-gray-50 hover:bg-gray-100  dark:bg-slate-800  dark:text-slate-400 dark:border-gray-600 focus:outline-none ">
          <i class="la la-filter"></i>
          <span>Detaylı</span>
          <span v-if="activeFilterCount > 0"
                class="rounded-full text-xs bg-blue-200 w-4 h-4">
            {{ activeFilterCount }}
        </span>
        </button>
      </div>

      <UiDrawer ref="detail_filters" :title="'Detaylı Filtreler ' + (activeFilterCount > 0 ? ('('+activeFilterCount+')') : '')" index="z-50 bg-white" size="medium" :closable="false">


        <template #actions>
          <button class="bg-gray-600 text-white px-5 py-2 text-sm mr-1 rounded-md" @click="resetFilters">
            Temizle
          </button>
          <button v-if="filters.length > 0" @click="filter"
                  class="bg-blue-500 text-white px-5 py-2 text-sm rounded-md  hover:bg-blue-600">
            Filtrele
          </button>
        </template>
        <fieldset>

          <Filters
              :filters="filters?.filter((f) => !f.base)"
              @filterChange="activeFilterCount = $event"
          />
        </fieldset>
      </UiDrawer>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    filters: {
      type: Array,
      default: []
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      baseFilters: {},
      activeFilterCount: 0,
      placeholder: this.$t('admin_main.search'),
      activeFilter: null,
      search: {
        value: null,
        cols: ['search'],
      },
      activeFilters: {},
      providerOptions: [
        {
          title: this.$t('admin_sites.docker'),
          id: 'docker',
        },
        {
          title: this.$t('admin_sites.cpanel'),
          id: 'cpanel'
        }
      ],
      dateSelection: null,
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    resetFilters() {
      this.filters.forEach(filter => {
        filter.value = null;
        filter.value2 = null;
      });
    },
    filter() {
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

      if(this.query === '' && this.activeFilters.search) {
        this.activeFilters.search = null;
      } else {
        this.activeFilters.search = this.query;
      }

      this.$refs.detail_filters.hide();

      this.$emit('filter', this.activeFilters);
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.activeFilter = null;
      }
    }
  }
}
</script>