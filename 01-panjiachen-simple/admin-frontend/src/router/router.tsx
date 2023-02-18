import App from '@/App'
import TestOne from '@/test'
import Table from '@/views/Example/Table'
import Tree from '@/views/Example/Tree'
import Nested from '@/views/Nested'
import Menu1 from '@/views/Nested/Menu1'
import MenuOne from '@/views/Nested/Menu1/MenuOne'
import MenuThree from '@/views/Nested/Menu1/MenuThree'
import MenuTwo from '@/views/Nested/Menu1/MenuTwo'
import MenuA from '@/views/Nested/Menu1/MenuTwo/MenuA'
import MenuB from '@/views/Nested/Menu1/MenuTwo/MenuB'
import Menu2 from '@/views/Nested/Menu2'
import DashBoard from '@/views/dashboard'
import Login from '@/views/login'
import { Form, createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'dashboard',
                element: <DashBoard />,
                index: true
            },
            {
                path: 'example',
                children: [
                    {
                        path: 'table',
                        element: <Table />,
                        index: true
                    },
                    {
                        path: 'tree',
                        element: <Tree />
                    }
                ]
            },
            {
                path: 'form',
                element: <Form />
            },
            {
                path: 'nested',
                element: <Nested />,
                children: [
                    {
                        path: 'menu1',
                        element: <Menu1 />,
                        children: [
                            {
                                path: 'menu1-1',
                                element: <MenuOne />
                            },
                            {
                                path: 'menu1-2',
                                element: <MenuTwo />,
                                children: [
                                    { path: 'menu1-2-1', element: <MenuA /> },
                                    { path: 'menu1-2-2', element: <MenuB /> }
                                ]
                            },
                            {
                                path: 'menu1-3',
                                element: <MenuThree />
                            }
                        ]
                    },
                    {
                        path: 'menu2',
                        element: <Menu2 />
                    }
                ]
            },
            {
                path: 'dashboard',
                element: <DashBoard />
            }
        ]
    },
    { path: '/login', element: <Login /> },
    { path: '/test', element: <TestOne /> }
])
