<template>
    <div>
        <div class="crumbs" >
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 教学资源</el-breadcrumb-item>
                <el-breadcrumb-item> 选择课程及章节</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" >
            <div class="form-box">
               

                
                <el-form ref="videoForm" :model="videoForm"  :rules="rules" label-width="80px" >
                    <el-row type="flex" class="row-bg">
                    <el-col :span="12">
                    <el-form-item label="所属课程" prop="courseId">
                        <el-select v-model="videoForm.courseId"  @change="chooseCourse" placeholder="请选择">
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
                     <el-form-item label="所属章节" >
                        <el-select v-model="videoForm.chapterId" :disabled="disableChapter" @change="chooseChapter" placeholder="请先选择课程">
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
                  
                    
       
                  
                   
                  
                    <el-form-item label="视频上传" v-if="role==='ROLE_TEACHER'">
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
                             <el-button class="el-upload__text" slot="trigger" style=" float:left;" type="primary" :disabled="disableUpload">选取文件</el-button>
                            
                            <div slot="tip" class="el-upload__tip" style="color:#3a8ee6;">选择课程和章节之后方可进行上传，预览课件，只能上传 PPT 文档</div>
                        </el-upload>
                            <el-button style="float:left" size="small" type="success" @click="submitUpload" >上传到服务器</el-button>
                            
                    </el-form-item>
                   
                </el-form>
                <div slot="tip" v-if="role==='ROLE_STUDENT'" style="color:#3a8ee6;font-size:12px;margin-left:80px;">Tip: 选择课程和章节之后方可预览课件</div>
            </div>
        </div>
             <div class="crumbs" v-if="isChoose">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 教学资源</el-breadcrumb-item>
                        <el-breadcrumb-item> 课件预览</el-breadcrumb-item>
                        <el-breadcrumb-item> {{currentCourse}}</el-breadcrumb-item>
                        <el-breadcrumb-item> {{currentChapter}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
        <div class="container" style="padding-top:0px;" v-if="isChoose" >
              <div slot="tip" v-if="isEmpty" style="color:red;font-size:18px;text-align:center;margin-top:30px;">该章节暂无课件</div>
       

                <div v-for="video in videoList" :key='video.videoId'>
                  
                   <div class="plugins-tips"  style="margin-top:40px;margin-right:4px;">
                        <p align="center">{{video.videoName}}</p>
                    </div>
   
                        <el-button style="margin-top:0px; margin-bottom:10px;" size="small" type="danger" @click="handleDelete(video.videoId)" v-if="role==='ROLE_TEACHER'" >删 除</el-button>

                    <video :src="video.externalLink" controls>
                        您的浏览器不支持Video标签。
                    </video>
                      
                </div>
        </div>

 
         <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteCourseWare">确 定</el-button>
            </span>
        </el-dialog>
         

    </div>
</template>

<script>
    export default{ 
        name: 'videoForm',
        data: function(){
           
            return {
                currentCourse:null,
                currentChapter:null,
                isEmpty:false,
                isChoose:false,
                deleteCourseWareId:null,
                videoList:null,
                disableUpload:true,
                 paramsData:null,
                courses:null,
                chapters:null,
                fileList: [],
                disableChapter:true,
                token:{
                    token:window.localStorage["token"]
                },
              
                courseInfoId:'',
                role:window.localStorage['role'],
                delVisible: false,
                videoForm: {
                    courseId: '',
                    chapterId: ''
                },
                rules: {
                    courseId: [
                        { required: true, message: '不能为空', trigger: 'change' },
                    ],
                    // chapterId: [
                    //     { required: true, message: '不能为空', trigger: 'change' },
                        
                    // ],
                   
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
                if(true){
                // if(file.name.endsWith(".ppt")||file.name.endsWith(".pptx")||file.name.endsWith(".pptm")){
                }else{
                     this.$message.error('上传文档只能是 PPT 文档!');
                     const isPdf = false;
                    return isPdf
                }
                //获取token 共用的组件 获取上传七牛云的token
                   return this.$axios.get('/api/practicalCondition/getToken', {
                  params:{
                      fileName:file.name,
                      bucketName:"video"
                
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
             this.externalLink = `http://prdti85a8.bkt.clouddn.com/${url}`
            //在线预览的链接 加上微软的链接 word ppt 都需要微软的服务 pdf jpg png不需要 可以直接预览
             var previewLink = "http://view.officeapps.live.com/op/view.aspx?src="+this.externalLink;
                this.fileList = []
                //上传七牛云成功之后 将上传文档的信息写入数据库
                this.postRequest('/api/teachVideo/writeFileInfo', {
                            videoName: response.key,
                            externalLink: this.externalLink,
                            previewLink: previewLink,
                            creatorJobNo: window.localStorage["jobNo"],
                            courseId: this.videoForm.courseId,
                            chapterId: this.videoForm.chapterId,
                  }).then(resp=> {
                      
                      if(resp.data.status === 200){
                this.$message.success('上传成功！');
                this.getCourseWareList();

                this.videoForm.chapterId=null;
                this.disableUpload = true;

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
                 this.$refs['videoForm'].validate((valid) => {
                  if(valid){
                       this.$refs.upload.submit();
                  }else{
                       return false;
                      
                  }
              });
            
        },
            chooseCourse(){
                if(this.videoForm.chapterId != null){
                this.videoForm.chapterId = null;
                }
                console.log("选择课程");
                this.disableChapter=false;
                this.getChapterList();
                // this.isChoose = false;
            },
             chooseChapter(){
                 this.disableUpload = false;
                 console.log("参数为："+this.videoForm.chapterId);
                  this.getVideoList();
                  this.isChoose = true;
                  //获取当前选择的课程名 章节名
                  for(let i = 0;i < this.courses.length;i++){
                      if (this.courses[i].courseId == this.videoForm.courseId){
                          this.currentCourse =this.courses[i].courseName;
                      }
                  }
                   for(let i = 0;i < this.chapters.length;i++){
                      if (this.chapters[i].chapterId == this.videoForm.chapterId){
                          this.currentChapter =this.chapters[i].chapterName;
                      }
                  }
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
                        courseId:this.videoForm.courseId
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
          
           getVideoList() {
                var dataFromDb = [];
              let _this = this
                this.$axios.get('/api/teachVideo/getTeachVideoList', {
                    params:{
                        chapterId:this.videoForm.chapterId,
                    
                    }
                }).then((res) => {
                    if(res.data.data.length == 0){
                        this.isEmpty = true;
                    }else{
                        this.isEmpty = false;
                    }

                    for (let i = 0; i < res.data.data.length; i++) {
               
                var obj = {}
                var dt = res.data.data
                obj.courseWareId = dt[i].courseWareId
                obj.courseWareName = dt[i].courseWareName
                obj.createTime = dt[i].createTime
                obj.externalLink = dt[i].externalLink
                obj.previewLink = dt[i].previewLink
                dataFromDb[i] = obj
            }
                    _this.videoList = dataFromDb;

                })
            },
          
      
           
           
        
      
      
             handleDelete(courseWareId) {
                this.delVisible = true;
                this.deleteCourseWareId = courseWareId;
            },
     
            deleteCourseWare(courseWareId){
                  this.$axios.delete('/api/courseWare/delete', {
                    params: {
                        courseWareId: this.deleteCourseWareId
                    }
                }).then((res) => {

                    this.$message.success('删除成功');
                    this.getCourseWareList();
                    this.delVisible=false;
                    this.deleteCourseWareId="";

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
