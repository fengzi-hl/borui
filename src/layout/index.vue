<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <div class="top-bar">
      <logo></logo>
      <div class="right-menu">
        <el-button @click="logout">退出登录</el-button>
      </div>
    </div>  
    <sidebar class="sidebar-container" />
    
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import Logo from './components/Sidebar/Logo'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Logo
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    async logout() {
      localStorage.removeItem('hasLogin')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>
<style lang="scss">

</style>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';
  @import '../styles/variables.scss';
  @import '../styles/sidebar.scss';

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
    .top_headers {
      width: 100%;
      height: 60px;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
    
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
  .top-bar {
    width: 100%;
    height: 60px;
    // background: linear-gradient(to bottom left,#ECF5FF  0%,#409EFF 100%);
  }
  .sidebar-title {
    display: inline-block;
    color: #fff;
    text-align: center;
    font-weight: 600;
  }
  .menu-wrapper span {
    color: #54667a;
  }
.right-menu {
    position: absolute;
    top: 4px;
    right: 10px;
    height: 45px;
    line-height: 50px;
    margin-right: 20px;

    &:focus {
      outline: none;
    }
}

  
</style>
