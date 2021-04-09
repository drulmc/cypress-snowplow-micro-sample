# Cypress & Snowplow Micro Integration
Sample project to accompany the Cypress &amp; Snowplow Micro integration blog post.
https://engineering.autotrader.co.uk/2021/04/09/cypress-snowplow-micro-blog.html

In this project there will be two folders:
- cypress
- snowplow-micro

You will need to have the following tools/applications installed in order to get everything running:
- Node
- Yarn
- Docker

To run Snowplow Micro:
1. Make sure docker is started up first
2. Navigate into the `snowplow-micro` folder
3. Type in `docker-compose up`

Snowplow micro will be running now, and can be accessed at `localhost:9090/micro/all`

If you have your own schema registry, you can configure snowplow micro to use the schemas there by adding in some config in the `iglu.json` file which is located within `snowplow-micro/config/`.

To run the cypress project:
1. At the root of the project type in `yarn install`
2. Go into the `cypress` project
3. Type in `yarn cypress open`

The Cypress application will open, and you will see a test called `SampleTest.ts`.

You will however need to emit a snowplow event at snowplow micro in order to have some events to test against. In your app, you will need to configure Snowplow to send events to `localhost:9090`, once that is done, you will see events in snowplow micro.
