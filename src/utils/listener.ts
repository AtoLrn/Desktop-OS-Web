interface Subscriptions {
    [key: string]: {
        callback: Function,
        id: string
    }[]
}

class Subscription {
    topic: string
    callback: Function
    id: string
    unsubscribeParent: Function

    constructor(topic: string, callback: Function, id: string, unsubscribe: Function) {
        this.topic = topic
        this.callback = callback
        this.id = id
        this.unsubscribeParent = unsubscribe
    }

    public unsubscribe() {
        this.unsubscribeParent(this.topic, this.id)
    }
}

class EventListener {

    private subscriptions: Subscriptions = {}

    constructor() {
        console.log('subscribe')
    }

    public subscribe(topic: string, callback: Function, getOldMessages: boolean = false) {
        const id = 'test'
        if (this.subscriptions[topic]) this.subscriptions[topic].push({ callback, id})
        else this.subscriptions[topic] = [{ callback, id }]
        return new Subscription(topic, callback, id, this.unsubscribe)
    }

    private unsubscribe = (topic: string, id: string) => {
        console.log('UNSUB', topic, id)
        this.subscriptions[topic] = this.subscriptions[topic].filter(sub => sub.id !== id)
    }

    

    /**
     * post
     */
    public post(topic: string, message: any) {
        this.subscriptions[topic].forEach(sub => sub.callback(message))
    }
}

export const eventListener = new EventListener()