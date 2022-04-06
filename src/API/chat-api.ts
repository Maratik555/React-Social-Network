import {ChatType} from '../utils/ChatPage'

type SubscribeType = (messages: ChatType[]) => void

let subscribers = [] as SubscribeType[]

let ws: WebSocket | null = null

const closeHandler = () => {
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessage = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessage))
}

function createChannel() {
    ws?.removeEventListener('close',closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.close()
    const url = `wss://social-network.samuraijs.com/handlers/ChatHandler.ashx`
    ws = new WebSocket(url)
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
}


export  const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers = []
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.close()
    },
    subscribe(callback: SubscribeType) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: SubscribeType) {
        subscribers = subscribers.filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}