const userAPI = require('./user/user.model.server'),
    websiteAPI = require('./website/website.model.server'),
    pageAPI = require('./page/page.model.server'),
    widgetAPI = require('./widget/widget.model.server');

module.exports = {
    userAPI,
    websiteAPI,
    pageAPI,
    widgetAPI
};
