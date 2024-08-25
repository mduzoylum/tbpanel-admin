<template>
  <div class="bg-white dark:bg-slate-800 data-grid-nav  block md:flex items-center justify-between mb-2">
    <h1 :class="['text-'+$color+'-500']" class="text-sm md:text-xl mb-2 md:mb-0 " v-if="title != '' && titleIcon != ''">
      <i :class="titleIcon" class="la"></i>
      {{ title }}
    </h1>
    <div class="flex items-center justify-end" v-if="basic">
      <slot name="actions"></slot>
    </div>
    <div class="flex items-center justify-end" v-if="!basic">
      <div class="flex rtl:flex-row-reverse rounded-md">
        <FilterAll :filters="config.filters" @filter="sendEvent('filter',$event)"></FilterAll>
      </div>

      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    titleIcon: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: {}
    },
    basic: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      query: '',
    }
  },
  methods: {
    sendEvent(event, params = null) {
      this.$emit('events', event, params);
    }
  }
}

</script>