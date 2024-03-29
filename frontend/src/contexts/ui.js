import { createContext, useContext, useState } from 'react'

const Context = createContext({ filterQuery: '' })

export function UIProvider({ children }) {
    const [isSidebarNavCollapsed, setIsSidebarNavCollapsed] = useState(false)
    const [userContext, setUserContext] = useState()
    const [filterQuery, setFilterQuery] = useState('')
    const [workSpace, setWorkSpace] = useState()
    const [withDiscount, setWithDiscount] = useState(false)

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
                withDiscount,
                setWithDiscount,
            }}>
            {children}
        </Context.Provider>
    )
}

export function useUIContext() {
    return useContext(Context)
}
