// Login functionality
let users = [];

// Load users from JSON
async function loadUsers() {
	try {
		const response = await fetch('loginbs.json');
		const data = await response.json();
		users = data.users;
	} catch (error) {
		console.error('Error loading users:', error);
	}
}

// Apply local overrides (from password resets) to users array
function applyLocalOverrides() {
	try {
		const raw = localStorage.getItem('userUpdates');
		if (!raw) return;
		const updates = JSON.parse(raw);
		users = users.map(u => {
			if (updates[u.username] && updates[u.username].password) {
				return Object.assign({}, u, { password: updates[u.username].password });
			}
			return u;
		});
	} catch (e) {
		console.error('Error applying local overrides', e);
	}
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
	loadUsers();

	const loginForm = document.getElementById('loginForm');
	const errorMessage = document.getElementById('errorMessage');
	const successMessage = document.getElementById('successMessage');
	const usernameInput = document.getElementById('username');
	const passwordInput = document.getElementById('password');

	if (loginForm) {
		loginForm.addEventListener('submit', async (e) => {
			e.preventDefault();

			const username = usernameInput.value.trim();
			const password = passwordInput.value;
			const rememberMe = document.getElementById('rememberMe').checked;

			// Clear messages
			errorMessage.classList.remove('show');
			successMessage.classList.remove('show');

			// Validate input
			if (!username || !password) {
				errorMessage.textContent = 'Ju lutemi plotësoni të gjitha fushat.';
				errorMessage.classList.add('show');
				return;
			}

			// Check credentials (apply local overrides first)
			applyLocalOverrides();
			const user = users.find(u => u.username === username && u.password === password);

			if (user) {
				// Success
				successMessage.textContent = 'Kyçja u zgjidh me sukses! Po e ridrejtoj...';
				successMessage.classList.add('show');

				// Save user info including role if remember me is checked
				const userPayload = {
					username: user.username,
					email: user.email,
					name: user.name,
					role: user.role || 'student'
				};

				if (rememberMe) {
					localStorage.setItem('currentUser', JSON.stringify(userPayload));
				} else {
					sessionStorage.setItem('currentUser', JSON.stringify(userPayload));
				}

				// Redirect to paslogi.html after 1.5 seconds
				setTimeout(() => {
					window.location.href = 'paslogi.html';
				}, 1500);
			} else {
				// Failed
				errorMessage.textContent = 'Emri i përdoruesit ose fjalëkalimi janë të pasaktë.';
				errorMessage.classList.add('show');
				passwordInput.value = '';
			}
		});
	}

	// Demo credential click handlers
	const demoCreds = document.querySelectorAll('.demo-cred');
	demoCreds.forEach(cred => {
		cred.addEventListener('click', () => {
			const username = cred.getAttribute('data-username');
			const password = cred.getAttribute('data-password');
			usernameInput.value = username;
			passwordInput.value = password;
			usernameInput.focus();
		});
	});
});
