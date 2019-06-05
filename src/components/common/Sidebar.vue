<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title" >{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title" >{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            console.log("角色为："+window.localStorage["role"]);
            //角色如果是老师 则返回老师的侧边栏
            if(window.localStorage["role"] === "ROLE_TEACHER"){
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: '/dashboard',
                        title: '系统首页'
                    },
                    
                     {
                        icon: 'el-icon-lx-text',
                        index: '1',
                        title: '教学资源',
                        subs: [
                             {
                                index: '/teachResource/createCourse',
                                title: '创建课程'
                            },
                             
                            {
                                index: '/teachResource/manageCourse',
                                title: '管理课程'
                            },
                            
                             {
                                index: '/teachResource/courseWare',
                                title: '教学课件'
                            },
                          
                             {
                                index: '/teachResource/video',
                                title: '教学视频'
                            },
                           
                
                           
                        ]
                    },
                    
                    {
                        icon: 'el-icon-lx-text',
                        index: '3',
                        title: '实践教学',
                        subs: [
                           
                            {
                                index: '/experiment/condition',
                                title: '实践条件'
                            },
                            
                            {
                                index: '/experiment/project',
                                title: '实验项目'
                            }
                        ]
                       
                    },
                    
                     {
                        icon: 'el-icon-lx-text',
                        index: '4',
                        title: '教学成果',
                        subs: [
                           
                            {
                                index: '/teachAchievement/create',
                                title: '创建成果'
                            },
                             {
                                index: '/teachAchievement/project',
                                title: '科研项目'
                            },
                            {
                                index: '/teachAchievement/paper',
                                title: '论文发表'
                            },
                             {
                                index: '/teachAchievement/award',
                                title: '获得奖项'
                            },
                            {
                                index: '/teachAchievement/patents',
                                title: '学生授权专利'
                            }
                
                        ]
                       
                    },
                    {
                        icon: 'el-icon-lx-text',
                        index: '5',
                        title: '教学团队',
                        subs: [
                           
                            {
                                index: '/teachTeam/create',
                                title: '创建介绍'
                            },
                             {
                                index: '/teachTeam/show',
                                title: '团队介绍'
                            }
                        ]
                       
                    },
                       {
                        icon: 'el-icon-lx-text',
                        index: '6',
                        title: '用户管理',
                        subs:[
                             {
                                index: '/user/changePwd',
                                title: '修改密码'
                            },
                           
                        ]
                    },
                     {
                        icon: 'el-icon-lx-text',
                        index: '7',
                        title: '交流中心',
                        subs:[
                             {
                                index: '/message/test',
                                title: '在线交流'
                            },
                          
                           
                        ]
                    }
                    
                ]
            }
            }else if(window.localStorage["role"] ==="ROLE_STUDENT"){
                console.log("进入侧边栏else")
                return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: '/dashboard',
                        title: '系统首页'
                    },
                    
                     {
                        icon: 'el-icon-lx-text',
                        index: '1',
                        title: '课程',
                        subs:[
                             {
                                index: '/teachResource/courseWare',
                                title: '教学课件'
                            },
                            {
                                index: '/teachResource/video',
                                title: '教学视频'
                            },
                           
                        ]
                    },
                   
                    {
                        icon: 'el-icon-lx-text',
                        index: '3',
                        title: '实践教学',
                         subs: [
                              {
                                index: '/experiment/condition',
                                title: '实践条件'
                            },
                            {
                                index: '/experiment/project',
                                title: '实验项目'
                            }
                        ]
                       
                    },
                   
                     {
                        icon: 'el-icon-lx-text',
                        index: '4',
                        title: '教学成果',
                        subs: [
                           
                             {
                                index: '/teachAchievement/project',
                                title: '科研项目'
                            },
                                {
                                index: '/teachAchievement/paper',
                                title: '论文发表'
                            },
                             {
                                index: '/teachAchievement/award',
                                title: '获得奖项'
                            },
                         
                            {
                                index: '/teachAchievement/patents',
                                title: '学生授权专利'
                            }
                        ]
                       
                    },
                    {
                        icon: 'el-icon-lx-text',
                        index: '5',
                        title: '教学团队',
                        subs: [
                           
                          
                             {
                                index: '/teachTeam/show',
                                title: '团队介绍'
                            }
                        ]
                       
                    },
                     {
                        icon: 'el-icon-lx-text',
                        index: '6',
                        title: '用户管理',
                        subs:[
                             {
                                index: '/user/changePwd',
                                title: '修改密码'
                            },
                           
                        ]
                    },
                    {
                        icon: 'el-icon-lx-text',
                        index: '7',
                        title: '交流中心',
                        subs:[
                             {
                                index: '/message/test',
                                title: '在线交流'
                            },
                          
                           
                        ]
                    }
                ]
            }
            }else if(window.localStorage["role"] ==="ROLE_ADMIN"){
                return{
                    collapse: false,
                    items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: '/dashboard',
                        title: '系统首页'
                    },
                    
                     {
                        icon: 'el-icon-lx-text',
                        index: '1',
                        title: '用户管理',
                        subs:[
                             {
                                index: '/user/batchImport',
                                title: '批量注册'
                            },
                           {
                                index: '/user/manage',
                                title: '批量管理'
                            },
                             {
                                index: '/user/changePwd',
                                title: '修改密码'
                            },
                         
                           
                        ]
                    },
                       {
                        icon: 'el-icon-lx-text',
                        index: '2',
                        title: '交流中心',
                        subs:[
                             {
                                index: '/message/test',
                                title: '在线交流'
                            },
                          
                           
                        ]
                    }
                
                ]
                }
            }else{
                     return{
                    collapse: false,
                    items: []
                }
            }
        },
        computed:{
            onRoutes(){
                // console.log($route.meta.isTeacher);
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
