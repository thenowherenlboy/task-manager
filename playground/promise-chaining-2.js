require('../src/db/mongoose');

const Task = require('../src/models/task');

// Task.findByIdAndDelete('5d2e19011a22311098620f55').then(() => {
//     return Task.countDocuments({ completed: false, });
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// });

const deleteByIdAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed: false});
    return count;
}

deleteByIdAndCount('5d2d0d8232b1060d4223739a').then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
});
