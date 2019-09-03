//seed.js
var User = require('../app/schemas/user');
var Role = require('../app/schemas/role');


 User.collection.drop();
 Role.collection.drop();
 

 const userRole = new Role({ name: 'User' });
 userRole.save();


  var admin = new User({
      firstname: "Admin",
      secondname: "Admin",
      email: "admin@gmail.com",
      password: "12345678",
  });

   admin.save(function (err) {
     if (err) console.log(err);
     
     const adminRole = new Role({
         name: 'Admin',
     });
     adminRole.users.push(admin);
     adminRole.save();
     admin.role = adminRole;
     admin.save();
 });
console.log(admin);

// (function initializeAdmins() {
//     User.findOne({ email: "admin@gmail.com" }).then(user => {
//         if (!user) {
//             User.create(admin);
//             admin.role.
//             return admin;
//         }
//         return user;
//     })
//         .then(admin => {
//             console.log(admin);
//             admin.populate(Role.findOne({ name: "Admin" }).exec())
//         });
// })();
