const { ObjectId } = require("mongodb");
const { getDB } = require("../config/database");

// Create new class
const createClass = async (req, res) => {
  try {
    const newClass = req.body;
    newClass.availableSeats = parseInt(newClass.availableSeats);
    
    const db = getDB();
    const classesCollection = db.collection("classes");
    const result = await classesCollection.insertOne(newClass);
    
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ 
      error: true, 
      message: "Error creating class" 
    });
  }
};

// Get all classes (approved)
const getAllClasses = async (req, res) => {
  try {
    const db = getDB();
    const classesCollection = db.collection("classes");
    const classes = await classesCollection
      .find({ status: "approved" })
      .toArray();
    
    res.json(classes);
  } catch (error) {
    res.status(500).json({ 
      error: true, 
      message: "Error fetching classes" 
    });
  }
};

// Get all classes for management (all statuses)
const getAllClassesForManagement = async (req, res) => {
  try {
    const db = getDB();
    const classesCollection = db.collection("classes");
    const classes = await classesCollection.find().toArray();
    
    res.json(classes);
  } catch (error) {
    res.status(500).json({ 
      error: true, 
      message: "Error fetching classes" 
    });
  }
};

// Get classes by instructor email
const getClassesByInstructor = async (req, res) => {
  try {
    const { email } = req.params;
    const db = getDB();
    const classesCollection = db.collection("classes");
    const classes = await classesCollection
      .find({ instructorEmail: email })
      .toArray();
    
    res.json(classes);
  } catch (error) {
    res.status(500).json({ 
      error: true, 
      message: "Error fetching instructor classes" 
    });
  }
};

// Get class by ID
const getClassById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ 
        error: true, 
        message: "Invalid class ID" 
      });
    }

    const db = getDB();
    const classesCollection = db.collection("classes");
    const classData = await classesCollection.findOne({ _id: new ObjectId(id) });

    if (!classData) {
      return res.status(404).json({ 
        error: true, 
        message: "Class not found" 
      });
    }

    res.json(classData);
  } catch (error) {
    res.status(500).json({ 
      error: true, 
      message: "Error fetching class" 
    });
  }
};

// Update class
const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedClass = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ 
        error: true, 
        message: "Invalid class ID" 
      });
    }

    const db = getDB();
    const classesCollection = db.collection("classes");
    
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

    const result = await classesCollection.updateOne(
      { _id: new ObjectId(id) },
      updateDoc,
      { upsert: true }
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      error: true, 
      message: "Error updating class" 
    });
  }
};

// Change class status (approve/reject)
const changeClassStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reason } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ 
        error: true, 
        message: "Invalid class ID" 
      });
    }

    const db = getDB();
    const classesCollection = db.collection("classes");
    
    const updateDoc = {
      $set: {
        status,
        reason: reason || null,
      },
    };

    const result = await classesCollection.updateOne(
      { _id: new ObjectId(id) },
      updateDoc,
      { upsert: true }
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      error: true, 
      message: "Error changing class status" 
    });
  }
};

// Delete class
const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ 
        error: true, 
        message: "Invalid class ID" 
      });
    }

    const db = getDB();
    const classesCollection = db.collection("classes");
    const result = await classesCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ 
        error: true, 
        message: "Class not found" 
      });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      error: true, 
      message: "Error deleting class" 
    });
  }
};

// Get popular classes
const getPopularClasses = async (req, res) => {
  try {
    const db = getDB();
    const classesCollection = db.collection("classes");
    const classes = await classesCollection
      .find()
      .sort({ totalEnrolled: -1 })
      .limit(6)
      .toArray();
    
    res.json(classes);
  } catch (error) {
    res.status(500).json({ 
      error: true, 
      message: "Error fetching popular classes" 
    });
  }
};

module.exports = {
  createClass,
  getAllClasses,
  getAllClassesForManagement,
  getClassesByInstructor,
  getClassById,
  updateClass,
  changeClassStatus,
  deleteClass,
  getPopularClasses
};
