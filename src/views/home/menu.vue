<template>
    <el-container style="height: 100vh; border: 1px solid #eee">
		<el-aside
		:style="transformClass"
		style="background-color: rgb(238, 241, 246)" 
		>
			<el-menu 
			:default-openeds="['1', '3']"
			:default-active="this.$route.path"
			router
			style="background-color: rgb(238, 241, 246);overflow-x:hidden" 
			>
			<h3 class="menuTitle" v-if="this.opened">后台管理系统</h3>
			<el-menu-item  @click="gotoHome" title="首页" v-else>
				<i class="el-icon-loading"></i>
			</el-menu-item>
			<el-menu-item index="/Home/ExportBusiness" title="新闻资讯">
				<i class="el-icon-coin"></i>
				<span slot="title" :class="{ 'active': !this.opened }">新闻资讯</span>
			</el-menu-item>
			
			<el-menu-item index="/Home/ImportBusiness" title="加入我们">
				<i class="el-icon-truck"></i>
				<span slot="title" :class="{ 'active': !this.opened }" >加入我们</span>
			</el-menu-item>
				
			</el-menu>
		</el-aside>
	  <el-container >
	  
	    <el-header class="navbar">
			<hamburger :is-active="opened" class="hamburger-container" @toggleClick="toggleSideBar" style="width: 20px;"/>
			<div style="position: absolute;top: 0;right: 50px;">
				<el-dropdown @command="handleCommand" >
					<i class="el-icon-setting" style="margin-right: 15px"></i>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="a">退出登录</el-dropdown-item>
						<el-dropdown-item>新增</el-dropdown-item>
						<el-dropdown-item>删除</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<span>{{userData.userName||'未登录'}}</span>
			</div>
			
	    </el-header>
	    
	    <el-main>
			<router-view/>
	    </el-main>
	  </el-container>
	</el-container>
</template>

<script>
import Hamburger from '@/components/Hamburger'

export default{
    components: {
    Hamburger
  },
   methods: {
            ...mapActions(['getExportBussiness']),
			handleCommand(command) {
				this.$router.push(`/`);
		    },
			toggleSideBar() {
				this.opened = !this.opened
			},
			gotoHome(){
				this.$router.push('/Home')//返回首页，
			}
  }
}
</script>

<style  scoped>
	html,
	body {
		width: 100%;
		height: 100vh;
		margin: 0; 
	  	padding: 0;
	}
	.el-header {
	    background-color: #B3C0D1;
	    color: #333;
	    line-height: 60px;
	  }
	.el-aside {
	    color: #333;
	}
	.menuTitle{
		color: fffff;
		text-align: center;
	}
	.active{
		padding-left: 15px;
	}
	.el-menu-item span{
		font-size: 16px;
		font-weight: bold;
	}
/* 	.navbar {
	  height: 150px;
	  overflow: hidden;
	  position: relative;
	  background: #fff;
	  box-shadow: 0 1px 4px rgba(0,21,41,.08);
	
	  .hamburger-container {
	    line-height: 46px;
	    height: 100%;
	    float: left;
	    cursor: pointer;
	    transition: background .3s;
	    -webkit-tap-highlight-color:transparent;
	
	    &:hover {
	      background: rgba(0, 0, 0, .025)
	    }
	  }
	} */
</style>


