<script setup lang="ts">
import GenButton from '@/components/atoms/GenButton.vue'
import { io } from 'socket.io-client'
import { ref, useTemplateRef } from 'vue'

const socket = io('http://localhost:1000')

const inputRef = useTemplateRef('inputElement')

const inputMessage = ref<string>('')
const messages = ref<string[]>(['Message 1', 'Message 2', 'Message 3'])

const sendMessage = () => {
    socket.emit('chat', inputMessage.value)
    inputMessage.value = ''

    inputRef.value?.focus()
}

socket.on('connect', () => {
    console.info('connected')
})
socket.on('disconnect', () => {
    console.info('disconnected')
})
socket.on('chat', (message: string) => {
    console.info('message received on chat:', message)
    messages.value.push(message)
    console.info(messages.value)
})
socket.emit('chat', 'Connected to server')
</script>
<template>
    <div class="flex justify-center items-start h-full w-full">
        <div class="flex flex-col items-center justify-center w-1/2 gap-2">
            <h1 class="text-3xl font-bold">Chat</h1>
            <div
                class="flex flex-col border border-black rounded-md w-full h-[300px] overflow-scroll"
            >
                <p
                    v-for="(message, index) in messages"
                    class="border-b border-black ps-4 py-2"
                    :key="index"
                    :class="[index % 2 ? 'bg-blue-200' : 'bg-purple-200']"
                >
                    {{ message }}
                </p>
            </div>
            <input
                class="bg-gray-200 border border-black rounded-md p-2 w-full"
                type="text"
                ref="inputElement"
                v-model="inputMessage"
                placeholder="Type your message"
                @keyup.enter="sendMessage"
            />
            <GenButton
                class="self-end"
                ref="buttonElement"
                @click="sendMessage"
                :text="$t('chat.actions.send')"
            />
        </div>
    </div>
</template>
