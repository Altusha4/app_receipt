const API_URL = "http://localhost:8080/api";
let userToken = localStorage.getItem("token");

if (userToken) {
    showDashboard();
}

async function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const response = await fetch(`${API_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (data.accessToken) {
        localStorage.setItem("token", data.accessToken);
        userToken = data.accessToken;
        showDashboard();
    } else {
        alert("Login failed: " + data.message);
    }
}

function showDashboard() {
    document.getElementById("auth-section").classList.add("hidden");
    document.getElementById("recipe-section").classList.remove("hidden");
    document.getElementById("logout-btn").classList.remove("hidden");
    loadRecipes();
}

async function createRecipe() {
    const recipeData = {
        title: document.getElementById("recipe-title").value,
        description: document.getElementById("recipe-desc").value,
        category: document.getElementById("recipe-category").value
    };

    const response = await fetch(`${API_URL}/recipes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": userToken
        },
        body: JSON.stringify(recipeData)
    });

    if (response.ok) {
        alert("Recipe added to your vault!");
        loadRecipes();
    }
}

async function loadRecipes() {
    const response = await fetch(`${API_URL}/recipes`);
    const list = await response.json();
    const container = document.getElementById("recipes-list");
    container.innerHTML = "";

    list.forEach(recipe => {
        container.innerHTML += `
            <div class="recipe-item">
                <h3 style="margin-top:0">${recipe.title}</h3>
                <p>${recipe.description}</p>
                <span style="color:var(--warm-spice); font-weight:bold">${recipe.category}</span>
            </div>
        `;
    });
}

document.getElementById("logout-btn").onclick = () => {
    localStorage.removeItem("token");
    location.reload();
};