<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 教学成果</el-breadcrumb-item>
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 科研项目</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
           
            <el-table :data="tableData" border class="table" ref="multipleTable" >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="achievementName" label="成果名称" align="center" sortable width="400">
                    

                </el-table-column>
                <el-table-column prop="achievementKind" label="成果类型" align="center" sortable width="200">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center" sortable width="200">
                </el-table-column>
                <el-table-column prop="detail" label="详情" align="center" sortable width="450">
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
                        <el-select v-model="form.achievementKind" placeholder="请选择" :disabled="isView">
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
            
             <el-table :data="materialTableData" border class="table" ref="multipleTable" >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="materialName" label="资料名称" align="center" sortable width="400">
                    

                </el-table-column>
               
                <el-table-column prop="uploadTime" label="上传时间" align="center" sortable width="150">
                </el-table-column>
          
               
               
               <el-table-column label="操作" width="122" align="center" > 
                <template slot-scope="scope"> 
                    <el-button type="text" icon="el-icon-lx-down" class="green" @click="handleDownload(scope.$index, scope.row)">下载</el-button>
                         <el-button type="text" icon="el-icon-delete" class="red" @click="handleDeleteMaterial(scope.$index, scope.row)" v-if="role==='ROLE_TEACHER' && isView===false" >删除</el-button> 
                     </template>
                 </el-table-column>
            </el-table>
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
                 materialTableData: [],
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
                    achievementId: '',
                    achievementName: '',
                    achievementKind: '',
                    detail: '',
                    createTIme: ''
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
            handleDownload(index, row){
             const item = this.materialTableData[index];
            window.open('/api/material/download?materialName='+item.materialName);
           },
            handleDeleteMaterial(index, row) {
                this.idx = index;
                 const item = this.materialTableData[this.idx];
                this.$axios.delete('/api/material/delete', {
                    params: {
                        materialId: item.materialId,
                        
                    }
                }).then((res) => {
                    this.materialTableData.splice(this.idx, 1);
                    this.$message.success('删除成功');
                  

                })
                
            },
            // 从后台获取数据
            getData() {
                var dataFromDb = [];
              let _this = this
                this.$axios.get('/api/achievement/getAllAchievements', {
                   params:{
                       kind: "科研项目"
                   }
                }).then((res) => {

                    for (let i = 0; i < res.data.data.length; i++) {
               
                var obj = {}
                var dt = res.data.data
                obj.achievementId = dt[i].achievementId
                obj.achievementName = dt[i].achievementName
                obj.achievementKind = dt[i].achievementKind
                obj.detail = dt[i].detail
                obj.createTime = dt[i].createTime
                dataFromDb[i] = obj
            }
                    _this.tableData = dataFromDb;

                })
            },
          
           
            //获取资源列表
            getMaterialData() {
                var dataFromDb = [];
                console.log("axios参数为："+this.chapterId);
              let _this = this
                this.$axios.get('/api/material/getMaterialList', {
                    params: {
                       achievementId: this.form.achievementId
                    }
                }).then((res) => {

                    for (let i = 0; i < res.data.data.length; i++) {
               
                var obj = {}
                var dt = res.data.data
                obj.materialId = res.data.data[i].materialId
                obj.materialName = res.data.data[i].materialName
                obj.uploadTime = res.data.data[i].uploadTime
                dataFromDb[i] = obj
            }
                    _this.materialTableData = dataFromDb;

                })
            },
            handleView(index, row){
               this.isView = true;
                this.idx = index;
                const item = this.tableData[index];
               
                this.form = {
                    achievementId: item.achievementId,
                    achievementName: item.achievementName,
                    achievementKind: item.achievementKind,
                    detail: item.detail,
                    createTime: item.createTIme,
                }
                this.getMaterialData();
                this.editVisible = true;
     
            },
            handleEdit(index, row) {
                this.isView = false;
                this.idx = index;
                const item = this.tableData[index];
               
                this.form = {
                    achievementId: item.achievementId,
                    achievementName: item.achievementName,
                    achievementKind: item.achievementKind,
                    detail: item.detail,
                    createTime: item.createTIme,
                }
                this.getMaterialData();
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            
            saveEdit() {
         
                 this.postRequest('/api/achievement/update', {
                 
                        achievementId: this.form.achievementId,
                        achievementName: this.form.achievementName,
                        achievementKind: this.form.achievementKind,
                        detail: this.form.detail,
                
                }).then((res) => {
                this.$set(this.tableData, this.idx, this.form);
                 this.getData();
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);

                })
              
            },
            // 确定删除
            deleteRow(){
                const item = this.tableData[this.idx];
                this.tableData.splice(this.idx, 1);
                this.$axios.delete('/api/achievement/delete', {
                    params: {
                        achievementId: item.achievementId
                        
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
