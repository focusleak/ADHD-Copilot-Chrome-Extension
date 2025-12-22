const FACES = ['front', 'back', 'left', 'right', 'top', 'bottom']

const faceContent = {
    front: 'A',
    back: 'B',
    left: 'C',
    right: 'D',
    top: 'E',
    bottom: 'F',
}

const NETS = [
    // 十字型
    {
        front: { up: 'top', down: 'bottom', left: 'left', right: 'right' },
        right: { right: 'back' },
    },

    // 另一种
    {
        front: { up: 'top', left: 'left', right: 'right' },
        right: { down: 'bottom' },
        bottom: { right: 'back' },
    },

    // 再一种
    {
        front: { up: 'top', down: 'bottom', right: 'right' },
        right: { up: 'back' },
        left: { down: 'bottom' },
    },
]
// layout.js
const DIR_OFFSET = {
    up: [0, -1],
    down: [0, 1],
    left: [-1, 0],
    right: [1, 0],
}

function computeLayout(net) {
    const positions = {}
    const visited = new Set()

    function dfs(face, x, y) {
        positions[face] = { x, y }
        visited.add(face)

        const neighbors = net[face]
        if (!neighbors) return

        for (const dir in neighbors) {
            const next = neighbors[dir]
            if (visited.has(next)) continue

            const [dx, dy] = DIR_OFFSET[dir]
            dfs(next, x + dx, y + dy)
        }
    }

    // 以 front 为根
    dfs('front', 0, 0)
    return normalize(positions)
}

// 防止出现负坐标，整体平移到 (0,0) 起
function normalize(pos) {
    const xs = Object.values(pos).map((p) => p.x)
    const ys = Object.values(pos).map((p) => p.y)
    const minX = Math.min(...xs)
    const minY = Math.min(...ys)

    const out = {}
    for (const key in pos) {
        out[key] = {
            x: pos[key].x - minX,
            y: pos[key].y - minY,
        }
    }
    return out
}

function randomNet() {
    return NETS[Math.floor(Math.random() * NETS.length)]
}
const SIZE = 80

function CubeNet() {
    const net = randomNet()
    const layout = computeLayout(net)

    return (
        <div
            style={{
                position: 'relative',
                width: 5 * SIZE,
                height: 5 * SIZE,
            }}
        >
            {Object.entries(layout).map(([face, { x, y }]) => (
                <div
                    key={face}
                    style={{
                        position: 'absolute',
                        left: x * SIZE,
                        top: y * SIZE,
                        width: SIZE,
                        height: SIZE,
                        border: '2px solid #333',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 24,
                        background: '#fafafa',
                    }}
                >
                    {faceContent[face]}
                </div>
            ))}
        </div>
    )
}
export default CubeNet
