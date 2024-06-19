<template>
    <div class="name-input-container">
      <h2>Enter your name to join the chat</h2>
      <input v-model="name" @keyup.enter="submitName" type="text" placeholder="Your name" />
      <button @click="submitName">Join Chat</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: ''
      };
    },
    methods: {
      submitName() {
        if (this.name.trim() !== '') {
          this.$emit('name-submitted', this.name);
        }
      }
    }
  };
  </script>
  
  <style>
  .name-input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  input {
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    max-width: 300px;
  }
  button {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    width: 100%;
    max-width: 320px;
  }
  button:hover {
    background-color: #0056b3;
  }
  h2 {
    margin-bottom: 20px;
  }
  </style>
  