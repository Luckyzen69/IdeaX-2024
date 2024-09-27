const Diary = require("../models/diary");

const createDiaryEntry = async (req, res) => {
  try {
    const { planId, task, date, revenue, cost } = req.body;
    const newDiaryEntry = new Diary({
      planId,
      task,
      date,
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
    const {  task, date, revenue, cost } = req.body;
    const updatedDiaryEntry = await Diary.findByIdAndUpdate(
      id,
      {  task, date, revenue, cost },
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
    const diaries = await Diary.find({ planId });
    if (!diaries.length) {
      return res
        .status(404)
        .json({ message: "No diary entries found for this plan" });
    }
    res.status(200).json(diaries);
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
  readDiariesByPlanId
};
