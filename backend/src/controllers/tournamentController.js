const { ObjectId } = require("mongodb");
const { getDB } = require("../config/database");

// Get all tournaments (public - approved/live only)
const getAllTournaments = async (req, res) => {
  try {
    const db = getDB();
    const tournamentsCollection = db.collection("tournaments");
    
    const { game, status, platform, search } = req.query;
    
    // Build filter
    const filter = {};
    
    // Only show approved tournaments to public
    filter.$or = [
      { status: "approved" },
      { status: "live" },
      { status: "upcoming" },
      { status: "completed" }
    ];
    
    if (game && game !== "all") {
      filter.game = { $regex: game, $options: "i" };
    }
    
    if (status && status !== "all") {
      filter.status = status;
    }
    
    if (platform && platform !== "all") {
      filter.platform = { $regex: platform, $options: "i" };
    }
    
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }
    
    const tournaments = await tournamentsCollection
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();
    
    res.json(tournaments);
  } catch (error) {
    console.error("Error fetching tournaments:", error);
    res.status(500).json({ 
      error: true, 
      message: "Error fetching tournaments" 
    });
  }
};

// Get featured/popular tournaments
const getFeaturedTournaments = async (req, res) => {
  try {
    const db = getDB();
    const tournamentsCollection = db.collection("tournaments");
    
    const tournaments = await tournamentsCollection
      .find({ 
        $or: [{ status: "live" }, { status: "upcoming" }],
        featured: true 
      })
      .sort({ players: -1 })
      .limit(6)
      .toArray();
    
    res.json(tournaments);
  } catch (error) {
    console.error("Error fetching featured tournaments:", error);
    res.status(500).json({ 
      error: true, 
      message: "Error fetching featured tournaments" 
    });
  }
};

// Get tournament by ID
const getTournamentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ 
        error: true, 
        message: "Invalid tournament ID" 
      });
    }

    const db = getDB();
    const tournamentsCollection = db.collection("tournaments");
    const tournament = await tournamentsCollection.findOne({ _id: new ObjectId(id) });

    if (!tournament) {
      return res.status(404).json({ 
        error: true, 
        message: "Tournament not found" 
      });
    }

    res.json(tournament);
  } catch (error) {
    console.error("Error fetching tournament:", error);
    res.status(500).json({ 
      error: true, 
      message: "Error fetching tournament" 
    });
  }
};

// Create new tournament (host/admin)
const createTournament = async (req, res) => {
  try {
    const tournamentData = req.body;
    
    // Add metadata
    tournamentData.createdAt = new Date();
    tournamentData.updatedAt = new Date();
    tournamentData.players = 0;
    tournamentData.registeredTeams = [];
    tournamentData.status = tournamentData.status || "pending"; // pending approval by admin
    
    // Parse numeric fields
    if (tournamentData.prize) {
      tournamentData.prize = String(tournamentData.prize);
    }
    if (tournamentData.maxPlayers) {
      tournamentData.maxPlayers = parseInt(tournamentData.maxPlayers);
    }
    if (tournamentData.entryFee) {
      tournamentData.entryFee = parseFloat(tournamentData.entryFee);
    }
    
    const db = getDB();
    const tournamentsCollection = db.collection("tournaments");
    const result = await tournamentsCollection.insertOne(tournamentData);
    
    res.status(201).json({
      success: true,
      message: "Tournament created successfully",
      insertedId: result.insertedId
    });
  } catch (error) {
    console.error("Error creating tournament:", error);
    res.status(500).json({ 
      error: true, 
      message: "Error creating tournament" 
    });
  }
};

// Update tournament
const updateTournament = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ 
        error: true, 
        message: "Invalid tournament ID" 
      });
    }

    updateData.updatedAt = new Date();
    
    // Remove _id from update data if present
    delete updateData._id;

    const db = getDB();
    const tournamentsCollection = db.collection("tournaments");
    const result = await tournamentsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ 
        error: true, 
        message: "Tournament not found" 
      });
    }

    res.json({
      success: true,
      message: "Tournament updated successfully",
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error("Error updating tournament:", error);
    res.status(500).json({ 
      error: true, 
      message: "Error updating tournament" 
    });
  }
};

