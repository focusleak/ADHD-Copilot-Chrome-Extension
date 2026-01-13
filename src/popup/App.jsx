import { ErrorBoundary } from '@/components'

import QuickNotes from '@/popup/QuickNotes'
const App = () => {
    return (
        <>
            <ErrorBoundary>
                <QuickNotes />
            </ErrorBoundary>
        </>
    )
}
export default App
