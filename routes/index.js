const express = require('express');
const router = express.Router();

const axios = require('axios');
//const page = 1;


router.get('/:page', async (req, res) => {
    try {
        const pageNo = req.params.page;
        console.log(pageNo)
        const r = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MY_API_KEY}&language=en-US&page=${pageNo}`);
        const d = await r.data;
        const { results } = d;
        res.render('movies', { results: results, page: pageNo });
    } catch (err) {
        console.log(err);
        res.json({
            message: err
        })
    }

})

router.get('/1/search', (req, res) => {
    res.render('searchMovies', { results: [] });
})

router.post('/1/search', async (req, res) => {
    try {
        const r = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MY_API_KEY}&query=${req.body.title}&language=en-US&page=1&include_adult=false`);
        const d = await r.data;
        const { results } = d;
        res.render('searchMovies', { results: results });
    } catch (err) {
        res.json({
            message: err
        })
    }
})

router.get('/1/about', (req, res) => {
    res.render('about');
})

router.get('/movie/:id', async (req, res) => {
    try {
        const r = await axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.MY_API_KEY}&language=en-US`);
        const d = await r.data;
        const { title, overview, poster_path, runtime, genres } = d;
        res.render('movieProfile', {
            title,
            overview,
            runtime,
            poster_path,
            genres
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: err
        })
    }
})

//Favorites
router.get('/1/favorites', (req, res) => {
    res.render('favorites');
})

module.exports = router;