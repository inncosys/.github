import fetch from 'node-fetch';
import { Buffer } from "buffer";
import { createWriteStream } from "fs"

(async () => {
    try {
        const args = process.argv.slice(2);
        const url = `https://api.github.com/repos/${args[0]}/actions/artifacts/${args[2]}/zip`;
        console.log(url)
        const request = {
            method: "head",
            headers: {
                'Authorization': `Bearer ${args[1]}`, "Accept": "application/vnd.github+json"
            },
            redirect: "manual"
        }
        const response = await fetch(url, request);
        const artifactUrl = response.headers.get("Location")
        await downloadFile(artifactUrl, "../../../../dist.zip")
    } catch (e) {
        console.error(e)
        process.exit(1);
    }
})();
const downloadFile = (async (url, path) => {
    fetch(url, {
        "headers": {},
        "method": "GET"
    }).then(function (resp) {
        return resp.blob();
    }).then(async function (blob) {
        var buffer = await blob.arrayBuffer();
        buffer = Buffer.from(buffer)
        createWriteStream(path).write(buffer);
    })
});
