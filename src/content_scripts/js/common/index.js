import './autofill.js'
import { format } from 'date-fns'

import storage from '@/lib/storage.js'

const STORAGE_KEY = 'page-time-tracker'

const host = location.host.split('.').at(-2)
const today = format(new Date(), 'yyyy-MM-dd')

const record = storage.get(STORAGE_KEY)
if (!record) storage.set(STORAGE_KEY, [])
