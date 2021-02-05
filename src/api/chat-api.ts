let ws: WebSocket | null = null


let subscribers = {
  'messages-consumers': [] as SubscribersType,
  'status-changers': [] as StatusChangersType,
}


const closeHandler = () => {
  changeStatusHandler('pending')
  setTimeout(createChannel, 3000)
}

const subscribeMessages = (event: MessageEvent) => {
  const newMessages = JSON.parse(event.data)
  subscribers['messages-consumers'].forEach(subscriber => subscriber(newMessages))
}

const changeStatusHandler = (status: StatusType) => {
  subscribers["status-changers"].forEach(statusChanger => {
    statusChanger(status)
  })
}

const openSocketHandler = () => {
  changeStatusHandler('ok')
}

const wsErrorHandler = () => {
  changeStatusHandler('pending')
  console.log('error')
}

const cleanUp = () => {
  ws?.removeEventListener('message', subscribeMessages)
  ws?.removeEventListener('open', openSocketHandler)
  ws?.removeEventListener('error', wsErrorHandler)
  ws?.addEventListener('close', closeHandler)
}

function createChannel() {
  cleanUp()
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  changeStatusHandler('pending')
  ws.addEventListener('close', closeHandler)
  ws.addEventListener('message', subscribeMessages)
  ws.addEventListener('open', openSocketHandler)
  ws.addEventListener('error', wsErrorHandler)
}


export const ChatAPI = {
  start() {
    createChannel()
  },

  subscribe(callbackName: keyof typeof subscribers, callback: Subscriber | StatusChanger) {
    // @ts-ignore
    subscribers[callbackName].push(callback)
  },

  unsubscribe(callbackName: keyof typeof subscribers, callback: Subscriber | StatusChanger) {
    // @ts-ignore
    subscribers[callbackName] = subscribers[callbackName].filter(subscriber => subscriber !== callback)
  },

  sendMessage(message: string) {
    ws?.send(message)
  },

  stop() {
    subscribers = {"messages-consumers": [], "status-changers": []}
    cleanUp()
  }
}


type Subscriber = (messages: Array<MessageType>) => void
type StatusChanger = (status: StatusType) => void

type StatusChangersType = Array<StatusChanger>
type SubscribersType = Array<Subscriber>

export type MessageType = {
  message: string,
  photo: string | null,
  userId: number,
  userName: string
}

export type StatusType = 'pending' | 'ok'
