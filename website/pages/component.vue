<template>
  <el-scrollbar ref="componentScrollBar" class="page-component__scroll">
    <div class="page-container page-component">
      <el-scrollbar class="page-component__nav">
        <side-nav :data="navsData[lang]" :base="`/${lang}/component`" />
      </el-scrollbar>
      <div class="page-component__content">
        <div class="content-wrap">
          <router-view class="content" />
        </div>
        <footer-nav />
        <ad-sense
          v-if="adSenseShow"
          adSlot="8270352624"
          :adStyle="{ display: 'block', 'text-align': 'center' }"
          dataAdLayout="in-article"
          dataAdFormat="fluid"
        />
      </div>
      <el-backtop v-if="showBackToTop" target=".page-component__scroll .el-scrollbar__wrap" :right="100" :bottom="50" />
    </div>
  </el-scrollbar>
</template>
<script>
import bus from '../bus'
import navsData from '../nav.config.json'
import { throttle } from 'throttle-debounce'
import AdSense from '../components/ad-sense'

export default {
  data() {
    return {
      lang: this.$route.meta.lang,
      navsData,
      scrollTop: 0,
      showHeader: true,
      componentScrollBar: null,
      componentScrollBoxElement: null,
      adSenseShow: false
    }
  },
  components: {
    AdSense
  },
  computed: {
    showBackToTop() {
      return !this.$route.path.match(/backtop/)
    }
  },
  watch: {
    '$route.path'() {
      // 触发伪滚动条更新
      this.componentScrollBox.scrollTop = 0
      this.adSenseShow = false
      this.$nextTick(() => {
        this.componentScrollBar.update()
        this.adSenseShow = true
      })
    }
  },
  created() {
    bus.$on('nav-fade', val => {
      this.navFaded = val
    })
  },
  mounted() {
    this.componentScrollBar = this.$refs.componentScrollBar
    this.componentScrollBox = this.componentScrollBar.$el.querySelector('.el-scrollbar__wrap')
    this.throttledScrollHandler = throttle(300, this.handleScroll)
    this.componentScrollBox.addEventListener('scroll', this.throttledScrollHandler)
    document.body.classList.add('is-component')
    this.addContentObserver()
    this.adSenseShow = true
  },
  unmounted() {
    document.body.classList.remove('is-component')
  },
  beforeUnmount() {
    this.componentScrollBox.removeEventListener('scroll', this.throttledScrollHandler)
    this.observer.disconnect()
  },
  methods: {
    addContentObserver() {
      this.observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            this.renderAnchorHref()
            this.goAnchor()
          }
        }
      })
      this.observer.observe(document.querySelector('.content-wrap'), { childList: true })
    },
    renderAnchorHref() {
      if (/changelog/g.test(location.href)) return
      const anchors = document.querySelectorAll('h2 a,h3 a,h4 a,h5 a')
      const basePath = location.href.split('#').splice(0, 2).join('#')

      ;[].slice.call(anchors).forEach(a => {
        const href = a.getAttribute('href')
        if (href.indexOf('#') === 0) {
          a.href = basePath + href
        }
      })
    },

    goAnchor() {
      if (location.href.match(/#/g).length > 1) {
        const anchor = location.href.match(/#[^#]+$/g)
        if (!anchor) return
        const elm = document.querySelector(anchor[0])
        if (!elm) return

        setTimeout(() => {
          this.componentScrollBox.scrollTop = elm.offsetTop
        }, 50)
      }
    },

    handleScroll() {
      const scrollTop = this.componentScrollBox.scrollTop
      if (this.showHeader !== this.scrollTop > scrollTop) {
        this.showHeader = this.scrollTop > scrollTop
      }
      if (scrollTop === 0) {
        this.showHeader = true
      }
      if (!this.navFaded) {
        bus.$emit('fade-nav')
      }
      this.scrollTop = scrollTop
    }
  }
}
</script>
<style lang="scss" scoped>
.page-component__scroll {
  height: 100%;

  ::v-deep(> .el-scrollbar__wrap) {
    overflow-x: auto;
  }
}

.page-component {
  box-sizing: border-box;
  height: 100%;

  // &.page-container {
  //   padding: 20px;
  // }

  .page-component__nav {
    height: 100%;
    width: 270px;
    position: absolute;
    top: 0;
    bottom: 0;
    transition: padding-top 0.3s;
    border-right: 1px solid #dcdfe6;

    ::v-deep(> .el-scrollbar__wrap) {
      height: 100%;
      overflow-x: auto;
    }

    &.is-extended {
      padding-top: 0;
    }
  }

  .side-nav {
    height: 100%;
    padding-bottom: 50px;
    padding-right: 0;

    & > ul {
      padding-bottom: 50px;
    }
  }

  .page-component__content {
    padding-left: 325px;
    padding-bottom: 100px;
    margin-right: 225px;
    box-sizing: border-box;
  }
  .content-wrap {
    min-height: 500px;
    margin: auto;
  }

  .content {
    // max-width: 980px;
    // padding: 2rem 2.5rem;

    ::v-deep(>) {
      // h3 {
      //   margin: 55px 0 20px;
      // }

      table {
        border-collapse: collapse;
        width: 100%;
        background-color: #fff;
        font-size: 14px;
        margin-bottom: 45px;
        line-height: 1.5em;

        strong {
          font-weight: normal;
        }

        td,
        th {
          border-bottom: 1px solid #dcdfe6;
          padding: 15px;
          max-width: 250px;
        }

        th {
          text-align: left;
          white-space: nowrap;
          color: #909399;
          font-weight: normal;
        }

        td {
          color: #606266;
          word-break: break-word;
        }

        th:first-child,
        td:first-child {
          padding-left: 10px;
        }
      }

      ul:not(.timeline) {
        margin: 10px 0;
        padding: 0 0 0 20px;
        font-size: 14px;
        color: #5e6d82;
        line-height: 2em;
      }
    }
  }
}

@media (max-width: 1000px) {
  .page-component {
    .page-component__content {
      margin-right: 0;
    }
  }
}

@media (max-width: 768px) {
  .page-component {
    .page-component__nav {
      width: 100%;
      position: static;
      margin-top: 0;
    }
    .side-nav {
      padding-top: 0;
      padding-left: 50px;
    }
    .page-component__content {
      padding-left: 10px;
      padding-right: 10px;
    }
    .content {
      padding-top: 0;
    }
    .content > table {
      overflow: auto;
      display: block;
    }
  }
}
</style>
