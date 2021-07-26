<template>
  <div class="root">
    <el-row :gutter="20" class="news_title"> <h2 class="title">{{ title }} </h2></el-row>
   
    <el-row :gutter="20" class="news_content">
      <el-col :span="10">
        <el-form ref="form" :model="form" label-width="100px" >
          <el-form-item label="菜单id" style="display: none"> 
            <el-input v-model="form.id" class="block el-inputs"></el-input>
          </el-form-item>
          <el-form-item label="菜单标题">
            <el-input v-model="form.title" class="block el-inputs"></el-input>
          </el-form-item>
          <el-form-item label="菜单级别">
            <div class="block">
              <el-radio v-model.number="form.type" :label="0">一级菜单</el-radio>
              <el-radio v-model.number="form.type" :label="1">二级菜单</el-radio>
            </div>
          </el-form-item>
          <el-form-item label="父级菜单" v-if="form.type==1">
            <el-select v-model="value" placeholder="请选择" class="block widths">
                <el-option
                v-model="form.pid"
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="创建时间">
              <div class="block widths">
                <el-date-picker
                v-model="form.addTime"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :picker-options="pickerOptions">
                </el-date-picker>
            </div>
          </el-form-item> -->
            <!-- <el-input v-model="form.name" class=""></el-input> -->
        </el-form>
      </el-col>
      <el-col :span="9" class="margin_left">
        <el-form>
           <el-form-item label="跳转链接">
            <el-input v-model="form.link" class="block el-inputs"></el-input>
           </el-form-item>
          <el-form-item label="是否展示">
            <div class="block">
              <el-radio v-model.number="form.isShow" :label="0">不展示</el-radio>
              <el-radio v-model.number="form.isShow" :label="1">展示</el-radio>
            </div>
          </el-form-item>
        </el-form>
      
      </el-col>
    </el-row>  
    <el-row :gutter="20" class="news_btn">
      <el-button type="primary" @click="addMenu">添加菜单</el-button>
      <el-button type="success" @click="editMenu">修改菜单</el-button>
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
          width="180">
        </el-table-column>
        <el-table-column
          prop="title"
          label="菜单标题"
          width="240">
        </el-table-column>
        <el-table-column
          prop="link"
          label="跳转链接"
          width="340">
        </el-table-column>
        <el-table-column
          prop="type"
          label="标签级别"
          width="180">
        </el-table-column>
        <!-- <el-table-column
          prop="addTime"
          label="创建时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          width="180">
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
  inject: ['reload'],
  data() {
    return {
      title: "菜单管理",
      title_list: "菜单列表",
      type_1: true,
      mType: "1",
      templateList: [],
      logoList: [],
      form: {
        isShow: 1,
        link: '',
        pid: 0,
        title: "",
        type: 0,
      },
      
      value: '',
     pickerOptions: {
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
        options: [{
          value: '选项1',
          label: '菜单一'

        }, {
          value: '选项2',
          label: '菜单二'
        }, {
          value: '选项3',
          label: '菜单三'
        }, {
          value: '选项4',
          label: '菜单四'
        }, {
          value: '选项5',
          label: '菜单五'
        }],
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
  created () {
    this.getMenuList()
  },

  methods: {
    //获取菜单列表
      getMenuList() {
      let that = this;
      let params  = {};

      that.$axios.get('/api/menu/list', {
        params:params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res=>{
          if (res.data.code==200) { //res.data.total > 0 && res.data.rows.length > 0
			      //这里是做了一个数据格式的转换，要符合后台接口写的格式
            if(res.data.data.list != [] && res.data.data.list.length > 0) {
              // console.log(res.data.data.list);
              let records = res.data.data.list;
              for(let i=0;i<records.length;i++){
                // console.log(records[i].id);
                let obj={};
                obj.id=records[i].id;
                obj.addTime=records[i].addTime;
                obj.isShow=records[i].isShow;
                obj.updateTime=records[i].updateTime;
                obj.link=records[i].link;
                obj.title=records[i].title;
                obj.type=records[i].type;
              // let arr =[];
                //格式转换结束
                that.tableData.push(obj);//school就是页面上定义的参数
              }
              // console.log(that.tableData)
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
    getCurrentTime() {
        //获取当前时间并打印
        var _this = this;
    　　let yy = new Date().getFullYear();
    　　let mm = new Date().getMonth()+1;
    　　let dd = new Date().getDate();
    　　let hh = new Date().getHours();
    　　let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
    　　let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
    　　_this.gettime = yy+'/'+mm+'/'+dd+' '+hh+':'+mf
    　　console.log(_this.gettime) ;
        return _this.gettime; 

    },
    //添加菜单
    addMenu(){
      // Dialog.confirm({
      //   title: '确认',
      //   content: '确认提交',
      //   confirmText: '确定',
      //   onConfirm: () => console.log('[Dialog.confirm] confirm clicked'),
      // })
      let that = this;
      if (that.loading) {
        return;
      }
      that.loading = true;

      // let url = that.serverURL + '/api/menu/create';

      let params  = that.form;
      console.log(that.title);
      // params.deleted = false;  //新建菜单默认不删除
      params.updateTime = that.getCurrentTime; //设置菜单更新时间为当前时间

      this.$axios.post('/api/menu/create', params, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(res=> {
        if (res.data.code == 200) {
          console.log(res.data);
          this.$message({
            showClose: true,
              message: '新增菜单成功！',
              type: 'success'
            });
            location.reload();
        }else {
          console.log(res.data);
          this.$message({
            showClose: true,
              message: '新增菜单失败！',
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
    //编辑菜单
    editMenu() {
      let that = this;
      if (that.loading) {
        return;
      }
      that.loading = true;

      let params  = that.form;
      console.log(that.title);
      params.updateTime = that.getCurrentTime; //设置菜单更新时间为当前时间

      this.$axios.post('/api/menu/update', params, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(res=> {
        if (res.data.code == 200) {
          console.log(res.data);
          this.$message({
            showClose: true,
              message: '修改成功',
              type: 'success'
            });
          // that.reload();
          location.reload();
        }else {
          console.log(res.data);
          this.$message({
            showClose: true,
              message: '修改失败！',
              type: 'error'
            });
        }
        that.loading = false;
      }).catch(function (err) {
        that.loading = false;
        console.log("服务器无响应，请重试！");
      });
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
    //菜单显示到编辑框
    handleEdit(e) {
      console.log(JSON.stringify(e));
      this.form.id = e.id;
      this.form.title = e.title;
      this.form.link = e.link;
      this.form.isShow = e.isShow;
      this.form.type = e.type;
    },
    //删除菜单
    handleDelete(e) {
      // this.$confirm('是否删除该菜单？', '提示', {
      //   confirmButtonText: '确定',
      //   cancleButtonText: '取消',
      //   type: 'warning'
      // })
        console.log("id为："+e.id);
        this.$axios.delete('/api/menu/delete?id='+e.id, {id: e.id},{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res=> {
        if (res.data.code == 200) {
          console.log(res.data);
          this.$message({
            showClose: true,
              message: '删除菜单成功！',
              type: 'success'
            });
            location.reload();
        }else {
          console.log(res.data);
          this.$message({
            showClose: true,
              message: '删除菜单失败！',
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
.news_upload {
  margin-top: 20px;
}
.margin_left {
  margin-left: 20px!important;
}
.el-inputs {
    width: 80%!important;
}
.widths {
    .el-input {
        width: 140%!important;
    }
    .el-input__inner {
        width: 140%!important;
    }
}
</style>