const dropboxFS = require("dropbox-fs");
const Buttercup = require("buttercup");

const TextDatasource = Buttercup.TextDatasource;
const registerDatasource = Buttercup.DatasourceAdapter.registerDatasource;

/**
 * Datasource for Dropbox archives
 * @augments TextDatasource
 */
class DropboxDatasource extends TextDatasource {

    /**
     * Datasource for Dropbox accounts
     * @param {String} accessToken The dropbox access token
     * @param {String} resourcePath The file path
     */
    constructor(accessToken, resourcePath) {
        super("");
        this.path = resourcePath;
        this.token = accessToken;
        this.dfs = dropboxFS({
            apiKey: accessToken
        });
    }

    load(password) {
        return (new Promise((resolve, reject) => {
            this.dfs.readFile(this.path, { encoding: "utf8" }, function _readFile(error, data) {
                if (error) {
                    return reject(error);
                }
                return resolve(data);
            });
        }))
        .then((content) => {
            this.setContent(content);
            return super.load(password);
        });
    }

    save(archive, password) {
        return super
            .save(archive, password)
            .then((encryptedContent) => {
                return new Promise((resolve, reject) => {
                    this.dfs.writeFile(this.path, encryptedContent, function _writeFile(err) {
                        if (err) {
                            return reject(err);
                        }
                        return resolve();
                    });
                });
            });
    }

    /**
     * Output the datasource as an object
     * @returns {Object} An object describing the datasource
     */
    toObject() {
        return {
            type: "dropbox",
            token: this.token,
            path: this.path
        };
    }

}

DropboxDatasource.fromObject = function fromObject(obj) {
    if (obj.type === "dropbox") {
        return new DropboxDatasource(obj.token, obj.path);
    }
    throw new Error(`Unknown or invalid type: ${obj.type}`);
};

DropboxDatasource.fromString = function fromString(str, hostCredentials) {
    return DropboxDatasource.fromObject(JSON.parse(str), hostCredentials);
};

registerDatasource("dropbox", DropboxDatasource);

module.exports = DropboxDatasource;