// Delete tournament
const deleteTournament = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ 
        error: true, 
        message: "Invalid tournament ID" 
      });
    }

    const db = getDB();
    const tournamentsCollection = db.collection("tournaments");
    const result = await tournamentsCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ 
        error: true, 
        message: "Tournament not found" 
      });
    }

    res.json({
      success: true,
      message: "Tournament deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting tournament:", error);
    res.status(500).json({ 
      error: true, 
      message: "Error deleting tournament" 
    });
  }
};

// Register for tournament
const registerForTournament = async (req, res) => {
  try {
    const { id } = req.params;
    const { teamName, teamMembers, email, phone } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ 
        error: true, 
        message: "Invalid tournament ID" 
      });
    }

    const db = getDB();
    const tournamentsCollection = db.collection("tournaments");
    
    const tournament = await tournamentsCollection.findOne({ _id: new ObjectId(id) });
    
    if (!tournament) {
      return res.status(404).json({ 
        error: true, 
        message: "Tournament not found" 
      });
    }

    if (tournament.players >= tournament.maxPlayers) {
      return res.status(400).json({ 
        error: true, 
        message: "Tournament is full" 
      });
    }

    // Check if already registered
    const alreadyRegistered = tournament.registeredTeams?.some(
      team => team.email === email
    );
    
    if (alreadyRegistered) {
      return res.status(400).json({ 
        error: true, 
        message: "Already registered for this tournament" 
      });
    }

    const registration = {
      teamName,
      teamMembers,
      email,
      phone,
      registeredAt: new Date()
    };

    const result = await tournamentsCollection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $push: { registeredTeams: registration },
        $inc: { players: 1 }
      }
    );

    res.json({
      success: true,
      message: "Successfully registered for tournament"
    });
  } catch (error) {
    console.error("Error registering for tournament:", error);
    res.status(500).json({ 
      error: true, 
      message: "Error registering for tournament" 
    });
  }
};

// Get tournaments by host email
const getTournamentsByHost = async (req, res) => {
  try {
    const { email } = req.params;
    
    const db = getDB();
    const tournamentsCollection = db.collection("tournaments");
    const tournaments = await tournamentsCollection
      .find({ hostEmail: email })
      .sort({ createdAt: -1 })
      .toArray();
    
    res.json(tournaments);
  } catch (error) {
    console.error("Error fetching host tournaments:", error);
    res.status(500).json({ 
      error: true, 
      message: "Error fetching host tournaments" 
    });
  }
};

// Admin: Get all tournaments (including pending)
const getAllTournamentsAdmin = async (req, res) => {
  try {
    const db = getDB();
    const tournamentsCollection = db.collection("tournaments");
    const tournaments = await tournamentsCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    
    res.json(tournaments);
  } catch (error) {
    console.error("Error fetching all tournaments:", error);
    res.status(500).json({ 
      error: true, 
      message: "Error fetching tournaments" 
    });
  }
};

// Admin: Approve/Reject tournament
const updateTournamentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, feedback } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ 
        error: true, 
        message: "Invalid tournament ID" 
      });
    }

    const validStatuses = ["pending", "approved", "rejected", "live", "upcoming", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        error: true, 
        message: "Invalid status" 
      });
    }

    const db = getDB();
    const tournamentsCollection = db.collection("tournaments");
    
    const updateData = { 
      status, 
      updatedAt: new Date() 
    };
    
    if (feedback) {
      updateData.adminFeedback = feedback;
    }
    
    const result = await tournamentsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ 
        error: true, 
        message: "Tournament not found" 
      });
    }

    res.json({
      success: true,
      message: `Tournament ${status} successfully`
    });
  } catch (error) {
    console.error("Error updating tournament status:", error);
    res.status(500).json({ 
      error: true, 
      message: "Error updating tournament status" 
    });
  }
};

module.exports = {
  getAllTournaments,
  getFeaturedTournaments,
  getTournamentById,
  createTournament,
  updateTournament,
  deleteTournament,
  registerForTournament,
  getTournamentsByHost,
  getAllTournamentsAdmin,
  updateTournamentStatus
};
