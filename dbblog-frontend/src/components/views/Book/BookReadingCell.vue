<template>
<div class="card-box">
  <Card>
    <p slot="title">
        <Icon type="md-book"></Icon>
        <span class="card-title">正在阅读</span>
    </p>
    <a href="#" slot="extra" @click.prevent="changeLimit">
        <Icon type="ios-brush" />
        Change
    </a>
    <div class="book-reading-cell">
      <a >
        <div class="img">
          <div class="container">
            <div class="bracket"></div>
            <div class="target">
              <img :src="book.cover" alt="">
            </div>
          </div>
        </div>
        <div class="book-info">
          <p class="title">
            <a :href="`/book/${book.id}`"> {{book.title}}</a>
          </p>
          <p class="desc">
            <Icon type="md-person" size='18' />
            {{ book.author }}
          </p>
          <Progress :percent="book.progress" status="active">
            <Icon type="checkmark-circled"></Icon>
            <span>{{ book.progress }}%</span>
          </Progress>
          <p class="desc">{{ book.description | filterHtml | textLineBreak(140) }}</p>
          <Tag type="border" v-for="tag in book.tagList" :key="tag.id">{{ tag.name }}</Tag>
        </div>
      </a>    
    </div>
  </Card>
</div>
</template>

<script type="text/ecmascript-6">
import {mixin} from '@/utils'

export default {
  name: 'book-reading-cell',
  props: {
    book: {
      Type: Object,
      default: undefined
    }
  },
  mixins: [mixin],
  methods: {}
}
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/theme.styl";
  .card-box
    margin 20px 0
  .book-reading-cell
    > a
      display flex
      .img
        position relative
        flex 0 0 140px
        width 140px
        overflow hidden
        margin 0 30px 10px 0
        border 1px solid $default-border-hover-color
        box-shadow 1px 1px 1px $default-border-color
        @media only screen and (max-width: $responsive-sm)
          display none
        @media screen and (min-width: $responsive-sm)
          display none
        @media screen and (min-width: $responsive-lg)
          display block
        .container
          width 100%
          position relative
          overflow hidden
          .bracket
            margin-top 140%
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
        margin-bottom 8px
        .title
          font-size 20px
          line-height 28px
          font-weight 500
          margin-bottom 5px
          text-align justify
          a
            color $default-title-color
            &:hover
              color $default-title-hover-color
        .desc
          font-size 13px
          font-weight 100
          line-height 20px
          color $default-desc-color
          text-align justify
          margin 10px 0 5px
          > span
            color $default-info-color
            font-weight 300
</style>
