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

export const useSingle = (criteria: Criteria,projection: Projection) => {
  const query = useEMSQuery()
  const [data,setData] = useState()
  useEffect(() => {
    const ac = new AbortController()
    query.single(criteria,projection,{signal:ac.signal}).then(setData).catch((err) => {
      if (err.message !== 'canceled') {
        console.error(err)
      }
    })
    return () => ac.abort()
  },[])
  return data
}