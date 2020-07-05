<template>
  <input v-model="newTodoItem" v-on:keyup.enter="addTodoItem" id="new-todo-title" class="new-todo" placeholder="할일을 추가해주세요" autofocus>
</template>

<script>
export default {
    data() {
        return {    
            newTodoItem: ''
        }
    },
    methods: {
        addTodoItem() {
            if (this.newTodoItem === '') {
                return 
            }
            this.$emit('addTodo', this.newTodoItem)
            this.clearInput()
        },
        clearInput() {
            this.newTodoItem = ''
        }
    }
}
</script>

<style>
.todoapp input::-webkit-input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
}

.new-todo {
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    color: inherit;
    padding: 6px;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.new-todo {
    padding: 16px 16px 16px 60px;
    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}

</style>