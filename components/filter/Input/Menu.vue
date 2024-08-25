<template>
    <div class="relative">
        <div class="absolute z-10 mt-1 max-h-56 overflow-auto rounded-md bg-white dark:bg-slate-700 border dark:border-gray-600 py-1 text-base shadow-md focus:outline-none sm:text-sm" v-if="listActive"
            :class="[menuClass]">
            <UiLoader noborder v-if="loader" />
            <span class="text-gray-900 dark:text-slate-400 py-1 px-1.5 text-xs" v-else-if="!result || result?.length == 0">{{ $t('admin_main.empty_msg') }}</span>
            <ul v-else role="listbox">
                <li v-for="(option, index) in result" :key="index" @click="select(option)"
                    class="select-none text-gray-900 dark:text-slate-400 cursor-pointer flex gap-2 items-center justify-between py-1.5 px-2 hover:bg-gray-100 hover:dark:bg-slate-900 rounded">
                    <span class="truncate" :class="{ 'font-semibold': isSelected(option) }">{{ option[textKey] }}</span>
                    <i class="la la-check text-yellow-500" v-if="isSelected(option)"></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    api: {
        type: String,
        default: null
    },
    limit: {
        type: [Number, String],
        default: 50
    },
    query: {
        type: Object,
        default: {}
    },
    options: {
        type: Array,
        default: null
    },
    modelValue: {
        type: [String, Number, Array, Object],
        default: null
    },
    textKey: {
        type: String,
        default: 'name'
    },
    valueKey: {
        type: String,
        default: 'id'
    },
    multiSelect: {
        type: Boolean,
        default: false
    },
    show: {
        type: Boolean,
        default: false
    },
    menuClass: {
        type: String,
        default: 'min-w-max w-full'
    }
})

const emit = defineEmits(['update:modelValue', 'change'])
const selected = ref(props.multiSelect ? [] : {})

const result = ref([])
const loader = ref(false)



const listActive = computed(() => {
    if (props.show) {
        loadOptions()
        definePreSelected()
    }
    return props.show
})

const loadOptions = async () => {
    if (props.options) { result.value = props.options; return; }
    if (!props.api) return;
    if (result.value.length > 0) return;

    loader.value = true
    await useNuxtApp().$http(props.api, {
        limit: props.limit,
        ...props.query
    }).then((response) => {
        result.value = response.data;
    }).finally(() => {
        loader.value = false
    })
}

const isSelected = (item) => {
    if (props.multiSelect) {
        return selected.value.some((i) => i[props.valueKey] == item[props.valueKey])
    }
    return selected.value?.[props.valueKey] == item[props.valueKey]
}

const select = (item) => {
    if (props.multiSelect) {
        if (isSelected(item)) {
            selected.value = selected.value.filter((i) => i[props.valueKey] != item[props.valueKey])
        } else {
            selected.value.push(item)
        }
        emitMulti()
        return;
    }
    else {
        if (isSelected(item)) {
            selected.value = {}
            emitSingle()
            return;
        }
    }
    selected.value = item;
    emitSingle()
}

const emitMulti = () => {
    let text = selected.value.map((item) => item[props.textKey]).join(', ')
    let value = selected.value.map((item) => item[props.valueKey])
    let m = Object.assign({}, props.modelValue)

    emit('update:modelValue', {
        ...m,
        ...{
            text: text,
            value: value,
        }
    })

    emit('change', selected.value)
    return;
}

const emitSingle = () => {
    let m = Object.assign({}, props.modelValue)
    let s = Object.assign({}, selected.value)

    emit('update:modelValue', {
        ...m,
        ...{
            text: s[props.textKey],
            value: s[props.valueKey],
        }
    })

    emit('change', selected.value)
}

const definePreSelected = () => {
    if (props.multiSelect) {
        if (props.modelValue) {
            selected.value = result.value.filter((item) => props.modelValue.value?.includes(item[props.valueKey]))
        }
    }
    else {
        if (props.modelValue) {
            selected.value = result.value.find((item) => props.modelValue.value == item[props.valueKey])
        }
    }
}


</script>