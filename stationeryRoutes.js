const express = require('express');
const router = express.Router();
const stationeryController = require('./stationeryController'); // Import the stationery controller

// Create a new stationery item
router.post('/stationery', async (req, res) => {
    await stationeryController.createStationery(req, res);
});

// Get all stationery items
router.get('/stationery', async (req, res) => {
    await stationeryController.getStationery(req, res);
});

// Get a specific stationery item by ID
router.get('/stationery/:id', async (req, res) => {
    await stationeryController.getStationery(req, res);
});

// Update a stationery item by ID
router.put('/stationery/:id', async (req, res) => {
    await stationeryController.updateStationery(req, res);
});

// Delete a stationery item by ID
router.delete('/stationery/:id', async (req, res) => {
    await stationeryController.deleteStationery(req, res);
});

module.exports = router;
