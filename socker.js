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
    var refreshImages = function(data) {
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
            Images.remove({});
            images.data.forEach(function(image) {
                Images.insert(image);
            });
        },
        getContainers: function() {
            //var containers = HTTP.get('http://localhost:4243/containers/json');
            //Images.remove({});
            //containers.data.forEach(function(container) {
            //    Images.insert(container);
            //});
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
