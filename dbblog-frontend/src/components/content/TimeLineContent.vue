<template>
  <div class="timeline-content">
    <Row>
      <Col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <timeline-header></timeline-header>
          <Timeline pending>
            <TimelineItem v-for="(item,key) in timelineList" :key="item.year" :color="key==0?'green':'gray'" >
                <Icon type="ios-alarm" slot="dot" size='20'/>
                <span>{{item.year}} 发布{{item.count}}篇</span>
            </TimelineItem>
        </Timeline>
        </div>
      </Col>
      <Col :xs="0" :sm="0" :md="0" :lg="7">
        <div class="layout-right">
          <recommend></recommend>
          <tag-wall style="margin-top: 15px;"></tag-wall>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script type="text/ecmascript-6">
import TimeLineHeader from '@/components/views/TimeLine/TimeLineHeader'
import ArchiveListCell from '@/components/views/Archive/ArchiveListCell'
import ArchiveListTimeTitle from '@/components/views/Archive/ArchiveListTimeTitle'
import Recommend from '@/components/views/Recommend'
import TagWall from '@/components/views/TagWall'

export default {
  data () {
    return {
      timelineList: []
    }
  },
  components: {
    'timeline-header': TimeLineHeader,
    'archive-list-time-title': ArchiveListTimeTitle,
    'archive-list-cell': ArchiveListCell,
    'recommend': Recommend,
    'tag-wall': TagWall
  },
  created () {
    this.listTimeline()
  },
  methods: {
    listTimeline () {
      this.$http({
        url: this.$http.adornUrl('/timeline'),
        method: 'get',
        params: this.$http.adornParams()
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.timelineList = data.data
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .timeline-content
    width auto
    @media only screen and (max-width: 768px)
      margin 5px 5px 10px 5px
    @media screen and (min-width: 768px)
      margin 10px 10px 20px 10px
    @media screen and (min-width: 992px)
      margin 15px 35px 50px 35px
    @media screen and (min-width: 1200px)
      width 1200px
      margin 15px auto 0
      margin-bottom 50px
    .layout-left, .layout-right
      padding 0
      @media only screen and (max-width: 768px)
        padding 0
      @media screen and (min-width: 768px)
        padding 0
      @media screen and (min-width: 992px)
        padding 0 10px
      @media screen and (min-width: 1200px)
        padding 0 10px
</style>
