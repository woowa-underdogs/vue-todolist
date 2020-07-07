<template>
  <div>
      <input type="checkbox" :checked="todo.checked" @change="event">
      <span 
        class="ml-3" 
        :style="todo.checked ? 'text-decoration: line-through': ''"
        :class="todo.checked ? 'text-muted' : ''"
      > 
        {{todo.text}}
      </span>
      <button @click="deleteTodo">delete</button>
    </div>
</template>

<script>
export default {
    props: {
        todo : {
            type: Object,
            required: true
        }
    },
    methods: {
        event(e) {
            this.$emit('click-checkbox',
                {
                   id: this.todo.id,
                   checked: e.target.checked
                }
            );
        },
        deleteTodo() {
            this.$emit('click-delete',this.todo.id);
        }
    }
}
</script>

<style scoped>

</style>
