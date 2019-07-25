require('../src/db/mongoose');
const User = require('../src/models/user');

// 5d2d0aaca1d2470d2ae4b39b

// User.findByIdAndUpdate('5d2e1416858b630ff98b7ef0', { age: 1}).then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// });

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });
    return count;
}

updateAgeAndCount('5d31064a31e5f9085d87b6d4', 2).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
});