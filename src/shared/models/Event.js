/**
 * Event Model
 * Matches the events table from Rails application
 */

const { DataTypes } = require('sequelize');
const slugify = require('slugify');

module.exports = (sequelize) => {
  const Event = sequelize.define('Event', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    event_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'event_types',
        key: 'id'
      }
    },
    chapter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'chapters',
        key: 'id'
      }
    },
    venue_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'venues',
        key: 'id'
      }
    },
    public: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    can_show_on_homepage: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    can_show_on_archive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    accepting_registration: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    state: {
      type: DataTypes.STRING
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING
    },
    registration_start_time: {
      type: DataTypes.DATE
    },
    registration_end_time: {
      type: DataTypes.DATE
    },
    registration_instructions: {
      type: DataTypes.TEXT
    },
    ready_for_announcement: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    ready_for_notifications: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    ready_for_reminders: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    notifications_sent_at: {
      type: DataTypes.DATE
    },
    announced_at: {
      type: DataTypes.DATE
    },
    notification_state: {
      type: DataTypes.STRING
    },
    max_registration: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    image: {
      type: DataTypes.STRING
    },
    calendar_event_id: {
      type: DataTypes.STRING
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'events',
    timestamps: true,
    underscored: true,
    hooks: {
      beforeCreate: (event) => {
        // Set default values
        if (!event.registration_start_time) {
          const startTime = new Date(event.start_time);
          event.registration_start_time = new Date(startTime.setDate(startTime.getDate() - 7));
        }
        if (!event.registration_end_time) {
          event.registration_end_time = event.start_time;
        }
        if (event.max_registration === undefined) {
          event.max_registration = 0;
        }
        event.notification_state = 'init';
      },
      afterCreate: async (event) => {
        // Generate slug
        const chapter = await event.getChapter();
        if (chapter) {
          event.slug = slugify(`${chapter.name} ${event.name} ${event.id}`, {
            lower: true,
            strict: true
          });
          await event.save();
        }
      }
    },
    scopes: {
      futureEvents: {
        where: {
          end_time: {
            [sequelize.Sequelize.Op.gt]: new Date()
          }
        }
      },
      publicEvents: {
        where: {
          public: true
        }
      },
      archives: {
        where: {
          public: true,
          can_show_on_archive: true,
          start_time: {
            [sequelize.Sequelize.Op.lt]: new Date()
          }
        }
      }
    }
  });

  // Instance methods
  Event.prototype.registrationAllowed = async function() {
    if (this.max_registration > 0) {
      const registrationCount = await this.countEventRegistrations();
      return this.max_registration > registrationCount;
    }
    return true;
  };

  Event.prototype.registrationActive = function() {
    if (!this.accepting_registration) return false;

    if (this.registration_start_time && this.registration_end_time) {
      const now = new Date();
      return now > this.registration_start_time && now < this.registration_end_time;
    }
    return false;
  };

  // Model associations
  Event.associate = (models) => {
    Event.belongsTo(models.EventType, {
      foreignKey: 'event_type_id',
      as: 'eventType'
    });
    Event.belongsTo(models.Chapter, {
      foreignKey: 'chapter_id',
      as: 'chapter'
    });
    Event.belongsTo(models.Venue, {
      foreignKey: 'venue_id',
      as: 'venue'
    });
    Event.hasMany(models.EventSession, {
      foreignKey: 'event_id',
      as: 'eventSessions'
    });
    Event.hasMany(models.EventRegistration, {
      foreignKey: 'event_id',
      as: 'eventRegistrations'
    });
  };

  return Event;
};
