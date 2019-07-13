import React, { Fragment, useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { StoreContext } from '../../contexts/StoreContext'
import { Paper, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, Card, CardHeader, CardContent } from '@material-ui/core'
import {
    AccountBalance as InstitutionIcon,
    Assignment as TicIcon,
} from '@material-ui/icons'
import { Title } from '../../components/Typography'
import StudyMetricsForm from '../../components/Forms/StudyMetrics/Metrics'
import { CircularLoader } from '../../components/Progress/Progress'

const useStyles = makeStyles(theme => ({
    card: { },
    cardActions: {
        flex: '3 0 auto',
    },
    studyDetails: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
        },
    },
}))

export const UtahRecommendationPage = props => {
    const [store, ] = useContext(StoreContext)
    const [study, setStudy] = useState(null)
    const classes = useStyles()
    
    useEffect(() => {
        if (store.proposals) {
            setStudy(store.proposals.find(proposal => proposal.proposalID === parseInt(props.match.params.proposalID)))
        }
    }, [store.proposals])

    return (
        <div>

            <Title>Utah Recommendation</Title>
            
            {
                study ? (
                    <Grid container spacing={ 4 }>
                        <Grid item xs={ 12 }>
                            <Card>
                                <CardHeader
                                    title={ study.longTitle }
                                    subheader={ `${ study.shortTitle } (id: ${ study.proposalID })` }
                                />
                                <CardContent>
                                    <List className={ classes.studyDetails }>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar><InstitutionIcon /></Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Submitting Institution"
                                                secondary={ study.submitterInstitution || '-' }
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar><TicIcon /></Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Assigned TIC/RIC"
                                                secondary={ study.assignToInstitution || '-' }
                                            />
                                        </ListItem>
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={ 12 }>
                            <Paper>
                                <StudyMetricsForm proposalID={ study.proposalID } />
                            </Paper>
                        </Grid>
                    </Grid>
                ) : <CircularLoader />
            }
        </div>
    )
}
