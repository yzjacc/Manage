// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/pro-basic',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/pro-basic',
        component: RouteView,
        meta: { title: '项目管理', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] },
        children: [
          {
            // hidden: demo,
            path: '/dashboard/pro-basic',
            name: 'Basic',
            component: () => import('@/views/pro/Analysis'),
            meta: { title: '项目基本信息', keepAlive: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/dashboard/pro-mess/:pageNo([1-9]\\d*)?',
            name: 'Message',
            component: () => import('@/views/pro/TableList'),
            meta: { title: '项目信息', keepAlive: false, permission: [ 'dashboard' ] }
          },
          {
            path: '/dashboard/pro-person/:pageNo([1-9]\\d*)?',
            name: 'Person',
            component: () => import('@/views/pro/Person'),
            meta: { title: '项目人员', keepAlive: true, permission: [ 'dashboard' ] }
          }
        ]
      },

      // forms
      {
        path: '/form',
        redirect: '/form/worker-mess',
        component: RouteView,
        meta: { title: '劳务信息', icon: 'form', permission: [ 'form' ] },
        children: [
          {
            path: '/form/worker-mess',
            name: 'WorkerMessage',
            component: () => import('@/views/work/TableList'),
            meta: { title: '劳工信息', keepAlive: true, permission: [ 'form' ] }
          },
          {
            path: '/form/worker-manage',
            name: 'Manage',
            component: () => import('@/views/work/CraftMange'),
            meta: { title: '工种管理', keepAlive: true, permission: [ 'form' ] }
          }
        ]
      },

      // list
      {
        path: '/list',
        name: 'list',
        component: RouteView,
        redirect: '/list/table-list',
        meta: { title: '考勤管理', icon: 'table', permission: [ 'table' ] },
        children: [
          {
            path: '/list/check-worker/:pageNo([1-9]\\d*)?',
            name: 'CheckWorker',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/kaoqin/TableList'),
            meta: { title: '考勤机管理', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/list/clock',
            name: 'Clock',
            component: () => import('@/views/kaoqin/StandardList'),
            meta: { title: '打卡记录', keepAlive: true, permission: [ 'table' ] },
            children: [
              {
                path: '/list/search/article',
                name: 'SearchArticles',
                component: () => import('@/views/kaoqin/PermissionList'),
                meta: { title: '日考勤', permission: [ 'table' ] }
              },
              {
                path: '/list/search/project',
                name: 'SearchProjects',
                component: () => import('@/views/kaoqin/PermissionList'),
                meta: { title: '月考勤', permission: [ 'table' ] }
              }
            ]
          },
          {
            path: '/list/card',
            name: 'Card',
            component: () => import('@/views/kaoqin/CardList'),
            meta: { title: '补卡登记', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/list/table',
            name: 'Table',
            component: () => import('@/views/list/search/Search'),
            redirect: '/list/table/article',
            meta: { title: '考勤报表', keepAlive: true, permission: [ 'table' ] },
            children: [
              {
                path: '/list/table/article',
                name: 'SearchArticles',
                component: () => import('@/views/kaoqin/kaoqinribao'),
                meta: { title: '考勤日报', permission: [ 'table' ] }
              },
              {
                path: '/list/table/project',
                name: 'SearchProjects',
                component: () => import('@/views/kaoqin/Permission'),
                meta: { title: '考勤月报', permission: [ 'table' ] }
              }
            ]
          }
        ]
      },
      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/test',
        meta: { title: '疫情测温', icon: 'warning', permission: [ 'exception' ] },
        children: [
          {
            path: '/exception/test',
            name: 'Test',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/test'),
            meta: { title: '疫情报表', permission: [ 'exception' ] }
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')

      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
