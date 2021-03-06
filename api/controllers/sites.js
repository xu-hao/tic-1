const db = require('../config/database')
const {stringToInteger, stringToDate} = require('./utils')

exports.addReport = (req, res) => {
    const sinfo = req.body
    const table = "SiteInformation"
    const primaryKeys = [        
        ["ProposalID", x => stringToInteger(x.proposalID)],
        ["siteNumber", x => stringToInteger(x.siteNumber)]
    ]
    console.log(primaryKeys)
    const properties = [        
        ["siteName", x => x.siteName], 
        ["principleInvestigator", x => x.principleInvestigator],
        ["studyCoordinator", x => x.studyCoordinator],
        ["ctsaName", x => x.ctsaName],
        ["ctsaPOC", x => x.ctasPoc],
        ["activeProtocolDate", x => stringToDate(x.activeProtocolDate)], 
        ["protocolVersion", x => x.protocolVersion], 
        ["projectedEnrollmentPerMonth", x => stringToInteger(x.projectedEnrollmentPerMonth)], 
        ["IRBOriginalApproval", x => stringToDate(x.irbOriginalApproval)], 
        ["CTA_FE", x => stringToDate(x.ctaFe)], 
        ["enrollmentStatus", x => x.enrollmentStatus], 
        ["onHoldDate", x => stringToDate(x.onHoldDate)], 
        ["onHoldDays", x => stringToInteger(x.onHoldDays)], 
        ["siteActivatedDate", x => stringToDate(x.siteActivatedDate)], 
        ["dateOfFirstConsent", x => stringToDate(x.dateOfFirstConsent)], 
        ["dateOfFirstPtEnrolled", x => stringToDate(x.dateOfFirstPtEnrolled)], 
        ["mostRecentConsent", x => stringToDate(x.mostRecentConsent)],
        ["mostRecentEnrolled", x => stringToDate(x.mostRecentEnrolled)],
        ["noOfPtsSignedConsent", x => stringToInteger(x.numberPtsSignedConsent)],
        ["noOfPtsEnrolled_site", x => stringToInteger(x.numberPtsEnrolled)], 
        ["noOfPtsActive_site", x => stringToInteger(x.numberPtsActive)], 
        ["noOfPtsComplete_site", x => stringToInteger(x.numberPtsComplete)], 
        ["noOfPtsWithdrawn_site", x => stringToInteger(x.numberPtsWithdrawn)], 
        ["noOfCRFsCompleted_site", x => stringToInteger(x.numberCrfsCompleted)],
        ["percentCRFsReviewed_site", x => stringToInteger(x.percentCrfsReviewed)],
        ["percentCRFsIncomplete_site", x => stringToInteger(x.percentCrfsIncomplete)], 
        ["noOfUnresolvedQueries_site", x => stringToInteger(x.numberUnresolvedQueries)], 
        ["noOfSAEs_site", x => stringToInteger(x.siteInformationNumberSeas)], 
        ["noOfSignificantProtocolDeviations_site", x => stringToInteger(x.numberSignificantProtocolDeviations)], 
        ["CTAsentdate", x => null],
        ["regPacksentdate", x => null],
        ["siteSelectDate", x => null],
        ["notesToSite", x => x.siteNotes]
    ]

    const columns = primaryKeys.concat(properties)
    console.log(sinfo.proposalID)
    db.any('SELECT * FROM "' + table + '" WHERE ' + primaryKeys.map((primaryKey, index) => '"' + primaryKey[0] + '" = $' + (index + 1)).join(" AND "), primaryKeys.map(primaryKey => primaryKey[1](sinfo)))
        .then(data => {
            if (data.length === 0) {
                const query = 'INSERT INTO "' + table + '" (' + columns.map(column => '"' + column[0] + '"').join(", ") + ') VALUES (' + columns.map((_, index) => "$" + (index + 1)).join(', ') + ') RETURNING "ProposalID"'
                
                const values = columns.map(column => column[1](sinfo))
                
                db.one(query, values)
                    .then(data => {
                        console.log(`Metrics inserted for proposal ${ sinfo.proposalID }`)
                        res.status(200).send()
                    })
                    .catch(error => {
                        res.status(500).send('There was an error inserting data')
                        console.log('Error', error)
                    })
            } else {
                const query = 'UPDATE "' + table + '" SET ' + properties.map((property, index) => '"' + property[0] + '" = $' + (index + 1)).join(", ") + ' WHERE ' + primaryKeys.map((primaryKey, index) => '"' + primaryKey[0] + '" = $' + (index + 1 + properties.length)).join(" AND ")
                
                const values = properties.map(column => column[1](sinfo)).concat(primaryKeys.map(primaryKey => primaryKey[1](sinfo)))
                
                db.none(query, values)
                    .then(() => console.log(`Metrics update successful for proposal ${ sinfo.proposalID }`))
                    .catch(exn => console.log("Exception", exn))
                res.status(200).send('Success!')

            }
        })
        .catch(error => {
            console.log('Error', error)
        })
}

exports.list = (req, res) => {
    query = 'SELECT *, CAST("ProposalID" AS INT) from "SiteInformation";'
    db.any(query)
        .then(data => {
            console.log(`Returning site list`)
            data.sort((p, q) => p.ProposalID <= q.ProposalID)
            res.status(200).send(data)
        })
        .catch(error => {
            console.log('Error', error)
            res.status(500).send('Error', error)
        })
}

exports.siteReport = (req, res) => {
    res.status(200).send('Get site report')
}
