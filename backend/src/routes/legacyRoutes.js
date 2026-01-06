const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const { getDB } = require("../config/database");
const { verifyJWT, verifyAdmin, verifyInstructor } = require("../middleware/auth");
const stripe = require("stripe")(process.env.PAYMENT_SECRET);

// Legacy routes to maintain backward compatibility with frontend

// ========== AUTH ROUTES ==========

// Set token (legacy endpoint)
router.post("/set-token", (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_SECRET, {
    expiresIn: "24h",
  });
  res.send({ token });
});

// ========== USER ROUTES ==========

// Check email exists
router.get("/check-email", async (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).send({ error: "Email is required" });
  }

  try {
    const db = getDB();
    const userCollection = db.collection("users");
    const existingUser = await userCollection.findOne({ email: email });
    res.status(200).send({ exists: !!existingUser });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error" });
  }
});

// Create new user
router.post("/new-user", async (req, res) => {
  const newUser = req.body;
  const db = getDB();
  const userCollection = db.collection("users");

  const existingUser = await userCollection.findOne({ email: newUser.email });
  if (existingUser) {
    return res.status(409).send({ error: "User already exists" });
  }

  const result = await userCollection.insertOne(newUser);
  res.send(result);
});

// Get all users
router.get("/users", async (req, res) => {
  const db = getDB();
  const userCollection = db.collection("users");
  const users = await userCollection.find({}).toArray();
  res.send(users);
});

// Get user by ID
router.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ error: "Invalid ObjectId" });
  }

  const db = getDB();
  const userCollection = db.collection("users");
  const user = await userCollection.findOne({ _id: new ObjectId(id) });
  res.send(user);
});

// Get user by email
router.get("/user/:email", verifyJWT, async (req, res) => {
  const email = req.params.email;
  const db = getDB();
  const userCollection = db.collection("users");
  const result = await userCollection.findOne({ email: email });
  res.send(result);
});

// Delete user
router.delete("/delete-user/:id", verifyJWT, verifyAdmin, async (req, res) => {
  const id = req.params.id;
  const db = getDB();
  const userCollection = db.collection("users");
  const result = await userCollection.deleteOne({ _id: new ObjectId(id) });
  res.send(result);
});

// Update user
router.put("/update-user/:id", verifyJWT, verifyAdmin, async (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  const db = getDB();
  const userCollection = db.collection("users");
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.option || updatedUser.role,
      address: updatedUser.address,
      phone: updatedUser.phone,
      about: updatedUser.about,
      photoUrl: updatedUser.photoUrl,
      skills: updatedUser.skills ? updatedUser.skills : null,
    },
  };
  const result = await userCollection.updateOne(filter, updateDoc, options);
  res.send(result);
});

// Get all instructors
router.get("/instructors", async (req, res) => {
  const db = getDB();
  const userCollection = db.collection("users");
  const result = await userCollection.find({ role: "instructor" }).toArray();
  res.send(result);
});

// Get instructor by ID
router.get("/instructors/:id", async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ error: "Invalid ObjectId" });
  }

  const db = getDB();
  const userCollection = db.collection("users");
  const instructor = await userCollection.findOne({ _id: new ObjectId(id) });
  res.send(instructor);
});

