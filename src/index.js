const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/tasks');

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//    if (req.method === 'GET') {
//         res.send('GET requests are disables');
//    } else {
//        next();
//    }
// });

// app.use((req, res, next) => {
//     res.status(503).send('Service unavailable. Please try again soon');
// });


app.use(express.json());
app.use(taskRouter);
app.use(userRouter);

app.listen(port, () => {
    console.log('Server is running on port ' + port)
});

const Task = require('./models/task');
const User = require('./models/user');

const main = async () => {
    // const task = await Task.findById('5d3c54063bb4a620e81bd912');
    // await task.populate('owner').execPopulate();
    // console.log(task.owner);

    const user = await User.findById('5d3cd9bce6231927f3b24901');
    await user.populate('tasks').execPopulate();
    console.log(user.tasks);

}

main();