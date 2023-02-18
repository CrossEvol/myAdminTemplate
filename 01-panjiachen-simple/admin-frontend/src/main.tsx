import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
// reset浏览器样式
import 'normalize.css'
// 导入store提供组件Provider
import { Provider } from 'react-redux'
// 导入store
import { store } from '@/store/store'
import {
    BrowserRouter,
    RouterProvider,
    createBrowserRouter
} from 'react-router-dom'
import TestOne from '@/test'
import DashBoard from '@/views/dashboard'
import Login from '@/views/login'
import Example from '@/views/Example'
import Form from '@/views/Form'
import Nested from '@/views/Nested'
import Table from '@/views/Example/Table'
import Tree from '@/views/Example/Tree'
import Menu1 from '@/views/Nested/Menu1'
import Menu2 from '@/views/Nested/Menu2'
import MenuOne from '@/views/Nested/Menu1/MenuOne'
import MenuTwo from '@/views/Nested/Menu1/MenuTwo'
import MenuThree from '@/views/Nested/Menu1/MenuThree'
import MenuA from '@/views/Nested/Menu1/MenuTwo/MenuA'
import MenuB from '@/views/Nested/Menu1/MenuTwo/MenuB'
import { router } from './router/router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // 提供store数据
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
)
