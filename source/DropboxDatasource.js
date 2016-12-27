const dropboxFS = require("dropbox-fs");

const TextDatasource = window.Buttercup.TextDatasource;
const registerDatasource = window.Buttercup.DatasourceAdapter.registerDatasource;

/**
 * Datasource for Dropbox archives
 * @class DropboxDatasource
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
            this.dfs.readFile(filePath, "utf8", function(error, data) {
                if (error) {
                    return reject(error);
                }
                resolve(data);
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
                    this.dfs.writeFile(this.path, encryptedContent, function(err) {
                        if (err) {
                            return reject(err);
                        }
                        resolve();
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
