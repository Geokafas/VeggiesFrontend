import axios from 'axios';
//export const strict = false
export const state = () => ({
  productsReviewsObjectList: [], // this holds a list with {prod_id: , rev_text: , pub_date: }
  productsRatingsObjectList: [], // this holds a list with {prod_id: , rating: }
  products: [
    // {
    //   id: 1,
    //   title: 'Product 1',
    //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    //   price: 50,
    //   ratings: 3,
    //   reviews: 5,
    //   isAddedToCart: false,
    //   isAddedBtn: false,
    //   isFavourite: false,
    //   quantity: 1
    // },
    // {
    //   id: 2,
    //   title: 'Product 2',
    //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    //   price: 35,
    //   ratings: 5,
    //   reviews: 10,
    //   isAddedToCart: false,
    //   isAddedBtn: false,
    //   isFavourite: false,
    //   quantity: 1
    // },
    // {
    //   id: 3,
    //   title: 'Product 3',
    //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    //   price: 110,
    //   ratings: 2,
    //   reviews: 3,
    //   isAddedToCart: false,
    //   isAddedBtn: false,
    //   isFavourite: false,
    //   quantity: 1
    // },
    // {
    //   id: 4,
    //   title: 'Product 4',
    //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    //   price: 50,
    //   ratings: 1,
    //   reviews: 0,
    //   isAddedToCart: false,
    //   isAddedBtn: false,
    //   isFavourite: false,
    //   quantity: 1
    // },
    // {
    //   id: 5,
    //   title: 'Product 5',
    //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    //   price: 35,
    //   ratings: 4,
    //   reviews: 2,
    //   isAddedToCart: false,
    //   isAddedBtn: false,
    //   isFavourite: false,
    //   quantity: 1
    // },
    // {
    //   id: 6,
    //   title: 'Product 6',
    //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    //   price: 110,
    //   ratings: 5,
    //   reviews: 1,
    //   isAddedToCart: false,
    //   isAddedBtn: false,
    //   isFavourite: false,
    //   quantity: 1
    // },
    // {
    //   id: 7,
    //   title: 'Product 7',
    //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    //   price: 50,
    //   ratings: 5,
    //   reviews: 7,
    //   isAddedToCart: false,
    //   isAddedBtn: false,
    //   isFavourite: false,
    //   quantity: 1
    // },
    // {
    //   id: 8,
    //   title: 'Product 8',
    //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    //   price: 35,
    //   ratings: 3,
    //   reviews: 0,
    //   isAddedToCart: false,
    //   isAddedBtn: false,
    //   isFavourite: false,
    //   quantity: 1
    // },
    // {
    //   id: 9,
    //   title: 'Product 9',
    //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    //   price: 110,
    //   ratings: 4,
    //   reviews: 2,
    //   isAddedToCart: false,
    //   isAddedBtn: false,
    //   isFavourite: false,
    //   quantity: 1
    // }
  ],
  userInfo: {
    isLoggedIn: false,
    isSignedUp: false,
    hasSearched: false,
    name: '',
    productTitleSearched: '',
    productCategorySelected: 1,

  },
  systemInfo: {
    openLoginModal: false,
    openSignupModal: false,
    openCheckoutModal: false,
    isLoadingProducts: true
  }
})
//tha prepei na kanoun get apo ton axios kai na kratane ola ta products se enan pinaka
//prepei na to kalw sto mounted sto productslistcointainer.vue
export const getters = {
//async because i have to wait for the axios request to return
//o IE den upostirizei async
  async getProductsFromBackend() {
    try{
      var partial_url = '/item/?format=json';
      var combined_url = "https://veggiestreet.herokuapp.com"+partial_url;
      console.log("api url"+ combined_url);
      var newProductsList = [];
      let res = await axios
      .get(combined_url)
      .then(response => {
        response.data.forEach(element => {
          newProductsList.push({
            "id" : element.product_id,
            "title" : element.product_title,
            "description" : element.product_description,
            "category" : element.product_category,
            "price" : element.product_price,
            "image" : element.product_picture,
            "ratings" : 1,  //mo olwn twn ratings
            "reviews" : 0, //plithos twn reviews
            "isAddedToCart" : false,
            "isAddedBtn" : false,
            "isFavourite" : false,
            "quantity_remaining" : element.product_quantity,
            "quantity" :  1//this is remaining quantity
          });
        });
      })
      return newProductsList
    }catch(error){
      console.log(error)
    }
  },

  async getProductRatingsFromBackend()
  {
    try{
      var partial_url = '/itemRatings/?format=json';
      var combined_url = "https://veggiestreet.herokuapp.com"+partial_url;
      var newProductsRatingsObjectList = [];
      let res = await axios
      .get(combined_url)
      .then(response => {
        response.data.forEach(element => {
          newProductsRatingsObjectList.push({
            "product_id" : element.product_id,
            "rating" : element.product_rating});
        });
      })
      return newProductsRatingsObjectList
    }catch(error){
      console.log(error)
    }
  },

  async getProductReviewsFromBackend()
  {
    try{
      var partial_url = '/itemReviews/?format=json';
      var combined_url = "https://veggiestreet.herokuapp.com"+partial_url;
      var newProductsReviewsObjectList = [];
      let res = await axios
      .get(combined_url)
      .then(response => {
        response.data.forEach(element => {
          newProductsReviewsObjectList.push({
            "product_id" : element.product_id,
            "review_text" : element.product_review,
            "pub_date" : element.pub_date});
        });
      })

      return newProductsReviewsObjectList
    }catch(error){
      console.log(error)
    }
  },
  getProductsByCategory: state => {
    return state.products.filter(function(product){return product.category == state.userInfo.productCategorySelected});
  },
  productsAdded: state => {
    return state.products.filter(el => {
      return el.isAddedToCart;
    });
  },
  productsAddedToFavourite: state => {
    return state.products.filter(el => {
      return el.isFavourite;
    });
  },
  getProductById: state => id => {
    return state.products.find(product => product.id == id);
  },
  isUserLoggedIn: state => {
    return state.userInfo.isLoggedIn;
  },
  isUserSignedUp: state => {
    return state.userInfo.isSignedUp;
  },
  getUserName: state => {
    return state.userInfo.name;
  },
  isLoginModalOpen: state => {
    return state.systemInfo.openLoginModal;
  },
  isSignupModalOpen: state => {
    return state.systemInfo.openSignupModal;
  },
  isCheckoutModalOpen: state => {
    return state.systemInfo.openCheckoutModal;
  },
  quantity: state => {
    return state.products.quantity;
  },
  getReviewById: state => id =>{
    return state.productsReviewsObjectList.filter(function(review){return review.product_id == id});
  }
}

