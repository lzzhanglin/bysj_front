<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 课程</el-breadcrumb-item>
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 课程管理</el-breadcrumb-item>
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
                <el-table-column prop="courseName" label="课程名称" align="center" sortable width="150">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center" sortable width="150">
                </el-table-column>
                <el-table-column prop="courseKind" label="课程类型" align="center" sortable width="150">
                </el-table-column>
                <el-table-column prop="courseIntro" label="课程简介"  sortable width="250">
                </el-table-column>
                <el-table-column prop="dateBegin" label="开课日期" align="center" sortable width="150">
                </el-table-column>
                <el-table-column prop="dateEnd" label="结课日期" align="center" sortable width="150">
                </el-table-column>
                <el-table-column prop="teacherName" label="教师姓名" align="center" width="120">
                </el-table-column>
                <el-table-column prop="electorNum" label="选课人数" align="center"  width="80">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center"> 
                <template slot-scope="scope"> 
                         <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> 
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
            <el-form ref="form" :model="form" label-width="50px">
                 <el-form-item label="课程名称">
                    <el-input v-model="form.courseName"></el-input>
                </el-form-item>
                <el-form-item label="课程xingzhi">
                    <el-input v-model="form.courseKind"></el-input>
                </el-form-item>
                 <el-form-item label="课程性质">
                        <el-select v-model="form.courseKind" >
                            <el-option key="bixiu" label="必修" value="bixiu"></el-option>
                            <el-option key="xianxuan" label="限选" value="xianxuan"></el-option>
                            <el-option key="renxuan" label="任选" value="renxuan"></el-option>
                        </el-select>
                    </el-form-item>
                 <el-form-item label="课程介绍">
                    <el-input v-model="form.courseIntro"></el-input>
                </el-form-item>

                <el-form-item label="开课日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.dateBegin" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                  <el-form-item label="结课日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.dateEnd" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
               

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <!-- <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog> -->
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
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1
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
                this.$axios.get('/api/course/getCourseList', {
                    jobNo: '631507010427'
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
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                var cKind;
                console.log("courseKind为："+item.courseKind);
                if(item.courseKind =="必修"){
                    cKind = "bixiu"
                }
                if(item.courseKind =="限选"){
                    cKind = "xianxuan"
                }
                 else{
                    cKind = "renxuan"
                }
                console.log("cKind为："+cKind);
                this.form = {
                    courseId: item.courseId,
                    courseKind: cKind,
                    courseName: item.courseName,
                    courseIntro: item.courseIntro,
                    createTime: item.createTime,
                    dateBegin: item.dateBegin,
                    dateEnd: item.dateEnd,
                    teacherName: item.teacherName,
                    electorNum: item.electorNum
                }
                this.editVisible = true;
            },
            // handleDelete(index, row) {
            //     this.idx = index;
            //     this.delVisible = true;
            // },
            // delAll() {
            //     const length = this.multipleSelection.length;
            //     let str = '';
            //     this.del_list = this.del_list.concat(this.multipleSelection);
            //     for (let i = 0; i < length; i++) {
            //         str += this.multipleSelection[i].name + ' ';
            //     }
            //     this.$message.error('删除了' + str);
            //     this.multipleSelection = [];
            // },
            // handleSelectionChange(val) {
            //     this.multipleSelection = val;
            // },
            // 保存编辑
            saveEdit() {
         
                 this.postRequest('/api/course/update', {
                 
                        courseId: this.form.courseId,
                        courseName: this.form.courseName,
                        courseIntro: this.form.courseIntro,
                        timeBegin: this.form.dateBegin,
                        timeEnd: this.form.dateEnd
                
                }).then((res) => {
       this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);

                })
              
            }
            // 确定删除
            // deleteRow(){
            //     this.tableData.splice(this.idx, 1);
            //     this.$message.success('删除成功');
            //     this.delVisible = false;
            // }
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
    .mr10{
        margin-right: 10px;
    }
</style>
