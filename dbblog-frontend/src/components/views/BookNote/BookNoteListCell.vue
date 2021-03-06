<template>
  <div :class="{'bookNote-cell': 1, boxBorder: showBookInfo}">
    <Row type="flex">
      <Col :xs="24" :sm="24" :md="textSpan" :lg="textSpan" :order="textOrderType" style="padding-left: 0;padding-right: 0;">
        <div class="text-wrapper">
          <h4 class="title">
            <a :href="'/bookNote/'+bookNote.id">{{bookNote.title}}</a>
            <span class="special" v-if="bookNote.top>0" title="置顶">置顶</span>
          </h4>
          <p class="book-info">
            <Icon type="ios-book"/>&nbsp;&nbsp;{{bookNote.title}}&nbsp;
            <Icon type="ios-person"/>&nbsp;&nbsp;{{bookNote.author }}
          </p>
          <p class="book-info">
            <Icon type="ios-paper" />&nbsp;&nbsp;Chapter：{{bookNote.chapter | textLineBreak(70) }}
          </p>
          <div class="tags">
            <Tag :color="tag.id | mapTagColor" :key="tag.id" type="border" v-for ="(tag) in bookNote.tagList">{{tag.name}}</Tag>
          </div>
          <p class="desc">{{bookNote.description | filterHtml | textLineBreak(80) }}<a :href="'/bookNote/'+bookNote.id"> 查看更多
            <Icon type="ios-redo" />
          </a></p>
          <p class="operate_info">
            <span class="publish-time">At time / <a>{{bookNote.createTime | socialDate }}</a></span>
            <span class="readings"><a><Icon type="ios-eye"></Icon> {{bookNote.readNum}} 阅读</a></span>
            <span class="likes"><a @click="likePost(bookNote)" ><Icon type="ios-heart"></Icon> {{bookNote.likeNum}} 喜欢</a></span>
          </p>
        </div>
      </Col>
      <Col :xs="0" :sm="0" :md="imgSpan" :lg="imgSpan" :order="imgOrderType" style="padding-left: 0px;padding-right: 0px">
        <div class="img-wrapper" :class="themeClass">
          <img :src="bookNote.cover" alt="">
        </div>
      </Col>
    </Row>
    <a class="toggle-arrow" @click="toggleBookInfo" :class="{show: showBookInfo}">
      <!-- {{ this.showBookInfo ? '隐藏《'+ bookNote.title + '》':'查看《' + bookNote.title + '》'}} &nbsp; -->
      {{ this.showBookInfo ? '隐藏':'查看'}} &nbsp;
      <Icon type="ios-redo-outline" :class="{show: showBookInfo}"/>
    </a>
    <a :href="'/book/'+ bookNote.id">
    <div class="book-infos" :class="{show: showBookInfo}"  >
      <div class="book-infos-wrapper">
        <div class="img">
          <div class="container">
            <div class="bracket"></div>
            <div class="target">
              <img :src="bookNote.cover" alt="">
            </div>
          </div>
        </div>
        <div class="book-info">
          <p class="desc"><span>作者：</span>{{ bookNote.author }}</p>
          <Progress :percent="bookNote.progress" :stroke-width="6">
            <Icon type="iso-person"></Icon>
            <span class="progress">{{bookNote.progress}}%</span>
          </Progress>
          <p class="desc">{{ bookNote.description | filterHtml | textLineBreak(140) }}</p>
          <Tag type="border" v-for="tag in bookNote.tagList" :key="tag.name" class="border-tag">{{ tag.name }}</Tag>
        </div>
      </div>
    </div>
    </a>
  </div>
</template>

<script type="text/ecmascript-6">
import { mixin } from '@/utils'
const ARTICLE_TYPE_BIG_IMAGE = 1
const ARTICLE_TYPE_NO_IMAGE = 2

