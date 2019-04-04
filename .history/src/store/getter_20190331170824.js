const getters = {
    token: state => state.user.token,
    roles: state => state.user.roles,
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,
  
  }
  export default getters