var logger = require('./log');

exports.all = function (req, res) {
    req.getConnection(function(err, connection){
        connection.query("select * from issues", function(err, results){
            res.render('issues', {issues : results})
        });
    });
}

exports.get = function (req, res) {
    req.getConnection(function(err, connection){
        connection.query("select * from issues where id = ?", req.params.id, function(err, results){
                res.render('issue_edit', {issue : results[0]})
        });
    });

}

exports.update = function (req, res) {
    req.getConnection(function(err, connection){
        var data = {
            heading : req.body.heading,
            description : req.body.description
        };
                     console.log('err updating : %s', err)

        connection.query("update issues set ? where id = ?", [data, req.params.id], function(err, results){
            // what will happen here?
            if(err)
                console.log('err updating : %s', err)
                // return next("Error inserting : %s ", err);
                res.redirect("/issues");
        });
    });
}

exports.showAdd = function (req, res) {
    res.render('issue')
};

exports.add = function (req, res) {

    var data = {
        heading : req.body.heading,
        description : req.body.description
    }
    req.getConnection(function(err, connection){
        // what can I do better here?
        connection.query("insert into issues set ?", data, function(err, results){
            // what can I do better here?
            res.redirect('/issues')
        });
    });
}

exports.delete = function (req, res, next) {
    req.getConnection(function(err, connection){
        connection.query("delete from issues where id = ?", req.params.id, function(err, results){
            if (err) throw next(err);
            res.redirect('/issues')
        });
    });

}