export default {
  props: {
    bookNote: {
      Type: Object
    },
    type: ''
  },
  data () {
    return {
      showBookInfo: false
    }
  },
  mixins: [mixin],
  computed: {
    textOrderType: function () {
      return this.bookNote.coverType === ARTICLE_TYPE_BIG_IMAGE ? 2 : 1
    },
    imgOrderType: function () {
      return this.bookNote.coverType === ARTICLE_TYPE_BIG_IMAGE ? 1 : 2
    },
    textSpan: function () {
      if (this.bookNote.coverType === ARTICLE_TYPE_BIG_IMAGE) {
        return 24
      } else if (this.bookNote.coverType === ARTICLE_TYPE_NO_IMAGE) {
        return 24
      } else {
        return 17
      }
    },
    imgSpan: function () {
      if (this.bookNote.coverType === ARTICLE_TYPE_BIG_IMAGE) {
        return 24
      } else if (this.bookNote.coverType === ARTICLE_TYPE_NO_IMAGE) {
        return 0
      } else {
        return 7
      }
    },
    themeClass: function () {
      if (this.bookNote.coverType === ARTICLE_TYPE_BIG_IMAGE) {
        return 'big-image'
      } else {
        return ''
      }
    }
  },
  methods: {
    toggleBookInfo () {
      this.showBookInfo = !this.showBookInfo
    },
    likePost (post) {
      this.$http({
        url: this.$http.adornUrl('/bookNote/like/' + post.id),
        method: 'put',
        data: this.$http.adornData()
      }).then(({data}) => {
        if (data && data.code === 200) {
          post.likeNum += 1
          this.$Message.success('点赞成功')
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/index.styl";
  .bookNote-cell
    margin-bottom 10px
    border-radius: 10px
    background-color $default-cell-background-color
    img
      width 100%
      transition: All 0.4s ease-in-out
      transform: scale(1.0)
      zoom: 1.0
    &:hover
      border 0 solid $color-border-hover
      background-color: $hover-cell-background-color
      box-shadow 5px 15px 20px -12px rgba(0, 0, 0, 0.5)
      transform: translate(-2px, -2px)
      transition: 0.3s
      img
        transform: scale(1.05)
        zoom: 1.02
    .text-wrapper
      padding 20px 20px 0 20px
      text-align left
      @media only screen and (max-width: 768px)
        padding 10px 10px 0 10px
      .title
        font-size 23px
        font-weight 100
        line-height 27px
        @media only screen and (max-width: 768px)
          font-size 17px
          line-height 23px
          word-wrap break-word
        a
          color $default-title-color
          cursor pointer
          &:hover
            color $default-title-hover-color
            text-decoration underline
        span.special
          border-radius $border-radius
          font-size 12px
          font-weight 100
          padding 3px 5px
          margin-left 1px
          vertical-align top
          color $default-background-color
          background $iview-secondary-warning-color
          cursor pointer
      .book-info
        font-size 14px
        font-weight 300
        margin-top 8px
        color $default-info-color
        word-wrap break-word
        > i
          font-size 14px
      .tags
        margin 8px 0
      .desc
        font-size 14px
        line-height 20px
        font-weight 200
        color $default-desc-color
        @media only screen and (max-width: 768px)
          font-size 13px
        a
          font-weight 500
          color $default-desc-hover-color
          cursor pointer
          &:hover
            text-decoration underline
      .operate_info
        font-size 14px
        margin 15px 0 20px
        span
          margin-right 8px
          a
            color $default-info-color
            cursor pointer
            &:hover
              color $default-info-hover-color
              text-decoration underline
          + span
            margin-left 8px
        @media only screen and (max-width: 768px)
          font-size 13px
          margin 10px 0
          span
            margin-right 4px
            + span
              margin-left 4px
    .img-wrapper
      padding-bottom: 85%
      width 100%
      height 0
      overflow hidden
      &.big-image
        padding-bottom 26%
        box-shadow 1px 1px 1px $default-border-color
    .toggle-arrow
      display block
      border-radius: 10px;
      text-align center
      padding 10px 0
      // background-color $default-cell-toggle-background-color
      &:hover
        color $default-info-hover-color
      > i
        transition: All 0.4s ease-in-out
        transform rotateX(180deg)
        &.show
          transform rotateX(0deg)
    .book-infos
      max-height 0
      transition All 0.5s ease-in-out
      overflow hidden
      cursor pointer
      &.show
        max-height 350px
      .book-infos-wrapper
        display flex
        padding 20px
        @media only screen and (max-width: 768px)
          padding 10px
        .img
          position relative
          display block
          flex 0 0 140px
          width 140px
          overflow hidden
          margin-right 20px
          border 1px solid $default-border-color
          box-shadow 1px 1px 1px $default-border-color
          @media only screen and (max-width: 768px)
            display none
            flex 0 0 0
            width 0
          .container
            width 100%
            position relative
            overflow hidden
            .bracket
              margin-top 135%
            .target
              position absolute
              top 0
              bottom 0
              left 0
              right 0
              > img
                width 100%
                height 100%
                transition: All 0.4s ease-in-out
                transform: scale(1.0)
                zoom: 1.0
        .book-info
          flex-grow 1
          .title
            font-size 20px
            line-height 28px
            font-weight 500
            color $default-title-color
            margin-bottom 5px
            text-align justify
          .desc
            font-size 13px
            font-weight 100
            line-height 20px
            color $default-desc-color
            text-align justify
            margin 10px 0 5px
  .boxBorder
    background-color: $hover-cell-background-color
</style>
