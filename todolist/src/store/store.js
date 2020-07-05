import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const storage = {
    fetch() {
        const arr = []
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i) !== 'loglevel:webpack-dev-server' && localStorage.key(i) !== 'randid'){
                    const item = JSON.parse(localStorage.getItem(localStorage.key(i)))
                    item.editing = false
                    arr.push(item)
                }
            }
        }
        return arr
    }
}

const filters = {
    all: function (todos) {
        return todos;
    },
    active: function (todos) {
        return todos.filter(function (todo) {
            return !todo.completed;
        });
    },
    completed: function (todos) {
        return todos.filter(function (todo) {
            return todo.completed;
        });
    }
};

export const store = new Vuex.Store({
    state: {
        todoItems: storage.fetch(),
        visibility: 'all'
    },
    getters: {
        computedTodos(state) {
            return filters[state.visibility](state.todoItems);
        }
    },
    mutations: {
        addOneItem(state, todoItem) {
            const obj = {completed: false, editing: false, item: todoItem}
            localStorage.setItem(todoItem, JSON.stringify(obj))
            state.todoItems.push(obj)  
        },
        removeOneItem(state, payload) {
            state.todoItems.splice(payload.index, 1)
            localStorage.removeItem(payload.todoItem.item)
        },
        updateOneItem(state, payload) {
            localStorage.removeItem(payload.todoItem.item)
            payload.todoItem.item = payload.updateItem
            localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem))
            state.todoItems[payload.index] = payload.todoItem
        },
        toggleOneCompleted(state, todoItem) {
            localStorage.removeItem(todoItem.item)
            localStorage.setItem(todoItem.item, JSON.stringify(todoItem))
        },
        toggleOneEditing(state, todoItem) {
            localStorage.removeItem(todoItem.item)
            localStorage.setItem(todoItem.item, JSON.stringify(todoItem))
        },
        onVisibility(state, visibility) {
            state.visibility = visibility
        }
    }

})