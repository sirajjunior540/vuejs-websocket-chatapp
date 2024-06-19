<template>
    <div class="chat-window">
      <ul class="messages">
        <li v-for="(message, index) in messages" :key="index" :class="['message', message.class]" :ref="'message-' + index">
          {{ message.text }}
        </li>
      </ul>
      <div class="form-container">
        <input v-model="messageText" @keyup.enter="sendMessage" type="text" placeholder="Type a message..." autocomplete="off" />
        <button @click="sendMessage" class="send-button">
          <img src="@/assets/sent.svg" alt="Send" />
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { typeWriterEffect } from '../utils/typewriter.js';
  
  export default {
    name: 'ChatWindow',
    props: ['sender'],
    data() {
      return {
        messages: [],
        messageText: '',
        websocket: null
      };
    },
    methods: {
      sendMessage() {
        if (this.messageText.trim() !== '') {
          const message = `${this.sender}: ${this.messageText}`;
          this.ws.send(message);
          this.messageText = '';
        }
      },
      setupWebSocket() {
        this.ws = new WebSocket('ws://localhost:8000/ws');
        this.ws.onmessage = (event) => {
          const message = event.data;
          const messageClass = message.startsWith(this.sender + ":") ? 'left' : 'right';
          this.messages.push({ text: message, class: messageClass });
          this.$nextTick(() => {
            const index = this.messages.length - 1;
            const refName = 'message-' + index;
            const element = this.$refs[refName] ? this.$refs[refName][0] : null;
            if (element) {
              typeWriterEffect(element, message);
            }
          });
        };
        this.ws.onclose = () => {
          console.error('WebSocket connection closed');
        };
        this.ws.onopen = () => {
          this.ws.send(`${this.sender} joined the chat`);
        };
      }
    },
    mounted() {
      this.setupWebSocket();
    },
    beforeUnmount() {
      if (this.ws) {
        this.ws.close();
      }
    }
  };
  </script>
  
  <style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f7f7f7;
    margin: 0;
  }
  
  .chat-window {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .messages {
    list-style-type: none;
    padding: 0;
    height: 300px;
    overflow-y: auto;
    margin: 0 0 20px 0;
  }
  
  .message {
    padding: 10px;
    margin: 5px 0;
    border-radius: 5px;
    max-width: 80%;
    word-wrap: break-word;
  }
  
  .message.left {
    background-color: #d1ffd1;
    align-self: flex-start;
  }
  
  .message.right {
    background-color: #d1e0ff;
    align-self: flex-end;
  }
  
  .form-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .form-container input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .send-button {
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
  }
  
  .send-button img {
    width: 24px;
    height: 24px;
  }
  </style>
  