const Sauce = require('../models/sauce');
const fs = require('fs');

// Add a new sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;

    console.log('Request body:', req.body);
    console.log('File info:', req.file);
    req.body.sauce = JSON.parse(req.body.sauce);

    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce created successfully!' }))
        .catch(error => res.status(400).json({ error, 'message': 'failed' }));
};

// Delete a sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce deleted!' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

// Get all sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

// Get one sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    // let sauce = new Sauce({ _id: req.params._id });
    let sauce;
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        req.body.sauce = JSON.parse(req.body.sauce);
        sauce = new Sauce({
            _id: req.params.id,
            userId: req.body.sauce.userId,
            name: req.body.sauce.name,
            manufacturer: req.body.sauce.manufacturer,
            description: req.body.sauce.description,
            mainPepper: req.body.sauce.mainPepper,
            imageUrl: url + '/images/' + req.file.filename,
            heat: req.body.sauce.heat
        });

    } else {
        sauce = new Sauce({
            _id: req.params.id,
            userId: req.body.userId,
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            description: req.body.description,
            mainPepper: req.body.mainPepper,
            heat: req.body.heat
        });
    }

    Sauce.updateOne({ _id: req.params.id }, sauce)
        .then(() => res.status(200).json({ message: 'Sauce updated successfully!' }))
        .catch(error => res.status(400).json({ error }));
};

// Update an existing sauce
// exports.updateSauce = (req, res, next) => {
//     let sauceObject = {};

//     // Check if a file (image) was uploaded
//     if (req.file) {
//         // If a new image is uploaded, update the image URL and delete the old image
//         sauceObject = {
//             ...JSON.parse(req.body.sauce),
//             imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//         };

//         // Find the sauce to delete the old image
//         Sauce.findOne({ _id: req.params.id })
//             .then(sauce => {
//                 const oldFilename = sauce.imageUrl.split('/images/')[1];
//                 fs.unlink(`images/${oldFilename}`, () => {
//                     // Continue with the sauce update
//                     Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
//                         .then(() => res.status(200).json({ message: 'Sauce updated with new image!' }))
//                         .catch(error => res.status(400).json({ error }));
//                 });
//             })
//             .catch(error => res.status(500).json({ error }));
//     } else {
//         // If no new image is uploaded, just update the other fields
//         sauceObject = { ...req.body };

//         Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
//             .then(() => res.status(200).json({ message: 'Sauce updated successfully!' }))
//             .catch(error => res.status(400).json({ error }));
//     }
// };

// Handle liking or disliking a sauce
exports.likeSauce = (req, res, next) => {
    const userId = req.body.userId;
    const like = req.body.like; // 1 for like, -1 for dislike, 0 for undo

    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (like === 1) {
                // User is liking the sauce
                if (!sauce.usersLiked.includes(userId)) {
                    sauce.usersLiked.push(userId);
                    sauce.likes += 1;
                }
            } else if (like === -1) {
                // User is disliking the sauce
                if (!sauce.usersDisliked.includes(userId)) {
                    sauce.usersDisliked.push(userId);
                    sauce.dislikes += 1;
                }
            } else if (like === 0) {
                // User is undoing a like or dislike
                if (sauce.usersLiked.includes(userId)) {
                    sauce.usersLiked = sauce.usersLiked.filter(user => user !== userId);
                    sauce.likes -= 1;
                } else if (sauce.usersDisliked.includes(userId)) {
                    sauce.usersDisliked = sauce.usersDisliked.filter(user => user !== userId);
                    sauce.dislikes -= 1;
                }
            }

            // Save the updated sauce
            sauce.save()
                .then(() => res.status(200).json({ message: 'Sauce updated successfully!' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(404).json({ error }));
};
