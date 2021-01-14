let ws: WebSocket | null = null


let subscribers = [] as SubscribersType


const closeHandler = () => {
  setTimeout(createChannel, 5000)
}

const subscribeMessages = (event: MessageEvent) => {
  const newMessages = JSON.parse(event.data)
  subscribers.forEach(subscriber => subscriber(newMessages))
}

function createChannel() {
  ws?.removeEventListener('message', subscribeMessages)
  ws?.removeEventListener('close', closeHandler)
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  ws.addEventListener('close', closeHandler)
  ws.addEventListener('message', subscribeMessages)
}


export const ChatAPI = {

  start() {
    createChannel()
  },

  subscribe(callback: Subscriber) {
    subscribers.push(callback)

  },
  unsubscribe(callback: Subscriber) {
    subscribers = subscribers.filter(sunbscr => sunbscr !== callback)
  },

  sendMessage(message: string) {
    ws?.send(message)
  },

  stop() {
    subscribers= []
    ws?.removeEventListener('message', subscribeMessages)
    ws?.removeEventListener('close', closeHandler)
  }
}


type Subscriber = (messages: Array<MessageType>) => void

type SubscribersType = Array<Subscriber>

export type MessageType = {
  message: string,
  photo: string | null,
  userId: number,
  userName: string
}
