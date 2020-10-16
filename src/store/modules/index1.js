const index1 = {
    state: {
        attr:'',
        status:'',
        statusStr:'',
        refresh:'',
        listchange:1,
        symbolchange:1,
        code:'',
    },
    mutations: {
      SET_ATTR: (state, attr) => {
        state.attr = attr
      },
      SET_STATUS: (state, status) => {
        state.status = status
      },
      SET_STATUSSTR: (state, statusStr) => {
        state.statusStr = statusStr
      },
      SET_REFRESH: (state, refresh) => {
        state.refresh = refresh
      },
      SET_LISTCHANGE: (state, listchange) => {
        state.listchange = listchange
      },
      SET_SYMBOLCHANGE: (state, symbolchange) => {
        state.symbolchange = symbolchange
      },
      SET_CODE:(state, code) => {
        state.code = code
      },
    },
    actions:{
      setAttr({ commit },attr) {
        commit('SET_ATTR',attr)
      },
      setStatus({ commit },status) {
        commit('SET_STATUS',status)
      },
      setStatusStr({ commit },statusStr) {
        commit('SET_STATUSSTR',statusStr)
      },
      setrefresh({ commit },refresh){
        commit('SET_REFRESH',refresh)
      },
      setlistchange({ commit },listchange){
        commit('SET_LISTCHANGE',listchange)
      },
      setsymbolchange({ commit },symbolchange){
        commit('SET_SYMBOLCHANGE',symbolchange)
      },
      setcode({ commit },code){
        commit('SET_CODE',code)
      }
    }
  }
  
  export default index1