import { cn } from '@/lib/utils'
import { useRef } from 'react'
// 1寸
// 2寸 = 413px ×  626px
// 上传
// 预览

function isEmptyPixel(data, i) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const a = data[i + 3]

    if (a < 10) return true

    const brightness = 0.299 * r + 0.587 * g + 0.114 * b

    // 白边 或 黑边
    return brightness > 245 || brightness < 10
}
function autoCropImage(img, canvas) {
    const ctx = canvas.getContext('2d')

    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const { data, width, height } = imageData

    let top = 0
    let bottom = height - 1
    let left = 0
    let right = width - 1

    // top
    outer: for (; top < height; top++) {
        for (let x = 0; x < width; x++) {
            const i = (top * width + x) * 4
            if (!isEmptyPixel(data, i)) break outer
        }
    }

    // bottom
    outer: for (; bottom >= 0; bottom--) {
        for (let x = 0; x < width; x++) {
            const i = (bottom * width + x) * 4
            if (!isEmptyPixel(data, i)) break outer
        }
    }

    // left
    outer: for (; left < width; left++) {
        for (let y = 0; y < height; y++) {
            const i = (y * width + left) * 4
            if (!isEmptyPixel(data, i)) break outer
        }
    }

    // right
    outer: for (; right >= 0; right--) {
        for (let y = 0; y < height; y++) {
            const i = (y * width + right) * 4
            if (!isEmptyPixel(data, i)) break outer
        }
    }

    const cropWidth = right - left + 1
    const cropHeight = bottom - top + 1

    if (cropWidth <= 0 || cropHeight <= 0) return

    const cropped = ctx.getImageData(left, top, cropWidth, cropHeight)
    canvas.width = cropWidth
    canvas.height = cropHeight
    ctx.putImageData(cropped, 0, 0)
}

const ImageCropper = () => {
    const canvasRef = useRef(null)

    function loadImage(file) {
        return new Promise((resolve) => {
            const img = new Image()
            img.onload = () => resolve(img)
            img.src = URL.createObjectURL(file)
        })
    }

    async function handleFile(e) {
        const file = e.target.files[0]
        if (!file) return

        const img = await loadImage(file)
        autoCropImage(img, canvasRef.current)
    }

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFile} />
            <br />
            <canvas ref={canvasRef} style={{ maxWidth: '100%' }} className='border' />
        </div>
    )
}

export default ImageCropper
