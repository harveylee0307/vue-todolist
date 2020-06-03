<template>
  <div class="todo-input">
    <input type="text" placeholder="請輸入待辦事項" v-model.trim="todo" @keyup.enter="submitHandler" v-focus />
  </div>
</template>

<script>
export default {
  //data、methods設在此，獨立作業，直接送去store就好
  data () {
    return {
      todo: ''
    }
  },
  methods: {
    submitHandler () {
      //如果沒有輸入
      if (!this.todo) return
      this.$store.commit('ADD_TODO', { content: this.todo, complete: false })
      this.todo = '';
    }
  }}
</script>

<style lang="scss">
.todo-input {
  padding: 0 10px;
}
</style>