export async function postDataToAPI(url, payload = null, method = "POST") {
    console.log("url", url, "payload", payload, "method", method);
    const response = await fetch(url, {
        method: method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    return response;
}
