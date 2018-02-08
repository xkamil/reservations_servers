const express = require('express');
const router = express.Router();
const Resource = require('../models/resource');

router.get('/', (req, res, next) => {
    Resource.find()
        .then(data => res.json(data))
        .catch(err => next(err))
});

router.delete('/:name', (req, res, next) => {
    const name = req.params.name || '';

    Resource.remove({name})
        .then(() => res.json(`Resource ${name} removed`))
        .catch(err => next(err))
});

router.delete('/', (req, res,next) => {
    Resource.remove()
        .then(() => res.send())
        .catch(err => next(err))
});

router.post('/:name', (req, res, next) => {
    const name = req.params.name || '';

    Resource.findOne({name})
        .then(resource => {
            if (resource) {
                res.status(409).json(resource)
            } else {
                const newResource = new Resource({name});
                newResource.save()
                    .then(resource => res.json(resource))
                    .catch(err => next(err))
            }
        })
        .catch(err => next(err));

});

module.exports = router;