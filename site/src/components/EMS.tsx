import React, { useContext } from 'react'
import { query, store, Options } from '@agrzes/yx-ems-client'
import { Query, Store } from '@agrzes/yx-ems-api'

const EMSContext = React.createContext<{query?: Query, store?: Store}>({})

export const EMS = ({ children, options }: {children:any, options: Options}) => {
  return <EMSContext.Provider value={{query:query(options),store: store(options)}}>{children}</EMSContext.Provider>
}

export const useEMSQuery = () => {
  const {query} = useContext(EMSContext)
  return query
}

export const useEMSStore = () => {
  const {store} = useContext(EMSContext)
  return store
}