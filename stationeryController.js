const db = require('./db'); 

class StationeryController {
    async createStationery(req, res) {
        try {
            const { brand, color, matherial, num_pencils, num_pens, num_erasers } = req.body;
    
            if (!brand || !color || !matherial || !num_pencils || !num_pens || !num_erasers) {
                return res.status(400).json({ error: 'All fields are required.' });
            }
    
            const [result] = await db.execute('INSERT INTO stationery (brand, color, material, number_of_pencils, number_of_pens, number_of_erasers) VALUES (?, ?, ?, ?, ?, ?)',
                [brand, color, matherial, num_pencils, num_pens, num_erasers]);
            res.json({ id: result.insertId, message: 'Stationery added successfully' });
        } catch (error) {
            console.error("Error creating stationery:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    
    
    

    async getStationery(req, res) {
        try {
            const [rows, fields] = await db.execute('SELECT * FROM stationery');
            res.json(rows);
        } catch (error) {
            console.error("Error getting stationery:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateStationery(req, res) {
        try {
            const { brand, color, matherial, number_of_pencils, number_of_pens, number_of_erasers, id } = req.body;
            await db.execute('UPDATE stationery SET brand=?, color=?, matherial=?,  number_of_pencils=?, number_of_pens=?, number_of_erasers=? WHERE id=?',
                [brand, color, matherial, number_of_pencils, number_of_pens, number_of_erasers, id]);
            res.json({ message: 'Stationery updated successfully' });
        } catch (error) {
            console.error("Error updating stationery:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deleteStationery(req, res) {
        try {
            const id = req.params.id;
            await db.execute('DELETE FROM stationery WHERE id = ?', [id]);
            res.json({ message: 'Stationery deleted successfully' });
        } catch (error) {
            console.error("Error deleting stationery:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new StationeryController();
