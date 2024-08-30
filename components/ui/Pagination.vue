<template>
  <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
    <div class="flex-1 flex justify-between sm:hidden">
      <a
          href="#"
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          :class="{ 'opacity-50 cursor-not-allowed': current_page === 1 }"
          @click.prevent="previousPage"
          :disabled="current_page === 1"
      >
        Previous
      </a>
      <a
          href="#"
          class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          :class="{ 'opacity-50 cursor-not-allowed': current_page === total_page }"
          @click.prevent="nextPage"
          :disabled="current_page === total_page"
      >
        Next
      </a>
    </div>

    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          <span class="font-medium">{{ total }}</span>
          kayıttan
          <span class="font-medium">{{ startRecord }}</span>
          -
          <span class="font-medium">{{ endRecord }}</span>
          arası görüntüleniyor.
        </p>
      </div>
      <div>
        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <!-- İlk sayfa ve ... -->
          <a
              v-if="current_page > 3"
              href="#"
              @click.prevent="changePage(1)"
              class="relative inline-flex items-center px-4 py-2 border text-sm font-medium bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
          >
            1
          </a>
          <span v-if="current_page > 3" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"> ... </span>

          <!-- Bir önceki 2 sayfa -->
          <template v-for="page in pagesBeforeCurrent" :key="page">
            <a
                href="#"
                @click.prevent="changePage(page)"
                :class="page === current_page ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'"
                class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              {{ page }}
            </a>
          </template>

          <!-- Mevcut sayfa -->
          <a
              href="#"
              @click.prevent="changePage(current_page)"
              class="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
          >
            {{ current_page }}
          </a>

          <!-- Bir sonraki 2 sayfa -->
          <template v-for="page in pagesAfterCurrent" :key="page">
            <a
                href="#"
                @click.prevent="changePage(page)"
                :class="page === current_page ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'"
                class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              {{ page }}
            </a>
          </template>

          <!-- ... ve son sayfa -->
          <span v-if="current_page < total_page - 2" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"> ... </span>
          <a
              v-if="current_page < total_page - 2"
              href="#"
              @click.prevent="changePage(total_page)"
              class="relative inline-flex items-center px-4 py-2 border text-sm font-medium bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
          >
            {{ total_page }}
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null,
    },
    size: {
      type: String,
      default: 'default',
    },
    modelValue: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      start: 0,
      limit: 10,
      total: null,
      total_page: 1,
      current_page: 1,
    };
  },
  computed: {
    startRecord() {
      return ((this.current_page - 1) * this.limit) + 1;
    },
    endRecord() {
      return Math.min(this.current_page * this.limit, this.total);
    },
    pagesBeforeCurrent() {
      // Mevcut sayfanın öncesinde en fazla 2 sayfa gösterilir ve 1'den küçük sayfa olamaz
      const startPage = Math.max(1, this.current_page - 2);
      return Array.from({ length: this.current_page - startPage }, (_, i) => startPage + i);
    },
    pagesAfterCurrent() {
      // Mevcut sayfanın sonrasında en fazla 2 sayfa gösterilir ve toplam sayfa sayısını geçemez
      const endPage = Math.min(this.total_page, this.current_page + 2);
      return Array.from({ length: endPage - this.current_page }, (_, i) => this.current_page + i + 1);
    },
  },
  watch: {
    current_page(value) {
      this.$emit('change', value);
      this.$emit('update:modelValue', value);
    },
    data() {
      this.load();
    },
  },
  methods: {
    load() {
      if (!this.data) {
        return;
      }
      this.limit = this.data.limit || this.limit;
      this.total = this.data.total;
      this.total_page = Math.ceil(this.data.total / this.limit);
    },
    changePage(page) {
      if (page >= 1 && page <= this.total_page) {
        this.current_page = page;
      }
    },
    previousPage() {
      if (this.current_page > 1) {
        this.current_page -= 1;
      }
    },
    nextPage() {
      if (this.current_page < this.total_page) {
        this.current_page += 1;
      }
    },
  },
  mounted() {
    this.load();
    this.current_page = this.modelValue;
  },
};
</script>
