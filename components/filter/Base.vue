<template>
  <Popover v-slot="{ open }" class="relative">
    <PopoverButton
        @click="isPopoverOpen = !isPopoverOpen"
        :disabled="filter.loading"
        :class="[
                '-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-200 text-sm font-medium  text-gray-700 bg-gray-50 hover:bg-gray-100  dark:bg-slate-800  dark:text-slate-400 dark:border-gray-600 focus:outline-none',
                open ? '' : 'text-opacity-90',
                'bg-gray-50 border-gray-100 text-gray-700'
        ]"
    >
      <span>{{ filter.label }}</span>
      <span v-if="filterCount" class="rounded-full text-xs bg-blue-200 w-4 h-4">{{ filterCount }}</span>

    </PopoverButton>

    <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
    >
      <PopoverPanel
          class="absolute h-auto z-10 right-1/2 translate-x-1/2 mt-1 transform px-2 sm:px-0 md:right-0"
      >
        <div class="bg-gray-50 h-auto p-1.5 rounded shadow-lg">
          <input
              @change="handleFilter"
              v-if="!filter.type"
              type="text"
              v-model="filter.value"
              class="text-sm border border-slate-300 focus:outline-none focus:ring-offset-0 focus:ring-0 rounded-sm"
          />
          <input
              @change="handleFilter"
              type="date"
              v-if="filter.type === 'singledate'"
              v-model="filter.value"
              class="w-full text-sm border border-slate-300 focus:outline-none focus:ring-offset-0 focus:ring-0 rounded-sm"
          />
          <div class="flex" v-if="filter.type === 'multidate'">
            <input
                type="date"
                @change="handleFilter"
                v-model="filter.value1"
                class="text-sm border w-full border-slate-300 focus:outline-none focus:ring-offset-0 focus:ring-0 rounded-sm"
            />
            <input
                type="date"
                @change="handleFilter"
                v-model="filter.value2"
                class="text-sm border w-full border-slate-300 focus:outline-none focus:ring-offset-0 focus:ring-0 rounded-sm"
            />
          </div>
          <UiFormMultiSelect
              v-if="filter.type === 'select'"
              v-model="filter.value"
              @changed="handleFilter"
              :options="filter.options"
              :api="filter.api"
          />
          <div class="flex flex-col md:flex-row" v-if="filter.type == 'range'">
            <input
                v-model="filter.value1"
                @change="handleFilter"
                type="number"
                placeholder="min"
                class="max-w-28 text-sm border border-slate-300 focus:outline-none focus:ring-offset-0 focus:ring-0 rounded-sm"
            />
            <input
                v-model="filter.value2"
                @change="handleFilter"
                type="number"
                placeholder="max"
                class="max-w-28 text-sm border border-slate-300 focus:outline-none focus:ring-offset-0 focus:ring-0 rounded-sm"
            />
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script>
import {Popover, PopoverButton, PopoverPanel} from "@headlessui/vue";
import Multiselect from "@vueform/multiselect";

export default {
  components: {
    Popover,
    PopoverButton,
    PopoverPanel,
    Multiselect,
  },
  props: {
    modelValue: {
      type: Object,
    },
    filter: {
      type: Object,
    },
    idx: Number,
  },
  data() {
    return {
      isPopoverOpen: false,
      filter: this.filter,
      isLoading: false,
      filterCount: 0,
      multiselectClasses: {
        container: 'relative mx-auto flex items-center justify-end box-border cursor-pointer border border-gray-300 rounded bg-white text-base leading-snug outline-none w-40 sm:w-60 md:w-80',
        containerActive: 'ring ring-blue-500 ring-opacity-30',
        tag: 'bg-blue-900 text-white text-sm font-semibold py-0.5 pl-2 rounded mr-1 mb-1 flex items-center whitespace-nowrap min-w-0 rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1',
        groupLabelSelected: 'bg-blue-600 text-white',
        groupLabelSelectedPointed: 'bg-blue-600 text-white opacity-90',
        optionSelected: 'text-white bg-blue-500',
        optionSelectedPointed: 'text-white bg-blue-500/90',
        optionSelectedDisabled: 'text-blue-100 bg-blue-500/50 cursor-not-allowed',
        option: 'flex items-center justify-start box-border text-left cursor-pointer text-sm leading-snug py-2 px-3',
        optionPointed: 'text-gray-800 bg-gray-100',
        dropdownHidden: '',
        caretOpen: '',
      },
    };
  },
  watch: {
    modelValue: {
      handler: function (val) {
        this.filterCount = this.findFilterCount();
      },
      deep: true,
    },
    isPopoverOpen: {
      handler: function (val) {
        this.$nextTick(() => {
          this.$refs.multiselect?.focus();
        });
      },
    },
  },
  methods: {
    async getOptionsByDependent(query) {
      let depsFilter = '';
      this.filter.dependent?.forEach(async (dep) => {
        if (this.$parent.$parent.filtersObject?.hasOwnProperty(dep)) {
          let filter = this.$parent.$parent.filterMapping(this.$parent.$parent.filtersObject[dep], dep)
          if (filter) {
            depsFilter += `${filter.filter}=${filter.value}&`;
          }
        }
      });
      return await this.$parent.$parent.$parent[this.filter.getOptionsMethod](depsFilter, {
        selected: this.filter.value,
        query
      });
    },
    getOptionsFromApi(endpoint) {

      this.$apiFetch(endpoint)
          .then((response) => {
            let options =  response.data.map((item) => {
              return {
                label: item.name,
                value: item.id,
              };
            });
            return options;
          })
          .catch((error) => {
            return [];
          });
    },
    findFilterCount() {

      let filter = this.filter;

      if (filter.type === 'range' || filter.type === 'multidate') {
        if (filter.value || filter.value2) {
          return 1;
        }
      } else if (filter.type === 'select') {
        return filter.value?.length || 0;
      } else if (filter.value) {
        return 1;
      }

      return 0;
    },
    handleFilter() {
      this.filterCount = this.findFilterCount();
      this.$emit("filter");
    },
  },
  mounted() {
    this.filterCount = this.findFilterCount();
  },
};
</script>

<style lang="scss" scoped></style>
