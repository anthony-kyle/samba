import React from 'react'

export function useLocalStorageState({
  key,
  initialValue,
  serialize = JSON.stringify,
  deserialize = JSON.parse,
}) {
  const [state, setState] = React.useState(
    () => deserialize(window.localStorage.getItem(key)) || initialValue,
  )
  const serializedState = serialize(state)
  React.useEffect(() => {
    window.localStorage.setItem(key, serializedState)
  }, [key, serializedState])

  return [state, setState]
}