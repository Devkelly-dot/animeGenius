const { SearchAvailabilityActionSerializer } = require("../../serializers/action/availability/searchAvailability");
const { RapidApiAvailabilitySerializer } = require("../../serializers/return/availability/rapidApiAvailabilitySerializer");
const { BaseController } = require("../base/base");

class SearchAvailabilityController extends BaseController {
    constructor() {
        super();
        this.actionSerializer = SearchAvailabilityActionSerializer;
        this.returnSerializer = RapidApiAvailabilitySerializer;
    }
}

module.exports = {
    SearchAvailabilityController
}