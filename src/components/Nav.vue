<template>
  <div id="nav">
    <router-link to="/">全部</router-link> |
    <router-link to="/active">已完成</router-link> |
    <router-link to="/complete">未完成</router-link>
  </div>
</template>

<script>
export default {
  name: 'Nav',
}
</script>

<style lang="scss">
#nav {
  padding: 30px 15px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>