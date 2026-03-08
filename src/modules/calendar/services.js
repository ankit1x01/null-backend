/**
 * Calendar Services
 * ICS Calendar feed generation for chapters
 */
const db = require('../../shared/models');
const { Op } = require('sequelize');

class CalendarService {
  /**
   * Generate ICS content for chapter events
   */
  async generateChapterCalendar(chapterId) {
    const chapter = await db.Chapter.findByPk(chapterId);
    if (!chapter) throw new Error('Chapter not found');

    // Get upcoming and recent events
    const events = await db.Event.findAll({
      where: {
        chapter_id: chapterId,
        state: { [Op.in]: ['published', 'completed'] },
        start_time: { [Op.gte]: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) } // Last 90 days
      },
      include: [{ model: db.Venue, as: 'venue' }],
      order: [['start_time', 'ASC']]
    });

    return this.generateICS(chapter, events);
  }

  /**
   * Generate ICS content for all chapters
   */
  async generateGlobalCalendar() {
    const events = await db.Event.findAll({
      where: {
        state: { [Op.in]: ['published', 'completed'] },
        start_time: { [Op.gte]: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) }
      },
      include: [
        { model: db.Venue, as: 'venue' },
        { model: db.Chapter, as: 'chapter' }
      ],
      order: [['start_time', 'ASC']]
    });

    return this.generateICS({ name: 'null Community', slug: 'all' }, events);
  }

  /**
   * Generate ICS format string
   */
  generateICS(calendar, events) {
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      `PRODID:-//null Community//${calendar.name}//EN`,
      `X-WR-CALNAME:${calendar.name} Events`,
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH'
    ];

    for (const event of events) {
      lines.push(...this.generateVEvent(event));
    }

    lines.push('END:VCALENDAR');
    return lines.join('\r\n');
  }

  /**
   * Generate VEVENT for single event
   */
  generateVEvent(event) {
    const uid = `event-${event.id}@null.community`;
    const dtstamp = this.formatDate(new Date());
    const dtstart = this.formatDate(new Date(event.start_time));
    const dtend = this.formatDate(new Date(event.end_time || new Date(new Date(event.start_time).getTime() + 2 * 60 * 60 * 1000)));

    const location = event.venue
      ? `${event.venue.name}${event.venue.address ? ', ' + event.venue.address : ''}`
      : (event.online_link ? 'Online Event' : 'TBA');

    const description = this.escapeICS(
      (event.description || '').replace(/<[^>]*>/g, '') +
      (event.online_link ? `\n\nOnline Link: ${event.online_link}` : '') +
      `\n\nMore info: ${process.env.FRONTEND_URL}/events/${event.id}`
    );

    const lines = [
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART:${dtstart}`,
      `DTEND:${dtend}`,
      `SUMMARY:${this.escapeICS(event.name)}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${this.escapeICS(location)}`,
      `URL:${process.env.FRONTEND_URL}/events/${event.id}`,
      `STATUS:${event.state === 'cancelled' ? 'CANCELLED' : 'CONFIRMED'}`
    ];

    if (event.chapter) {
      lines.push(`CATEGORIES:${this.escapeICS(event.chapter.name)}`);
    }

    lines.push('END:VEVENT');
    return lines;
  }

  /**
   * Format date for ICS (YYYYMMDDTHHmmssZ)
   */
  formatDate(date) {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  }

  /**
   * Escape special characters for ICS
   */
  escapeICS(text) {
    if (!text) return '';
    return text
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\n/g, '\\n');
  }

  /**
   * Get user's personal calendar (their registrations)
   */
  async generateUserCalendar(userId) {
    const registrations = await db.EventRegistration.findAll({
      where: { user_id: userId },
      include: [{
        model: db.Event,
        as: 'event',
        include: [
          { model: db.Venue, as: 'venue' },
          { model: db.Chapter, as: 'chapter' }
        ]
      }],
      order: [[{ model: db.Event, as: 'event' }, 'start_time', 'ASC']]
    });

    const events = registrations.map(r => r.event).filter(e => e);
    const user = await db.User.findByPk(userId);

    return this.generateICS({ name: `${user.name}'s Events`, slug: 'personal' }, events);
  }
}

module.exports = new CalendarService();