export const mutations = {
  addToProducts: (state,newproducts) => {
    newproducts.forEach(element => {
      
      state.products.push(element);
    });
  },
  addToRatings: (state,newRatings) => {
    newRatings.forEach(element => {
      
      state.productsRatingsObjectList.push(element);
    });
  },
  addToReviews: (state,newReviews) => {
    newReviews.forEach(element => {
      
      state.productsReviewsObjectList.push(element);
    });
  },
  addToCart: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isAddedToCart = true;
      }
    });
  },
  setAddedBtn: (state, data) => {
    state.products.forEach(el => {
      if (data.id === el.id) {
        el.isAddedBtn = data.status;
      }
    });
  },
  removeFromCart: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isAddedToCart = false;
      }
    });
  },
  removeProductsFromFavourite: state => {
    state.products.filter(el => {
      el.isFavourite = false;
    });
  },
  isUserLoggedIn: (state, isUserLoggedIn) => {
    state.userInfo.isLoggedIn = isUserLoggedIn;
  },
  isUserSignedUp: (state, isSignedUp) => {
    state.userInfo.isSignedUp = isSignedUp;
  },
  setHasUserSearched: (state, hasSearched) => {
    state.userInfo.hasSearched = hasSearched;
  },
  setUserName: (state, name) => {
    state.userInfo.name = name;
  },
  setProductTitleSearched: (state, titleSearched) => {
    state.userInfo.productTitleSearched = titleSearched;
  },
  setProductCategorSelected (state, categorySet) {
    state.userInfo.productCategorySelected = categorySet;
  },
  showLoginModal: (state, show) => {
    state.systemInfo.openLoginModal = show;
  },
  showSignupModal: (state, show) => {
    state.systemInfo.openSignupModal = show;
  },
  showCheckoutModal: (state, show) => {
    state.systemInfo.openCheckoutModal = show;
  },
  addToFavourite: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isFavourite = true;
      }
    });
  },
  removeFromFavourite: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isFavourite = false;
      }
    });
  },
  quantity: (state, data) => {
    state.products.forEach(el => {
      if (data.id === el.id) {
        el.quantity = data.quantity;
      }
    });
  },
  SET_USER(state, authUser) {
    state.authUser = authUser
  },
  toggleLoadingState(state,value){
    state.systemInfo.isLoadingProducts = value;    
  }
}
/* 
export const actions = {
  async nuxtServerInit({ commit }) {
    const res = await this.$axios.get("/api/current_user")
    commit("SET_USER", res.data)
  },

  async logout({ commit }) {
    const { data } = await this.$axios.get("/api/logout")
    if (data.ok) commit("SET_USER", null)
  },

  async handleToken({ commit }, token) {
    const res = await this.$axios.post("/api/stripe", token)
    commit("SET_USER", res.data)
  }
} */
