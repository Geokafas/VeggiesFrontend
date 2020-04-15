<!--This is the main page that contains the product cards-->
<template>
  <div class="columns is-centered is-multiline">
    <div class="card column is-one-quarter" v-for="product in products" :key="product.id">
      <VmProducts :product="product"></VmProducts>
    </div>
    <div class="section" v-if="products.length === 0">
      <p>{{ noProductLabel }}</p>
    </div>
  </div>
</template>

<script>
import VmProducts from '../Products';
import { getByTitle } from '@/assets/filters';
import { getters } from '@/store/index';

export default {
  name: 'newProductsList', //htan productsList kai to ekana
  
  components: { VmProducts },
  
  data () {
    return {
      id: '',
      noProductLabel: 'No product found',
      productsFiltered: []
    };
  },

  computed: {
    products () {
      //gets products by title if search is used
      if (this.$store.state.userInfo.hasSearched) {
        return this.getProductByTitle();
      //populate the products with reviews and ratings
      } else {
        return this.$store.state.products;
      }
    }
  },

  async mounted(){

    if( this.$store.state.products.length == 0 )
    {

      var newProductsList = await getters.getProductsFromBackend();
      var newProductsRatingsObjectList = await getters.getProductRatingsFromBackend();
      var newProductsReviewsObjectList = await getters.getProductReviewsFromBackend();
      try{ 
        this.$store.commit('addToRatings', newProductsRatingsObjectList);
        this.$store.commit('addToReviews', newProductsReviewsObjectList);
        console.log(newProductsRatingsObjectList);
        console.log(newProductsReviewsObjectList);
        newProductsList.forEach(element=>{

        element.ratings = this.computeRatingsAvg(element.id);
        element.reviews = this.computeReviewsSum(element.id);

      });
      this.$store.commit('addToProducts', newProductsList);
      }catch(error){
        console.log(error);
      }
    }
  },

  methods: {
    computeRatingsAvg(id){
      var sum = 0, total = 0;
      this.$store.state.productsRatingsObjectList.forEach(element =>{
        if(element.product_id == id){
          sum += parseInt(element.rating);
          total ++;
        }
      });
      //var ret = toFixed(sum/total)
      return sum/total;
    },
    computeReviewsSum(id){
      var total = 0;
      this.$store.state.productsReviewsObjectList.forEach(element =>{
        if(element.product_id == id){
          total++;
        }
      });
      return total;
    },
    getProductByTitle () {
      let listOfProducts = this.$store.state.products,
          titleSearched = this.$store.state.userInfo.productTitleSearched;
      
      return this.productsFiltered = getByTitle(listOfProducts, titleSearched);
    }
  }
};
</script>

<style lang="scss" scoped>
  .card {
    margin: 20px;
  }
  .columns{
    margin-top: 30px;
    margin-bottom: 30px;
  }
</style>
