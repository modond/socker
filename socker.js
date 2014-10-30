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
        'click input.create': function() {
            Meteor.call('createContainer', this.Id);
        }
    });
}

if (Meteor.isServer) {


    Meteor.methods({
        getImages: function() {
            var images = HTTP.get('http://172.17.42.1:4243/images/json');
            Images.remove({});
            images.data.forEach(function(image) {
                Images.insert(image);
            });
        },
        createContainer: function(Id) {
            var params = {"Image":Id};
            HTTP.post('http://172.17.42.1:4243/containers/create', {
                "data": params
            });
        },
        startContainer: function() {
            HTTP.get('http://172.17.42.1:4243/images/json');
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
