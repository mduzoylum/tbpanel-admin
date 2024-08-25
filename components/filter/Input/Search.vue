<template>
    <div class="relative flex items-stretch flex-grow focus-within:z-10 min-w-[180px]">
        <div class="absolute inset-y-0 ltr:left-0 rtl:left-4 ltr:pl-3 rtl:pr-3 flex items-center pointer-events-none">
            <i class="la la-search"></i>
        </div>
        <input class="border block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-200 dark:border-gray-600  dark:bg-slate-400 dark:text-slate-800 dark:placeholder:text-slate-700 placeholder-shown:truncate" placeholder="Ara..." v-model.trim="search.value" v-on:keyup.enter="filter">
    </div>
</template>

<script>

export default {
    props: ['placeholder','modelValue'],
    emits: ['update:modelValue','filter'],
    data() {
        return {
            search: {
                value: ''
            }
        }
    },
    watch: {
        search: {
            handler: function (val) {
                this.$emit('update:modelValue', val.value)
            },
            deep: true
        }
    },
    methods: {
        filter() {
            this.$emit('filter')
        }
    }
}
</script>
