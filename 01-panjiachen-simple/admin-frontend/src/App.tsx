import React, { useEffect, useState } from 'react'
import DashBoard from './views/dashboard'
import styled from 'styled-components'
import {
    Dashboard,
    ExpandLess,
    ExpandMore,
    StarBorder
} from '@mui/icons-material'
import {
    List,
    ListSubheader,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse
} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import DashboardIcon from '@mui/icons-material/Dashboard'
import WifiTetheringIcon from '@mui/icons-material/WifiTethering'
import BackupTableIcon from '@mui/icons-material/BackupTable'
import LineStyleIcon from '@mui/icons-material/LineStyle'
import TableChartIcon from '@mui/icons-material/TableChart'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import { Outlet, useNavigate } from 'react-router'

const AppContainer = styled.div`
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
`

const LeftAside = styled.div`
    /* background-color: red; */
    width: 15%;
    height: 100%;
`

const RightMain = styled.div`
    background-color: #aeaee9;
    width: 85%;
    height: 100%;
`

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

/* 
  level 层级 1-一级 2-二级 3-三级，计算距离的时候乘以2就可以了
*/
interface MenuItem {
    id: number
    title: string
    icon?: string
    path?: string
    type: number
    url?: string
    level: number
    children?: MenuItem[] | null
}

interface OpenItem {
    id: number
    open: boolean
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
        url: 'https://www.bilibili.com/',
        type: 2
    },
    {
        id: 6,
        parentId: 0,
        title: 'Donate',
        icon: 'donate',
        url: 'https://www.zhihu.com/',
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
        path: '/nested/menu1',
        type: 1
    },
    {
        id: 10,
        parentId: 4,
        title: 'Menu2',
        path: '/nested/menu2',
        type: 0
    },
    {
        id: 11,
        parentId: 9,
        title: 'Menu1-1',
        path: '/nested/menu1/menu1-1',
        type: 0
    },
    {
        id: 12,
        parentId: 9,
        title: 'Menu1-2',
        path: '/nested/menu1/menu1-2',
        type: 1
    },
    {
        id: 13,
        parentId: 9,
        title: 'Menu1-3',
        path: '/nested/menu1/menu1-3',
        type: 0
    },
    {
        id: 14,
        parentId: 12,
        title: 'Menu1-2-1',
        path: '/nested/menu1/menu1-2/menu1-2-1',
        type: 0
    },
    {
        id: 15,
        parentId: 12,
        title: 'Menu1-2-2',
        path: '/nested/menu1/menu1-2/menu1-2-2',
        type: 0
    }
]

const mapIconStr2IconComponent = (iconStr: string) => {
    switch (iconStr) {
        case 'dashboard': {
            return <DashboardIcon />
        }
        case 'example': {
            return <WifiTetheringIcon />
        }
        case 'form': {
            return <BackupTableIcon />
        }
        case 'nest': {
            return <LineStyleIcon />
        }
        case 'link': {
            return <OpenInNewIcon />
        }
        case 'donate': {
            return <VolunteerActivismIcon />
        }
        case 'table': {
            return <TableChartIcon />
        }
        case 'tree': {
            return <AccountTreeIcon />
        }
        default: {
            return <React.Fragment></React.Fragment>
        }
    }
}

