<template>
  <div class="simple-header">
    <transition name="slide-fade">
      <div id="mobile-bar" v-show="show" >
        <a class="menu-button" ref="menubutton"></a>
        <router-link class="logo" to="/"></router-link>
      </div>
    </transition>
    <transition name="slide-fade">
      <div id="header"  v-show="show">
    <router-link id="logo" to="/">
      <img src="../../../assets/logo.png">
      <span class="title">Dalgurak Blog</span>
      <span class="motto">success belongs to the persevering</span>
    </router-link>
    <ul id="nav">
      <li>
         <div class="head-search-box">
          <Input maxlength="20" @on-search="search" v-model="searchVal" search enter-button placeholder="Search something..." />
        </div>
      </li>

      <li><a href="" class="nav-link contribute">文章</a></li>
      <li><a href="/book" class="nav-link contribute">阅读</a></li>
      <li><a href="/timeline" class="nav-link contribute">时光轴</a></li>
      <li><a href="/article/1" class="nav-link contribute">关于</a></li>
    </ul>
    </div>
    </transition>
    <sidebar ref="sidebar" :articleCategoryList="articleCategoryList" :bookCategoryList="bookCategoryList"></sidebar>
  </div>

</template>

<script type="text/ecmascript-6">
import SideBar from '@/components/header/SimpleHeader/SideBar'
import {treeDataTranslate} from '@/utils'
export default {
  components: {
    'sidebar': SideBar
  },
  data () {
    return {
      searchVal: '',
      show: true,
      articleCategoryList: [],
      bookCategoryList: [],
      keywords: ''
    }
  },
  created () {
    this.listCategory()
    this.keywords = this.$route.query.keywords
  },
  mounted: function () {
    this.$nextTick(function () {
      this.initMobileMenu()
    })
    // 给页面绑定滑轮滚动事件
    if (document.addEventListener) { // firefox
      document.addEventListener('DOMMouseScroll', this.watchScroll, false)
    }
    // 滚动滑轮触发scrollFunc方法  //ie 谷歌
    window.onmousewheel = document.onmousewheel = this.watchScroll
  },
  methods: {
    search () {
      let value = this.searchVal.trim()
      if (value.length === 0) {
        return
      }
      this.$router.push({path: '/articles/search', query: {keywords: value}})
      this.$http({
        url: this.$http.adornUrl('/article/search'),
        type: 'get',
        params: this.$http.adornParams({keywords: this.$route.query.keywords})
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.$store.commit('SEARCH_ARTICLE', data.data)
        }
      })
    },
    initMobileMenu () {
      // 显示手机端的菜单
      var sidebar = this.$refs.sidebar
      this.$refs.menubutton.addEventListener('click', function () {
        sidebar.toggleSideBar()
      })
    },
    watchScroll (e) {
      e = e || window.event
      if (e.wheelDelta) {
        if (e.wheelDelta > 0 && this.show === false) { // 当滑轮向上滚动
          this.show = true
        }
        if (e.wheelDelta < 0 && this.show === true) { // 当滑轮向下滚动
          this.show = false
        }
      } else if (e.detail) {
        if (e.detail < 0 && this.show === false) { // 当滑轮向上滚动
          this.show = true
        }
        if (e.detail > 0 && this.show === true) { // 当滑轮向下滚动
          this.show = false
        }
      }
    },
    listCategory () {
      this.$http({
        url: this.$http.adornUrl('/operation/categories'),
        method: 'get',
        params: this.$http.adornParams()
      }).then(({data}) => {
        if (data && data.code === 200) {
          data.data.forEach(category => {
            if (category.type === 0) {
              this.articleCategoryList.push(category)
            } else if (category.type === 1) {
              this.bookCategoryList.push(category)
            }
          })
          this.articleCategoryList = treeDataTranslate(this.articleCategoryList)
          this.bookCategoryList = treeDataTranslate(this.bookCategoryList)
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/header.styl";
   // 添加导航栏显示动画
  .slide-fade-enter-active ,.slide-fade-leave-active {
    transition: all .8s ease;
  }
  .slide-fade-leave-to ,.slide-fade-enter {
    /* .slide-fade-leave-active for below version 2.1.8 */
    transform: translateY(-70px);
    opacity: 0;
  }
  .head-search-box {
    height 100%;
    display: flex;
    align-items: center;
  }
</style>
