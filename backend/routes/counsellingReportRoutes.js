const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const { CounsellingReport, Counselling, User } = require("../models"); // Import models

// 🔹 Fetch report details & student info
router.get("/:session_id", authenticateToken, async (req, res) => {
    try {
        const sessionId = req.params.session_id;

        // ✅ Get counselling session to fetch student_id
        const counsellingSession = await Counselling.findOne({
            where: { session_id: sessionId },
            include: [{ model: User, as: "Student", attributes: ["first_name", "last_name"] }],
        });

        if (!counsellingSession) {
            return res.status(404).json({ error: "Counselling session not found" });
        }

        const studentName = `${counsellingSession.Student.first_name} ${counsellingSession.Student.last_name}`;
        //console.log(studentName);
        // ✅ Get the report if it exists
        const report = await CounsellingReport.findOne({
            where: { counselling_id: sessionId },
        });

        if (!report) {
            return res.status(404).json({
                error: "Report not found",
                student_name: studentName, // Send student name even if report doesn't exist
            });
        }

        res.json({
            student_name: studentName,
            student_age: report.student_age,
            problem_details: report.problem_details,
            solution: report.solution,
        });

    } catch (error) {
        console.error("Error fetching report:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 🔹 Add a New Report
router.post("/add-report", authenticateToken, async (req, res) => {
    try {
        const { counselling_id, student_age, problem_details, solution } = req.body;

        if (!counselling_id || !student_age || !problem_details || !solution) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // ✅ Get student name from counselling session
        const counsellingSession = await Counselling.findOne({
            where: { session_id: counselling_id },
            include: [{ model: User, as: "Student", attributes: ["first_name", "last_name"] }],
        });

        if (!counsellingSession) {
            return res.status(404).json({ error: "Counselling session not found" });
        }

        const studentName = `${counsellingSession.Student.first_name} ${counsellingSession.Student.last_name}`;
        console.log("---------------------------")
        console.log(studentName);
        console.log("---------------------------")
        // ✅ Create new report
        const newReport = await CounsellingReport.create({
            counselling_id,
            student_name: studentName, // Auto-fetch student name
            student_age,
            problem_details,
            solution,
        });

        res.status(201).json({ message: "Report added successfully!", newReport });

    } catch (error) {
        console.error("Error adding report:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
