const { Op } = require('sequelize');
const { User } = require('../../../shared/models');

/**
 * Autocomplete User Search
 * @param {Object} params - Service parameters
 * @param {string} params.q - Query string
 * @returns {Object} Select2 formatted result
 */
const autocomplete = async ({ q }) => {
    if (!q) {
        return { results: [], pagination: { more: false } };
    }

    const users = await User.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.like]: `%${q}%` } },
                { email: { [Op.like]: `%${q}%` } }
            ]
        },
        limit: 10
    });

    return {
        results: users.map(u => ({
            id: u.id,
            text: `${u.name} <${u.email}>`
        })),
        pagination: {
            more: false
        }
    };
};

module.exports = autocomplete;
