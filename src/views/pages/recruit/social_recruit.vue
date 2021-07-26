<template>
  <div class="root">
    <el-row :gutter="20" class="news_title"> <h2 class="title">{{ title }} </h2></el-row>
   
    <el-row :gutter="20" class="news_content">
      <el-col :span="10">
        <el-form ref="form" :model="form" label-width="100px" >
          <el-form-item label="岗位名称">
            <el-input v-model="form.job" class="block"></el-input>
          </el-form-item>
          <el-form-item label="岗位职责">
            <el-input v-model="form.duty"  type="textarea" rows="6"  class="block"></el-input>
          </el-form-item>
          <el-form-item label="发布时间"> 
            <div class="block">
                <!-- <span class="demonstration">带快捷选项</span> -->
                <el-date-picker
                v-model="value2"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions">
                </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="招聘类型">
            <div class="block">
              <el-radio v-model="radio_recruit" label="0">校园招聘</el-radio>
              <el-radio v-model="radio_recruit" label="1">社会招聘</el-radio>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="10" class="margin_left">
        <el-form>
          <el-form-item label="是否展示">
            <div class="block">
              <el-radio v-model="radio" label="0">不展示</el-radio>
              <el-radio v-model="radio" label="1">展示</el-radio>
            </div>
          </el-form-item>
           <el-form-item label="岗位要求">
            <el-input v-model="form.demand" type="textarea" rows="10" class="block"></el-input>
          </el-form-item>
        </el-form>
      
      </el-col>
    </el-row>
    <el-row :gutter="20" class="news_btn">
      <el-button type="primary">发布招聘</el-button>
      <el-button type="success">修改招聘</el-button>
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
          width="240">
        </el-table-column>
        <el-table-column
          label="发布日期"
          width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        
        <el-table-column
          label="新闻详情"
          width="240">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <!-- <p>住址: {{ scope.row.address }}</p> -->
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      title: "社会招聘",
      title_list: "社会招聘列表",
      type_1: true,
      mType: "1",
      templateList: [],
      logoList: [],
      form: {
        text1: "",
        text2: null,
        text3: null,
        text4: null,
        logoUrl: "",
        color: "#ff0000"
      },
      radio: '1',
      radio_recruit: '1',
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
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        multipleSelection: [],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ]
    };
    
  },
  created: function() {
    this.getTemplateList();
    this.getLogoList();
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
    addMaterial() {
      let that = this;
    //   this.req({
    //     url: "addMaterial",
    //     data: {
    //       name: that.form.name,
    //       imgUrl: that.imgUrl,
    //       createDate: new Date().getTime()
    //     },
    //     method: "POST"
    //   }).then(
    //     res => {
    //       console.log("res :", res);
    //     //   this.$router.push({ path: "/material/check" });
    //     },
    //     err => {
    //       console.log("err :", err);
    //     }
    //   );
    },
    getTemplateList() {
      let that = this;
    //   this.req({
    //     url: "getTemplateList?page=0&limit=0",
    //     data: {},
    //     method: "GET"
    //   }).then(
    //     res => {
    //       console.log("res :", res);
    //       that.templateList = res.data;
    //     },
    //     err => {
    //       console.log("err :", err);
    //     }
    //   );
    },
    getLogoList() {
      let that = this;
    //   this.req({
    //     url: "getLogoList?page=0&limit=0",
    //     data: {},
    //     method: "GET"
    //   }).then(
    //     res => {
    //       console.log("res :", res);
    //       that.logoList = res.data;
    //     },
    //     err => {
    //       console.log("err :", err);
    //     }
    //   );
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