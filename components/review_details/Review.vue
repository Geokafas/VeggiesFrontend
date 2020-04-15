<template>
    <div class="section">
        <div class="card is-clearfix columns">
            <div class="card-content column">
                <div class="container-xl">
                    <div class="row justify-content-md-center">
                        <div class="well">
                            <div class="list-group">
                                <a class="list-group-item" >
                                    <div class="col">
                                        <!-- <h4 class="list-group-item-heading"> List group heading </h4> -->
                                        <p class="list-group-item-text">{{ review.review_text }}</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<!--NA TO SVHSW olo-->
<script>
export default {
    name: 'reviewsList',

    data () {
        return {
        reviews: [],
        };
    },

    mounted () {
        this.reviews = this.$store.getters.getReviewById(this.$route.params.id);
        console.log(this.reviews);
    },
}

</script>