// Popular instructors
router.get("/popular-instructors", async (req, res) => {
  const db = getDB();
  const classesCollection = db.collection("classes");
  
  const pipeline = [
    {
      $group: {
        _id: "$instructorEmail",
        totalEnrolled: { $sum: "$totalEnrolled" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "email",
        as: "instructor",
      },
    },
    {
      $project: {
        _id: 0,
        instructor: {
          $arrayElemAt: ["$instructor", 0],
        },
        totalEnrolled: 1,
      },
    },
    {
      $sort: {
        totalEnrolled: -1,
      },
    },
    {
      $limit: 6,
    },
  ];
  const result = await classesCollection.aggregate(pipeline).toArray();
  res.send(result);
});

// ========== CLASS ROUTES ==========

// Create new class
router.post("/new-class", verifyJWT, verifyInstructor, async (req, res) => {
  const newClass = req.body;
  newClass.availableSeats = parseInt(newClass.availableSeats);
  const db = getDB();
  const classesCollection = db.collection("classes");
  const result = await classesCollection.insertOne(newClass);
  res.send(result);
});

// Get classes by instructor email
router.get("/classes/:email", verifyJWT, verifyInstructor, async (req, res) => {
  const email = req.params.email;
  const db = getDB();
  const classesCollection = db.collection("classes");
  const result = await classesCollection.find({ instructorEmail: email }).toArray();
  res.send(result);
});

// Get all approved classes
router.get("/classes", async (req, res) => {
  const db = getDB();
  const classesCollection = db.collection("classes");
  const result = await classesCollection.find({ status: "approved" }).toArray();
  res.send(result);
});

// Get all classes for management
router.get("/classes-manage", async (req, res) => {
  const db = getDB();
  const classesCollection = db.collection("classes");
  const result = await classesCollection.find().toArray();
  res.send(result);
});

// Get single class by ID
router.get("/class/:id", async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ error: "Invalid ObjectId" });
  }

  const db = getDB();
  const classesCollection = db.collection("classes");
  const result = await classesCollection.findOne({ _id: new ObjectId(id) });
  res.send(result);
});

// Update class
router.put("/update-class/:id", verifyJWT, verifyInstructor, async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ error: "Invalid ObjectId" });
    }

    const updatedClass = req.body;
    const db = getDB();
    const classesCollection = db.collection("classes");
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        name: updatedClass.name,
        videoLink: updatedClass.videoLink,
        teamType: updatedClass.teamType,
        slot: updatedClass.slot,
        prizePoolFirst: updatedClass.prizePoolFirst,
        prizePoolSecond: updatedClass.prizePoolSecond,
        prizePoolThird: updatedClass.prizePoolThird,
        scheduledDate: updatedClass.scheduledDate,
        qualifier: updatedClass.qualifier,
        quarterFinal: updatedClass.quarterFinal,
        semiFinal: updatedClass.semiFinal,
        grandFinal: updatedClass.grandFinal,
        instructorName: updatedClass.instructorName,
        instructorEmail: updatedClass.instructorEmail,
        status: "pending",
        submitted: updatedClass.submitted,
        totalEnrolled: updatedClass.totalEnrolled,
      },
    };
    const result = await classesCollection.updateOne(filter, updateDoc, options);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete class
router.delete("/classes/:id", verifyJWT, verifyInstructor, async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ error: "Invalid ObjectId" });
  }

  const db = getDB();
  const classesCollection = db.collection("classes");
  const result = await classesCollection.deleteOne({ _id: new ObjectId(id) });
  res.send(result);
});

// Change class status
router.put("/change-status/:id", verifyJWT, verifyAdmin, async (req, res) => {
  const id = req.params.id;
  const { status, reason } = req.body;
  const db = getDB();
  const classesCollection = db.collection("classes");
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      status: status,
      reason: reason,
    },
  };
  const result = await classesCollection.updateOne(filter, updateDoc, options);
  res.send(result);
});

// Get approved classes
router.get("/approved-classes", async (req, res) => {
  const db = getDB();
  const classesCollection = db.collection("classes");
  const result = await classesCollection.find({ status: "approved" }).toArray();
  res.send(result);
});

// Popular classes
router.get("/popular_classes", async (req, res) => {
  const db = getDB();
  const classesCollection = db.collection("classes");
  const result = await classesCollection
    .find()
    .sort({ totalEnrolled: -1 })
    .limit(6)
    .toArray();
  res.send(result);
});

// ========== CART ROUTES ==========

// Add to cart
router.post("/add-to-cart", verifyJWT, async (req, res) => {
  const newCartItem = req.body;
  const db = getDB();
  const cartCollection = db.collection("cart");
  const result = await cartCollection.insertOne(newCartItem);
  res.send(result);
});

