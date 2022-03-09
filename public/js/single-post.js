const { header } = require("express/lib/request");

async function submitPostHandler(event) {
    event.preventDefult();
    const post_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];
    const comment_text = document.querySelector("#comment-text").value.trim();
    const user_id = "1"

    if (comment_text) {

        const response = await fetch("/api/comments", {
            method: "POST",
            body: JSON.stringify({
                comment_text,
                user_id,
                post_id
            }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (response.ok) {
            document.location.reload()
        } else {
            alert(response.statusText)
        }
    }
}
document
    .querySelector("#post-comment-btn")
    .addEventListener("click", submitPostHandler);