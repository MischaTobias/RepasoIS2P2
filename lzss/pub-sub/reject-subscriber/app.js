//
// Copyright 2021 The Dapr Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//     http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')
const app = express();

const port = 3002;

// Dapr publishes messages with the application/cloudevents+json content-type
app.use(bodyParser.json({ type: 'application/*+json' }));

const daprPort = process.env.DAPR_HTTP_PORT ?? 3500;
const daprUrl = `http://localhost:${daprPort}/v1.0`;
const pubsubName = 'pubsub';

app.get('/dapr/subscribe', (_req, res) => {
    res.json([
        {
            pubsubname: "pubsub",
            topic: "reject",
            route: "reject"
        }
    ]);
});

app.post('/reject', async (req, res) => {
    console.log("Se rechazo la solicitud por escribir un token prohibido");
    res.sendStatus(200);
});

app.listen(port, () => console.log(`Node App listening on port ${port}!`));
