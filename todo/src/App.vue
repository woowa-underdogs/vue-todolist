<template>
  <div id="app" class="container">
    <h1 class="text-center">Todo App</h1>
    <input 
      :value="todoText"
      class="w-100 p-2"
      placeholder="Type Todo"
      @keyup.enter="addTodo">
    <hr>
    <Todo 
      v-for="todo in todos" 
      :key="todo.id" 
      :todo="todo"
      @click-checkbox="clickCheckBox"
      @click-delete="clickDelete"
    />
  </div>
</template>

<script>
import Todo from '@/components/Todo.vue'
export default {
  components: {
    Todo
  },
  data() {
    return {
      todos: [
        { id: 1, text: '차 사기', checked:false},
        { id: 2, text: '은행 털기', checked:false},
      ],
      todoText: ""
    }
  },
  methods: {
    addTodo(e) {
      this.todos.push(
        {
          id: Math.random(),
          text: e.target.value,
          checked:false
        }
      )
      this.todoText = ""
    },
    clickCheckBox({id, checked}) {
      const index = this.todos.findIndex(todo => {
        return todo.id === id;
      });

      this.todos[index].checked = checked
    },
    clickDelete(id) {
      const index = this.todos.findIndex(todo => {
        return todo.id === id;
      });

      this.todos.splice(index,1)
    }
  }
}
</script>

<style scoped>
</style>