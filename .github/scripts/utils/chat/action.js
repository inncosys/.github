export const button = (env, commitHash) => {
    let nextEnv = env == "DEV" ? "QA" : "LIVE";
    return env !== "LIVE" ? {
        textButton: {
            text: `Deploy to ${nextEnv}`,
            onClick: {
                action: {
                    actionMethodName: "deploy",
                    parameters: [
                        {
                            key: "env",
                            value: nextEnv
                        },
                        {
                            key: "hash",
                            value: `${commitHash}`
                        }
                    ]
                }
            }
        }
    } : undefined;
}