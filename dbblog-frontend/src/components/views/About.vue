<template>
  <div class="about">
    <img class="background" src="../../assets/bkg1.jpg" alt="">
    <img class="avatar" src="../../assets/dal-head.jpg" alt="">
    <p class="name">Dalgurak</p>
    <p class="desc">Write the code, Change the World</p>
    <ul class="social">
      <li><a href="https://github.com/dalgurak007" target="_blank"><img src="../../assets/icon/GitHub.png" alt=""></a></li>
    </ul>
    <div class="line"></div>
    <h4>技能值</h4>
    <div class="progresses">
      <Row :gutter="20">
        <Col :span="6">
          <p class="title">JS</p>
        </Col>
        <Col :span="18">
          <Progress status="normal" :hide-info="true" :stroke-width="8" :percent="70" class="bar"></Progress>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col :span="6">
          <p class="title">Go</p>
        </Col>
        <Col :span="18">
          <Progress status="wrong" :hide-info="true" :stroke-width="8" :percent="60" class="bar"></Progress>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col :span="6">
          <p class="title">vue</p>
        </Col>
        <Col :span="18">
          <Progress status="success" :hide-info="true" :stroke-width="8" :percent="40" class="bar"></Progress>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col :span="6">
          <p class="title">Linux</p>
        </Col>
        <Col :span="18">
          <Progress status="active" :hide-info="true" :stroke-width="8" :percent="50" class="bar"></Progress>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/theme.styl";

  .about
    position relative
    text-align center
    border 1px solid $color-border
    padding-bottom 20px
    img.background
      position absolute
      top 0
      left 0
      right 0
      width 100%
      height 150px
      z-index 1
    img.avatar
      position relative
      margin 75px auto 15px
      width 100px
      height 100px
      border 5px solid $color-gradually-gray-91
      border-radius 50%
      z-index 9
    .name
      font-size 22px
      color $color-typegraphy-title
      line-height 30px
      font-weight 700
    .desc
      font-size 15px
      color $color-secondary-info
      line-height 30px
      font-weight 100
    .social
      text-align center
      padding 0 20px
      margin-top 15px
      > li
        padding 8px
        a
          display block
          width: 44px
          height: 44px
          margin: auto
          img
            width 100%
    .line
      height 1px
      background-color $color-gradually-gray-91
      margin 10px 20px
    h4
      font-size 19px
      margin 30px 0 20px
      font-weight 600
    .progresses
      padding 0 20px
      p.title
        height 38px
        line-height 38px
        text-align right
      .bar
        margin 10px 0
</style>
