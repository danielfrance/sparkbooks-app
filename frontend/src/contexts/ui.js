import { createContext, useContext, useState } from 'react'

const Context = createContext()

export function UIProvider({ children }) {
    const [isSidebarNavCollapsed, setIsSidebarNavCollapsed] = useState(false)
    const [userContext, setUserContext] = useState()
    const [filterQuery, setFilterQuery] = useState('')

    return (
        <Context.Provider
            value={{
                isSidebarNavCollapsed,
                setIsSidebarNavCollapsed,
                userContext,
                setUserContext,
                filterQuery,
                setFilterQuery,
            }}>
            {children}
        </Context.Provider>
    )
}

export function useUIContext() {
    return useContext(Context)
}
