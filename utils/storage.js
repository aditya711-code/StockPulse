const get = (key, defaultVal = null) => {
    const val = localStorage.getItem(key)

    if (val) return JSON.parse(val)

    return defaultVal
}

const set = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value))
}

export { get, set }
