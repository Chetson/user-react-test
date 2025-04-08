import { lazy } from 'react'

export const UserList = lazy(() => import('./UserList/UserList'))
export const UserDetail = lazy(() => import('./UserDetail/UserDetail'))
export const NotFound = lazy(() => import('./NotFound/NotFound'))
