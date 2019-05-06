<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 教学团队</el-breadcrumb-item>
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 团队介绍</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- <div class="handle-box"> -->
                <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
                <!-- <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10"> -->
                    <!-- <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input> -->
                <!-- <el-button type="primary" icon="search" @click="search">搜索</el-button> -->
            <!-- </div> -->
            <!-- @selection-change="handleSelectionChange" -->
            <el-table :data="tableData" border class="table" ref="multipleTable" >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="teacherName" label="教师姓名" align="center" sortable width="150">
                    

                </el-table-column>
                <el-table-column prop="sex" label="性别" align="center" sortable width="100">
                </el-table-column>
                <el-table-column prop="education" label="学历" align="center" sortable width="100">
                </el-table-column>
                <el-table-column prop="jobTitle" label="职称" align="center" sortable width="200">
                </el-table-column>
                <el-table-column prop="affiliatedCollege" label="所属学院" align="center" sortable width="400">
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
         <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                 <el-form-item label="教师">
                    <el-input v-model="form.teacherName" :disabled="isView"></el-input>
                </el-form-item>

                 <el-form-item label="性别">
                        <el-select v-model="form.sex" :disabled="isView" >
                            <el-option key="male" label="男" value="男"></el-option>
                            <el-option key="female" label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>
                 <el-form-item label="学历" prop="education" >
                        <el-select v-model="form.education" placeholder="请选择" :disabled="isView">
                            <el-option key="bachelor" label="本科" value="本科"></el-option>
                            <el-option key="master" label="硕士" value="硕士"></el-option>
                            <el-option key="doctor" label="博士" value="博士"></el-option>
                        </el-select>
                </el-form-item>
                 <el-form-item label="职称" prop="jobTitle" >
                        <el-select v-model="form.jobTitle" placeholder="请选择" :disabled="isView">
                            <el-option key="professor" label="教授" value="教授"></el-option>
                            <el-option key="associateProfessor" label="副教授" value="副教授"></el-option>
                            <el-option key="lecturer" label="讲师" value="讲师"></el-option>
                            <el-option key="Assistant" label="助教" value="助教"></el-option>
                        </el-select>
                    </el-form-item>
                    
                     <el-form-item label="所属学院" prop="affiliatedCollege">
                        <el-select v-model="form.affiliatedCollege" placeholder="请选择" :disabled="isView">
                            <el-option key="xinxi" label="信息科学与工程学院" value="信息科学与工程学院"></el-option>
                            <el-option key="tumu" label="土木工程学院" value="土木工程学院"></el-option>
                            <el-option key="hehai" label="河海学院" value="河海学院"></el-option>
                            <el-option key="hangyun" label="航运与船舶工程学院" value="航运与船舶工程学院"></el-option>
                            <el-option key="jidian" label="机电与车辆工程学院" value="机电与车辆工程学院"></el-option>
                            <el-option key="jiaotong" label="交通运输学院" value="交通运输学院"></el-option>
                            <el-option key="jianzhu" label="建筑与城市规划学院" value="建筑与城市规划学院"></el-option>
                            <el-option key="cailiao" label="材料科学与工程学院" value="材料科学与工程学院"></el-option>
                            <el-option key="hangkong" label="航空学院" value="航空学院"></el-option>
                            <el-option key="jingji" label="经济与管理学院" value="经济与管理学院"></el-option>
                            <el-option key="shuxue" label="数学与统计学院" value="数学与统计学院"></el-option>
                            <el-option key="waiguoyu" label="外国语学院" value="外国语学院"></el-option>
                            <el-option key="renwen" label="人文学院" value="人文学院"></el-option>
                            <el-option key="makesi" label="马克思主义学院" value="马克思主义学院"></el-option>
                            <el-option key="guoji" label="国际学院" value="国际学院"></el-option>
                            <el-option key="yishu" label="艺术设计学院" value="艺术设计学院"></el-option>
                            <el-option key="jixu" label="继续教育学院" value="继续教育学院"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="教师介绍">
                    <el-input v-model="form.introduction" :disabled="isView"></el-input>
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
                    education: '',
                    jobTitle: '',
                    affiliatedCollege: '',
                    introduction: ''
                },
               
            
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
                this.$axios.get('/api/teacher/getAllTeachers', {
                   
                }).then((res) => {

                    for (let i = 0; i < res.data.data.length; i++) {
               
                var obj = {}
                var dt = res.data.data
                obj.teacherId = dt[i].teacherId
                obj.teacherName = dt[i].teacherName
                obj.sex = dt[i].sex
                obj.education = dt[i].education
                obj.jobTitle = dt[i].jobTitle
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
                const item = this.tableData[index];
                 this.$router.push({
                   path: '/course/detail', query:{id: item.courseId}
        });
        // this.$router.push({
        //            name: '/course/detail', params:{id: item.courseId}
        // });
            },
            handleEdit(index, row) {
                this.isView = false;
                this.idx = index;
                const item = this.tableData[index];
                //传回的值是汉字 但是给下拉框赋值需要拼音 所以转换
               
                this.form = {
                    teacherId: item.teacherId,
                    teacherName: item.teacherName,
                    sex: item.sex,
                    education: item.education,
                    jobTitle: item.jobTitle,
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
         
                 this.postRequest('/api/course/update', {
                 
                        courseId: this.form.courseId,
                        courseName: this.form.courseName,
                        courseKind: this.form.courseKind,
                        courseIntro: this.form.courseIntro,
                        timeBegin: this.form.dateBegin,
                        timeEnd: this.form.dateEnd
                
                }).then((res) => {
                    //弹出框里的值是拼音 赋值给表格需要转为汉字
                    if(this.form.courseKind == "bixiu"){
                        this.form.courseKind = "必修"
                    }
                    if(this.form.courseKind == "xianxuan"){
                        this.form.courseKind = "限选"
                    }
                    if(this.form.courseKind == "renxuan"){
                        this.form.courseKind = "任选"
                    }
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);

                })
              
            },
            // 确定删除
            deleteRow(){
                const item = this.tableData[this.idx];
                this.tableData.splice(this.idx, 1);
                this.$axios.delete('/api/course/delete', {
                    params: {
                        courseId: item.courseId
                        
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
