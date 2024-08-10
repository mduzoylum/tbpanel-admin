<template>
        <div class="bg-white dark:bg-slate-800 data-grid-nav  block md:flex items-center justify-between"
        :class="[size=='small'?'p-1 mb-2':'px-2']">
            <h1  :class="['text-'+$color+'-500']" class="text-sm md:text-xl mb-2 md:mb-0 " v-if="title != '' && titleIcon != ''">
                <i :class="titleIcon" class="la"></i>
                {{ title }}
            </h1>
            <div class="flex items-center justify-end" v-if="basic">
                <slot name="actions"></slot>
            </div>
          <div class="flex items-center justify-end" v-if="!basic">
            <div class="flex rtl:flex-row-reverse rounded-md h-" v-if="config.searchable">
              <div class="relative flex items-stretch flex-grow focus-within:z-10 focus:outline-none focus:ring-0">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UiIconsSearch class="text-gray-400"></UiIconsSearch>
                </div>
                <input
                    type="text"
                    @keyup.enter="sendEvent('search',query)"
                    v-model="query"
                    class="px-3 py-2 mr-1 text-sm border border-slate-300 focus:outline-none focus:ring-offset-0 focus:ring-0 rounded-md max-w-96 pl-10"
                    placeholder="Ara..."
                >
              </div>
            </div>
            <slot name="actions"></slot>
          </div>
        </div>
</template>

<script> 
export default{
    props : {
        title : String,
        titleIcon : {
            type : String,
            default : ''
        },
        config : {
            type : Object,
            default : {

            }
        },
        basic : {
            type : Boolean,
            default : false,
        },
        size: {
          type: String,
          default: 'default'
        }      
    },
    data(){
        return {
            query : '',
        }
    },
    methods : {
        sendEvent(event,params = null){
            this.$emit('events',event,params);
        }
    }
}

</script>