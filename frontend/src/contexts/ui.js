import { createContext, useContext, useState } from 'react'

const Context = createContext()

export function UIProvider({ children }) {
    const [isSidebarNavCollapsed, setIsSidebarNavCollapsed] = useState(false)

    return (
        <Context.Provider
            value={[isSidebarNavCollapsed, setIsSidebarNavCollapsed]}>
            {children}
        </Context.Provider>
    )
}

export function useUIContext() {
    return useContext(Context)
}
