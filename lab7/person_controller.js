const PersonModel = require('./models/person');

module.exports.getPersons = function(req, res) {
    PersonModel.find({}, (error, resp) => {
        if (error) {
            res.json({ success: false, message: 'No persons here, maybe later :)', data: null });
        } 

        // persons = resp.map((person) => ({
        //     name: person.name,
        //     age: person.age,
        //     born: person.born,
        //     timeline: person.timeline,
        //     alliegance: person.alliegance,
        //     playedBy: person.playedBy,
        //     titles: person.titles,
        //     father: person.father,
        //     mother: person.mother,
        //     spouse: person.spouse
        // }));

        res.json(
            {
                success: true,
                data: resp
            }
        )
    });
}

module.exports.getPersonById = function(req, res) {
    PersonModel.findById(req.params.id, (err, resp) => {
        if (err) {
            console.log(err);
            res.json({ success: false, message: 'Error, these are not the droids you are looking for (Wrong franchise)', data: null });
        } else {
            res.json({ success: true, message: 'Person found', data: resp });
        }
    });
}

module.exports.createPerson = function(req, res) {
    if (req.body) {
        PersonModel.create([
            {
                name: req.body.name,
                age: req.body.age,
                born: req.body.born,
                timeline: req.body.timeline,
                alliegance: req.body.alliegance,
                playedBy: req.body.playedBy,
                titles: req.body.titles,
                father: req.body.father,
                mother: req.body.mother,
                spouse: req.body.spouse
            }
        ], (err, resp) => {
            if (err) {
                console.log(err);
                res.json({ success: false, message: `Error while creating person: ${err}`, data: null });
            } else {
                res.json({ success: true, message: 'Person created', data: resp });
            }
        })
    }
}

module.exports.updatePerson = function(req, res) {
    PersonModel.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false }, (err, resp) => {
        if (err) {
            console.log(err);
            res.json({ success: false, message: `An error ocurred`, data: err })
        } else {
            res.json({ success: true, message: 'Person updated', data: resp })
        }
    });
}

module.exports.deletePerson = function(req, res) {
    PersonModel.findByIdAndDelete(req.params.id, (err, resp) => {
        if (err) {
            console.log(err);
            res.json({ success: false, message: 'An error ocurred', data: err });
        } else {
            res.json({ success: true, message: 'Person deleted' })
        }
    });
}