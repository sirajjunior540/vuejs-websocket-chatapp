<template>
  <div id="app">
    <NameInput v-if="!name" @name-submitted="setName" />
    <ChatWindow v-else :sender="name" />
  </div>
</template>

<script>
import axios from 'axios';
import NameInput from './components/NameInput.vue';
import ChatWindow from './components/ChatWindow.vue';

export default {
  name: 'App',
  components: {
    NameInput,
    ChatWindow
  },
  data() {
    return {
      name: ''
    };
  },
  methods: {
    async setName(name) {
      try {
        const response = await axios.post('http://0.0.0.0:8000/register/', { name });
        this.name = response.data.name;
      } catch (error) {
        console.error("There was an error registering the user:", error);
      }
    }
  }
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
  margin: 0;
  font-family: 'Roboto', sans-serif;
}
</style>
