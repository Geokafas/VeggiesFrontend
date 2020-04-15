<template>
  <div class="container-xl">
    <div class="landing-wrapper">
      <div class="row align-items-center h-100">
        <div class="col-6 mx-auto">
          <div>
            <h1 class="d-flex justify-content-md-center landing-wrapper-text">Βάγγος φρούτα και λαχανικά </h1>
            <div class="col-6 mx-auto"> <h1 class="d-flex justify-content-md-center landing-wrapper-text landing-wrapper-subtext">70 χρόνια κοντά σας</h1> </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>
  .hero {
    background: rgb(81, 186, 252);
  }
  h1, h2 {
    color: #fff;
  }
 
  .landing-wrapper {
    display: table;
    width: 100%;
    height: 40em;
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('../../static/magazi2.jpg');
    background-position:left;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }
  .landing-wrapper-text{
    color: white;
    font-size: 50px;
    font-family:-apple-system;
    text-decoration: underline;
  }
  .landing-wrapper-subtext{
    color: white;
    font-size: 18px;
    font-family:-apple-system;
    text-decoration: underline;
    font-style: italic;
  }
</style>