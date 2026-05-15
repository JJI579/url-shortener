import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
	const userData = ref({});
	const isLoggedIn = ref(false);

	async function login(username: string, password: string) {
		const resp = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: username,
				password: password
			})
		});
		if (resp.ok) {
			userData.value = await resp.json();
			isLoggedIn.value = true;
		} else {
			throw new Error('Login failed\n' + await resp.text());
		}
	}
    
	function getLoggedIn() {
		return isLoggedIn.value
	}

	function getUserData() {
		return userData.value
	}

	return { getLoggedIn, getUserData, login }
})
