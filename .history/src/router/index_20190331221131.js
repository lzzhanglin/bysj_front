import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


export const constantRouterMap = [
    {
        path: '/login',
        component: resolve => require(['../components/page/Login.vue'], resolve)
    },
  ]
  
  //实例化vue的时候只挂载constantRouter
  export default new Router({
    mode: 'history',
    routes: constantRouterMap
  });

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
      
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/createCourse',
                    component: resolve => require(['../components/page/CreateCourse.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/manageCourse',
                    component: resolve => require(['../components/page/ManageCourse.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: resolve => require(['../components/page/Icon.vue'], resolve),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }    
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }   
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
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

function generateRoutesFromMenu (menu = [], routes = []) {
    for (let i = 0, l = menu.length; i < l; i++) {
      let item = menu[i]
      if (item.path) {
        routes.push(item)
      }
      if (!item.component) {
        // item.component = resolve => require([`views/${item.component}.vue`], resolve)
        generateRoutesFromMenu(item.children, routes)
      }
    }
    return routes
  }

  ////异步加载路由表
  // router.js
import Vue from 'vue';
import Router from 'vue-router';

import Login from '../views/login/';
const dashboard = resolve => require(['../views/dashboard/index'], resolve);
//使用了vue-routerd的[Lazy Loading Routes
](https://router.vuejs.org/en/advanced/lazy-loading.html)

//所有权限通用路由表 
//如首页和登录页和一些不用权限的公用页面


//异步挂载的路由
//动态需要根据权限加载的路由表 
export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    name: '权限测试',
    meta: { role: ['admin','super_editor'] }, //页面需要的权限
    children: [
    { 
      path: 'index',
      component: Permission,
      name: '权限测试页',
      meta: { role: ['admin','super_editor'] }  //页面需要的权限
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
];
