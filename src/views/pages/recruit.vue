<template>
  <div class="root">
    <el-row :gutter="20" class="news_title"> <h2 class="title">{{ title }} </h2></el-row>
   
    <el-row :gutter="20" class="news_content">
      <el-col :span="10">
        <el-form ref="form" :model="form" label-width="100px" >
          <el-form-item label="岗位名称">
            <el-input v-model="form.job" class="block el-inputs"></el-input>
          </el-form-item>
          <el-form-item label="岗位职责" id="duty">
            <el-input   v-model="form.duty[0]" type="textarea" rows="3" class="block el-inputs"></el-input>
            <!-- <el-button v-if="index+1 == form.demand.length" @click="addDuty" type="primary" class="addBtn">新增岗位职责</el-button> -->
          </el-form-item>
          <!-- <el-form-item label="发布时间"  v-for="(item,index) in form" :key="index"> 
            <div class="block">
                <el-date-picker
                v-model="value2"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions">
                </el-date-picker>
            </div>
          </el-form-item> -->          
         
          <el-form-item label="招聘类型">
            <div class="block">
              <el-radio v-model="form.type" :label="0">校园招聘</el-radio>
              <el-radio v-model="form.type" :label="1">社会招聘</el-radio>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="10" class="margin_left">
        <el-form>
          <el-form-item label="是否展示">
            <div class="block">
              <el-radio v-model="form.isShow" :label="0">不展示</el-radio>
              <el-radio v-model="form.isShow" :label="1">展示</el-radio>
            </div>
          </el-form-item>
           <el-form-item label="岗位要求" id="demand">
            <el-input    v-model="form.demand[0]" type="textarea" rows="4" class="block el-inputs"></el-input>
            <!-- <el-button v-if="index+1 == form.demand.length"  @click="addDemand" type="primary" class="addBtn">新增岗位要求</el-button> -->
          </el-form-item>
        </el-form>
      
      </el-col>
    </el-row>
    <el-row :gutter="20" class="news_btn">
      <el-button type="primary" @click="addRecruit">发布招聘</el-button>
      <el-button type="success" @click="editRecruit">修改招聘</el-button>
    </el-row>
    <el-row :gutter="20" class="news_title"> <h2 class="title">{{ title_list }} </h2></el-row>
     <el-row :gutter="20" class="news_list">
      <el-table
        :data="tableData"
        style="width: 100%"
        ref="multipleTable"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          width="100">
        </el-table-column>
        <el-table-column
          prop="job"
          label="岗位名称"
          width="180">
        </el-table-column>
        <el-table-column
          label="岗位详情"
          width="480">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>岗位职责: {{ scope.row.duty }}</p>
              <p>岗位要求: {{ scope.row.demand }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="岗位详情"
          width="480">
        </el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "校园招聘",
      title_list: "校园招聘列表",
      type_1: true,
      mType: "1",
      templateList: [],
      logoList: [],
      form: {
        job: "", //岗位名称
        duty: [], //岗位职责
        type: 0, //招聘类型
        isShow: 1, //默认展示
        demand: [] //岗位要求
        
      },
      pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: '',
        imgUrl: '',
        srcList: [this.imgUrl],
        tableData: [],
        multipleSelection: [],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ]
    };
    
  },
  created: function() {
    this.getRecruitList(),
    this.getRecruitDetailList()
  },

  methods: {
    preview() {
      this.form.color = this.form.color.substring(1,7);
      console.log("this.form :", this.form);
      // return 0;
      let that = this;
      this.req({
        url: "previewMaterial",
        data: that.form,
        method: "POST"
      }).then(
        res => {
          console.log("res :", res);
          that.imgUrl = res.data;
          that.srcList = [that.imgUrl];
        },
        err => {
          console.log("err :", err);
        }
      );
    },
     handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    uploadSuccess(response, file, fileList) {
      console.log("response :", response);
      this.form.logoUrl = response.data;
    },
    selectChange(value) {
      console.log("value :", value);
      this.imgUrl = value;
      this.srcList = [value];
    },
    typeChange(value) {
      console.log("value :", value);
      if (value == "1") {
        this.type_1 = true;
        this.form.text3 = null;
        this.form.text4 = null;
      } else {
        this.type_1 = false;
      }
    },
    //新增岗位职责
    addDuty() {
      this.form.duty.push({
        dutys: ""
      });
    },
    //新增岗位要求
    addDemand() {
      this.form.demands.push({
        demands: ""
      });
    },
    //获取招聘信息列表
    getRecruitList() {
      let that = this;
      let params  = {};

      that.$axios.get('/api/recruit/list', {
        params:params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res=>{
          if (res.data.code==200) { 
            console.log(res.data);
			      //这里是做了一个数据格式的转换，要符合后台接口写的格式
            if(res.data.data.list != [] && res.data.data.list.length > 0) {
              // console.log(res.data.data.list);
              let records = res.data.data.list;
              for(let i=0;i<records.length;i++){
                // console.log(records[i].id);
                let obj={};
                obj.id=records[i].id;
                obj.addTime=records[i].addTime;
                obj.job=records[i].job;
                obj.updateTime=records[i].updateTime;
                obj.isShow=records[i].isShow;
                obj.type=records[i].type;
                //格式转换结束
                that.tableData.push(obj);//school就是页面上定义的参数
              }
              console.log(that.tableData)
            }
          }else{
            console.log(res.data);
            that.itemList = [];
            that.isFinished = true;
          }
        }).catch(function (err) {
        //  console.log("服务器无响应，请重试！");
      });
    },
    getRecruitDetailList() {
      let that = this;
      let params  = {};

      that.$axios.get('/api/recruit/detail', {
        params:params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res=>{
          if (res.data.code==200) { 
            console.log(res.data);
			      //这里是做了一个数据格式的转换，要符合后台接口写的格式
            if(res.data.data.list != [] && res.data.data.list.length > 0) {
              // console.log(res.data.data.list);
              let records = res.data.data.list;
              for(let i=0;i<records.length;i++){
                // console.log(records[i].id);
                let obj={};
                obj.demand=records[i].demand;
                obj.duty=records[i].duty;
                //格式转换结束
                that.tableData.push(obj);//school就是页面上定义的参数
              }
              console.log(that.tableData)
            }
          }else{
            console.log(res.data);
            that.itemList = [];
            that.isFinished = true;
          }
        }).catch(function (err) {
        //  console.log("服务器无响应，请重试！");
      });
    },
    //新增招聘信息
    addRecruit() {
      let that = this;
      if (that.loading) {
        return;
      }
      that.loading = true;

      let params  = that.form;
      console.log(that.title);
      // params.deleted = false;  //新建菜单默认不删除
      params.updateTime = that.getCurrentTime; //设置菜单更新时间为当前时间

      this.$axios.post('/api/recruit/publish', params, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(res=> {
        if (res.data.code == 200) {
          console.log(res.data);
          this.$message({
            showClose: true,
              message: '新增招聘信息成功！',
              type: 'success'
            });
            location.reload();
        }else {
          console.log(res.data);
          this.$message({
            showClose: true,
              message: '新增招聘信息失败！',
              type: 'error'
            });
        }
        that.loading = false;
      }).catch(function (err) {
        that.loading = false;
        console.log("服务器无响应，请重试！");
        // Toast({
        //   content: '服务器无响应，请重试！',
        // });
      });
    },
    //招聘信息显示到编辑框
    handleEdit(e) {
      console.log(JSON.stringify(e));
      this.form.id = e.id;
      this.form.job = e.job;
      this.form.isShow = e.isShow;
      this.form.type = e.type;
    },
    //修改招聘信息
    editRecruit() {
      let that = this;
      if (that.loading) {
        return;
      }
      that.loading = true;

      let params  = that.form;
      console.log(that.title);
      // params.deleted = false;  //新建菜单默认不删除
      params.updateTime = that.getCurrentTime; //设置菜单更新时间为当前时间

      this.$axios.post('/api/recruit/update', params, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(res=> {
        if (res.data.code == 200) {
          console.log(res.data);
          this.$message({
            showClose: true,
              message: '修改招聘信息成功！',
              type: 'success'
            });
            location.reload();
        }else {
          console.log(res.data);
          this.$message({
            showClose: true,
              message: '修改招聘信息失败！',
              type: 'error'
            });
        }
        that.loading = false;
      }).catch(function (err) {
        that.loading = false;
        console.log("服务器无响应，请重试！");
        // Toast({
        //   content: '服务器无响应，请重试！',
        // });
      });
    },
    //删除招聘信息
    handleDelete(e) {
      console.log("id为："+e.id);
        this.$axios.delete('/api/recruit/delete?id='+e.id, {id: e.id},{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res=> {
        if (res.data.code == 200) {
          console.log(res.data);
          this.$message({
            showClose: true,
              message: '删除招聘信息成功！',
              type: 'success'
            });
            location.reload();
        }else {
          console.log(res.data);
          this.$message({
            showClose: true,
              message: '删除招聘信息失败！',
              type: 'error'
            });
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.news_content {
  height: auto;
}
.news_title {
  font-size: 18px;
  color: #333;
  text-align: left;

}
.news_list {
  margin: 20px 0;
}
.block {
    margin-left: 20px;
    float: left;
}
.root {
    margin: 20px 0 0 50px;
}
.choose-color{
  z-index: 9999;
  /* width: 210px; */
}
.line {
  text-align: center;
}
.img-wrap {
  width: 100%;
  height: 500px;
  margin-left: 68px;
}
.box{
  width: 220px !important;
}
.news_image,
.news_btn {
  margin-left: 20px!important;
}
.news_upload {
  margin-top: 20px;
}
.margin_left {
  margin-left: 20px!important;
}
.el-inputs {
    width: 80%!important;
}
.addBtn {
  margin: 10px 0 0 -62px;
}
</style>