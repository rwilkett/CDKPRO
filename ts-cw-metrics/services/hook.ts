import { SNSEvent } from "aws-lambda";

const webHookUrl = 'https://prod-03.centralindia.logic.azure.com:443/workflows/876ceebb7407440685d1a0803b2e7778/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=AXevrXDRz1OqYYBnTup7qCGbnuOZryk_ixz_1jennjA';

async function handler(event: SNSEvent) {
    for (const record of event.Records) {
        await fetch(webHookUrl, {
            method: 'POST',
            body: JSON.stringify({
                "text": `Houston, we have a problem: ${record.Sns.Message}`
            })
        })
    }
}


export { handler }