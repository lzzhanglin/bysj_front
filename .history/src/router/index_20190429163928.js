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

        {
            path: '/course',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件'},
            children:[
                {
                    path: 'create',
                    component: resolve => require(['../components/page/course/CreateCourse.vue'], resolve),
                    meta: { title: '创建课程',requireAuth:true,requireTeacher:true }
                },
                {
                    path: 'manage',
                    component: resolve => require(['../components/page/course/ManageCourse.vue'], resolve),
                    meta: { title: '管理课程',requireAuth:true,requireTeacher:true }
                },
                {
                    path: 'choose',
                    component: resolve => require(['../components/page/course/ChooseCourse.vue'], resolve),
                    meta: { title: '选课中心',requireAuth:true,requireTeacher:false}
                },
                {
                    path: 'detail',
                    component: resolve => require(['../components/page/course/CourseDetail.vue'], resolve),
                    meta: { title: '课程详情',requireAuth:true,requireTeacher:true },
                   
                },
                {
                    path: 'chapter',
                    component: resolve => require(['../components/page/course/ChapterDetail.vue'], resolve),
                    meta: { title: '章节详情',requireAuth:true,requireTeacher:true }
                },
                {
                    path: 'test',
                    component: resolve => require(['../components/page/test.vue'], resolve),
                    meta: { title: '上传测试',requireAuth:true,requireTeacher:true }
                }
            ]
        },
        {
            path: '/experiment',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta:{title:'实验教学' },
            children:[
                {
                    path: 'create',
                    component: resolve => require(['../components/page/experiment/CreateExperiment.vue'], resolve),
                    meta: { title: '新建实验',requireAuth:true,requireTeacher:true }
                },
                {
                    path: 'manage',
                    component: resolve => require(['../components/page/experiment/ManageExperiment.vue'], resolve),
                    meta: { title: '管理实验',requireAuth:true,isPublic:true }
                },
                {
                    path: 'upload',
                    component: resolve => require(['../components/page/experiment/UploadExperimentReport.vue'], resolve),
                    meta: { title: '上传实验报告',requireAuth:true,isPublic:true }
                },
                {
                    path: 'download',
                    component: resolve => require(['../components/page/experiment/DownloadExperimentReport.vue'], resolve),
                    meta: { title: '上传实验报告',requireAuth:true,isPublic:true }
                },
            ]
        },
        {
            path: '/teachResource',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta:{title:'教学资源' },
            children:[
                {
                    path: 'upload',
                    component: resolve => require(['../components/page/teachingResource/UploadResource.vue'], resolve),
                    meta: { title: '上传资源',requireAuth:true,requireTeacher:true }
                },
                {
                    path: 'download',
                    component: resolve => require(['../components/page/teachingResource/DownloadResource.vue'], resolve),
                    meta: { title: '下载资源',requireAuth:true,isPublic:true }
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
                }
             
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