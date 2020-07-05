<template>
  <section class="todoapp">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodo="addOneItem"></TodoInput>
    <TodoList 
      v-bind:propsdata="todoItems" 
      v-on:removeTodo="removeOneItem"
      v-on:updateTodo="updateOneItem"
      v-on:toggleCompleted="toggleOneCompleted"
      v-on:toggleEditing="toggleOneEditing"
      ></TodoList>
    <TodoCount></TodoCount>
  </section>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from  './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoCount from './components/TodoCount.vue'

export default {
  data() {
    return {
      todoItems: []
    }
  },
  methods: {
    addOneItem(todoItem) {
      const obj = {completed: false, editing: false, item: todoItem}
      localStorage.setItem(todoItem, JSON.stringify(obj))
      this.todoItems.push(obj)  
    },
    removeOneItem(payload) {
      this.todoItems.splice(payload.index, 1)
      localStorage.removeItem(payload.todoItem.item)
    },
    updateOneItem(payload) {
      localStorage.removeItem(payload.todoItem.item)
      payload.todoItem.item = payload.updateItem
      localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem))
      this.todoItems[payload.index] = payload.todoItem
    },
    toggleOneCompleted(todoItem) {
      localStorage.removeItem(todoItem.item)
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem))
    },
    toggleOneEditing(todoItem) {
      localStorage.removeItem(todoItem.item)
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem))
    }
  },
  created(){
    if (localStorage.length > 0) {
        for (let i = 0; i < localStorage.length; i++) {
          if (localStorage.key(i) !== 'loglevel:webpack-dev-server' && localStorage.key(i) !== 'randid'){
            const item = JSON.parse(localStorage.getItem(localStorage.key(i)))
            item.editing = false
            this.todoItems.push(item)
          }
        }
    }
  },
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoCount
  }
}
</script>

<style>
html,
body {
    margin: 0;
    padding: 10px;
}

button {
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    font-size: 100%;
    vertical-align: baseline;
    font-family: inherit;
    font-weight: inherit;
    color: inherit;
    -webkit-appearance: none;
    appearance: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body {
    font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.4em;
    background: #f5f5f5;
    color: #4d4d4d;
    min-width: 230px;
    max-width: 550px;
    margin: 0 auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 300;
}

:focus {
    outline: 0;
}

.hidden {
    display: none;
}

.todoapp {
    background: #fff;
    margin: 130px 0 40px 0;
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
    0 25px 50px 0 rgba(0, 0, 0, 0.1);
}
</style>