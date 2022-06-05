<template>
  <div id="app">
    <a href="javascript:;" @click="onClick">test</a>
  </div>
</template>

<script>
import createDialog from 'create-dialog'
import HelloWord from './components/HelloWorld.vue'
export default {
  name: 'App',
  mixins: [createDialog('dialog', HelloWord, {
    onUpdate () {},
    dialogProps: {
      title: 'test',
      width: '80%'
    }
  })],
  components: {
  },
  methods: {
    onClick () {
      this.dialog.show({
        a: 1,
        b: 2
      })
    }
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
