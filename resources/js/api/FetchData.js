export async function fetchData(url) {
    let object = {};

    await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then(
            (data) => (object = data),
            (error) => console.log(error)
        );
    return object;
}
