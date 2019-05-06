<template>
<div>


    <div class="crumbs">
            <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 课程</el-breadcrumb-item>
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 课程详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
      <div class="container">
          <span >courseId: {{ courseId }}</span>
          <span >chapterId: {{ chapterId }}</span>
          <span >disableUpload: {{ disableUpload }}</span>
       <div class="form-box">
                <el-form ref="detailForm" :model="detailForm"  :rules="rules" label-width="80px" >
                    <el-form-item label="章节名称" prop="chapterName" >
                        <el-col :span="24">
                        <el-input v-model="detailForm.chapterName" placeholder="请填入章节名称" maxlength="100"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="章节序号" prop="chapterOrder" placeholder="请填入数字来标识章节顺序">
                         <el-col :span="12">
                        <el-input v-model="detailForm.chapterOrder" placeholder="请填入数字来标识章节顺序"></el-input>
                         </el-col>
                    </el-form-item>
                  
                   
                    <el-form-item label="章节内容" prop="chapterContent">
                        <quill-editor ref="myTextEditor" v-model="detailForm.chapterContent" :options="editorOption" style="width:1000px;"></quill-editor>
                          <!-- 文件上传input 将它隐藏-->
                        <el-upload class="upload-demo" 
                        :action="qnLocation"
                        :before-upload='beforeQnUpload' 
                        :data="uploadData" 
                        :on-success='upQnScuccess'
                        ref="upload" style="display:none">
                        <el-button size="small" type="primary" id="imgInput" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="插入中,请稍候">点击上传</el-button>
                        </el-upload>
                        <!-- <el-input type="textarea" rows="5" v-model="detailForm.chapterContent" placeholder="请填入章节内容"></el-input> -->
                    </el-form-item>
                       
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('detailForm')">保存章节</el-button>
                    </el-form-item>

                     <el-form-item label="课件上传">
                  <el-upload
                        class="upload-demo"
                        drag
                        action="/api/courseWare/upload"
                        multiple
                        :disabled= this.disableUpload
                        :data=paramsData
                        :on-preview="handlePreview"
                        :before-upload="handleBeforeUpload"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :limit="3"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip" style="color:red;">注意：请先保存章节再上传课件</div>
            </el-upload>
                    </el-form-item>
                </el-form>
                <!-- <div class="container">
                       <quill-editor ref="myTextEditor" v-model="detailForm.chapterContent" :options="editorOption"></quill-editor>

                </div> -->
                 
            </div>
           
            </div>
           <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 课程</el-breadcrumb-item>
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 课程详情</el-breadcrumb-item>
                <el-breadcrumb-item><i class="el-icon-lx-text"></i> 章节目录</el-breadcrumb-item>
            </el-breadcrumb>
           </div>
             <el-table :data="tableData" border class="table" ref="multipleTable" >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="chapterName" label="章节名称" align="center" sortable width="150">
                    

                </el-table-column>
                <el-table-column prop="chapterOrder" label="章节序号" align="center" sortable width="200">
                </el-table-column>
                <!-- <el-table-column prop="chapterContent" label="章节内容" align="center" sortable width="300">
                </el-table-column> -->
                <el-table-column prop="createTime" label="创建时间" align="center" sortable width="200">
                </el-table-column>
                
                <el-table-column label="操作" width="180" align="center" fixed="right"> 
                <template slot-scope="scope"> 
                    <el-button type="text" icon="el-icon-lx-forward" class="green" @click="handleView(scope.$index, scope.row)">查看</el-button>
                         <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> 
                         <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button> 
                     </template>
                 </el-table-column>
            </el-table>
        

            <!-- <div class="table">
                <div class="container"></div>
            </div> -->
            </div>
</template>

<script>
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';

    const STATICDOMAIN = 'http://pqnfa0l6o.bkt.clouddn.com/' // 图片服务器的域名，展示时使用
