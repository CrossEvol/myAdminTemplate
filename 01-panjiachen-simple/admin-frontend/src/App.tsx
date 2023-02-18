import React, { useState } from 'react'
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
        path:'menu1',
        type: 1
    },
    {
        id: 10,
        parentId: 4,
        title: 'Menu2',
        path: '/menu2',
        type: 1
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
    },
]

export default function App() {
    const navigate = useNavigate()
    const [openExample, setOpenExample] = React.useState(false)
    const [openNested, setOpenNested] = React.useState(false)
    const [openMenu1, setOpenMenu1] = React.useState(false)
    const [openMenu1_2, setOpenMenu1_2] = React.useState(false)

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

    return (
        <AppContainer>
            <LeftAside>
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
                    <ListItemButton
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
                                    {/* <StarBorder /> */}
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
                                            {/* <StarBorder /> */}
                                        </ListItemIcon>
                                        <ListItemText primary="Menu1-1" />
                                    </ListItemButton>
                                    <ListItemButton
                                        sx={{ pl: 6 }}
                                        onClick={handleClickMenu1_2}
                                    >
                                        <ListItemIcon>
                                            {/* <StarBorder /> */}
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
                                                    {/* <StarBorder /> */}
                                                </ListItemIcon>
                                                <ListItemText primary="Menu1-2-1" />
                                            </ListItemButton>
                                            <ListItemButton sx={{ pl: 8 }}>
                                                <ListItemIcon>
                                                    {/* <StarBorder /> */}
                                                </ListItemIcon>
                                                <ListItemText primary="Menu1-2-2" />
                                            </ListItemButton>
                                        </List>
                                    </Collapse>
                                    <ListItemButton sx={{ pl: 6 }}>
                                        <ListItemIcon>
                                            {/* <StarBorder /> */}
                                        </ListItemIcon>
                                        <ListItemText primary="Menu1-3" />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    {/* <StarBorder /> */}
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
                </List>
            </LeftAside>
            <RightMain>
                <Outlet />
            </RightMain>
        </AppContainer>
    )
}
