module.exports = {

    testCloses: function(test) {
        GLOBAL.driver.close();
        test.done();
    }

};
