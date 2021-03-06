import React, { Fragment, useContext } from 'react'
import { Heading } from '../components/Typography/Typography'
import {
    Grid, FormControl, FormGroup, FormLabel, FormControlLabel, Checkbox, FormHelperText, Switch,
    Select, OutlinedInput, MenuItem,
} from '@material-ui/core'
import DangerZone from '../components/Forms/DangerZone'
import { SettingsContext } from '../contexts/SettingsContext'
import { CollapsibleCard } from '../components/CollapsibleCard/CollapsibleCard'

const SettingsPage = props => {
    const [settings, setSettings] = useContext(SettingsContext)

    const handleChangeVisibleColumns = event => {
        const visibleColumns = { ...settings.tables.visibleColumns, [event.target.value]: event.target.checked }
        setSettings({ ...settings, tables: { ...settings.tables, visibleColumns } })
    }

    const handleChangePageSize = event => {
        const tableSettings = { ...settings.tables, pageSize: event.target.value }
        setSettings({ ...settings, tables: tableSettings })
    }

    const handleToggleHideEmptyGroups = event => {
        const chartSettings = { ...settings.charts, [event.target.value]: event.target.checked }
        setSettings({ ...settings, charts: chartSettings })
    }

    return (
        <Fragment>
            <Heading>Settings</Heading>
            
            <Grid container spacing={ 4 }>
                <Grid item xs={ 12 }>
                    <CollapsibleCard
                        title="Chart Settings"
                        subheader="Settings affecting how charts are displayed"
                    >
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Hide Empty Groups</FormLabel>
                            <FormHelperText>
                                When toggled on, charts rendered throughout the proposal browsing pages will not display groups of proposals that are empty by default.
                                This option can be changes on an individual basis, but will revert to the default setting when a chart re-renders.
                            </FormHelperText>
                            <FormGroup>
                                <Switch checked={ settings.charts.hideEmptyGroups } onChange={ handleToggleHideEmptyGroups } value="hideEmptyGroups" />
                            </FormGroup>
                        </FormControl>
                    </CollapsibleCard>
                </Grid>

                <Grid item xs={ 12 }>
                    <CollapsibleCard
                        title="Table Settings"
                        subheader="Settings affecting how proposal tables are displayed"
                    >
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Default Visible Columns</FormLabel>
                            <FormHelperText>
                                Selected columns will be visible by default when viewing proposal tables.
                                The visible columns will still be able to be altered individually when viewing a table.
                            </FormHelperText>
                            <FormGroup>
                                <FormControlLabel control={ <Checkbox checked={ settings.tables.visibleColumns.proposalID } onChange={ handleChangeVisibleColumns } value="proposalID" />} label="Proposal ID" />
                                <FormControlLabel control={ <Checkbox checked={ settings.tables.visibleColumns.shortTitle } onChange={ handleChangeVisibleColumns } value="shortTitle" />} label="Proposal Name" />
                                <FormControlLabel control={ <Checkbox checked={ settings.tables.visibleColumns.piName } onChange={ handleChangeVisibleColumns } value="piName" /> } label="PI Name" />
                                <FormControlLabel control={ <Checkbox checked={ settings.tables.visibleColumns.proposalStatus } onChange={ handleChangeVisibleColumns } value="proposalStatus" /> } label="Proposal Status" />
                                <FormControlLabel control={ <Checkbox checked={ settings.tables.visibleColumns.therapeuticArea } onChange={ handleChangeVisibleColumns } value="therapeuticArea" /> } label="Therapeutic Area" />
                                <FormControlLabel control={ <Checkbox checked={ settings.tables.visibleColumns.submitterInstitution } onChange={ handleChangeVisibleColumns } value="submitterInstitution" /> } label="Submitting Institution" />
                                <FormControlLabel control={ <Checkbox checked={ settings.tables.visibleColumns.assignToInstitution } onChange={ handleChangeVisibleColumns } value="assignToInstitution" /> } label="Assign TIC/RIC" />
                                <FormControlLabel control={ <Checkbox checked={ settings.tables.visibleColumns.dateSubmitted } onChange={ handleChangeVisibleColumns } value="dateSubmitted" /> } label="Submission Date" />
                                <FormControlLabel control={ <Checkbox checked={ settings.tables.visibleColumns.meetingDate } onChange={ handleChangeVisibleColumns } value="meetingDate" /> } label="PAT Review Date" />
                                <FormControlLabel control={ <Checkbox checked={ settings.tables.visibleColumns.plannedGrantSubmissionDate } onChange={ handleChangeVisibleColumns } value="plannedGrantSubmissionDate" /> } label="Planned Grant Submission Date" />
                                <FormControlLabel control={ <Checkbox checked={ settings.tables.visibleColumns.actualGrantSubmissionDate } onChange={ handleChangeVisibleColumns } value="actualGrantSubmissionDate" /> } label="Actual Grant Submission Date" />
                                <FormControlLabel control={ <Checkbox checked={ settings.tables.visibleColumns.fundingStart } onChange={ handleChangeVisibleColumns } value="fundingStart" /> } label="Grant Approval Date" />
                                <FormControlLabel control={ <Checkbox checked={ settings.tables.visibleColumns.totalBudget } onChange={ handleChangeVisibleColumns } value="totalBudget" /> } label="Funding Amount" />
                                <FormControlLabel control={ <Checkbox checked={ settings.tables.visibleColumns.fundingPeriod } onChange={ handleChangeVisibleColumns } value="fundingPeriod" /> } label="Funding Period" />
                            </FormGroup>
                        </FormControl>

                        <br />
                        <br />

                        <FormControl component="fieldset">
                            <FormLabel component="legend">Default Page Size</FormLabel>
                            <FormHelperText>
                                Sets the default number of proposals to display per page on proposals tables.
                            </FormHelperText>
                            <br/>
                            <Select
                                value={ settings.tables.pageSize }
                                onChange={ handleChangePageSize }
                                input={<OutlinedInput name="page-size" id="page-size" />}
                            >
                                <MenuItem value={15}>15 Proposals</MenuItem>
                                <MenuItem value={25}>25 Proposals</MenuItem>
                                <MenuItem value={50}>50 Proposals</MenuItem>
                                <MenuItem value={100}>100 Proposals</MenuItem>
                                <MenuItem value={200}>200 Proposals</MenuItem>
                            </Select>
                        </FormControl>
                    </CollapsibleCard>
                </Grid>

                <Grid item xs={ 12 }>
                    <CollapsibleCard
                        title="Danger Zone"
                        subheader="Functions in this section are not functioning currently"
                    >
                        <DangerZone />
                    </CollapsibleCard>
                </Grid>
            </Grid>

        </Fragment>
    )
}

export default SettingsPage