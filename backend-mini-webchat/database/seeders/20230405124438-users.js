'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        await queryInterface.bulkInsert('Users', [
            {
                firstName: 'Dang',
                lastName: 'Nhat',
                email: 'nhat@gmail.com',
                password: bcrypt.hashSync('secret', 10),
                gender: 'male',
            },
            {
                firstName: 'Ngo',
                lastName: 'Nghia',
                email: 'nghia@gmail.com',
                password: 'secret',
                gender: 'male',
            },
            {
                firstName: 'Pham',
                lastName: 'Quan',
                email: 'quan@gmail.com',
                password: 'secret',
                gender: 'male',
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */

        await queryInterface.bulkDelete('Users', null, {});
    },
};
