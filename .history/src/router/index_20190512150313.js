// import Vue from 'vue';
// import Router from 'vue-router';

// Vue.use(Router);


// export const constantRouterMap = [
//     {
//         path: '/login',
//         component: resolve => require(['../components/page/Login.vue'], resolve)
//     },
//   ]
  
//   //实例化vue的时候只挂载constantRouter
//   export default new Router({
//     mode: 'history',
//     routes: constantRouterMap
//   });
//   export const asyncRouterMap =  [
//         {
//             path: '/',
//             redirect: '/dashboard'
//         },
      
//         {
//             path: '/',
//             component: resolve => require(['../components/common/Home.vue'], resolve),
//             meta: { title: '自述文件' },
//             children:[
//                 {
//                     path: '/dashboard',
//                     component: resolve => require(['../components/page/Dashboard.vue'], resolve),
//                     meta: { title: '系统首页' }
//                 },
//                 {
//                     path: '/createCourse',
//                     component: resolve => require(['../components/page/CreateCourse.vue'], resolve),
//                     meta: { title: '系统首页' }
//                 },
//                 {
//                     path: '/manageCourse',
//                     component: resolve => require(['../components/page/ManageCourse.vue'], resolve),
//                     meta: { title: '系统首页' }
//                 },
//                 {
//                     path: '/icon',
//                     component: resolve => require(['../components/page/Icon.vue'], resolve),
//                     meta: { title: '自定义图标' }
//                 },
//                 {
//                     path: '/table',
//                     component: resolve => require(['../components/page/BaseTable.vue'], resolve),
//                     meta: { title: '基础表格' }
//                 },
//                 {
//                     path: '/tabs',
//                     component: resolve => require(['../components/page/Tabs.vue'], resolve),
//                     meta: { title: 'tab选项卡' }
//                 },
//                 {
//                     path: '/form',
//                     component: resolve => require(['../components/page/BaseForm.vue'], resolve),
//                     meta: { title: '基本表单' }
//                 },
//                 {
//                     // 富文本编辑器组件
//                     path: '/editor',
//                     component: resolve => require(['../components/page/VueEditor.vue'], resolve),
//                     meta: { title: '富文本编辑器' }
//                 },
//                 {
//                     // markdown组件
//                     path: '/markdown',
//                     component: resolve => require(['../components/page/Markdown.vue'], resolve),
//                     meta: { title: 'markdown编辑器' }    
//                 },
//                 {
//                     // 图片上传组件
//                     path: '/upload',
//                     component: resolve => require(['../components/page/Upload.vue'], resolve),
//                     meta: { title: '文件上传' }   
//                 },
//                 {
//                     // vue-schart组件
//                     path: '/charts',
//                     component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
//                     meta: { title: 'schart图表' }
//                 },
//                 {
//                     // 拖拽列表组件
//                     path: '/drag',
//                     component: resolve => require(['../components/page/DragList.vue'], resolve),
//                     meta: { title: '拖拽列表' }
//                 },
//                 {
//                     // 权限页面
//                     path: '/permission',
//                     component: resolve => require(['../components/page/Permission.vue'], resolve),
//                     meta: { title: '权限测试', permission: true }
//                 },
//                 {
//                     path: '/404',
//                     component: resolve => require(['../components/page/404.vue'], resolve),
//                     meta: { title: '404' }
//                 },
//                 {
//                     path: '/403',
//                     component: resolve => require(['../components/page/403.vue'], resolve),
//                     meta: { title: '403' }
//                 }
//             ]
//         },
//         {
//             path: '/login',
//             component: resolve => require(['../components/page/Login.vue'], resolve)
//         },
//         {
//             path: '*',
//             redirect: '/404'
//         }
//     ]


import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


// export const constantRouterMap = [
//     {
//         path: '/',
//          redirect: '/dashboard'
//     },
//     {
//         path: '/login',
//         component: resolve => require(['../components/page/Login.vue'], resolve)
//     },
//     {
//         path: '*',
//         redirect: '/404'
//     },
//     {
//         path: '/',
//         component: resolve => require(['../components/common/Home.vue'], resolve),
//         meta: { title: '自述文件' },
        
