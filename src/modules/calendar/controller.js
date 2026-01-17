/**
 * Calendar Controller
 */
const service = require('./services');
const { successResponse, errorResponse } = require('../../shared/utils/response');

const getChapterCalendar = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const ics = await service.generateChapterCalendar(chapterId);

    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="chapter-${chapterId}.ics"`);
    return res.send(ics);
  } catch (error) {
    console.error('Error generating calendar:', error);
    return errorResponse(res, error.message, 400);
  }
};

const getGlobalCalendar = async (req, res) => {
  try {
    const ics = await service.generateGlobalCalendar();

    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="null-community-events.ics"');
    return res.send(ics);
  } catch (error) {
    console.error('Error generating calendar:', error);
    return errorResponse(res, error.message, 400);
  }
};

const getMyCalendar = async (req, res) => {
  try {
    const ics = await service.generateUserCalendar(req.user.id);

    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="my-events.ics"');
    return res.send(ics);
  } catch (error) {
    console.error('Error generating calendar:', error);
    return errorResponse(res, error.message, 400);
  }
};

// JSON versions for frontend display
const getChapterCalendarJson = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const ics = await service.generateChapterCalendar(chapterId);
    const feedUrl = `${process.env.API_URL}/api/calendar/chapter/${chapterId}.ics`;

    return successResponse(res, 'Calendar feed info', {
      feedUrl,
      subscribeUrl: feedUrl.replace('http', 'webcal'),
      googleCalendarUrl: `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(feedUrl)}`
    });
  } catch (error) {
    console.error('Error getting calendar info:', error);
    return errorResponse(res, error.message, 400);
  }
};

module.exports = {
  getChapterCalendar,
  getGlobalCalendar,
  getMyCalendar,
  getChapterCalendarJson
};
