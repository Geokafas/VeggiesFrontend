<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link :to="{ name: 'index' }" class="navbar-item">
          <h1 class="title is-3 is-flex-mobile"></h1>
        </nuxt-link>

        <a role="button" class="navbar-burger burger" @click="isMenuOpen = !isMenuOpen" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu is-active">
        <div class="navbar-start">
          <div class="navbar-item field">
            <VmSearch></VmSearch>
          </div>
        </div>
        
        <div class="navbar-end">
          <div class="navbar-item social">
            <a href="#" class="icon" :title="facebookTooltip">
              <i class="fa fa-facebook"></i>
            </a>
            <a href="#" class="icon" :title="twitterTooltip">
              <i class="fa fa-twitter"></i>
            </a>
            <a href="#" class="icon" :title="instagramTooltip">
              <i class="fa fa-instagram"></i>
            </a>
            <a href="#" class="icon" :title="linkedinTooltip">
              <i class="fa fa-linkedin"></i>
            </a>
          </div>
          <div class="navbar-item shopping-cart" @click="showCheckoutModal">
            <span class="icon">
              <i class="fa fa-shopping-cart"></i>
            </span>
            <span :class="[numProductsAdded > 0 ? 'tag is-info' : '']">{{ numProductsAdded }}</span>
          </div>
        </div>
      </div>

      <!-- For mobile and tablet -->
      <div v-show="isMenuOpen" class="navbar-end">
        <VmMenu></VmMenu>
      </div>

      <!-- For desktop -->
      <div class="navbar-end is-hidden-mobile">
        <VmMenu></VmMenu>
      </div>
    </nav>

    <div class="pos-f-t">
    <div class="collapse" id="navbarToggleExternalContent">
      <div class="bg p-4">
        <h4 class="text-black" style="margin-bottom:1em;">Τα προϊόνα μας:</h4>
        <ul @click="setProductCatogory ()">
          <li class="text-muted" v-for="cat in productCategories" :key="cat.value"><a @click="category=cat.label">{{cat.value}}</a></li>
        </ul>
      </div>
    </div>
    <nav class="navbar navbar-dark bg">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
        <span> <h4 class="text-white">&gt;&gt;&gt; Επιλεξτε κατηγορία &lt;&lt;&lt; </h4></span>
      </button>
    </nav>
  </div>
  
  </div>
</template>

<script>
  import VmMenu from '../menu/Menu';
  import VmSearch from '../search/Search';

  export default {
    name: 'VmHeader',

    data () {
      return {
        linkedinTooltip: 'Follow us on Linkedin',
        facebookTooltip: 'Follow us on Facebook',
        twitterTooltip: 'Follow us on Twitter',
        instagramTooltip: 'Follow us on Instagram',
        isCheckoutActive: false,
        isMenuOpen: false,
        category: 1,
        productCategories: [
          {label: 1, value: "Φρούτα"},
          {label: 2, value: "Λαχανικά"},
          {label: 3,value: "VeggieStreet"},
          {label: 4, value:"Χονδρικής για καταστήματα"}]
      }
    },

    components: {
      VmSearch,
      VmMenu
    },

    computed: {
      numProductsAdded () {
        return this.$store.getters.productsAdded.length;
      }
    },

    methods: {
      showCheckoutModal () {
        this.$store.commit('showCheckoutModal', true);
      },
      setProductCatogory () { //commits the local category selector to the global one
        console.log("local category label "+ this.category);
        this.$store.commit('setProductCategorSelected', this.category);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .title {
    background: url('../../static/vvLogo.png') no-repeat;
    background-position: 51% 51%;
    background-size: 160px;
    width: 175px;
    height: 40px;
  }
  .shopping-cart {
    cursor: pointer;
  }
  a{
    color: grey;
  }
  a:hover{
    background: lightblue;
    color: black !important;
  }
  nav{
    background: #B9E2FC;
  }
  li{
    margin-bottom: 5px;
    margin-left: 1em;
  }
  li:hover{
    text-decoration: underline;
    color: black;
  }
</style>
