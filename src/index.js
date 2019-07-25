const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/tasks');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(taskRouter);
app.use(userRouter);

app.listen(port, () => {
    console.log('Server is running on port ' + port)
});

// const bcrypt = require('bcryptjs');
// const myFunction = async() => {
//     const password = 'Red12345';
//     const hassPassword = await bcrypt.hash(password, 8);
//     console.log(password);
//     console.log(hassPassword);

//     const isMatch = await bcrypt.compare('Red12345', hassPassword);
//     console.log(isMatch);
// };


// myFunction()