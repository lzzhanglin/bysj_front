<template>
    <div>
        <div class="crumbs" v-if="role==='ROLE_TEACHER'">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 课程建设</el-breadcrumb-item>
                <el-breadcrumb-item> 创建课程介绍</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" v-if="role==='ROLE_TEACHER'">
            <div class="form-box">
                <el-form ref="courseInfoForm" :model="courseInfoForm"  :rules="rules" label-width="120px">
                    <el-form-item label="课程名称" prop="infoName">
                        <el-input v-model="courseInfoForm.infoName"></el-input>
                    </el-form-item>
                     <el-form-item label="课程介绍" prop="infoDetail">
                        <el-input type="textarea" rows="5" v-model="courseInfoForm.infoDetail"></el-input>
                    </el-form-item>
                   <el-form-item>
                        <el-button type="primary" @click="onSubmit('courseInfoForm')">保 存</el-button>
                        <el-button>取 消</el-button>
                    </el-form-item>
                  
                   
                </el-form>
            </div>
        </div>
       <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 课程建设</el-breadcrumb-item>
                <el-breadcrumb-item> 课程介绍</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
       
 
   

        <div class="container">
   
                <div v-for="info in infoList" :key='info.courseInfoId'>
                   <div class="plugins-tips"  style="width:100%;margin-top:0px;">
                        <p align="center">课程名称：{{info.infoName}}</p>
                    </div>
                        <div class="plugins-tips"  style="width:100%;margin-top:0px;">
                        <p align="center">{{info.infoDetail}}</p>
                    </div>
                    <!-- <span style="margin-left:770px;">上传时间：{{condition.uploadTime}}</span> -->
                    <el-row>
                        <el-button style="margin-top:10px; margin-bottom:10px;" size="small" type="danger" @click="handleDelete(info.courseInfoId)" v-if="role==='ROLE_TEACHER'" >删 除</el-button>
                    </el-row>

                     

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
        name: 'courseInfoForm',
        data: function(){
           
            return {
                token:{
                    token:window.localStorage["token"]
                },
                courseInfoId:'',
                infoList:[],
                role:window.localStorage['role'],
                delVisible: false,
                courseInfoForm: {
                    infoName: '',
                    infoDetail: ''
                },
                rules: {
                    infoName: [
                        { required: true, message: '不能为空', trigger: 'blur' },
                        { max:250,message: '长度不能超过250字符'}
                    ],
                    infoDetail: [
                        { required: true, message: '不能为空', trigger: 'blur' },
                        
                    ],
                   
                }
            }
            },
            computed:{
           
            },
            created() {
            this.getInfoData();
        },
        
        methods: {
          
          
      
           
           
        
         onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid){
                         this.postRequest('/api/courseInfo/create', {
                            infoName: this.courseInfoForm.infoName,
                            infoDetail: this.courseInfoForm.infoDetail,
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
                    _this.infoList = dataFromDb;

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
