import React, { useEffect, useState } from 'react'

// === IndexedDB 工具函数 ===
const DB_NAME = 'image-cache-db'
const STORE_NAME = 'images'

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)
    request.onupgradeneeded = e => {
      const db = e.target.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME)
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

const getCachedImage = async (src) => {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const store = tx.objectStore(STORE_NAME)
    const request = store.get(src)
    request.onsuccess = () => resolve(request.result || null)
    request.onerror = () => reject(request.error)
  })
}

const setCachedImage = async (src, data) => {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    const request = store.put(data, src)
    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}

// === React 组件 ===
const Image = ({ src, alt, className, cache = false, ...props }) => {
  const [cachedSrc, setCachedSrc] = useState(cache ? null : src)

  useEffect(() => {
    if (!cache) return

    let isMounted = true

    const loadImage = async () => {
      try {
        // 优先从 IndexedDB 获取
        const cached = await getCachedImage(src)
        if (cached && isMounted) {
          setCachedSrc(cached)
          return
        }

        // 没缓存则下载图片
        const res = await fetch(src)
        const blob = await res.blob()

        const reader = new FileReader()
        reader.onloadend = async () => {
          const base64Data = reader.result
          if (isMounted) setCachedSrc(base64Data)
          try {
            await setCachedImage(src, base64Data)
          } catch (e) {
            console.warn('图片缓存失败:', e)
          }
        }
        reader.readAsDataURL(blob)
      } catch (err) {
        console.error('图片加载失败:', err)
        if (isMounted) setCachedSrc(src)
      }
    }

    loadImage()
    return () => { isMounted = false }
  }, [src, cache])

  return <img src={cachedSrc || src} alt={alt} className={className} {...props} />
}

export default Image
