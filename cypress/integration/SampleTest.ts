//* Check if the Snowplow Micro url has been overridden
const microEndpoint = Cypress.env('SP_MICRO_URL') != null ? Cypress.env('SP_MICRO_URL') : 'http://localhost:9090'

//* Make sure Snowplow Micro is cleared of any old events
function resetSnowplowMicroEvents() {
    cy.log('Clearing events from Snowplow Micro...')

    //* Snowplow micro is cleared once the /reset url is hit
    cy.request('GET', microEndpoint + '/micro/reset').then(response => {
        //* Make sure the events have actually been cleared
        expect(response.body).to.have.property('total', 0, 'Reset snowplow micro total count')
    })
}

//* Create snowplow event type
interface snowplowEvent {
    event: {
        parameters: {
            url: string
            cx: string
        }
    }
    eventType: string
    contexts: string[]
}

describe('example test to query snowplow micro', () => {

    before(() => {
        resetSnowplowMicroEvents()
    })

    it('verify snowplow micro only contains good events', () => {
        //* Check that snowplow micro only contains good events
        cy.request('GET', microEndpoint + '/micro/all').then(response => {
            //! verify the response data here
            expect(response).to.equal(response)
        })
    })

    it('verify snowplow good event data', () => {
        //* Check the snowplow event data
        cy.request('GET', microEndpoint + '/micro/good').then(response => {
            response.body.forEach((event: snowplowEvent) => {
                //! verify the event data here
                expect(event).to.equal(event)
            })
        })
    })

    it('verify page name of last event is correct', () => {

        //* Create a Route so we can capture the snowplow calls
        cy.server()
        cy.route('POST', '**/com.snowplowanalytics.snowplow/tp2').as('snowplowEvent')

        //* Wait for the event to be fired before querying snowplow micro
        cy.wait('@snowplowEvent', { timeout: 10000 })

        cy.request('GET', microEndpoint + '/micro/good').then(response => {
            //* Get the latest page view event that matches the page url
            const event = response.body.filter((event: snowplowEvent) => {
                return event.eventType === 'pv' && event.event.parameters.url.includes('/some/url')
            })[0]

            //! verify the event data here
            expect(event).to.equal(event)
        })
    })
})