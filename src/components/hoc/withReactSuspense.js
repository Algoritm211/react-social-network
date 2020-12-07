import React from 'react'

const withReactSuspense = (Component) => {
  return (props) => {
    return (
      <React.Suspense fallback={<div>Загрузка...</div>}>
        <Component {...props} />
      </React.Suspense>
    )
  }
}

export default withReactSuspense