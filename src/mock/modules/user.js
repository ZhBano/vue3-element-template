import { Random } from 'mockjs'
import qs from 'qs'
import { success, error } from '../utils'

// const routeList = ['page1', 'page2', 'page3', 'page4']
const routeList = [
  {
    access: 'page1',
    title: '页面1',
    type: 0,
  },
  {
    access: 'page2',
    title: '页面2',
    type: 1,
  },
  {
    access: 'page3',
    title: '页面3',
    type: 2,
  },
  {
    access: 'page4',
    title: '页面4',
    type: 3,
  },
]

export default [
  {
    url: '/mock/user/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = qs.parse(body)
      if (username === 'admin' && password === '123456') {
        return success({
          token: Random.guid(),
        })
      }
      return error('账号密码错误')
    },
  },

  {
    url: '/mock/user/userInfo',
    method: 'post',
    response: (body) => {
      return success({
        name: 'Zbano',
      })
    },
  },

  {
    url: '/mock/user/routes',
    method: 'post',
    response: () => {
      return success({
        routeList,
      })
    },
  },

  {
    url: '/mock/user/modifyroutes',
    method: 'post',
    response: ({ body }) => {
      const { type } = qs.parse(body)
      console.log(type * 1, 'type')
      if (type * 1) {
        routeList.push('page3')
      } else {
        const idx = routeList.indexOf('page3')
        routeList.splice(idx, 1)
        console.log(routeList, 'routeList')
      }
      return success()
    },
  },
]
