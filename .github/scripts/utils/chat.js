import fetch from 'node-fetch'; 

(async () => {
    try {
        const args = process.argv.slice(2);
        const url = args[0];
        const env = args[1];
        const commitHash = args[2];
        const appName = args[3];
        const version = args[4];
        const appSite = args[5];
        console.log(url, env, version, commitHash);
        const request = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "cards": [
                    {
                        "header": {
                            "title": `${appName} App Deployment`,
                            "subtitle": `${appSite}`,
                        },
                        "sections": [
                            {
                                "widgets": [
                                    {
                                        "keyValue": {
                                            "topLabel": `${env} Shipped`,
                                            "content": `${version} version deployed`,
                                            "contentMultiline": "true",
                                            "icon": "CLOCK",
                                            "button": {
                                                "textButton": {
                                                    "text": "Deploy to QA",
                                                    "onClick": {
                                                        "action": {
                                                            "actionMethodName": "deploy",
                                                            "parameters": [
                                                                {
                                                                    "key": "env",
                                                                    "value": "QA"
                                                                },
                                                                {
                                                                    "key": "hash",
                                                                    "value": `${commitHash}`
                                                                }
                                                            ]
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]

            })
        }


        console.log(url, env, version, commitHash, request);
        const response = await fetch(url, request)
        const responseJson = await response.json();
        console.log(responseJson);
    } catch (e) {
        console.error(e)
        process.exit(1);
    }
})(); 