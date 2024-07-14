'use strict';

/**
 * test-page service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::test-page.test-page');
