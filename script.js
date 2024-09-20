const username = prompt("Enter your GitHub username:");
const apiUrl = "https://api.github.com/users/";
const toshowinfo = document.getElementById('show');

async function checkUsername() {
    try {
        const data = await fetch(apiUrl + username);
        if (!data.ok) {
            throw new Error("User not found"); // Handle non-200 responses
        }
        const response = await data.json();
        console.log(response);

        // Extract and display specific user info
        toshowinfo.innerHTML = `
            <img src="${response.avatar_url}" alt="git_avatar" />
            <p><strong>Name:</strong> ${response.name || "N/A"}</p>
            <p><strong>Username:</strong> ${response.login}</p>
            <p><strong>Followers:</strong> ${response.followers}</p>
            <p><strong>Following:</strong> ${response.following}</p>
            <p><strong>Repositories:</strong> ${response.public_repos}</p>
            <p><strong>Profile:</strong> <a href="${response.html_url}" target="_blank">${response.html_url}</a></p>
        `;
    } catch (error) {
        console.error("Error fetching data:", error);
        toshowinfo.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

checkUsername();
