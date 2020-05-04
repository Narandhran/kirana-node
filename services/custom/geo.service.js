module.exports.milesToRadian = function (miles) {
    var earthRadiusInMiles = 3959;
    return miles / earthRadiusInMiles;
};

module.exports.kmToRadian = function (km) {
    var earthRadiusInKm = 6378;
    return km / earthRadiusInKm;
};