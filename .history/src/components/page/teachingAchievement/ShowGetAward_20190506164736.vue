<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 教学成果</el-breadcrumb-item>
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 获得奖项</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
           
            <el-table :data="tableData" border class="table" ref="multipleTable" >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="achievementName" label="成果名称" align="center" sortable width="150">
                    

                </el-table-column>
                <el-table-column prop="achievementKind" label="成果类型" align="center" sortable width="100">
                </el-table-column>
                <el-table-column prop="detail" label="详情" align="center" sortable width="150">
                </el-table-column>
               
               
                <el-table-column label="操作" width="250" align="center" fixed="right"> 
                <template slot-scope="scope"> 
                    <el-button type="text" icon="el-icon-lx-attention" class="green" @click="handleView(scope.$index, scope.row)">查看详情</el-button>
                         <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" v-if="role==='ROLE_TEACHER'">编辑</el-button> 
                         <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)" v-if="role==='ROLE_TEACHER'">删除</el-button> 
                     </template>
                 </el-table-column>
            </el-table>
            <!-- <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div> -->
        </div>

        <!-- 编辑弹出框  -->
         <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
            <el-form ref="form" :model="form" label-width="100px">
                 <el-form-item label="成果名称">
                    <el-input v-model="form.achievementName" :disabled="isView"></el-input>
                </el-form-item>

                <el-form-item label="成果类型" prop="achievementKind">
                        <el-select v-model="form.achievementKind" placeholder="请选择">
                            <el-option key="xiangmu" label="科研项目" value="科研项目"></el-option>
                            <el-option key="lunwen" label="论文发表" value="论文发表"></el-option>
                            <el-option key="jiangxiang" label="获得奖项" value="获得奖项"></el-option>
                            <el-option key="zhuanli" label="授权专利" value="授权专利"></el-option>
                        </el-select>
                    </el-form-item>
                
                
                    <el-form-item label="详情">
                    <el-input type="textarea" rows="5"  v-model="form.detail" :disabled="isView"></el-input>
                    </el-form-item>
                    

               

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit" v-if="isView === false">更 新</el-button>
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
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                tableData: [],
                role:window.localStorage['role'],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                isView:true,
                editVisible: false,
                delVisible: false,
                idx: -1,
                form: {
                    teacherId: '',
                    teacherName: '',
                    sex: '',
                    birthDay: '',
                    education: '',
                    jobTitle: '',
                    position: '',
                    affiliatedCollege: '',
                    introduction: ''
                },
               
            
            }
        },
        created() {
            this.getData();
        },
         watch: {
                '$route' (to, from) {
                    this.getData();                    
                }
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
                this.$axios.get('/api/teacher/getAllTeachers', {
                   
                }).then((res) => {

                    for (let i = 0; i < res.data.data.length; i++) {
               
                var obj = {}
                var dt = res.data.data
                obj.teacherId = dt[i].teacherId
                obj.teacherName = dt[i].teacherName
                obj.sex = dt[i].sex
                obj.birthDay = dt[i].birthDay
                obj.education = dt[i].education
                obj.jobTitle = dt[i].jobTitle
                obj.position = dt[i].position
                obj.affiliatedCollege = dt[i].affiliatedCollege
                obj.introduction = dt[i].introduction

                dataFromDb[i] = obj
            }
                    _this.tableData = dataFromDb;

                })
            },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleView(index, row){
               this.isView = true;
                this.idx = index;
                const item = this.tableData[index];
               
                this.form = {
                    teacherId: item.teacherId,
                    teacherName: item.teacherName,
                    sex: item.sex,
                    birthDay: item.birthDay,
                    education: item.education,
                    jobTitle: item.jobTitle,
                    position: item.position,
                    affiliatedCollege: item.affiliatedCollege,
                    introduction: item.introduction,
                }
                this.editVisible = true;
     
            },
            handleEdit(index, row) {
                this.isView = false;
                this.idx = index;
                const item = this.tableData[index];
               
                this.form = {
                    teacherId: item.teacherId,
                    teacherName: item.teacherName,
                    sex: item.sex,
                    birthDay: item.birthDay,
                    education: item.education,
                    jobTitle: item.jobTitle,
                    position: item.position,
                    affiliatedCollege: item.affiliatedCollege,
                    introduction: item.introduction,
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            
            saveEdit() {
         
                 this.postRequest('/api/teacher/update', {
                 
                        teacherId: this.form.teacherId,
                        teacherName: this.form.teacherName,
                        sex: this.form.sex,
                        birthDay: this.form.birthDay,
                        education: this.form.education,
                        jobTitle: this.form.jobTitle,
                        position: this.form.position,
                        affiliatedCollege: this.form.affiliatedCollege,
                        introduction: this.form.introduction
                
                }).then((res) => {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);

                })
              
            },
            // 确定删除
            deleteRow(){
                const item = this.tableData[this.idx];
                this.tableData.splice(this.idx, 1);
                this.$axios.delete('/api/teacher/delete', {
                    params: {
                        teacherId: item.teacherId
                        
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
