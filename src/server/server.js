require('dotenv').config();
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const fs = require("fs");
const https = require('https');
const { KubeConfig, CoreV1Api } = require('@kubernetes/client-node');

const app = express();
const port = 3005;
const mongoURI = 'mongodb://palatial:0UDUiKxwj7fI0@mongodb.mithyalabs.com:27017/palatial?directConnection=true&authSource=staging_db';
console.log(process.env);
const dbName = 'palatial';

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON requests
app.use(express.json());

// Load your Kubernetes configuration (usually located at ~/.kube/config)
const kubeConfig = new KubeConfig();
kubeConfig.loadFromFile('/home/david/.kube/config');

// Create an instance of the Kubernetes API client
const k8sApi = kubeConfig.makeApiClient(CoreV1Api);

// Function to find a pod by name prefix
async function findPodByNamePrefix(namePrefix) {
  try {
    // List all pods in the default namespace
    const response = await k8sApi.listNamespacedPod('tenant-palatial-platform');

    // Find the first pod whose name starts with the specified prefix
    const pod = response.body.items.find((pod) => pod.metadata.name.startsWith(namePrefix));

    if (pod) {
      return pod;
    } else {
      throw new Error('Pod not found');
    }
  } catch (error) {
    throw error;
  }
}

app.post('/send-message', async (req, res) => {
  try {
    const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection('changelogs');

    const message = req.body;
    const pod = await findPodByNamePrefix(message.payload.podName);
    const podName = pod.metadata.name;
    message.payload.podName = podName;
    const result = await collection.insertOne(message);

    res.status(201).json({ message: 'Message sent sucessfully', podName: podName, insertedId: result.insertedId });

    client.close();
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

var privateKey = fs.readFileSync('/etc/letsencrypt/live/prophet.palatialxr.com/privkey.pem');
var certificate = fs.readFileSync('/etc/letsencrypt/live/prophet.palatialxr.com/fullchain.pem');

var httpsServer = https.createServer({
    key: privateKey,
    cert: certificate
}, app);
httpsServer.listen(port, function () {
    console.log(`Server listening on port ${port}`);
});
