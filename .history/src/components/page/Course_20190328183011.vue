<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 课程</el-breadcrumb-item>
                <el-breadcrumb-item> 创建课程</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form"  :rules="rules" label-width="80px">
                    <el-form-item label="课程名称" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="课程性质" prop="kind">
                        <el-select v-model="form.kind" placeholder="请选择">
                            <el-option key="bixiu" label="必修" value="bixiu"></el-option>
                            <el-option key="xianxuan" label="限选" value="xianxuan"></el-option>
                            <el-option key="renxuan" label="任选" value="renxuan"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="开课日期" prop="dateBegin">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择开课日期"  :picker-options="dateBegin"  v-model="form.dateBegin" style="width: 100%;"></el-date-picker>
                        </el-col>
                       
                    </el-form-item>
                    <el-form-item label="结课日期" prop="dateEnd">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择结课日期"  :picker-options="dateEnd" v-model="form.dateEnd" style="width: 100%;"></el-date-picker>
                        </el-col>
                        
                    </el-form-item>
                   
                    <el-form-item label="课程介绍" prop="intro">
                        <el-input type="textarea" rows="5" v-model="form.intro"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
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
                 dateBegin: {
                disabledDate: (time) => {
                    if (this.form.dateEnd) {
                        //如果选择了结课日期，只能选则今天之后的日期 结课日期之前的日期
                        return time.getTime() < Date.now() || time.getTime() >  new Date(this.form.dateEnd).getTime();
 
                }else{//还没有选择结束时间的时候，让他只能选择今天之后的时间 包括今天
                console.log(Date.now());
                        return time.getTime() < Date.now() - 8.64e7;
                    } 
            }
                 },
            dateEnd: {
                disabledDate: (time) => {
                    //结课日期必须大于开课日期
                    return time.getTime() < new Date(this.form.dateBegin).getTime() + 8.64e7;
                }
            },
                
                form: {
                    name: '',
                    kind: '',
                    dateBegin: '',
                    dateEnd: '',
                    desc: '',
                },
                rules: {
                    name: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    kind: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    dateBegin: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    dateEnd: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    kind: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ]
                }
            }
            },
        
        methods: {
           

            onSubmit() {
                this.$message.success('提交成功！');
            }
        }
    
    }
</script>