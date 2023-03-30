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

const port = 3001;

// Dapr publishes messages with the application/cloudevents+json content-type
app.use(bodyParser.json({ type: 'application/*+json' }));

const daprPort = process.env.DAPR_HTTP_PORT ?? 3500;
const daprUrl = `http://localhost:${daprPort}/v1.0`;
const pubsubName = 'pubsub';

app.get('/dapr/subscribe', (_req, res) => {
    res.json([
        {
            pubsubname: "pubsub",
            topic: "testText",
            route: "test"
        }
    ]);
});

app.post('/test', async (req, res) => {
    console.log("Testing: ", req.body.data.message);
    let message = req.body.data.message.toString();
    message = message.toLowerCase();
    if (message.includes("ingeniero")) {
        console.log("contiene ingeniero")
        await axios.post(`${daprUrl}/publish/${pubsubName}/reject`, { message: req.body.data.message });
    } else {
        console.log("no contiene ingeniero")
        await axios.post(`${daprUrl}/publish/${pubsubName}/compress`, { message: req.body.data.message });
    }
    // let compressed = lzbase62.compress(req.body.data.message);
    // await pubsubCollection.insertOne({ title: 'texto', value: req.body.data.message });
    // await pubsubCollection.insertOne({ title: 'comprimido', value: compressed });

    res.sendStatus(200);
});

app.listen(port, () => console.log(`Node App listening on port ${port}!`));
