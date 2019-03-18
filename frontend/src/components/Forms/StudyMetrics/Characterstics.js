import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
    FormControl, FormGroup, FormHelperText, FormControlLabel, FormLabel,
    InputLabel, OutlinedInput,
    Select, MenuItem,
    RadioGroup, Radio,
    TextField,
    Checkbox,
    Button,
} from '@material-ui/core'
import { MetricsFormContext } from './Metrics'

const useStyles = makeStyles(theme => ({
    formControl: {
        display: 'block',
        margin: `${ 2 * theme.spacing.unit }px 0`,
    },
}))

const StudyCharacteristicsForms = props => {
    const [values, setValues] = useContext(MetricsFormContext)
    const classes = useStyles()

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    return (
        <div>
            <FormControl variant="outlined" className={ classes.formControl }>
                <InputLabel htmlFor="network">
                    Network
                </InputLabel>
                <Select
                    value={ values.network }
                    onChange={ handleChange('network') }
                    input={ <OutlinedInput fullWidth labelWidth={ 48 } name="network" id="network" /> }
                >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value="ahcrn">AHCRN</MenuItem>
                    <MenuItem value="4cyc">4CYC</MenuItem>
                    <MenuItem value="cpccrn">CPCCRN</MenuItem>
                    <MenuItem value="fhs">FHS</MenuItem>
                    <MenuItem value="gjcf">GJCF</MenuItem>
                    <MenuItem value="hcrn">HCRN</MenuItem>
                    <MenuItem value="pcplc">PCPLC</MenuItem>
                    <MenuItem value="pecarn">PECARN</MenuItem>
                    <MenuItem value="npmsc">NPMSC</MenuItem>
                    <MenuItem value="thapca">THAPCA</MenuItem>
                    <MenuItem value="tin">TIN</MenuItem>
                    <MenuItem value="non-network">Non-network Trial</MenuItem>
                </Select>
                <FormHelperText>
                    Specify study network(s). If no network exists, select ‘Non-network Trial’. If a project overlaps two networks, select multiple.
                </FormHelperText>
            </FormControl>

            <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="primary-study-type">
                    Primary Study Type
                </InputLabel>
                <Select
                    value={ values.primaryStudyType }
                    onChange={ handleChange('primaryStudyType') }
                    input={ <OutlinedInput labelWidth={ 110 } name="primary-study-type" id="primary-study-type" /> }
                >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value="registry">Registry</MenuItem>
                    <MenuItem value="clinical-trial">Clinical Trial</MenuItem>
                    <MenuItem value="ehr-data-transfer">EHR Data Transfer</MenuItem>
                </Select>
            </FormControl>

            <FormControl component="fieldset">
                <FormLabel component="legend">Linked Data</FormLabel>
                <RadioGroup
                    aria-label="linked-data"
                    name="linked-data"
                    value={ values.linkedData }
                    onChange={ handleChange('linkedData') }
                >
                    <FormControlLabel value="1" control={<Radio />} label="Yes" />
                    <FormControlLabel value="0" control={<Radio />} label="No" />
                </RadioGroup>
                <FormHelperText>
                    Does this study require data from a different study? May be referred to as a 'Linked', 'Piggybacked', 'Ancillary', or 'Sub' study. This should be answered as "No" for a Registry.
                </FormHelperText>
            </FormControl>

            <FormControl variant="outlined" fullWidth>
                <TextField
                    id="linked-study"
                    label="Linked Data (Specify Study)"
                    value={ values.linkedStudy }
                    onChange={ handleChange('linkedStudy') }
                    margin="normal"
                    variant="outlined"
                    disabled={ values.linkedData !== '1' }
                    error={ values.linkedData === '1' && values.linkedStudy === '' }
                />
                <FormHelperText>
                    If the study requires data from a different study, specify the name of the 'linked study' using the Study Acronym.
                </FormHelperText>
            </FormControl>
        </div>
    )
}

export default StudyCharacteristicsForms