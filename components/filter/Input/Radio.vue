<template>
    <div v-if="value" class="flex space-x-3 px-1">
        <div class="flex items-center">
            <input :id="'a'+id" v-model="value" :value="{...value, text:label1 || $t('admin_main.active'), value : '1'}" @change="filter" type="radio" class="focus:ring-yellow-500 h-4 w-4 text-yellow-500 border-gray-300">
            <label :for="'a'+id" class="ml-3 block text-sm font-medium text-gray-700 dark:text-slate-400"> {{ label1 || $t('admin_main.active') }} </label>
        </div>
        <div class="flex items-center">
            <input :id="'p'+id" v-model="value" :value="{...value, text:label2 || $t('admin_main.passive'), value : '0'}" @change="filter" type="radio" class="focus:ring-yellow-500 h-4 w-4 text-yellow-500 border-gray-300">
            <label :for="'p'+id"  class="ml-3 block text-sm font-medium text-gray-700 dark:text-slate-400"> {{ label2 || $t('admin_main.passive')}}</label>
        </div>
    </div>
</template>

<script>
export default {
    props : {
        modelValue : {
            type : Object,
            default : null
        },
        label1: null,
        label2: null,
    },
    data() {
        return {
            value : null,
            id : Math.random().toString(36).substr(2, 9)
        }
    },
    watch: {
        value : {
            handler: function (val) {
                this.$emit('update:modelValue', this.value)
            },
            deep: true
        },
    },
    methods: {
        filter() {
            this.$emit('filter')
        }
    },
    mounted() {
        this.value = this.modelValue
    }
}
</script>
