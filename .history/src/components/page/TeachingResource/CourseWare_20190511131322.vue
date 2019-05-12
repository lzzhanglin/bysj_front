<template>
    <div>
        <div class="crumbs" v-if="role==='ROLE_TEACHER'">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 教学资源</el-breadcrumb-item>
                <el-breadcrumb-item> 教学课件</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" v-if="role==='ROLE_TEACHER'">
            <div class="form-box">
               

                
                <el-form ref="courseWareForm" :model="courseWareForm"  :rules="rules" label-width="80px" >
                    <el-row type="flex" class="row-bg">
                    <el-col :span="12">
                    <el-form-item label="所属课程" prop="courseId">
                        <el-select v-model="courseWareForm.courseId"  @change="chooseCourse" placeholder="请选择">
                           <el-option
                                v-for="item in courses"
                                :key="item.courseId"
                                :label="item.courseName"
                                :value="item.courseId">
                                </el-option>
                            </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                     <el-form-item label="所属章节" prop="chapterId">
                        <el-select v-model="courseWareForm.chapterId" :disabled="disableChapter" @change="chooseChapter" placeholder="请先选择课程">
                           <el-option
                                v-for="item in chapters"
                                :key="item.chapterId"
                                :label="item.chapterName"
                                :value="item.chapterId">
                                </el-option>
                            </el-select>
                    </el-form-item>
                    </el-col>
                    </el-row>
                  
       
                  
                   
                  
                    <el-form-item label="课件上传">
                        <el-upload
                            class="upload-demo"
                            ref="upload"
                            :limit="1"
                            :data=paramsData
                            :headers=token
                            :disabled="disableUpload"
                            action="http://upload.qiniup.com"
                            :before-upload="handleBeforeUpload"
                            :on-preview="handlePreview"
                            :on-change="onChange"
                            :on-remove="handleRemove"
                            :on-success="onSuccess"
                            :on-exceed="handleExceed"
                            :file-list="fileList"
                            :auto-upload="false">
                             <el-button class="el-upload__text" slot="trigger" style=" float:left;" type="primary" >选取文件</el-button>
                            
                            <div slot="tip" class="el-upload__tip" style="color:red;">只能上传pdf文档</div>
                        </el-upload>
                            <el-button style="float:left" size="small" type="success" @click="submitUpload" >上传到服务器</el-button>
                            
                    </el-form-item>
                   
                </el-form>
            </div>
        </div>
   

 
         <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteInfo">确 定</el-button>
            </span>
        </el-dialog>
         

    </div>
</template>

