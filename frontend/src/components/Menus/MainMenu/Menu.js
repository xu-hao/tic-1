import React from 'react'
import classnames from 'classnames'
import { makeStyles } from '@material-ui/styles'
import { NavLink } from 'react-router-dom'
import { MenuList, MenuItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core'
import {
    Dashboard as DashboardIcon,
    Description as ProposalsIcon,
    LocationOn as SiteMetricsIcon,
    Share as CollaborationsIcon,
} from '@material-ui/icons'
import { UtahIcon as StudyMetricsIcon } from '../../Icons/Utah'

const useStyles = makeStyles(theme => ({
    nav: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: theme.spacing(1),
        width: '100%',
    },
    menuList: {
        // minWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    menuItem: {
        // ...theme.mixins.debug,
        padding: 0,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 0,
        padding: 0,
        borderRadius: theme.shape.borderRadius,
        transition: 'background-color 250ms',
        letterSpacing: '1px',
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
            '& $listItemIcon': {
                transform: 'scale(1.1)',
            }
        },
    },
    listItemIcon: {
        opacity: 0.8,
        fontSize: '200%',
        transform: 'scale(1)',
        transition: 'transform 250ms',
        padding: 0,
        margin: 0,
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '2rem',
    },
    listItemText: {
        padding: 0,
        margin: 0,
        color: theme.palette.grey[600],
        transition: 'max-width 250ms, opacity 250ms',
    },
    expandedItemText: {
        maxWidth: '180px',
        opacity: 1,
    },
    collapsedItemText: {
        maxWidth: 0,
        opacity: 0,
    },
}))

const menuItems = [
    { text: 'Home', path: '/', icon: DashboardIcon, },
    { text: 'Proposals', path: '/proposals', icon: ProposalsIcon, },
    { text: 'Collaborations', path: '/collaborations', icon: CollaborationsIcon, },
    { text: 'Study Metrics', path: '/study-metrics', icon: StudyMetricsIcon, },
    { text: 'Site Metrics', path: '/site-metrics', icon: SiteMetricsIcon, },
    // { text: 'Site Reports', path: '/site-reports', icon: SiteReportIcon, },
]

const Menu = ({ expanded, clickHandler }) => {
    const classes = useStyles()

    return (
        <nav className={ classes.nav }>
            <MenuList clsasname={ classes.menuList }>
                {
                    menuItems.map(item => (
                        <Tooltip key={ item.path } title={ expanded ? '' : item.text } placement="right">
                            <MenuItem
                                component={ NavLink } exact to={ item.path }
                                className={ classes.menuItem } activeClassName={ classes.active }
                                onClick={ clickHandler }
                            >
                                <ListItemIcon classes={{ root: classes.listItemIcon }}>
                                    <item.icon />
                                </ListItemIcon>
                                <ListItemText primary={ item.text }
                                    classes={{ root: classnames(classes.listItemText, expanded ? classes.expandedItemText : classes.collapsedItemText) }}
                                />
                            </MenuItem>
                        </Tooltip>
                    ))
                }
            </MenuList>
        </nav>
    )
}

export default Menu