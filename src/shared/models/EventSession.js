/**
 * EventSession Model
 * Matches the event_sessions table from Rails application
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EventSession = sequelize.define('EventSession', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'events',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    session_type: {
      type: DataTypes.STRING
    },
    // Rails: tags field for acts_as_taggable (stored as comma-separated string)
    // tags: {
    //   type: DataTypes.STRING
    // },
    need_projector: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    need_microphone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    need_whiteboard: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    presentation_url: {
      type: DataTypes.STRING
    },
    video_url: {
      type: DataTypes.STRING
    },
    placeholder: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    image: {
      type: DataTypes.STRING
    },
    cached_votes_up: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    cached_votes_down: {
      type: DataTypes.INTEGER,
      defaultValue: 0
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
    tableName: 'event_sessions',
    timestamps: true,
    underscored: true
  });

  // Model associations
  EventSession.associate = (models) => {
    EventSession.belongsTo(models.Event, {
      foreignKey: 'event_id',
      as: 'event'
    });
    EventSession.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
    EventSession.hasMany(models.EventSessionComment, {
      foreignKey: 'event_session_id',
      as: 'comments'
    });
    // EventSession.hasMany(models.EventLike, {
    //   foreignKey: 'event_session_id',
    //   as: 'likes'
    // });
    EventSession.hasMany(models.Vote, {
      foreignKey: 'votable_id',
      constraints: false,
      scope: {
        votable_type: 'EventSession'
      },
      as: 'votes'
    });
  };

  // Rails constant: EDIT_WINDOW = 30.days
  EventSession.EDIT_WINDOW_DAYS = 30;

  return EventSession;
};
