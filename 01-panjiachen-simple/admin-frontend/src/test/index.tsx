import React, { useEffect } from 'react'
import request from '@/utils/request'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { allCheck, selectTaskList } from '@/store/services/taskSlice'

/* 
  type=> 0-组件 1-导航 2-链接
*/
interface NavItem {
    id: number
    parentId: number
    title: string
    icon?: string
    path?: string
    type: number
    url?: string
}

interface MenuItem {
    id: number
    title: string
    icon?: string
    path?: string
    type: number
    url?: string
    children?: MenuItem[] | null
}

const navItems: NavItem[] = [
    {
        id: 1,
        parentId: 0,
        title: 'DashBoard',
        icon: 'dashboard',
        path: '/dashboard',
        type: 0
    },
    {
        id: 2,
        parentId: 0,
        title: 'Example',
        icon: 'example',
        path: '/example',
        type: 1
    },
    { id: 3, parentId: 0, title: 'Form', icon: 'form', path: '/form', type: 0 },
    {
        id: 4,
        parentId: 0,
        title: 'Nested',
        icon: 'nest',
        path: '/nest',
        type: 1
    },
    {
        id: 5,
        parentId: 0,
        title: 'External Link',
        icon: 'link',
        path: 'https://www.bilibili.com/',
        type: 2
    },
    {
        id: 6,
        parentId: 0,
        title: 'Donate',
        icon: 'donate',
        path: 'https://www.zhihu.com/',
        type: 2
    },
    {
        id: 7,
        parentId: 2,
        title: 'Table',
        icon: 'table',
        path: '/example/table',
        type: 0
    },
    {
        id: 8,
        parentId: 2,
        title: 'Tree',
        icon: 'tree',
        path: '/example/tree',
        type: 0
    },
    {
        id: 9,
        parentId: 4,
        title: 'Menu1',
        path: '/menu1',
        type: 1
    },
    {
        id: 10,
        parentId: 4,
        title: 'Menu2',
        path: '/menu2',
        type: 0
    },
    {
        id: 11,
        parentId: 9,
        title: 'Menu1-1',
        path: '/menu1-1',
        type: 0
    },
    {
        id: 12,
        parentId: 9,
        title: 'Menu1-2',
        path: '/menu1-2',
        type: 1
    },
    {
        id: 13,
        parentId: 9,
        title: 'Menu1-3',
        path: '/menu1-3',
        type: 0
    },
    {
        id: 14,
        parentId: 12,
        title: 'Menu1-2-1',
        path: '/menu1-2-1',
        type: 0
    },
    {
        id: 15,
        parentId: 12,
        title: 'Menu1-2-2',
        path: '/menu1-2-2',
        type: 0
    }
]

const menuItems: MenuItem[] = []

const buildLevelOneMenu = (menuItems: MenuItem[], navItems: NavItem[]) => {
    navItems.forEach(navItem => {
        if (navItem.parentId === 0) {
            if (navItem.type === 1) {
                menuItems.push({ ...navItem, children: [] })
            } else {
                menuItems.push({ ...navItem })
            }
        }
    })
}
buildLevelOneMenu(menuItems, navItems)
// console.log(menuItems)

const buildSubMenus = (subMenuItems: MenuItem[], navItems: NavItem[]) => {
    navItems.forEach(navItem => {
        subMenuItems.forEach(menuItem => {
            if (menuItem.children) {
                if (menuItem.id === navItem.parentId) {
                    if (navItem.type === 1) {
                        menuItem.children.push({ ...navItem, children: [] })
                        buildSubMenus(menuItem.children, navItems)
                    } else {
                        menuItem.children.push({ ...navItem })
                    }
                }
            }
        })
    })
}
buildSubMenus(menuItems, navItems)

// console.log(menuItems)

export default function TestOne() {
    useEffect(() => {
        return () => {}
    }, [])

    return <div>TestOne</div>
}
