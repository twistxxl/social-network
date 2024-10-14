
export type statusType = 'pending' | 'ready'
type EventsNames = 'MESSAGES_RECEIVED' | 'STATUS_CHANGED'
export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
type MessageReceivedSubscribesType = (messages: ChatMessageType[]) => void
type StatusChangedSubscribesType = (status: statusType[]) => void

let subscribers = {
    'MESSAGES_RECEIVED': [] as MessageReceivedSubscribesType[],
    'STATUS_CHANGED': [] as StatusChangedSubscribesType[],
}

let ws: WebSocket | null = null
const closeHandler = () => {
    setTimeout(() => createChannel(), 3000)
    notifySubscribersAboutStatus('pending')
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers.MESSAGES_RECEIVED .forEach(s => s(newMessages))
}
const openHandler = () => {
    notifySubscribersAboutStatus('ready')
}
const errorHandler = () => {
    // @ts-ignore
    notifySubscribersAboutStatus('error')
}

const cleanUp = () => {
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.removeEventListener('open', openHandler)
        ws?.removeEventListener('error', errorHandler)
}
const notifySubscribersAboutStatus = (status: statusType) => {
    subscribers.STATUS_CHANGED.forEach(s => s([status]))
}
const createChannel = () => {
    cleanUp()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus('pending')
    ws?.addEventListener('close', closeHandler)
    ws?.addEventListener('message', messageHandler)
    ws?.addEventListener('open', openHandler)
    ws?.addEventListener('error', errorHandler)
}


export const chatAPI = {
    start() {
        createChannel()
    },
    stop(){
        subscribers.MESSAGES_RECEIVED = []
        subscribers.STATUS_CHANGED = []
        cleanUp()
        ws?.close()
        ws = null
    },
    subscribe(eventName: EventsNames, callback: MessageReceivedSubscribesType | StatusChangedSubscribesType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventsNames, callback: MessageReceivedSubscribesType | StatusChangedSubscribesType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    },
    

}