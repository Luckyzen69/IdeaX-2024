const Plan = require("../models/plan"); 

const createPlan = async (req, res) => {
  try {
    const { plan, authorId } = req.body;
    const newPlan = new Plan({
      plan,
      authorId,
    });
    const savedPlan = await newPlan.save();
    res.status(201).json(savedPlan);
  } catch (error) {
    res.status(500).json({ message: "Error creating plan", error });
  }
};


const updatePlanById = async (req, res) => {
    try {
      const { id } = req.params;
      const { plan, authorId } = req.body;
      const updatedPlan = await Plan.findByIdAndUpdate(
        id,
        { plan, authorId },
        { new: true }
      );
      if (!updatedPlan) {
        return res.status(404).json({ message: "Plan not found" });
      }
      res.status(200).json(updatedPlan);
    } catch (error) {
      res.status(500).json({ message: "Error updating plan", error });
    }
  };
  
  const readPlansByAuthorId = async (req, res) => {
    try {
      const { authorId } = req.params;
      console.log('hello')
      const plans = await Plan.find({ authorId });
      console.log(plans)
      if (plans.length === 0) {
        return res
          .status(404)
          .json({ message: "No plans found for this user" });
      }
     return res.status(200).json(plans);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to read plans", error: error.message });
    }
  };

  const deletePlanById = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedPlan = await Plan.findByIdAndDelete(id);
      if (!deletedPlan) {
        return res.status(404).json({ message: "Plan not found" });
      }
      res.status(200).json({ message: "Plan deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting plan", error });
    }
  };


module.exports = {
  createPlan,
  updatePlanById,
  deletePlanById,
  readPlansByAuthorId
};