const STATVIDEO = 'http://pqnfa0l6o.bkt.clouddn.com/'

    export default {
        name: 'baseForm',


        data: function(){
           
            return {
                tableData: [],
                fileList: [],
                courseId:'',
                chapterId:'',
                disableUpload: true,
                 editorOption: {
                    placeholder: 'enter the chapter content'
                },
                     
     uploadData = {},
  photoUrl = '', // 上传图片地址
  uploadType = '', // 上传的文件类型（图片、视频）
  fullscreenLoading = false,
                detailForm: {
                    chapterName: '',
                    chapterOrder: '',
                    chapterContent: '',
                },
                rules: {
                    chapterName: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    chapterOrder: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                   
                    chapterContent: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ]
                }
            }
            },
            computed:{

          
            paramsData: function () {
                if(this.chapterId != ""){
             this.disableUpload = false
            let params = {
            courseId: this.courseId,
            chapterId: this.chapterId,
            creatorJobNo:window.localStorage["jobNo"]
      }
       return params
         }else{
              let params = {
            courseId: this.courseId,
            chapterId: 666,
            creatorJobNo:window.localStorage["jobNo"]
         }
          return params
         }
     
     
    }

            },


            created(){
               this.getParams();
               this.getData();
            },
           //监听路由的变化，查看课程的页面可以同时打开多个课程的详情页，但是每个页面共用一个组件，需要使用各自的courseId加载章节列表
            watch: {
                '$route' (to, from) {
                    var toPath = to.fullPath.substr(0,14);
                    var fromPath = from.fullPath.substr(0,14);
                    // debugger;
                        //主url相同 id不同的时候才进行操作
                        if(toPath == "/course/detail"){
                            this.getParams();
                            this.getData();
                        }
                        
              
                    
                   
                }
            },
            components: {
            quillEditor
        },
        
        methods: {
                 // 上传七牛的actiond地址，http 和 https �不一样
        get qnLocation() {
            return location.protocol === 'http:' ? 'http://upload.qiniu.com' : 'https://up.qbox.me'
        },
       

             // 图片上传之前调取的函数
        // 这个钩子还支持 promise
        beforeQnUpload(file) {
            return this.qnUpload(file)
        },
         // 图片上传前获得数据token数据
        qnUpload(file) {
            this.fullscreenLoading = true
            const suffix = file.name.split('.')
            const ext = suffix.splice(suffix.length - 1, 1)[0]
            console.log(this.uploadType)
            if (this.uploadType === 'image') { // 如果是点击插入图片
            // TODO 图片格式/大小限制
            return this.$http('common/get_qiniu_token').then(res => {
                this.uploadData = {
                key: `image/${suffix.join('.')}_${new Date().getTime()}.${ext}`,
                token: res.data
                }
            })
            } else if (this.uploadType === 'video') { // 如果是点击插入视频
            return this.$http('common/get_qiniu_token').then(res => {
                this.uploadData = {
                key: `video/${suffix.join('.')}_${new Date().getTime()}.${ext}`,
                token: res
                }
            })
            }
        },

        // 图片上传成功回调   插入到编辑器中
  upQnScuccess(e, file, fileList) {
    console.log(e)
    this.fullscreenLoading = false
    let vm = this
    let url = ''
    if (this.uploadType === 'image') { // 获得文件上传后的URL地址
      url = STATICDOMAIN + e.key
    } else if (this.uploadType === 'video') {
      url = STATVIDEO + e.key
    }
    if (url != null && url.length > 0) { // 将文件上传后的URL地址插入到编辑器文本中
      let value = url
      // API: https://segmentfault.com/q/1010000008951906
      // this.$refs.myTextEditor.quillEditor.getSelection();
      // 获取光标位置对象，里面有两个属性，一个是index 还有 一个length，这里要用range.index，即当前光标之前的内容长度，然后再利用 insertEmbed(length, 'image', imageUrl)，插入图片即可。
      vm.addRange = vm.$refs.myQuillEditor.quill.getSelection()
      value = value.indexOf('http') !== -1 ? value : 'http:' + value
      vm.$refs.myQuillEditor.quill.insertEmbed(vm.addRange !== null ? vm.addRange.index : 0, vm.uploadType, value, Quill.sources.USER) // 调用编辑器的 insertEmbed 方法，插入URL
    } else {
      this.$message.error(`${vm.uploadType}插入失败`)
    }
    this.$refs['upload'].clearFiles() // 插入成功后清除input的内容
  },

  // 点击图片ICON触发事件
  imgHandler(state) {
    this.addRange = this.$refs.myQuillEditor.quill.getSelection()
    if (state) {
      let fileInput = document.getElementById('imgInput')
      fileInput.click() // 加一个触发事件
    }
    this.uploadType = 'image'
  },

  // 点击视频ICON触发事件
  videoHandler(state) {
    this.addRange = this.$refs.myQuillEditor.quill.getSelection()
    if (state) {
      let fileInput = document.getElementById('imgInput')
      fileInput.click() // 加一个触发事件
    }
    this.uploadType = 'video'
  },
   mounted() {
    // 为图片ICON绑定事件  getModule 为编辑器的内部属性
    this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
    this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('video', this.videoHandler) // 为视频ICON绑定事件
  },

            //****************** */

            onEditorChange({ editor, html, text }) {
                this.detailForm.chapterContent = html;
            },
            //上传文件
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
             handleBeforeUpload(file) {
                 console.log("章节id为："+this.chapterId);
               if(this.chapterId == undefined){
                   return false;
               }
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
             handleView(index, row){
                const item = this.tableData[index];
                 this.$router.push({
                   path: '/course/chapter', query:{id: item.chapterId, name: item.chapterName, content: item.chapterContent}
        });
             },
                    
            getParams () {
        // 取到路由带过来的参数 
        var routerParams = this.$route.query.id
        // var routerParams = this.$route.params.id
        // 将数据放在当前组件的数据内
        this.courseId = routerParams
        console.log("更新courseId成功");
      },
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid){
                         this.postRequest('/api/chapter/create', {
                            chapterName: this.detailForm.chapterName,
                            chapterOrder: this.detailForm.chapterOrder,
                            chapterContent: this.detailForm.chapterContent,
                            courseId: this.courseId,
                            creatorJobNo: window.localStorage["jobNo"]
                  }).then(resp=> {
                     
                      if(resp.data.status === 200){
                          this.chapterId = resp.data.data
                           var obj = {}
                           //将新增的数据追加到table 返回只有chapterId createTime用js取现在的时间 可能刷新后会与数据库不一致 不过影响不大
                           //将时间拼接成数据库存储的形式
                           var date = new Date();
                           var year = date.getFullYear();
                           var month = date.getMonth()+1;
                           if(month < 10){
                               month = '0'+month;
                           }
                           var day = date.getDate();
                           if(day < 10){
                               day = '0' + day;
                           }
                           var hour = date.getHours();
                           var minute = date.getMinutes();
                           var second = date.getSeconds();
                           var createTime = year + "-" + month + "-" + day +" "+ hour+":"+minute+":"+second;
                           obj.chapterId = this.chapterId
                           obj.chapterName = this.detailForm.chapterName
                           obj.chapterOrder = this.detailForm.chapterOrder
                           obj.chapterContent = this.detailForm.chapterContent
                           obj.createTime = createTime
                          this.tableData.push(obj);
                          this.onSubmit;
                          this.$message.success('提交成功！');
                           this.$refs[formName].resetFields();

                      }

                    })
                    }else{
                        return false;
                    }
                
            });
            },
              // 从后台获取数据
            getData() {
                var dataFromDb = [];
              let _this = this
              console.log("获取chapterList 参数为："+ this.courseId);
                this.$axios.get('/api/chapter/getChapterList', {
                    params: {
                       courseId: this.courseId
                    }
                }).then((res) => {

                    for (let i = 0; i < res.data.data.length; i++) {
               
                var obj = {}
                var dt = res.data.data
                obj.chapterId = res.data.data[i].chapterId
                obj.createTime = res.data.data[i].createTime
                obj.chapterName = res.data.data[i].chapterName
                obj.chapterOrder = res.data.data[i].chapterOrder
                obj.chapterContent = res.data.data[i].chapterContent
                dataFromDb[i] = obj
            }
                    _this.tableData = dataFromDb;

                })
            },
    
        }
    }
</script>
<style>
    .editor-btn{
        margin-top: 20px;
    }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
    

