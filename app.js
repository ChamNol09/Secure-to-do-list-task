const express = require('express');
const app = express();
const cors = require('cors');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/adminRoute');
const taskRoute = require('./routes/taskRoute');
const deadlineJob = require('./jobs/deadlineJob')
const dotenv = require('dotenv');
const helmet = require('helmet');
dotenv.config();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/admin', adminRoute);
app.use('/api/task', taskRoute);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});