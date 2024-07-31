const Post = require("../models/Clients");

function insertClientData() {
  Post.insertMany([
    {
      fullName: "John Tester",
      email: "somewhere@someplace.com",
      phone: 369852147,
      whoFor: "child, timmy",
      service: ["play", "express-art", "emdr"],
      conflict: "I have no conflicts",
      paymentMethod: "Self Pay",
    },
    {
      fullName: "Sam Tester",
      email: "overthere@someplace.com",
      phone: 258741369,
      whoFor: "self",
      service: ["sand-tray", "emdr", "ifs-dnms"],
      conflict: "I have so many conflicts",
      paymentMethod: "insurancePay, Univirsity of Utah",
    },
  ]);
}

// insertClientData();
