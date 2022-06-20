<template>
  <div id="app">
    <a href="javascript:;" @click="onClick">test</a>
  </div>
</template>

<script>
import createDialog from '@zewen/create-dialog'
import HelloWord from './components/HelloWorld.vue'
export default {
  name: 'App',
  mixins: [createDialog('dialog', HelloWord, {
    onUpdate () {
      return new Promise(function(resolve) {
        setTimeout(() => {
          resolve({
            success: true,
            message: 'aklfjsjfjsljflkjsj',
            data: [1,2,3]
          })
        }, 400);
      })
    },
    dialogProps: {
      width: '80%'
    },
    buttons: {cancel: '关闭'}
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
