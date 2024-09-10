const express = require('express');
const app = express();

app.listen(6789);

const userRouter = require('./routes/user'); // user-demo
const channelRouter = require('./routes/channels'); // channel - demo

app.use('/', userRouter);
app.use('/channels', channelRouter);
