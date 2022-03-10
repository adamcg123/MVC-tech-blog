async function createPostHandler(event) {
    event.preventDefult();

    const title = document.querySelector("#post-title").value.trim();

    const post_content = document.querySelector("#post-body").value.trim();
    // const user_id = "1"

    if (body) {

        const response = await fetch("/api/post", {
            method: "POST",
            body: JSON.stringify({
                title,
                body,
                // user_id
            }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (response.ok) {
            document.location.replace("/");
        } else {
            alert(response.statusText)
        }
    }
}
document
    .querySelector("#create-post-btn")
    .addEventListener("click", createPostHandler);