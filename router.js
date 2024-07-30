const express = require("express");
const Resume = require("./resumeSchema");
const router = express.Router();
router.get("/", (req, res) => {
  res.send("Welcome to the Resume Builder API");
});
router.post("/user-resumes", async (req, res) => {
  try {
    console.log(req.body);
    const resume = new Resume(req.body);
    await resume.save();
    res.status(200).json({
      resumeId: resume._id,
      resume,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.get("/getuserresumes/", async (req, res) => {
  try {
    const email = req.query.email;
    console.log(email);
    const resume = await Resume.find({ userEmail: email });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    console.log(resume);
    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/updateresume/", async (req, res) => {
  try {
    const id = req.query.id; // Get the ID from query parameters
    const data = req.body; // Get the data from the request body

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const updatedResume = await Resume.findOne({ resumeId: id });

    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Update the fields with the new data
    if (data.title != null) updatedResume.title = data.title;
    if (data.userName != null) updatedResume.userName = data.userName;
    if (data.userEmail != null) updatedResume.userEmail = data.userEmail;

    // Save the updated resume
    await updatedResume.save();

    res.status(200).json(updatedResume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/getresume/", async (req, res) => {
  try {
    const id = req.query.id;
    const resume = await Resume.find({ resumeId: id });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/deleteresume/", async (req, res) => {
  try {
    const id = req.query.id; // Get the ID from query parameters

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    // Use findOneAndDelete with the custom field
    const deletedResume = await Resume.findOneAndDelete(id);

    if (!deletedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
