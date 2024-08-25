<template>
    <button type="button" @click="click"
        class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-200 text-sm font-medium  text-gray-700 bg-gray-50 hover:bg-gray-100  dark:bg-slate-800  dark:text-slate-400 dark:border-gray-600 focus:outline-none ">
        <i class="la" :class="icon"></i>
        <span>{{ label }}</span>
        <span v-if="badge" class="inline-flex items-center justify-center px-2 py-1 text-xs font-semibold leading-none rounded-full bg-yellow-500 text-white dark:bg-slate-900 dark:text-slate-400">
            {{ badge }}
        </span>
    </button>
</template>
<script>

export default {
    props: {
        icon: {
            type: String,
            default: 'la-filter'
        },
        label: {
            type: String,
            default: 'Filtrele',
            required: true
        },
        badge: {
            type: [String, Number],
            default: null
        }
    },
    methods: {
        click() {
            this.$emit('open')
        }
    }
}
</script>