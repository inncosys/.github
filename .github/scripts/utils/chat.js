import fetch from 'node-fetch';
import { button } from "./chat/action.js"
(async () => {
    try {
        const args = process.argv.slice(2);
        const url = args[0];
        const env = args[1];
        const repo = args[2];
        const workflow = args[3];
        const commitHash = args[4];
        const buttonUrl = args[5];
        const appName = args[6];
        const version = args[7];
        const appSite = args[8];
        const message = args[9];
        const request = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                cards: [
                    {
                        header: {
                            title: `${appName} App Deployment`,
                            subtitle: `${appSite}`,
                        },
                        sections: [
                            {
                                widgets: [
                                    {
                                        textParagraph: {
                                            text: `${message}`
                                        }
                                    }
                                ]
                            },
                            {
                                widgets: [
                                    {
                                        keyValue: {
                                            topLabel: `${env} Shipped`,
                                            content: `${version} version deployed`,
                                            contentMultiline: "true",
                                            icon: "FLIGHT_DEPARTURE",
                                            button: button(env, commitHash, message, version, repo, workflow, buttonUrl)
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]

            })
        }
        const response = await fetch(url, request)
        const responseJson = await response.json();
        console.log(responseJson);
    } catch (e) {
        console.error(e)
        process.exit(1);
    }
})(); 