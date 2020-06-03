<template>
  <div class="todo-item" :class="{'complete':complete}">
    <input type="text" v-if="edit!==null" v-model.trim="edit" v-focus @keyup.enter="submitHandler" @keyup.esc="cancelHandler" @blur="cancelHandler">
    <template v-else>
      <input type="checkbox" v-model="complete">
      <label @dblclick="editHandler">{{todo.content}}</label>
      <button @click="deleteHandler">Delete</button>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      edit: null
    }
  },
  computed: {
    //透過外層props index取Store取資料
    complete: {
      get () {
        return this.$store.state.todos[this.index].complete;
      },
      set (val) {
        this.$store.commit('UPDATE_TODO', {
          index: this.index,
          todoData: {
            content: this.todo.content,
            complete: val
          }
        })
      }
    },
    todo () {
      return this.$store.state.todos[this.index]
    }
  },
  methods: {
    deleteHandler () {
      if (confirm(`是否確認刪除 ${this.todo.content}?`)) {
        this.$store.commit('DELETE_TODO', this.index)
      }
    },
    editHandler () {
      this.edit = this.todo.content;
    },
    submitHandler () {
      if (!this.edit) return;
      this.$store.commit('UPDATE_TODO', {
        index: this.index,
        todoData: {
          content: this.edit,
          complete: this.todo.complete
        }
      })
      //更新之後清除編輯
      this.cancelHandler();
    },
    cancelHandler () {
      this.edit = null
    }
  }
}
</script>

<style lang="scss">
.todo-item {
  padding: 15px 0;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  text-align: left;
  label {
    margin-right: auto;
    width: 100%;
  }
  &.complete {
    label {
      text-decoration: line-through;
      color: #979797;
      opacity: 1;
    }
  }
}
</style>