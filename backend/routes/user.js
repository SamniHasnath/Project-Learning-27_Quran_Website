const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

module.exports = (pool) => {
    // Save Bookmark
    router.post('/bookmarks', protect, async (req, res) => {
        const { surah_id, ayah_number } = req.body;
        const user_id = req.user.id;

        try {
            const connection = await pool.getConnection();
            
            // Check if bookmark already exists
            const [existing] = await connection.query(
                'SELECT * FROM bookmarks WHERE user_id = ? AND surah_id = ? AND ayah_number = ?',
                [user_id, surah_id, ayah_number]
            );

            if (existing.length > 0) {
                // If it exists, let's remove it (toggle feature)
                await connection.query(
                    'DELETE FROM bookmarks WHERE id = ?',
                    [existing[0].id]
                );
                connection.release();
                return res.json({ message: 'Bookmark removed', isBookmarked: false });
            }

            // Otherwise, add it
            await connection.query(
                'INSERT INTO bookmarks (user_id, surah_id, ayah_number) VALUES (?, ?, ?)',
                [user_id, surah_id, ayah_number]
            );
            connection.release();
            
            res.status(201).json({ message: 'Bookmark added', isBookmarked: true });
        } catch (error) {
            console.error('Bookmark Error:', error);
            res.status(500).json({ message: 'Server error while bookmarking' });
        }
    });

    // Get User Bookmarks
    router.get('/bookmarks', protect, async (req, res) => {
        const user_id = req.user.id;

        try {
            const connection = await pool.getConnection();
            const [bookmarks] = await connection.query(
                'SELECT * FROM bookmarks WHERE user_id = ? ORDER BY created_at DESC',
                [user_id]
            );
            connection.release();
            
            res.json(bookmarks);
        } catch (error) {
            console.error('Fetch Bookmarks Error:', error);
            res.status(500).json({ message: 'Server error fetching bookmarks' });
        }
    });

    // Save Reading History
    router.post('/history', protect, async (req, res) => {
        const { surah_id, last_ayah_read } = req.body;
        const user_id = req.user.id;

        try {
            const connection = await pool.getConnection();
            
            // Check if history exists for this surah
            const [existing] = await connection.query(
                'SELECT * FROM reading_history WHERE user_id = ? AND surah_id = ?',
                [user_id, surah_id]
            );

            if (existing.length > 0) {
                // Update
                await connection.query(
                    'UPDATE reading_history SET last_ayah_read = ? WHERE id = ?',
                    [last_ayah_read, existing[0].id]
                );
            } else {
                // Insert
                await connection.query(
                    'INSERT INTO reading_history (user_id, surah_id, last_ayah_read) VALUES (?, ?, ?)',
                    [user_id, surah_id, last_ayah_read]
                );
            }
            connection.release();
            
            res.status(200).json({ message: 'Reading history updated' });
        } catch (error) {
            console.error('History Error:', error);
            res.status(500).json({ message: 'Server error updating history' });
        }
    });

    // Get Reading History
    router.get('/history', protect, async (req, res) => {
        const user_id = req.user.id;

        try {
            const connection = await pool.getConnection();
            const [history] = await connection.query(
                'SELECT * FROM reading_history WHERE user_id = ? ORDER BY updated_at DESC',
                [user_id]
            );
            connection.release();
            
            res.json(history);
        } catch (error) {
            console.error('Fetch History Error:', error);
            res.status(500).json({ message: 'Server error fetching history' });
        }
    });

    return router;
};
