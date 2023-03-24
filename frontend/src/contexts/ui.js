import { createContext, useContext, useState } from 'react'

const Context = createContext()

export function UIProvider({ children }) {
    const [isSidebarNavCollapsed, setIsSidebarNavCollapsed] = useState(false)
    const [userContext, setUserContext] = useState()
    const [filterQuery, setFilterQuery] = useState('')
    const [workSpace, setWorkSpace] = useState()
    const [cookie, setCookie] = useState()

    return (
        <Context.Provider
            value={{
                isSidebarNavCollapsed,
                setIsSidebarNavCollapsed,
                userContext,
                setUserContext,
                filterQuery,
                setFilterQuery,
                workSpace,
                setWorkSpace,
                cookie,
                setCookie,
            }}>
            {children}
        </Context.Provider>
    )
}

export function useUIContext() {
    return useContext(Context)
}
