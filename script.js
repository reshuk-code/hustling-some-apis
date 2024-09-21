const apiUrl = "https://api.github.com/users/";
const toshowinfo = document.getElementById('show');
const loadingScreen = document.getElementById('loading');
const searchBtn = document.getElementById('btn-search');
const searchInput = document.getElementById('search-here');
const content = document.getElementById('content');

async function checkUsername(username) {
    toshowinfo.innerHTML = '';  
    content.classList.add('hidden');  
    loadingScreen.style.display = "block";  

    try {
        const data = await fetch(apiUrl + username);
        if (!data.ok) {
            throw new Error("User not found");
        }
        const response = await data.json();
        console.log(response);

        
        toshowinfo.innerHTML = `
            <a href="${response.avatar_url}" target="_blank"><img src="${response.avatar_url}" alt="git_avatar" /></a>
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
    } finally {
        loadingScreen.style.display = "none";  
        content.classList.remove('hidden');  
    }
}


function handleSearch() {
    const username = searchInput.value.trim();  
    if (username) {
        checkUsername(username);  
    } else {
        toshowinfo.innerHTML = "<p>Please enter a username.</p>";
    }
}


searchBtn.addEventListener('click', handleSearch);


searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {  
        handleSearch(); 
    }
});
