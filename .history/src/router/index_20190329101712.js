import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

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
              meta: { title: '系统首页' ,requireAuth: true, }
          },
          {
            path: '/course',
            // component: resolve => require(['../components/page/CreateCourse.vue'], resolve),
            meta: { title: '课程123' ,requireAuth: true, },
            children:[
             
                {
                    path: 'create',
                    component: resolve => require(['../components/page/CreateCourse.vue'], resolve),
                    meta: { title: '创建课程', requireAuth: true,  }
                },
                {
                    path: 'manage',
                    component: resolve => require(['../components/page/ManageCourse.vue'], resolve),
                    meta: { title: '课程管理322', requireAuth: true,  }
                },
            ]
        },
          {
              path: '/icon',
              component: resolve => require(['../components/page/Icon.vue'], resolve),
              meta: { title: '自定义图标', requireAuth: true,  }
          },
          {
              path: '/table',
              component: resolve => require(['../components/page/BaseTable.vue'], resolve),
              meta: { title: '基础表格', requireAuth: true,  }
          },
          {
              path: '/tabs',
              component: resolve => require(['../components/page/Tabs.vue'], resolve),
              meta: { title: 'tab选项卡',requireAuth: true,  }
          },
          {
              path: '/form',
              component: resolve => require(['../components/page/BaseForm.vue'], resolve),
              meta: { title: '基本表单',requireAuth: true,  }
          },
          {
              // 富文本编辑器组件
              path: '/editor',
              component: resolve => require(['../components/page/VueEditor.vue'], resolve),
              meta: { title: '富文本编辑器',requireAuth: true,  }
          },
          {
              // markdown组件
              path: '/markdown',
              component: resolve => require(['../components/page/Markdown.vue'], resolve),
              meta: { title: 'markdown编辑器',requireAuth: true,  }    
          },
          {
              // 图片上传组件
              path: '/upload',
              component: resolve => require(['../components/page/Upload.vue'], resolve),
              meta: { title: '文件上传',requireAuth: true,  }   
          },
          {
              // vue-schart组件
              path: '/charts',
              component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
              meta: { title: 'schart图表',requireAuth: true,  }
          },
          {
              // 拖拽列表组件
              path: '/drag',
              component: resolve => require(['../components/page/DragList.vue'], resolve),
              meta: { title: '拖拽列表',requireAuth: true,  }
          },
          {
              // 拖拽Dialog组件
              path: '/dialog',
              component: resolve => require(['../components/page/DragDialog.vue'], resolve),
              meta: { title: '拖拽弹框',requireAuth: true,  }
          },
          {
              // 权限页面
              path: '/permission',
              component: resolve => require(['../components/page/Permission.vue'], resolve),
              meta: { title: '权限测试', permission: true,requireAuth: true,  }
          },
          {
              path: '/404',
              component: resolve => require(['../components/page/404.vue'], resolve),
              meta: { title: '404',requireAuth: true,  }
          },
          {
              path: '/403',
              component: resolve => require(['../components/page/403.vue'], resolve),
              meta: { title: '403' ,requireAuth: true, }
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