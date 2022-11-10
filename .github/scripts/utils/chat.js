import fetch from 'node-fetch';
import { button } from "./chat/action.js"
(async () => {
    try {
        const args = process.argv.slice(2);
        const url = args[0];
        const env = args[1];
        const commitHash = args[2];
        const appName = args[3];
        const version = args[4];
        const appSite = args[5];
        const message = args[6];
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
                                            button: button(env, commitHash)
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