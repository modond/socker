Images = new Mongo.Collection('images');
Containers = new Mongo.Collection('containers');

if (Meteor.isClient) {
    Template.images.helpers({
        imagesList: function () {
            return Images.find();
        }
    });
    Template.images.events({
        'click input#refresh-images': function () {
            Meteor.call('getImages');
        },
        'click input.run': function() {
            Meteor.call('runContainer');
        }
    });
}

if (Meteor.isServer) {
    var spawn = Npm.require('child_process').spawn;
    var parseLine = function(line) {
        return line.replace(/ {2,}/g, "\t").split("\t");
    };
    var refreshImages = function(data) {
        Images.remove({});
        data.split(/\r?\n/).forEach(function(entry) {
            if (entry && !entry.match(/image id/gi)) {
                entry = parseLine(entry);
                Images.insert({
                    repository: entry[0],
                    tag: entry[1],
                    image_id: entry[2],
                    virtual_size: entry[4]
                });
            }
        });
    };
    Meteor.methods({
        getImages: function() {
            var images = HTTP.get('http://localhost:4243/images/json');
            console.log(images.statusCode);
            //var tail = spawn('docker', ['images']);
            //tail.stdout.setEncoding('utf8');
            //tail.stdout.on('data', Meteor.bindEnvironment(refreshImages));
        },
        getContainers: function() {
            console.log('listing containers');
        },
        runContainer: function() {
            console.log('running a container');
        },
        stopContainer: function() {
            console.log('stopping a container');
        },
        reloadContainer: function() {
            console.log('reloading a container');
        }
    });
    Meteor.startup(function () {
    // code to run on server at startup
    });
}
