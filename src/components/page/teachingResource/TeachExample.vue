<template>
    <div>
        <div class="crumbs" >
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 教学资源</el-breadcrumb-item>
                <el-breadcrumb-item> 教学案例</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" >
            <div class="form-box">
               

                
                <el-form ref="exampleForm" :model="exampleForm"  :rules="rules" label-width="80px" >
                    <el-row type="flex" class="row-bg">
                    <el-col :span="12">
                    <el-form-item label="选择课程" prop="courseId">
                        <el-select v-model="exampleForm.courseId"  @change="chooseCourse" placeholder="请选择">
                           <el-option
                                v-for="item in courses"
                                :key="item.courseId"
                                :label="item.courseName"
                                :value="item.courseId">
                                </el-option>
                            </el-select>
                    </el-form-item>
                    </el-col>
                    </el-row>
                  
                    
       
                  
                   
                  
                    <el-form-item label="案例上传" v-if="role==='ROLE_TEACHER'">
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
                            
                            <div slot="tip" class="el-upload__tip" style="color:#3a8ee6;">选择课程之后方可进行上传，预览教学案例，只能上传 word 文档</div>
                        </el-upload>
                            <el-button style="float:left" size="small" type="success" @click="submitUpload" >上传到服务器</el-button>
                            
                    </el-form-item>
                   
                </el-form>
                <div slot="tip" v-if="role==='ROLE_STUDENT'" style="color:#3a8ee6;font-size:12px;margin-left:80px;">Tip: 选择课程和习题之后方可预览参考答案</div>
            </div>
        </div>
             <div class="crumbs" v-if="isChoose">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 教学资源</el-breadcrumb-item>
                        <el-breadcrumb-item> 教学案例预览</el-breadcrumb-item>
                        <el-breadcrumb-item> {{currentCourse}}</el-breadcrumb-item>
                        <el-breadcrumb-item> {{currentExercise}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
        <div class="container" style="padding-top:0px;" v-if="isChoose" >
              <div slot="tip" v-if="isEmpty" style="color:red;font-size:18px;text-align:center;margin-top:30px;">该课程暂无教学案例</div>
       
   
                <div v-for="example in exampleList" :key='example.teachExampleId'>
                  
                   <div class="plugins-tips"  style="margin-top:40px;margin-right:4px;">
                        <p align="center">
                            {{example.teachExampleName}}</p>
                    </div>
                        <el-button style="margin-top:10px; margin-bottom:10px;" size="small" type="primary" @click="handleDownload(example.externalLink)" >下 载</el-button>
   
                        <el-button style="margin-top:0px; margin-bottom:10px;" size="small" type="danger" @click="handleDelete(example.teachExampleId)" v-if="role==='ROLE_TEACHER'" >删 除</el-button>

                       <iframe :src="example.previewLink" margin-nottom='20px' width='100%' height='1000px' frameborder='0' margin-top='10px'>
        This is an embedded <a target='_blank' href='http://office.com'>Microsoft Office</a> 
        document, powered by <a target='_blank' href='http://office.com/webapps'>Office Online</a>.</iframe>
                </div>
        </div>

 
         <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteExample">确 定</el-button>
            </span>
        </el-dialog>
         

    </div>
</template>

<script>
    export default{ 
        name: 'exampleForm',
        data: function(){
           
            return {
                currentCourse:null,
                currentExercise:null,
                isEmpty:false,
                isChoose:false,
                deleteExampleId:null,
                exampleList:null,
                disableUpload:true,
                 paramsData:null,
                courses:null,
                fileList: [],
                token:{
                    token:window.localStorage["token"]
                },
              
                courseInfoId:'',
                role:window.localStorage['role'],
                delVisible: false,
                exampleForm: {
                    courseId: '',
                    exerciseId: ''
                },
                rules: {
                    courseId: [
                        { required: true, message: '不能为空', trigger: 'change' },
                    ],
                    // exerciseId: [
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
               handleDownload(externalLink){
                window.open(externalLink);
            },

             handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
           
            handleBeforeUpload(file) {
                //判断文件类型 不是word不许上传
                if(file.name.endsWith(".doc")||file.name.endsWith(".docx")||file.name.endsWith(".docm")||file.name.endsWith(".dotm")||file.name.endsWith(".dotx")||file.name.endsWith(".dot")){
                }else{
                     this.$message.error('上传文档只能是 word 文档!');
                     const isWord = false;
                    return isWord
                }
                //获取token 共用的组件 获取上传七牛云的token
                   return this.$axios.get('/api/practicalCondition/getToken', {
                  params:{
                      fileName:file.name,
                      bucketName:"word"
                
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
             this.externalLink = `http://pr6coguqz.bkt.clouddn.com/${url}`
            //在线预览的链接 加上微软的链接 word ppt 都需要微软的服务 pdf jpg png不需要 可以直接预览
             var previewLink = "https://view.officeapps.live.com/op/embed.aspx?src="+this.externalLink;
                this.fileList = []
                //上传七牛云成功之后 将上传文档的信息写入数据库
                this.postRequest('/api/teachExample/writeFileInfo', {
                            teachExampleName: response.key,
                            externalLink: this.externalLink,
                            previewLink: previewLink,
                            creatorJobNo: window.localStorage["jobNo"],
                            courseId: this.exampleForm.courseId,
                  }).then(resp=> {
                      
                      if(resp.data.status === 200){
                this.$message.success('上传成功！');
                this.getTeachExampleList();


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
                 this.$refs['exampleForm'].validate((valid) => {
                  if(valid){
                       this.$refs.upload.submit();
                  }else{
                       return false;
                      
                  }
              });
            
        },
            chooseCourse(){
                this.isChoose = true;
                this.disableUpload = false;
                this.getTeachExampleList();
                for(let i = 0;i < this.courses.length;i++){
                      if (this.courses[i].courseId == this.exampleForm.courseId){
                          this.currentCourse =this.courses[i].courseName;
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

             getTeachExampleList() {
                var dataFromDb = [];
              let _this = this
                this.$axios.get('/api/teachExample/getTeachExampleList', {
                    params:{
                        courseId:this.exampleForm.courseId
                    }
                }).then((res) => {
                    if(res.data.data != null){
                        if(res.data.data.length == 0){
                            this.isEmpty = true;
                        }else{
                            this.isEmpty = false;
                        }
                         for (let i = 0; i < res.data.data.length; i++) {
                            var obj = {}
                            var dt = res.data.data
                            obj.teachExampleName = dt[i].teachExampleName
                            obj.teachExampleId = dt[i].teachExampleId
                            obj.externalLink = dt[i].externalLink
                            obj.previewLink = dt[i].previewLink
                            obj.courseId = dt[i].courseId
                            obj.creatorJobNo = dt[i].creatorJobNo
                            obj.uploadTime = dt[i].uploadTime
                            dataFromDb[i] = obj
            }
                         _this.exampleList = dataFromDb;
                    }

                  

                })
            },
          
      
          
      
           
           
        
      
      
             handleDelete(teachExampleId) {
                this.delVisible = true;
                this.deleteExampleId = teachExampleId;
            },
     
            deleteExample(solutionId){
                  this.$axios.delete('/api/teachExample/delete', {
                    params: {
                        exampleId: this.deleteExampleId
                    }
                }).then((res) => {

                    this.$message.success('删除成功');
                    this.getTeachExampleList();
                    this.delVisible=false;
                    this.deleteExampleId="";

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
