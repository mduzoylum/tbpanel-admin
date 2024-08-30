<template>
    <div class="flex">
        {{ price }} {{ currency }}
    </div>

</template>

<script >
export default {
    props : {
        prices : {
            type : Array,
            required : true
        },
        type : {
            type : String,
            required : true
        }
    },
    data() {
        return {
            price : 0,
            currency : '₺'
        }
    },
    mounted() {
      console.log(this.prices)
      this.prices.forEach(price => {
        if(price.type === this.type) {
          this.price = price.price;

          if(price.price === 'TRY') {
            this.currency = '₺'
          } else if(price.price === 'USD') {
            this.currency = '$'
          } else if(price.price === 'EUR') {
            this.currency = '€'
          } else {
            this.currency = price.price
          }
        }
      });


    }
}
</script>