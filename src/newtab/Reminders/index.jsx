// 仿照苹果的交互
import React, { useEffect, useState, useRef } from 'react'

import storage from '../../utils/storage'
import icon from './reminders.webp'
import { Button } from '@/components/ui/Button'

function Reminders() {
    const [reminders, setReminders] = useState([])
    const [text, setText] = useState('')
    const [filter, setFilter] = useState('all') // all | active | completed
    const inputRef = useRef(null)

    // load todos on mount
    useEffect(() => {
        let mounted = true
        storage.get('reminders').then((saved) => {
            if (!mounted) return
            if (Array.isArray(saved)) setReminders(saved)
        })
        return () => {
            mounted = false
        }
    }, [])

    // persist whenever todos change
    useEffect(() => {
        storage.set('reminders', reminders)
    }, [reminders])

    const add = (e) => {
        e?.preventDefault()
        const v = text.trim()
        if (!v) return
        const newTodo = { id: Date.now().toString(), text: v, done: false }
        setReminders((s) => [newTodo, ...s])
        setText('')
        inputRef.current?.focus()
    }

    const toggle = (id) => {
        setReminders((s) =>
            s.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
        )
    }

    const remove = (id) => {
        setReminders((s) => s.filter((t) => t.id !== id))
    }

    const clearCompleted = () => {
        setReminders((s) => s.filter((t) => !t.done))
    }

    const edit = (id, newText) => {
        setReminders((s) =>
            s.map((t) => (t.id === id ? { ...t, text: newText } : t))
        )
    }

    const filtered = reminders.filter((t) => {
        if (filter === 'all') return true
        if (filter === 'active') return !t.done
        return t.done
    })

    return (
        <div className="h-full p-4 font-sans">
            <h1 className="mb-3 text-xl font-semibold">Reminders</h1>

            <form onSubmit={add} className="mb-3 flex gap-2">
                <input
                    ref={inputRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add a todo..."
                    className="flex-1 border-b px-3 py-2 outline-0"
                />
                <Button type="submit" disabled={!text.trim()}>
                    Add
                </Button>
            </form>

            <div className="mb-3 flex gap-2">
                <Button
                    onClick={() => setFilter('all')}
                    className={`${filter === 'all' ? 'bg-gray-200' : ''}`}
                >
                    All
                </Button>
                <Button
                    onClick={() => setFilter('active')}
                    className={`${filter === 'active' ? 'bg-gray-200' : ''}`}
                >
                    Active
                </Button>
                <Button
                    onClick={() => setFilter('completed')}
                    className={`${filter === 'completed' ? 'bg-gray-200' : ''}`}
                >
                    Completed
                </Button>
                <div className="ml-auto text-sm text-gray-500">
                    {reminders.filter((t) => !t.done).length} left
                </div>
            </div>

            <ul className="max-h-[320px] space-y-2 overflow-auto pb-2">
                {filtered.length === 0 && (
                    <li className="text-sm text-gray-500">无待办事项</li>
                )}
                {filtered.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={() => toggle(todo.id)}
                        onDelete={() => remove(todo.id)}
                        onEdit={(newText) => edit(todo.id, newText)}
                    />
                ))}
            </ul>

            <div className="mt-3 flex items-center gap-2">
                <Button onClick={clearCompleted}>Clear completed</Button>
                <Button
                    onClick={() => {
                        setReminders([])
                    }}
                >
                    Remove all
                </Button>
            </div>
        </div>
    )
}

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
    const [editing, setEditing] = useState(false)
    const [value, setValue] = useState(todo.text)
    const inputRef = useRef(null)

    useEffect(() => {
        setValue(todo.text)
    }, [todo.text])

    useEffect(() => {
        if (editing) inputRef.current?.focus()
    }, [editing])

    const save = () => {
        const v = value.trim()
        if (!v) {
            // if emptied, delete
            onDelete()
            return
        }
        onEdit(v)
        setEditing(false)
    }

    return (
        <li className="flex items-center gap-2">
            <input
                type="checkbox"
                checked={todo.done}
                onChange={onToggle}
                className="h-4 w-4"
            />
            {!editing ? (
                <div className="flex flex-1 items-center gap-2">
                    <Button
                        onDoubleClick={() => setEditing(true)}
                        className={`flex-1 text-left ${todo.done ? 'text-gray-400 line-through' : ''}`}
                    >
                        {todo.text}
                    </Button>
                    <Button
                        onClick={() => setEditing(true)}
                        className="rounded border px-2 py-1 text-sm"
                    >
                        Edit
                    </Button>
                    <Button
                        onClick={onDelete}
                        className="rounded border px-2 py-1 text-sm"
                    >
                        Del
                    </Button>
                </div>
            ) : (
                <div className="flex flex-1 gap-2">
                    <input
                        ref={inputRef}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') save()
                            if (e.key === 'Escape') {
                                setValue(todo.text)
                                setEditing(false)
                            }
                        }}
                        className="flex-1 border-b px-2 py-1 outline-0"
                    />
                    <Button onClick={save} className="rounded border px-2 py-1">
                        Save
                    </Button>
                    <Button
                        onClick={() => {
                            setValue(todo.text)
                            setEditing(false)
                        }}
                        className="rounded border px-2 py-1"
                    >
                        Cancel
                    </Button>
                </div>
            )}
        </li>
    )
}


export default {
    name: 'Reminders',
    Component: Reminders,
    icon
}