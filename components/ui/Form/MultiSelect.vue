<template>
  <Multiselect
      ref="multiselect"
      v-model="selecteds"
      mode="tags"
      @select="select"
      @deselect="deselect"
      @clear="clear"
      :options="selectOptions"
      :multiple="true"
      :searchable="true"
      :loading="isLoading"
      :internal-search="!api"
      :clear-on-select="false"
      :close-on-select="false"
      :hide-selected="true"
      :classes="multiselectClasses"
      noOptionsText="Bulunamadı"
      noResultsText="Bulunamadı.."
      @search-change="getOptionsFromApi">
    <template #selection="{ values, search, isOpen }">
        <span class="multiselect__single"
              v-if="values.length"
              v-show="!isOpen">{{ values.length }} tane seçildi</span>
    </template>
    <template #afterlist>
      <div class="text-center">
        <span class="text-xs text-gray-500">Devamı için arama yapınız.</span>
      </div>
    </template>
  </Multiselect>
</template>

<script>


import Multiselect from "@vueform/multiselect";
import '@vueform/multiselect/themes/default.css';

export default {
  components: {Multiselect},
  props: {
    'api': {
      type: String,
      default: ''
    },
    'modelValue': {
      type: Array,
      default: []
    },
    'options': {
      type: Array,
      default: []
    },
  },
  data() {

    return {
      selecteds: [],
      selectOptions: [],
      isLoading: false,
      multiselectClasses: {
        container: 'relative mx-auto flex items-center justify-end box-border cursor-pointer border border-gray-300 rounded bg-white text-base leading-snug outline-none w-40 sm:w-60 md:w-80',
        containerActive: 'ring ring-blue-500 ring-opacity-30',
        tag: 'text-xs bg-blue-200 text-black text-sm font-semibold py-0.5 pl-2 rounded mr-1 mb-1 flex items-center whitespace-nowrap min-w-0 rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1',
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
    }
  },
  methods: {
    select(value) {
      this.$emit('update:modelValue', this.selecteds)
      this.$emit('changed')
    },
    deselect(value) {
      this.$emit('update:modelValue', this.selecteds)
      this.$emit('changed')
    },
    clear() {
      this.$emit('update:modelValue', this.selecteds)
      this.$emit('changed')
    },
    getOptionsFromApi(query) {

      if(!this.api || this.api === '') {
        return;
      }

      let url = query && query.length > 0 ? this.api + '?search=' + query : this.api;


      this.isLoading = true;
      this.$apiFetch(url)
          .then((response) => {
            this.isLoading = false;
            this.selectOptions = response.data.map((item) => {

              console.log(item);
              return {
                label: item.name,
                value: item.id,
              };
            });
          })
          .catch((error) => {
            this.isLoading = false;
            this.selectOptions = [];
          });
    },
  },
  mounted() {
    if (this.api) {
      this.getOptionsFromApi();
    } else {
      this.selectOptions = this.options;
    }

  }
}
</script>
