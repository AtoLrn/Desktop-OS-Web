class HandleLock {
  #locked: boolean
  constructor() {
    this.#locked = localStorage.getItem('isLocked') === 'true' ? true : false
  }

  isLocked() {
    return this.#locked;
  }

  unlock() {
    this.#locked = false;
    localStorage.setItem('isLocked', 'false')  
  }

  lock() {
    this.#locked = true
    localStorage.setItem('isLocked', 'true')
  }
}

export const handleLock = new HandleLock()
