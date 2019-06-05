<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 用户管理</el-breadcrumb-item>
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 批量管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            
            <el-table :data="tableData" border class="table" ref="multipleTable" >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="username" label="姓名" align="center" sortable width="150">
                    

                </el-table-column>
                <el-table-column prop="jobNo" label="账号" align="center" sortable width="200">
                </el-table-column>
                <el-table-column prop="role" label="角色" align="center" sortable width="200">
                </el-table-column>
                <el-table-column prop="sex" label="性别" align="center" sortable width="150">
                </el-table-column>
                <el-table-column prop="birthday" label="出生日期" align="center" sortable width="150">
                </el-table-column>
                <el-table-column prop="email" label="邮箱" align="center" sortable width="250">
                </el-table-column>
                <el-table-column prop="phone" label="电话" align="center" sortable width="150">
                </el-table-column>
                
                
                <el-table-column label="操作" width="280" align="center" fixed="right"> 
                <template slot-scope="scope"> 
                         <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> 
                         <el-button type="text" icon="el-icon-setting" @click="handleResetPwd(scope.$index, scope.row)">重置密码</el-button> 
                         <!-- <el-button type="text" icon="el-icon-close" class="red" @click="handleEdit(scope.$index, scope.row)">禁用</el-button>  -->
                         <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button> 
                     </template>
                 </el-table-column>
            </el-table>
            <!-- <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div> -->
        </div>

        <!-- 编辑弹出框  -->
         <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="100px">
                
                 <el-form-item label="姓名">
                    <el-input v-model="form.username" disabled="disabled"></el-input>
                </el-form-item>
                 <el-form-item label="账号">
                    <el-input v-model="form.jobNo" disabled="disabled"></el-input>
                </el-form-item>
                 <el-form-item label="角色">
                    <el-input v-model="form.role" disabled="disabled"></el-input>
                </el-form-item>
                 <el-form-item label="性别">
                    <el-input v-model="form.sex" disabled="disabled"></el-input>
                </el-form-item>
                 <el-form-item label="邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                 <el-form-item label="电话">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                 <el-form-item label="出生日期">
                    <el-date-picker type="date" placeholder="选择日期"  
                    v-model="form.birthday" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>

                
               

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="resetVisible" width="400px" center>
            <div class="del-dialog-cnt">是否重置密码？重置之后密码即为账号</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetVisible = false">取 消</el-button>
                <el-button type="primary" @click="resetPwd">确定重置</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                // url: './vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                resetVisible:false,
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1,
               
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
               
            }
        },
      
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 从后台获取数据
            getData() {
                var dataFromDb = [];
              let _this = this
                this.$axios.get('/api/user/getAllTeacherAndStudent', {
                  
                }).then((res) => {

                    for (let i = 0; i < res.data.data.length; i++) {
               
                var obj = {}
                var dt = res.data.data
                obj.userId = dt[i].userId
                obj.username = dt[i].username
                obj.jobNo = dt[i].jobNo
                obj.email = dt[i].email
                obj.phone = dt[i].phone
                obj.sex = dt[i].sex
                obj.birthday = dt[i].birthday
                obj.role = dt[i].role

                dataFromDb[i] = obj
            }
                    _this.tableData = dataFromDb;

                })
            },
          
          
           
            handleView(index, row){
                const item = this.tableData[index];
                 this.$router.push({
                   path: '/teachResource/courseDetail', query:{id: item.courseId}
        });
        // this.$router.push({
        //            name: '/course/detail', params:{id: item.courseId}
        // });
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    username: item.username,
                    jobNo: item.jobNo,
                    phone: item.phone,
                    email: item.email,
                    birthday: item.birthday,
                    role: item.role,
                    sex:item.sex
                   
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
          
           handleResetPwd(index, row) {
                this.idx = index;
                this.resetVisible = true;
            },
          
            saveEdit() {
         
                 this.postRequest('/api/user/update', {
                 
                        jobNo: this.form.jobNo,
                        email: this.form.email,
                        phone: this.form.phone,
                        birthday: this.form.birthday,
                      
                
                }).then((res) => {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);

                })
              
            },
            resetPwd(){
                const item = this.tableData[this.idx];
                 this.postRequest('/api/user/resetPwd', {
                        jobNo: item.jobNo,
                }).then((res) => {
                    if(res.data.status == 200){
                        this.$message.success("重置密码成功！");
                    }else{
                        this.$message.error("重置密码失败！");
                    }
                    this.resetVisible = false;
                })
            },
            // 确定删除
            deleteRow(){
                const item = this.tableData[this.idx];
                this.tableData.splice(this.idx, 1);
                this.$axios.delete('/api/user/delete', {
                    params: {
                        jobNo: item.jobNo
                        
                    }
                }).then((res) => {

                    this.$message.success('删除成功');
                this.delVisible = false;
                  

                })
               
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
     .green{
        color: #63c991;
    }
    .mr10{
        margin-right: 10px;
    }
</style>
