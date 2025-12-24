const { UserAchievement } = require('../../shared/models');

const getUserAchievements = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const achievements = await UserAchievement.findAll({
      where: { user_id: userId },
      order: [['awarded_at', 'DESC']]
    });

    res.status(200).json({
      code: 'ACH001',
      message: 'Achievements fetched successfully',
      result: achievements
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserAchievements
};