export default function App() {
    const navigate = useNavigate()
    let flag = true
    const [openExample, setOpenExample] = React.useState(false)
    const [openNested, setOpenNested] = React.useState(false)
    const [openMenu1, setOpenMenu1] = React.useState(false)
    const [openMenu1_2, setOpenMenu1_2] = React.useState(false)
    const [openList, setOpenList] = React.useState<OpenItem[]>([])

    const handleClickExample = () => {
        setOpenExample(!openExample)
    }
    const handleClickNested = () => {
        setOpenNested(!openNested)
    }
    const handleClickMenu1 = () => {
        setOpenMenu1(!openMenu1)
    }
    const handleClickMenu1_2 = () => {
        setOpenMenu1_2(!openMenu1_2)
    }
    /* ---------------------------生成menuList开始 */

    const menuItems: MenuItem[] = []

    const buildLevelOneMenu = (menuItems: MenuItem[], navItems: NavItem[]) => {
        navItems.forEach(navItem => {
            if (navItem.parentId === 0) {
                if (navItem.type === 1) {
                    menuItems.push({ ...navItem, children: [], level: 1 })
                } else {
                    menuItems.push({ ...navItem, level: 1 })
                }
            }
        })
    }
    buildLevelOneMenu(menuItems, navItems)

    const buildSubMenus = (subMenuItems: MenuItem[], navItems: NavItem[]) => {
        navItems.forEach(navItem => {
            subMenuItems.forEach(menuItem => {
                if (menuItem.children) {
                    if (menuItem.id === navItem.parentId) {
                        if (navItem.type === 1) {
                            menuItem.children.push({
                                ...navItem,
                                children: [],
                                level: menuItem.level + 1
                            })
                            buildSubMenus(menuItem.children, navItems)
                        } else {
                            menuItem.children.push({
                                ...navItem,
                                level: menuItem.level + 1
                            })
                        }
                    }
                }
            })
        })
    }
    buildSubMenus(menuItems, navItems)

    /* ---------------------------生成menuList开始 */

    useEffect(() => {
        if (flag) {
            console.log(menuItems)
            const newOpenList = openList
            const bulidOpenList = (subMenuItems: MenuItem[]) => {
                subMenuItems.forEach(item => {
                    if (item.children) {
                        newOpenList.push({ id: item.id, open: false })
                        bulidOpenList(item.children)
                    }
                })
            }
            bulidOpenList(menuItems)
            setOpenList(newOpenList)
        }

        return () => {
            flag = false
        }
    }, [])

    const createMenuList = (menuItems: MenuItem[]) => {
        return menuItems.map(item =>
            item.type === 1 ? (
                <React.Fragment key={item.id}>
                    <ListItemButton
                        sx={{ pl: 2 * item.level }}
                        onClick={() => {
                            console.log('first')
                            setOpenList(
                                openList.map(o =>
                                    o.id === item.id
                                        ? { ...o, open: !o.open }
                                        : { ...o }
                                )
                            )
                        }}
                    >
                        <ListItemIcon>
                            {item.icon && mapIconStr2IconComponent(item.icon)}
                        </ListItemIcon>
                        <ListItemText primary={item.title} />
                        {openList.find(i => i.id === item.id)?.open ? (
                            <ExpandLess />
                        ) : (
                            <ExpandMore />
                        )}
                    </ListItemButton>
                    <Collapse
                        in={openList.find(i => i.id === item.id)?.open}
                        timeout="auto"
                        unmountOnExit
                    >
                        <List component="div" disablePadding>
                            {item.children && createMenuList(item.children)}
                        </List>
                    </Collapse>
                </React.Fragment>
            ) : item.type === 2 ? (
                <ListItemButton
                    sx={{pl:item.level*2}}
                    key={item.id}
                    onClick={() => window.open(item.url)}
                >
                    <ListItemIcon>
                        {item.icon && mapIconStr2IconComponent(item.icon)}
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                </ListItemButton>
            ) : (
                <ListItemButton
                    sx={{pl:item.level*2}}
                    key={item.id}
                    onClick={() =>
                        navigate(`${item.path}`, {
                            replace: false
                        })
                    }
                >
                    <ListItemIcon>
                        {item.icon && mapIconStr2IconComponent(item.icon)}
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                </ListItemButton>
            )
        )
    }

    return (
        <AppContainer>
            <LeftAside>
              {/* 暂时保留，因为可以用来作最初版本的实例 */}
             <> {/* <List
                    sx={{
                        width: '100%',
                        maxWidth: 360
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader
                            component="div"
                            id="nested-list-subheader"
                        >
                            Menu List Items
                        </ListSubheader>
                    }
                >
                    <ListItemButton
                        sx={{ pl: 2 }}
                        onClick={() =>
                            navigate('/dashboard', { replace: false })
                        }
                    >
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                    <ListItemButton onClick={handleClickExample}>
                        <ListItemIcon>
                            <WifiTetheringIcon />
                        </ListItemIcon>
                        <ListItemText primary="Example" />
                        {openExample ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openExample} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton
                                sx={{ pl: 4 }}
                                onClick={() =>
                                    navigate('/example/table', {
                                        replace: false
                                    })
                                }
                            >
                                <ListItemIcon>
                                    <TableChartIcon />
                                </ListItemIcon>
                                <ListItemText primary="Table" />
                            </ListItemButton>
                            <ListItemButton
                                sx={{ pl: 4 }}
                                onClick={() =>
                                    navigate('/example/tree', {
                                        replace: false
                                    })
                                }
                            >
                                <ListItemIcon>
                                    <AccountTreeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Tree" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <ListItemButton>
                        <ListItemIcon>
                            <BackupTableIcon />
                        </ListItemIcon>
                        <ListItemText primary="Form" />
                    </ListItemButton>
                    <ListItemButton onClick={handleClickNested}>
                        <ListItemIcon>
                            <LineStyleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Nested" />
                        {openNested ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openNested} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton
                                sx={{ pl: 4 }}
                                onClick={handleClickMenu1}
                            >
                                <ListItemIcon>
                                </ListItemIcon>
                                <ListItemText primary="Menu1" />
                                {openMenu1 ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse
                                in={openMenu1}
                                timeout="auto"
                                unmountOnExit
                            >
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 6 }}>
                                        <ListItemIcon>
                                        </ListItemIcon>
                                        <ListItemText primary="Menu1-1" />
                                    </ListItemButton>
                                    <ListItemButton
                                        sx={{ pl: 6 }}
                                        onClick={handleClickMenu1_2}
                                    >
                                        <ListItemIcon>
                                        </ListItemIcon>
                                        <ListItemText primary="Menu1-2" />
                                        {openMenu1_2 ? (
                                            <ExpandLess />
                                        ) : (
                                            <ExpandMore />
                                        )}
                                    </ListItemButton>
                                    <Collapse
                                        in={openMenu1_2}
                                        timeout="auto"
                                        unmountOnExit
                                    >
                                        <List component="div" disablePadding>
                                            <ListItemButton sx={{ pl: 8 }}>
                                                <ListItemIcon>
                                                </ListItemIcon>
                                                <ListItemText primary="Menu1-2-1" />
                                            </ListItemButton>
                                            <ListItemButton sx={{ pl: 8 }}>
                                                <ListItemIcon>
                                                </ListItemIcon>
                                                <ListItemText primary="Menu1-2-2" />
                                            </ListItemButton>
                                        </List>
                                    </Collapse>
                                    <ListItemButton sx={{ pl: 6 }}>
                                        <ListItemIcon>
                                        </ListItemIcon>
                                        <ListItemText primary="Menu1-3" />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                </ListItemIcon>
                                <ListItemText primary="Menu2" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <ListItemButton>
                        <ListItemIcon>
                            <OpenInNewIcon />
                        </ListItemIcon>
                        <ListItemText primary="External Link" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <VolunteerActivismIcon />
                        </ListItemIcon>
                        <ListItemText primary="Donate" />
                    </ListItemButton>
                </List> */}</>
               
                <List
                    sx={{
                        width: '100%',
                        maxWidth: 360
                        // bgcolor: 'background.paper'
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader
                            component="div"
                            id="nested-list-subheader"
                        >
                            Menu List Items
                        </ListSubheader>
                    }
                >
                    {menuItems.length > 0 && createMenuList(menuItems)}
                </List>
            </LeftAside>
            <RightMain>
                <Outlet />
            </RightMain>
        </AppContainer>
    )
}
