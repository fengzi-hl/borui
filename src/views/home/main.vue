<template>
  <el-container class="container">
     
    <div class="index">
      <!-- 头部 -->
      <div class="index-head">
        <div class="index-head-title">工作台</div>
          <el-row>
                <el-col  :xs="24" :sm="24" :md="14" :lg="12" :xl="12">
                    <div class="index-head-centent-left">
                        <el-avatar style="margin-right: 10px;" :size="56" :src="circleUrl"></el-avatar>
                        <div class="index-head-centent-left-text">
                            <p>早上好,admin,祝你新的一天工作愉快</p>
                            <p>今天小雨转阴天,21~27°,天凉,注意加衣</p>
                        </div>
                    </div>
                </el-col>
                <el-col  :xs="24" :sm="24" :md="10" :lg="12" :xl="12">
                    <div class="index-head-centent-right">
                        <div class="index-head-centent-right-list">
                            <div class="index-head-centent-right-list-icon">
                                <daiban style="color: #FD7F07; background: #FBEEE1;" class="index-head-centent-right-list-icon-is"  /> 代办事项
                            </div>
                            <div class="index-head-centent-right-list-text">
                                3 &nbsp;&nbsp;/&nbsp;&nbsp; 26
                            </div>
                        </div>
                        <div class="index-head-centent-right-list">
                            <div class="index-head-centent-right-list-icon">
                                <github style="color: #2294FC; background: #DDEDFD;" class="index-head-centent-right-list-icon-is"  /> 开源项目
                            </div>
                            <div class="index-head-centent-right-list-text">
                                7
                            </div>
                        </div>
                        <div class="index-head-centent-right-list">
                            <div class="index-head-centent-right-list-icon">
                                <daiban class="index-head-centent-right-list-icon-is"  /> 代办事项
                            </div>
                            <div class="index-head-centent-right-list-text">
                                3 &nbsp;&nbsp;/&nbsp;&nbsp; 26
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
      </div>
    </div>
  </el-container>
</template>

<script>

export default {
  name: 'Main',
  data(){
        return {
            circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        }
    },
};
</script>
 

 
<style lang="scss" scoped>
.container {
  height: 100vh;
  font-size: 15px;
}
.header {
  background: #212121;
  color: #fff;
}
.header img {
    height: 100px;
}
.aside {
  background: #3a3a3a;
  color: #fff;
  /* height: 100%; */
}
.main {
  /* height: 100%; */
  color: #212121;
}

.index{
    width: 100%;
    min-height: 100%;
}
.index-head{
    width: 100%;
    /* height: 133px; */
    padding: 16px 32px 0 32px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, .7);
    border-bottom: 1px solid #dcdfe6;
}
.index-head-title{
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    color: #292929;
    margin-bottom: 16px;
    text-align: left;
}
.index-head-centent-left{
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.index-head-centent-left-text{
    height: 56px;
    p {
      margin-top: 0;
      text-align: left;
    }
}

.index-head-centent-left-text p:nth-child(1){
    margin-bottom: 7px;
    font-size: 20px;
    color: #292929;
    letter-spacing:0.1em;

}
.index-head-centent-left-text p:nth-child(2){
    font-size: 12px;
    color: #999999;
    letter-spacing:0.1em;
}
.index-head-centent-right{
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.index-head-centent-right-list{
    height: 56px;
    cursor: pointer;
    margin-left: 20px;
}
.index-head-centent-right-list-icon{
    font-size: 14px;
    display: flex;
    margin-bottom: 5px;
    color: #808695;
}
.index-head-centent-right-list-icon-is{
    width: 14px;
    height: 14px;
    fill: currentColor;
    margin-right: 5px;
    padding: 5px;
    border-radius: 12px;
}

.index-head-centent-right-list-text{
    height: 28px;
    line-height: 28px;
    font-weight: bold;
    text-align: right;
    font-size: 20px;
}
.index-centent{
    width: 100%;
    min-height: 100%;
    padding: 25px;
    box-sizing: border-box;
   

}
</style>