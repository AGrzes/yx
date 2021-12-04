import React, { useContext, useEffect, useState } from 'react'
import { query, store, Options, QueryClient } from '@agrzes/yx-ems-client'
import { Criteria, Projection, Store } from '@agrzes/yx-ems-api'

const EMSContext = React.createContext<{query?: QueryClient, store?: Store}>({})

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

export function useSingle<T>(criteria: Criteria,projection: Projection):T {
  const query = useEMSQuery()
  const [data,setData] = useState<T>()
  useEffect(() => {
    const ac = new AbortController()
    query.single<T>(criteria,projection,{signal:ac.signal}).then(setData).catch((err) => {
      if (err.message !== 'canceled') {
        console.error(err)
      }
    })
    return () => ac.abort()
  },[])
  return data
}

export function useAll<T>(criteria?: Criteria,projection?: Projection):T[] {
  const query = useEMSQuery()
  const [data,setData] = useState<T[]>()
  useEffect(() => {
    const ac = new AbortController()
    query.all<T>(criteria,projection,{signal:ac.signal}).then(setData).catch((err) => {
      if (err.message !== 'canceled') {
        console.error(err)
      }
    })
    return () => ac.abort()
  },[])
  return data
}