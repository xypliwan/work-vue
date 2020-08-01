import Storage from 'web-storage-cache'

const localStorage = new Storage()

// 设置
export function setLocalStorage(key, value) {
<<<<<<< HEAD
  return localStorage.set(key, value)
=======
    return localStorage.set(key, value)
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
}

//获取指定key
export function getLocalStorage(key) {
<<<<<<< HEAD
  return localStorage.get(key)
=======
    return localStorage.get(key)
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
}

// 清除指定key
export function removeLocalStorage(key) {
<<<<<<< HEAD
  return localStorage.delete(key)
=======
    return localStorage.delete(key)
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
}

//清除所有
export function clearLocalStorage() {
<<<<<<< HEAD
  return localStorage.clear()
}
=======
    return localStorage.clear()
}
>>>>>>> 41772733ca44d6706986c1fb742036e1c412ca78
