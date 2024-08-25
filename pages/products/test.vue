<template>
  <div><label class="typo__label" for="ajax">Async multiselect</label>
    <Multiselect v-model="selectedCountries" id="ajax"
                 mode="tags"  placeholder="Type to search"
                 open-direction="bottom" :options="countries" :multiple="true" :searchable="true" :loading="isLoading"
                 :internal-search="false" :clear-on-select="false" :close-on-select="false" :options-limit="300"
                  :max-height="600" :show-no-results="false" :hide-selected="true"
                 @search-change="asyncFind">
      <template #tag="{ option, remove }"><span class="custom__tag"><span>{{ option.name }}</span><span
          class="custom__remove" @click="remove(option)">❌</span></span></template>
      <template #clear="props">
        <div class="multiselect__clear" v-if="selectedCountries.length"
             @mousedown.prevent.stop="clearAll(props.search)"></div>
      </template>
      <template #noResult>
        <span>Oops! No elements found. Consider changing the search query.</span>
      </template>
    </Multiselect>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import '@vueform/multiselect/themes/default.css';

export default {
  components: {
    Multiselect
  },
  data () {
    return {
      selectedCountries: [],
      countries: [],
      isLoading: false
    }
  },
  methods: {
    asyncFind (query) {

      this.isLoading = true;
      this.$apiFetch('/products?search=' + query)
          .then((response) => {
            this.countries = response.data.map((item) => {

              console.log(item);
              return {
                label: item.name,
                value: item.id,
              };
            });

            console.log(this.countries);
          })
          .catch((error) => {
            this.isLoading = false;
            this.countries = [];
          });
    },
    clearAll () {
      this.selectedCountries = []
    }
  }
}
</script>
