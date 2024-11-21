const express = require('express');
const app = express();
const db = require('./database/db'); // Import database
const port = 3000;
const expressLayouts = require('express-ejs-layouts');
const path = require('path'); // Untuk mengatur path folder views

// Middleware
app.use(express.urlencoded({ extended: true })); // Untuk menangani data form
app.use(express.json()); // Untuk menangani data JSON
app.use(expressLayouts); // Menggunakan express-ejs-layouts

// Set EJS sebagai view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Menentukan lokasi folder views
app.set('layout', 'layouts/main-layout'); // Tentukan layout yang digunakan

// Rute untuk menampilkan halaman utama (read)
app.get('/', (req, res) => {
    db.query('SELECT * FROM hewan', (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.render('index', {
                title: 'Daftar Hewan Kebun Binatang',
                hewan: results
            });
        }
    });
});

// Rute untuk menambah data (create)
app.post('/add', (req, res) => {
    const { name, species, age } = req.body; // Ganti nama menjadi 'name' sesuai dengan field di form
    if (name && species && age) {
        db.query('INSERT INTO hewan (name, species, age) VALUES (?, ?, ?)', [name, species, age], (err) => {
            if (err) {
                console.error('Error adding animal:', err);
                res.status(500).send('Internal Server Error');
            } else {
                res.redirect('/');
            }
        });
    } else {
        res.redirect('/');
    }
});

// Rute untuk menghapus data (delete)
app.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM hewan WHERE id = ?', [id], (err) => {
        if (err) {
            console.error('Error deleting animal:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/');
        }
    });
});

// Rute untuk mengedit data (update)
app.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const { name, species, age } = req.body; // Pastikan nama sesuai dengan form
    db.query('UPDATE hewan SET name = ?, species = ?, age = ? WHERE id = ?', [name, species, age, id], (err) => {
        if (err) {
            console.error('Error updating animal:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/');
        }
    });
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
