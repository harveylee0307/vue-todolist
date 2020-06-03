import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


//localStorage使用
let LS = {
  load () {
    //空陣列要加引號
    return JSON.parse(localStorage.getItem('vue-todos') || '[]')
  },
  save (data) {
    return localStorage.setItem('vue-todos', JSON.stringify(data));
  }
}
//filter各種資料
const filter = {
  all (todos) {
    return todos
  },
  active (todos) {
    return todos.filter(todo => {
      return todo.complete == true;
      // return !todo.complete
    })
  },
  complete (todos) {
    return todos.filter(todo => {
      return todo.complete != true;
      // return todo.complete
    })
  }

}

export default new Vuex.Store({
  strict: true,
  state: {
    todos: [
      { content: 'todo-content', complete: false },
      { content: 'todo-content', complete: true },
      { content: 'todo-content', complete: false },
    ]
  },
  getters: {
    todoIndex (state) {
      //state.router 從vuex-router-sync來
      return filter[state.route.name](state.todos).map(todo => {
        return state.todos.indexOf(todo);
      })
    }
  },
  mutations: {
    SET_TODO (state, data) {
      state.todos = data
      //同步LS(save整份state資料) 
      LS.save(state.todos)
    },
    ADD_TODO (state, data) {
      state.todos.push(data)
      LS.save(state.todos)
    },

    UPDATE_TODO (state, data) {
      //更新特定(todos的第幾筆)資料
      let { index, todoData } = data;
      //直接修改陣列(或物件?)內資料，無法觀測
      // state.todos[index] = todoData;
      state.todos[index].content = todoData.content;
      state.todos[index].complete = todoData.complete;


      LS.save(state.todos)

    },
    DELETE_TODO (state, index) {
      //刪除特定(todos的第幾筆)資料
      state.todos.splice(index, 1)
      LS.save(state.todos)
    }

  },
  actions: {
    //初始化state內容
    //問題一：該在什麼地方執行初始化 app.vue main.js
    INIT_TODOS ({ commit }) {
      //讀取LS並Set到state
      commit('SET_TODO', LS.load());
    }
  },
  modules: {
  }
})