<script>
    export default{ 
        name: 'courseWareForm',
        data: function(){
           
            return {
                disableUpload:true,
                 paramsData:null,
                courses:null,
                chapters:null,
                fileList: [],
                disableChapter:true,
                token:{
                    token:window.localStorage["token"]
                },
                resourceForm:{
                    courseWareName:''
                },
                courseInfoId:'',
                chapterList:[],
                role:window.localStorage['role'],
                delVisible: false,
                courseWareForm: {
                    infoName: '',
                    infoDetail: ''
                },
                rules: {
                    courseWareForm: [
                        { required: true, message: '不能为空', trigger: 'blur' },
                        { max:250,message: '长度不能超过250字符'}
                    ],
                    chapterOrder: [
                        { required: true, message: '不能为空', trigger: 'blur' },
                        
                    ],
                   
                }
            }
            },
            computed:{
           
            },
            created() {
            this.getCourseList();
        },

        
        methods: {

             handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
           
            handleBeforeUpload(file) {
                //判断文件类型 不是word不许上传
                if(file.name.endsWith(".pdf")){
                }else{
                     this.$message.error('上传文档只能是 pdf 文档!');
                     const isPdf = false;
                    return isPdf
                }
                //获取token 共用的组件 获取上传七牛云的token
                   return this.$axios.get('/api/practicalCondition/getToken', {
                  params:{
                      fileName:file.name,
                      bucketName:"pdf"
                
                  }
                }).then((res) => {

                    this.paramsData = {
              key:res.data.data[1],
              token:  res.data.data[0]
            }
                   

                })

        },
         onSuccess(response,file) {
             //外链 一个月变一次 应绑定自己的域名 各个bucket外链不一样 外链需要转码
             var url = encodeURIComponent(response.key)
             this.externalLink = `http://prbq5ggik.bkt.clouddn.com/${url}`
            //在线预览的链接 加上微软的链接
             var previewLink = "https://view.officeapps.live.com/op/embed.aspx?src="+this.externalLink;
                this.fileList = []
         
                //上传七牛云成功之后 将上传文档的信息写入数据库
                this.postRequest('/api/courseWare/writeFileInfo', {
                            courseWareName: response.key,
                            externalLink: this.externalLink,
                            previewLink: previewLink,
                            creatorJobNo: window.localStorage["jobNo"],
                            courseId: this.courseWareForm.courseId,
                            chapterId: this.courseWareForm.chapterId
                  }).then(resp=> {
                      
                      if(resp.data.status === 200){
                this.$message.success('上传成功！');
                this.$refs['conditionForm'].resetFields();
                this.getWordData();

                      }

                    })
            },
            onChange(file,fileList) {
             
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            submitUpload() {
                 this.$refs['conditionForm'].validate((valid) => {
                  if(valid){
                       this.$refs.upload.submit();
                  }else{
                       return false;
                      
                  }
              });
            
        },
            chooseCourse(){
                if(this.courseWareForm.chapterId != null){
                this.courseWareForm.chapterId = null;
                }
                console.log("选择课程");
                this.disableChapter=false;
                this.getChapterList();
            },
             chooseChapter(){
                 this.disableUpload = false;
            },

             getCourseList() {
                var dataFromDb = [];
              let _this = this
                this.$axios.get('/api/course/getCourseList', {
                }).then((res) => {

                    for (let i = 0; i < res.data.data.length; i++) {
               
                var obj = {}
                var dt = res.data.data
                obj.courseId = res.data.data[i].courseId
                obj.createTime = res.data.data[i].createTime
                obj.courseName = res.data.data[i].courseName
                obj.courseKind = res.data.data[i].courseKind
                obj.courseIntro = res.data.data[i].courseIntro
                obj.dateBegin = dt[i].timeBegin
                obj.dateEnd = dt[i].timeEnd
                obj.teacherName = dt[i].teacherName
                obj.electorNum = dt[i].electorNum

                dataFromDb[i] = obj
            }
                    _this.courses = dataFromDb;

                })
            },

             getChapterList() {
                var dataFromDb = [];
              let _this = this
                this.$axios.get('/api/chapter/getChapterList', {
                    params:{
                        courseId:this.courseWareForm.courseId
                    }
                }).then((res) => {
                    if(res.data.data != null){
                         for (let i = 0; i < res.data.data.length; i++) {
                            var obj = {}
                            var dt = res.data.data
                            obj.chapterId = dt[i].chapterId
                            obj.chapterName = dt[i].chapterName
                            dataFromDb[i] = obj
            }
                         _this.chapters = dataFromDb;
                    }

                  

                })
            },
          
          
      
           
           
        
         onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid){
                         this.postRequest('/api/courseInfo/create', {
                            infoName: this.courseWareForm.infoName,
                            infoDetail: this.courseWareForm.infoDetail,
                            //1代表课程简介 2代表课程规划 3代表课程大纲
                            infoType: 1,
                            creatorJobNo: window.localStorage["jobNo"],
                  }).then(resp=> {
                      this.$refs[formName].resetFields();
                      if(resp.data.status === 200){
                          this.getInfoData();
                          this.$message.success('提交成功！');

                      }

                    })
                    }else{
                        return false;
                    }
                
            });
         },
           
            getInfoData() {
                var dataFromDb = [];
              let _this = this
                this.$axios.get('/api/courseInfo/getCourseInfoByType', {
                  params:{
                      infoType:1
                  }
                }).then((res) => {

                    for (let i = 0; i < res.data.data.length; i++) {
               
                var obj = {}
                var dt = res.data.data
                obj.courseInfoId = dt[i].courseInfoId
                obj.createTime = dt[i].createTime
                obj.creatorJobNo = dt[i].creatorJobNo
                obj.infoName = dt[i].infoName
                obj.infoDetail = dt[i].infoDetail
                obj.infoType = dt[i].infoType
                dataFromDb[i] = obj
            }
                    _this.chapterList = dataFromDb;

                })
            },
             handleDelete(courseInfoId) {
                this.delVisible = true;
                this.courseInfoId = courseInfoId;
            },
            handleDownload(externalLink){
                window.open(externalLink);
            },
            deleteInfo(courseInfoId){
                  this.$axios.delete('/api/courseInfo/delete', {
                    params: {
                        courseInfoId: this.courseInfoId
                    }
                }).then((res) => {

                    this.$message.success('删除成功');
                    this.getInfoData();
                    this.delVisible=false;
                    this.courseInfoId="";

                })
            }

           
        }
    }
</script>
<style  scoped>
.iframe {
  width: 983px;
  height: 600px;
}


</style>
