class Cache {
  getItem(key: string) {
    const item = localStorage.getItem(key)
    if (item) {
      return JSON.parse(item)
    }
  }

  setItem(key: string, value: any) {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    )
  }

  delete(key: string) {
    localStorage.removeItem(key)
  }

  clear() {
    localStorage.clear()
  }
}

export default new Cache()
