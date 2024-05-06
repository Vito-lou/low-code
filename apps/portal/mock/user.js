
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
    userInfo: {
      roles: ['admin'],
      introduction: 'I am a super administrator',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Super Admin',
    },
    menuList: [
      {
        id: "1",
        path: '/dashboard',
        auth: true,
        title: '首页',
        pageKey: '/dashboard',
        iconClass: 'MailOutlined',
        parentId: '0',
      },
      {
        id: "2",
        path: '/system',
        auth: true,
        title: '系统管理',
        iconClass: 'AppstoreOutlined',
        parentId: '0'
      },
      {
        id: "3",
        path: '/system/menu',
        auth: true,
        title: '菜单管理',
        pageKey: '/system/menu',
        iconClass: '',
        parentId: '2',
      },
      {
        id: "4",
        path: '/system/theme',
        auth: true,
        title: '主题管理-隐藏菜单',
        pageKey: '/system/theme',
        isHidden: false,
        iconClass: '',
        parentId: '2',
      },
      {
        id: "5",
        path: '/test',
        auth: true,
        title: '测试隐藏菜单',
        pageKey: '/test',
        isHidden: true,
        iconClass: '',
        parentId: '0',
      },
    ]
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/vue-element-admin/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue-element-admin/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-element-admin/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
