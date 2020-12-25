import React from 'react'

// WCP - Wrapped Component Props
function withReactSuspense<WCP> (Component: React.ComponentType<WCP>) {
  return (props: WCP) => {
    return (
      <React.Suspense fallback={<div>Загрузка...</div>}>
        <Component {...props} />
      </React.Suspense>
    )
  }
}

export default withReactSuspense