//     },
//   ]
//   export default new Router({
//       mode: 'history',
//     routes: constantRouterMap
//   });

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/dashboard',
            // meta:{
            //     isPublic:true
            // }
        },

        // {
        //     path: '/course',
        //     component: resolve => require(['../components/common/Home.vue'], resolve),
        //     meta: { title: '自述文件'},
        //     children:[
        //         {
        //             path: 'create',
        //             component: resolve => require(['../components/page/course/CreateCourse.vue'], resolve),
        //             meta: { title: '创建课程',requireAuth:true,requireTeacher:true }
        //         },
        //         {
        //             path: 'manage',
        //             component: resolve => require(['../components/page/course/ManageCourse.vue'], resolve),
        //             meta: { title: '管理课程',requireAuth:true,requireTeacher:true }
        //         },
              
        //         {
        //             path: 'choose',
        //             component: resolve => require(['../components/page/course/ChooseCourse.vue'], resolve),
        //             meta: { title: '选课中心',requireAuth:true,requireTeacher:false}
        //         },
        //         {
        //             path: 'detail',
        //             component: resolve => require(['../components/page/course/CourseDetail.vue'], resolve),
        //             meta: { title: '课程详情',requireAuth:true,requireTeacher:true },
                   
        //         },
               
        //         {
        //             path: 'test',
        //             component: resolve => require(['../components/page/test.vue'], resolve),
        //             meta: { title: '上传测试',requireAuth:true,requireTeacher:true }
        //         }
        //     ]
        // },
        {
            path: '/experiment',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta:{title:'实验教学' },
            children:[
                {
                    path: 'condition',
                    component: resolve => require(['../components/page/experiment/PracticalCondition.vue'], resolve),
                    meta: { title: '实践条件',requireAuth:true,isPublic:true }
                },
                {
                    path: 'project',
                    component: resolve => require(['../components/page/experiment/ExperimentProject.vue'], resolve),
                    meta: { title: '实验项目',requireAuth:true,isPublic:true }
                },
                {
                    path: 'homework',
                    component: resolve => require(['../components/page/experiment/Homework.vue'], resolve),
                    meta: { title: '结课大作业',requireAuth:true,isPublic:true }
                },
                {
                    path: 'download',
                    component: resolve => require(['../components/page/experiment/DownloadExperimentReport.vue'], resolve),
                    meta: { title: '上传实验报告',requireAuth:true,isPublic:true }
                },
            ]
        },
        {
            path: '/courseBuild',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta:{title:'课程建设' },
            children:[
                {
                    path: 'intro',
                    component: resolve => require(['../components/page/courseBuild/CourseIntro.vue'], resolve),
                    meta: { title: '课程简介',requireAuth:true,isPublic:true }
                },
                {
                    path: 'plan',
                    component: resolve => require(['../components/page/courseBuild/CoursePlan.vue'], resolve),
                    meta: { title: '课程规划',requireAuth:true,isPublic:true }
                },
                {
                    path: 'outline',
                    component: resolve => require(['../components/page/courseBuild/CourseOutline.vue'], resolve),
                    meta: { title: '课程大纲',requireAuth:true,isPublic:true }
                },
            ]
        },
        {
            path: '/teachResource',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta:{title:'教学资源' },
            children:[
                {
                    path: 'createCourse',
                    component: resolve => require(['../components/page/teachingResource/CreateCourse.vue'], resolve),
                    meta: { title: '创建课程',requireAuth:true,requireTeacher:true }
                },
                {
                    path: 'manageCourse',
                    component: resolve => require(['../components/page/teachingResource/ManageCourse.vue'], resolve),
                    meta: { title: '管理课程',requireAuth:true,requireTeacher:true }
                },
                {
                    path: 'courseDetail',
                    component: resolve => require(['../components/page/teachingResource/CourseDetail.vue'], resolve),
                    meta: { title: '课程详情',requireAuth:true,requireTeacher:true },
                   
                },
                {
                    path: 'courseWare',
                    component: resolve => require(['../components/page/teachingResource/CourseWare.vue'], resolve),
                    meta: { title: '教学课件',requireAuth:true,isPublic:true }
                },
                {
                    path: 'exercise',
                    component: resolve => require(['../components/page/teachingResource/CourseExercise.vue'], resolve),
                    meta: { title: '课程习题',requireAuth:true,isPublic:true }
                },
                {
                    path: 'solution',
                    component: resolve => require(['../components/page/teachingResource/ExerciseSolution.vue'], resolve),
                    meta: { title: '参考答案',requireAuth:true,isPublic:true }
                },
                {
                    path: 'example',
                    component: resolve => require(['../components/page/teachingResource/TeachExample.vue'], resolve),
                    meta: { title: '教学案例',requireAuth:true,isPublic:true }
                },
             
            ]
        },
        {
            path: '/teachAchievement',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta:{title:'教学成果' },
            children:[
                {
                    path: 'create',
                    component: resolve => require(['../components/page/teachingAchievement/CreateAchievement.vue'], resolve),
                    meta: { title: '创建成果',requireAuth:true,requireTeacher:true }
                },
                {
                    path: 'paper',
                    component: resolve => require(['../components/page/teachingAchievement/ShowPapers.vue'], resolve),
                    meta: { title: '论文发表',requireAuth:true,isPublic:true }
                },
                {
                    path: 'award',
                    component: resolve => require(['../components/page/teachingAchievement/ShowGetAward.vue'], resolve),
                    meta: { title: '获得奖项',requireAuth:true,isPublic:true }
                } ,
                {
                    path: 'project',
                    component: resolve => require(['../components/page/teachingAchievement/ShowProjects.vue'], resolve),
                    meta: { title: '科研项目',requireAuth:true,isPublic:true }
                },
                {
                    path: 'patents',
                    component: resolve => require(['../components/page/teachingAchievement/ShowPatents.vue'], resolve),
                    meta: { title: '学生授权专利',requireAuth:true,isPublic:true }
                }
             
            ]
        },
        
        {
            path: '/teachTeam',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta:{title:'教学团队' },
            children:[
                {
                    path: 'create',
                    component: resolve => require(['../components/page/teachingTeam/CreateIntroduction.vue'], resolve),
                    meta: { title: '创建介绍',requireAuth:true,requireTeacher:true }
                },
                {
                    path: 'show',
                    component: resolve => require(['../components/page/teachingTeam/ShowIntroduction.vue'], resolve),
                    meta: { title: '团队介绍',requireAuth:true,isPublic:true }
                },
             
            ]
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页',requireAuth:true,isPublic:true }
                },
              
               
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})