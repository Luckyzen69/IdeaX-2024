const Diary = require("../models/diary");
const Plan = require("../models/plan");

const createDiaryEntry = async (req, res) => {
  try {
    const { planId, task, revenue, cost } = req.body;
    const newDiaryEntry = new Diary({
      planId,
      task,
      revenue,
      cost,
    });

    await newDiaryEntry.save();

    res.status(201).json({
      message: "Diary entry created successfully",
      diary: newDiaryEntry,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create diary entry", error: error.message });
  }
};

const updateDiaryEntryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, date, revenue, cost } = req.body;
    const updatedDiaryEntry = await Diary.findByIdAndUpdate(
      id,
      { task, date, revenue, cost },
      { new: true }
    );
    if (!updatedDiaryEntry) {
      return res.status(404).json({ message: "Diary entry not found" });
    }
    res.status(200).json(updatedDiaryEntry);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update diary entry", error: error.message });
  }
};

const deleteDiaryEntryById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDiaryEntry = await Diary.findByIdAndDelete(id);
    if (!deletedDiaryEntry) {
      return res.status(404).json({ message: "Diary entry not found" });
    }
    res.status(200).json({ message: "Diary entry deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete diary entry", error: error.message });
  }
};

const readDiariesByPlanId = async (req, res) => {
  try {
    const { planId } = req.params;
    console.log(planId);
    const diaries = await Diary.find({ planId });
    const plandata = await Plan.findById(planId);

  
      return res.status(200).json({ diaries, plandata });


  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to read diary entries", error: error.message });
  }
};

module.exports = {
  createDiaryEntry,
  updateDiaryEntryById,
  deleteDiaryEntryById,
  readDiariesByPlanId,
};
