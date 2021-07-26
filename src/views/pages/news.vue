<template>
  <div class="root">
    <el-row :gutter="20" class="news_title"> <h2 class="title">{{ title }} </h2></el-row>
   
    <el-row :gutter="20" class="news_content">
      <el-col :span="10">
        <el-form ref="form" :model="form" label-width="100px" >
          <el-form-item label="新闻标题">
            <el-input v-model="form.title" class="block"></el-input>
          </el-form-item>
           <el-form-item label="新闻概要">
            <el-input v-model="form.synopsis"  type="textarea" rows="6"  class="block"></el-input>
          </el-form-item>
          <!-- <el-form-item label="发布时间"> 
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
            <!-- <el-input v-model="form.name" class=""></el-input> -->
          <el-form-item label="封面">
            <el-input v-model="form.cover" type="textarea" rows="1" class="block"></el-input>
            <!-- <el-upload class="upload template block" action=""  :on-success="uploadSuccess">
                <el-button size="small" type="primary" class="">上传封面</el-button>
            </el-upload> -->
          </el-form-item>
         
        </el-form>
      </el-col>
      <el-col :span="10" class="margin_left">
        <el-form>
          <el-form-item label="是否原创">
            <div class="block">
              <el-radio v-model="form.original" :label="true">是</el-radio>
              <el-radio v-model="form.original" :label="false">否</el-radio>
            </div>
          </el-form-item>
           <el-form-item label="新闻详情">
            <el-input v-model="form.details" type="textarea" rows="10" class="block"></el-input>
          </el-form-item>
        </el-form>
      
      </el-col>
    </el-row>
    <el-row :gutter="20" class="news_image">
      <el-col :span="20">
        <el-form>
          <el-form-item label="新闻图片">
            <el-upload class="upload template block " action=""  :on-success="uploadSuccess">
              <el-button size="small" type="primary" class="">上传新闻图片</el-button>
            </el-upload>
            <div class="demo-image__preview">
              <el-image 
                style="width: 100px; height: 100px"
                :src="url" 
                :preview-src-list="srcList">
              </el-image>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="news_btn">
      <el-button type="primary" @click="addNews">发布新闻</el-button>
      <el-button type="success" @click="editNews">修改新闻</el-button>
    </el-row>
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
          width="55">
        </el-table-column>
        <el-table-column
          prop="title"
          label="新闻标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="cover"
          label="新闻封面"
          width="180">
        </el-table-column>
        <el-table-column
          prop="synopsis"
          label="新闻概要"
          width="300">
        </el-table-column>
        
        <el-table-column
          label="新闻详情"
          width="240">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>新闻详情: {{ scope.row.name }}</p>
              <!-- <p>住址: {{ scope.row.address }}</p> -->
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="original"
          label="是否原创"
          width="80">
        </el-table-column>
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
      title: "新闻资讯",
      type_1: true,
      mType: "1",
      templateList: [],
      logoList: [],
      headers: "",
      form: {
        title: "",  //新闻标题
        synopsis: "", //新闻概要
        original: true, //是否原创
        details: "",  //新闻详情
        cover: "", //新闻封面
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
    this.getNewsList()
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
    //获取新闻列表
    getNewsList() {
      let that = this;
      let params  = {};

      that.$axios.get('/api/news/list', {
        params:params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res=>{
          if (res.data.code==200) { //res.data.total > 0 && res.data.rows.length > 0
          console.log(res.data);
			      //这里是做了一个数据格式的转换，要符合后台接口写的格式
            if(res.data.data.list != [] && res.data.data.list.length > 0) {
              // console.log(res.data.data.list);
              let records = res.data.data.list;
              for(let i=0;i<records.length;i++){
                console.log(records[i].id);
                let obj={};
                obj.id=records[i].id;
                obj.synopsis=records[i].synopsis;
                obj.isShow=records[i].isShow;
                obj.updateTime=records[i].updateTime;
                obj.cover=records[i].cover;
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
    //新增新闻
    addNews() {
      let that = this;
      if (that.loading) {
        return;
      }
      that.loading = true;

      let params  = that.form;
      console.log(that.title);
      // params.deleted = false;  //新建菜单默认不删除
      params.updateTime = that.getCurrentTime; //设置菜单更新时间为当前时间

      this.$axios.post('/api/news/publish', params, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(res=> {
        if (res.data.code == 200) {
          console.log(res.data);
          this.$message({
            showClose: true,
              message: '新增新闻信息成功！',
              type: 'success'
            });
            location.reload();
        }else {
          console.log(res.data);
          this.$message({
            showClose: true,
              message: '新增新闻信息失败！',
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
    //新闻信息显示到编辑框
    handleEdit(e) {
      console.log(JSON.stringify(e));
      this.form.id = e.id;
      this.form.title = e.title;
      this.form.synopsis = e.synopsis;
      this.form.original = e.original;
      this.form.cover = e.cover;
    },
    //修改新闻
    editNews() {
      let that = this;
      if (that.loading) {
        return;
      }
      that.loading = true;

      let params  = that.form;
      console.log(that.title);
      // params.deleted = false;  //新建菜单默认不删除
      params.updateTime = that.getCurrentTime; //设置菜单更新时间为当前时间

      this.$axios.post('/api/news/update', params, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(res=> {
        if (res.data.code == 200) {
          console.log(res.data);
          this.$message({
            showClose: true,
              message: '修改新闻信息成功！',
              type: 'success'
            });
            location.reload();
        }else {
          console.log(res.data);
          this.$message({
            showClose: true,
              message: '修改新闻信息失败！',
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
    //删除新闻
    handleDelete(e) {
      console.log("id为："+e.id);
        this.$axios.delete('/api/news/delete?id='+e.id, {id: e.id},{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res=> {
        if (res.data.code == 200) {
          console.log(res.data);
          this.$message({
            showClose: true,
              message: '删除新闻信息成功！',
              type: 'success'
            });
            location.reload();
        }else {
          console.log(res.data);
          this.$message({
            showClose: true,
              message: '删除新闻信息失败！',
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
</style>