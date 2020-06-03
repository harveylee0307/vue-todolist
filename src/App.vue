<template>
  <div id="app">
    <div id="todo">
      <Nav />
      <TodoInput />
      <div class="todo-list">
        <TodoItem v-for="index in todoIndex" :key="index" :index="index" />
      </div>

    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import TodoInput from '@/components/TodoInput.vue';
import TodoItem from '@/components/TodoItem.vue';
// import { mapGetter } from 'vuex';
export default {
  components: {
    Nav,
    TodoInput,
    TodoItem
  },
  computed: {
    //從store中取得每筆todo index
    todoIndex () {
      return this.$store.getters['todoIndex'];
    }

  },
  mounted () {
    //如果在main.js做可以嗎？
    this.$store.dispatch('INIT_TODOS');
  }
}
</script>  

<style lang="scss">
body {
  background: #42b983;
  padding: 0;
  margin: 0;
}
#app {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
#todo {
  background-color: #fff;
  width: 400px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(25, 25, 25, 0.5);
  .todo-list {
    padding: 15px;
  }
  input[type='text'] {
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px;
    width: 100%;
  }
}
</style>

