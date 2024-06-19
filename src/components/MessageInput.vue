<template>
    <div class="message-input">
      <input v-model="content" placeholder="Type a message" @keyup.enter="sendMessage" />
      <button @click="sendMessage">Send</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        content: ''
      };
    },
    methods: {
      sendMessage() {
        if (this.content) {
          this.$emit('send-message', this.content);
          this.content = '';  // Clear message input after sending
        }
      }
    }
  };
  </script>
  
  <style>
  .message-input {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  input {
    padding: 5px;
    flex-grow: 1;
  }
  button {
    padding: 5px 10px;
  }
  </style>
  