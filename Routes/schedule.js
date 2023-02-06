const express = require('express');
const router  = express.Router();

const {
    getAllSchedules,
    createSchedule,
    getSchedule,
    updateSchedule,
    deleteSchedule
} = require('../Controllers/Schedule');

router.route('/').get(getAllSchedules).post(createSchedule);
router.route('/:id').get(getSchedule).patch(updateSchedule).delete(deleteSchedule);

module.exports = router;