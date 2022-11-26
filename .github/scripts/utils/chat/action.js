/**
 * Build google chat link button
 * @param {string} env enviroment deployed 
 * @param {stirng} commitHash commit sha of version deployed
 * @param {string} desc description of the version
 * @param {string} version version name
 * @param {string} repo repository
 * @param {string} workflow workflow id or filename
 * @param {string} linkUrl chat button link
 * @returns 
 */
export const button = (deployedEnv, commit, message, version, repo, workflow, linkUrl) => {
    let env = deployedEnv == "DEV" ? "STAGING" : "LIVE";
    const urlParams = { env, commit, repo, workflow, message, version };
    const url = `${linkUrl}?${encodeQueryData(urlParams)}`;
    return deployedEnv !== "LIVE" ? {
        textButton: {
            text: `Deploy to ${env}`,
            onClick: {
                openLink: {
                    url: url
                }
            }
        }
    } : undefined;
}



function encodeQueryData(data) {
    const ret = [];
    for (let d in data)
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
}