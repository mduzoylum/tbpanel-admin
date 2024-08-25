<template>
    <div class="flex gap-2" v-if="value">
        <input :type="type" class="t-input w-1/2 placeholder:dark:text-slate-400" placeholder="min" v-model="value.value1" v-on:keyup.enter="filter"/>
        <input :type="type" class="t-input w-1/2 placeholder:dark:text-slate-400" placeholder="max" v-model="value.value2" v-on:keyup.enter="filter"/>
    </div>
</template>

<script>
export default {
    props : {
        modelValue : {
            type : Object,
            default : null
        },
        type : {
            type : String,
            default : 'number'
        }
    },
    data() {
        return {
            value : null,
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