// Get cart item
router.get("/cart-item/:id", verifyJWT, async (req, res) => {
  const id = req.params.id;
  const email = req.query.email;
  const db = getDB();
  const cartCollection = db.collection("cart");
  const query = { classId: id, userMail: email };
  const projection = { classId: 1 };
  const result = await cartCollection.findOne(query, { projection: projection });
  res.send(result);
});

// Get cart by email
router.get("/cart/:email", verifyJWT, async (req, res) => {
  const email = req.params.email;
  const db = getDB();
  const cartCollection = db.collection("cart");
  const classesCollection = db.collection("classes");
  
  const query = { userMail: email };
  const projection = { classId: 1 };
  const carts = await cartCollection.find(query, { projection: projection }).toArray();
  const classIds = carts.map((cart) => new ObjectId(cart.classId));
  const query2 = { _id: { $in: classIds } };
  const result = await classesCollection.find(query2).toArray();
  res.send(result);
});

// Delete cart item
router.delete("/delete-cart-item/:id", verifyJWT, async (req, res) => {
  const id = req.params.id;
  const db = getDB();
  const cartCollection = db.collection("cart");
  const result = await cartCollection.deleteOne({ classId: id });
  res.send(result);
});

// ========== PAYMENT ROUTES ==========

// Create payment intent
router.post("/create-payment-intent", verifyJWT, async (req, res) => {
  const { price } = req.body;
  const amount = parseInt(price) * 100;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    description: "Gaming Hustler Payment",
    currency: "inr",
    payment_method_types: ["card"],
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Post payment info
router.post("/payment-info", verifyJWT, async (req, res) => {
  const paymentInfo = req.body;
  const classesId = paymentInfo.classesId;
  const userEmail = paymentInfo.userEmail;
  const singleClassId = req.query.classId;
  
  const db = getDB();
  const cartCollection = db.collection("cart");
  const classesCollection = db.collection("classes");
  const enrolledCollection = db.collection("enrolled");
  const paymentCollection = db.collection("payments");

  let query;
  if (singleClassId) {
    query = { classId: singleClassId, userMail: userEmail };
  } else {
    query = { classId: { $in: classesId } };
  }
  
  const classesQuery = { _id: { $in: classesId.map((id) => new ObjectId(id)) } };
  const classes = await classesCollection.find(classesQuery).toArray();
  
  const newEnrolledData = {
    userEmail: userEmail,
    classesId: classesId.map((id) => new ObjectId(id)),
    transactionId: paymentInfo.transactionId,
  };
  
  const updatedDoc = {
    $set: {
      totalEnrolled: classes.reduce((total, current) => total + current.totalEnrolled, 0) + 1 || 0,
      availableSeats: classes.reduce((total, current) => total + current.availableSeats, 0) - 1 || 0,
    },
  };
  
  const updatedResult = await classesCollection.updateMany(classesQuery, updatedDoc, { upsert: true });
  const enrolledResult = await enrolledCollection.insertOne(newEnrolledData);
  const deletedResult = await cartCollection.deleteMany(query);
  const paymentResult = await paymentCollection.insertOne(paymentInfo);
  
  res.send({ paymentResult, deletedResult, enrolledResult, updatedResult });
});

// Get payment history
router.get("/payment-history/:email", async (req, res) => {
  const email = req.params.email;
  const db = getDB();
  const paymentCollection = db.collection("payments");
  const result = await paymentCollection.find({ userEmail: email }).sort({ date: -1 }).toArray();
  res.send(result);
});

// Get payment history length
router.get("/payment-history-length/:email", async (req, res) => {
  const email = req.params.email;
  const db = getDB();
  const paymentCollection = db.collection("payments");
  const total = await paymentCollection.countDocuments({ userEmail: email });
  res.send({ total });
});

// ========== ENROLLED ROUTES ==========

// Get enrolled classes
router.get("/enrolled-classes/:email", verifyJWT, async (req, res) => {
  const email = req.params.email;
  const db = getDB();
  const enrolledCollection = db.collection("enrolled");
  
  const pipeline = [
    { $match: { userEmail: email } },
    {
      $lookup: {
        from: "classes",
        localField: "classesId",
        foreignField: "_id",
        as: "classes",
      },
    },
    { $unwind: "$classes" },
    {
      $lookup: {
        from: "users",
        localField: "classes.instructorEmail",
        foreignField: "email",
        as: "instructor",
      },
    },
    {
      $project: {
        _id: 0,
        classes: 1,
        instructor: { $arrayElemAt: ["$instructor", 0] },
      },
    },
  ];
  
  const result = await enrolledCollection.aggregate(pipeline).toArray();
  res.send(result);
});

// ========== ADMIN ROUTES ==========

// Admin stats
router.get("/admin-stats", verifyJWT, verifyAdmin, async (req, res) => {
  const db = getDB();
  const classesCollection = db.collection("classes");
  const userCollection = db.collection("users");
  const enrolledCollection = db.collection("enrolled");

  const approvedClasses = (await classesCollection.find({ status: "approved" }).toArray()).length;
  const pendingClasses = (await classesCollection.find({ status: "pending" }).toArray()).length;
  const instructors = (await userCollection.find({ role: "instructor" }).toArray()).length;
  const totalClasses = (await classesCollection.find().toArray()).length;
  const totalEnrolled = (await enrolledCollection.find().toArray()).length;

  const result = {
    approvedClasses,
    pendingClasses,
    instructors,
    totalClasses,
    totalEnrolled,
  };
  res.send(result);
});

// ========== APPLY AS INSTRUCTOR ==========

// Apply as instructor
router.post("/as-instructor", async (req, res) => {
  const data = req.body;
  const db = getDB();
  const appliedCollection = db.collection("applied");
  const result = await appliedCollection.insertOne(data);
  res.send(result);
});

// Get applied instructor status
router.get("/applied-instructors/:email", async (req, res) => {
  const email = req.params.email;
  const db = getDB();
  const appliedCollection = db.collection("applied");
  const result = await appliedCollection.findOne({ email });
  res.send(result);
});

// ========== ENROLLED TEAMS ==========

// Store form data
router.post("/store-form-data", verifyJWT, async (req, res) => {
  const formData = req.body;
  try {
    const db = getDB();
    const enrolledTeamsCollection = db.collection("enrolledTeams");
    const result = await enrolledTeamsCollection.insertOne(formData);
    res.status(200).json({ success: true, message: "Form data stored successfully" });
  } catch (err) {
    console.error("Error storing form data:", err);
    res.status(500).json({ success: false, message: "Error storing form data" });
  }
});

// Get enrolled teams
router.get("/enrolled-teams", async (req, res) => {
  try {
    const db = getDB();
    const enrolledTeamsCollection = db.collection("enrolledTeams");
    const enrolledTeams = await enrolledTeamsCollection.find({}).toArray();
    res.send(enrolledTeams);
  } catch (error) {
    console.error("Error fetching enrolled teams:", error);
    res.status(500).send({ error: true, message: "Error fetching enrolled teams" });
  }
});

// Approve team
router.put("/enrolled-teams/:teamId/approve", async (req, res) => {
  const teamId = req.params.teamId;
  try {
    const db = getDB();
    const enrolledTeamsCollection = db.collection("enrolledTeams");
    const result = await enrolledTeamsCollection.updateOne(
      { _id: new ObjectId(teamId) },
      { $set: { status: "approved" } }
    );
    res.send(result);
  } catch (error) {
    console.error("Error approving team:", error);
    res.status(500).send({ error: true, message: "Error approving team" });
  }
});

// Reject team
router.put("/enrolled-teams/:teamId/reject", async (req, res) => {
  const teamId = req.params.teamId;
  try {
    const db = getDB();
    const enrolledTeamsCollection = db.collection("enrolledTeams");
    const result = await enrolledTeamsCollection.updateOne(
      { _id: new ObjectId(teamId) },
      { $set: { status: "rejected" } }
    );
    res.send(result);
  } catch (error) {
    console.error("Error rejecting team:", error);
    res.status(500).send({ error: true, message: "Error rejecting team" });
  }
});

module.exports = router;
