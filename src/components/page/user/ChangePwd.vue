<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 修改密码</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="changePwdForm" :model="changePwdForm"  :rules="rules" label-width="80px">
                    <el-form-item label="原密码" prop="name">
                        <el-input type="password" v-model="changePwdForm.oldPwd" placeholder="请输入原密码"></el-input>
                    </el-form-item>
                     <el-form-item label="新密码" prop="name" >
                        <el-input type="password" v-model="changePwdForm.newPwd" placeholder="请输入新密码"></el-input>
                    </el-form-item>
                     <el-form-item label="新密码" prop="name">
                        <el-input type="password" v-model="changePwdForm.newPwdAgain" placeholder="请再次输入密码"></el-input>
                    </el-form-item>
                   
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('changePwdForm')">修 改</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

       



    </div>
</template>

<script>
    export default {
        name: 'baseForm',
        data: function(){
      

            return {
                options:null,
                oldPwdIsTrue:null,
                changePwdForm: {
                    oldPwd: '',
                    newPwd: '',
                    newPwdAgain: '',
                   
                },
                rules: {
                    oldPwd: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    newPwd: [
                        { required: true, message: '不能为空', trigger: 'change' }
                    ],
                    newPwdAgain: [
                        { required: true, message: '不能为空', trigger: 'change' }
                    ],
                   
                }
            }
            },
            
        
        methods: {
             
           

            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid){
                         this.postRequest('/api/user/changePwd', {
                            oldPwd: this.changePwdForm.oldPwd,
                            newPwd: this.changePwdForm.newPwd,
                            newPwdAgain: this.changePwdForm.newPwdAgain,
                  }).then(resp=> {
                      if(resp.data.status === 200){
                this.$message.success('修改成功！请重新登录');
                      window.localStorage.removeItem('token');
                    window.localStorage.removeItem('username');
                    window.localStorage.removeItem('role');
                    this.$router.push('/login');

                      }
                      if(resp.data.data == 'old password is wrong'){
                          this.changePwdForm.oldPwd=null;
                          this.$message.error("原密码错误");

                      }
                      if(resp.data.data == "new password isn't same"){
                          this.changePwdForm.newPwd = null;
                          this.changePwdForm.newPwdAgain = null;
                          this.$message.error("新密码两次输入不一致");

                      }

                    })
                    }else{
                        return false;
                    }
                
            });
            },
            
        }
    }
</script>