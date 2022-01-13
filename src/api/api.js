import axios from 'axios';

const client = axios.create({
	baseURL: "https://peagle-backend.herokuapp.com"
	// baseURL: "http://localhost:5000"
});

const printOutput = true;

/* ---------- AUTHENTICATION ---------- */
export const Register = async (email, password, fname, lname) => {
	const { data } = await client.post("/users", {
		fname: fname,
		lname: lname,
		email: email,
		password: password
	});
	printOutput && console.log(data);
	return data;
};

export const Login = async (email, password) => {
	const { data } = await client.post("/users/login", {
		email: email,
		password: password
	});
	printOutput && console.log(data);
	return data;
};

// Add token to blocklist
export const Logout = async (token) => {
	const { data } = await client.post("/users/logout", null, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	return data;
};

// Add all current tokens to blocklist
export const LogoutAll = async (token) => {
	const { data } = await client.post("/users/logoutAll", null, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	printOutput && console.log(data);
	return data;
};

// Used to check authentication for now
export const ReadUser = async (token) => {
	const { data } = await client.get("/users/me", {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	printOutput && console.log(data);
	return data;
};

// Edit credentials
export const EditUser = async (token, email, fname, lname) => {
	const { data } = await client.patch("/users/me",
		{
			email: email,
			fname: fname,
			lname: lname
		},
		{
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});
	printOutput && console.log(data);
	return data;
};

/* ---------- DASHBOARDS ---------- */
export const CreateDashboard = async (token, title) => {
	const { data } = await client.post("/dashboards", { name: title }, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	printOutput && console.log(data);
	return data;
}

export const GetDashboards = async (token) => {
	const { data } = await client.get("/dashboards/me", {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	printOutput && console.log(data);
	return data;
}

export const GetDashboard = async (token, id) => {
	const { data } = await client.get(`/dashboards/${id}`, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	printOutput && console.log(data);
	return data;
}

export const EditDashboard = async (token, id, updates) => {
	const { data } = await client.patch(`/dashboards/edit/${id}`, updates, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	printOutput && console.log(data);
	return data;
}

export const DeleteDashboard = async (token, id) => {
	const { data } = await client.delete(`/dashboards/${id}`, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	printOutput && console.log(data);
	return data;
}

/* ---------- CHARTS ---------- */
export const CreateChart = async (token, chart) => {
	const { data } = await client.post(`/charts`, chart,
		{
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});
	printOutput && console.log(data);
	return data;
}

export const UpdateChart = async (token, id, chart) => {
	const { data } = await client.put(`/charts/${id}`, chart,
		{
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});
	printOutput && console.log(data);
	return data;
}

export const GetCharts = async (token, id) => {
	const { data } = await client.get(`/dashboards/${id}/charts`, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	printOutput && console.log(data);
	return data;
}

export const DeleteChart = async (token, id) => {
	const { data } = await client.delete(`/charts/${id}`, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	printOutput && console.log(data);
	return data;
}

/* ---------- CATEGORIES ---------- */
export const CreateCategory = async (token, title) => {
	const { data } = await client.post("/category", { name: title }, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	printOutput && console.log(data);
	return data;
}

export const GetCategories = async (token) => {
	const { data } = await client.get("/category/me", {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	printOutput && console.log(data);
	return data;
}

export const GetCategory = async (token, id) => {
	const { data } = await client.get(`/category/${id}`, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	printOutput && console.log(data);
	return data;
}

export const EditCategory = async (token, id, updates) => {
	const { data } = await client.patch(`/category/edit/${id}`, updates, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	printOutput && console.log(data);
	return data;
}

export const DeleteCategory = async (token, id) => {
	const { data } = await client.delete(`/category/${id}`, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	printOutput && console.log(data);
	return data;
}

/* ---------- DATA ---------- */
export const GetData = async (token) => {
	const { data } = await client.get(`/data/me`, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	printOutput && console.log(data);
	return data;
}

export const PostData = async (token, dataObj) => {
	const { data } = await client.post(`/data`, dataObj,
		{
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});
	printOutput && console.log(data);
	return data;
}

export const GetDataIds = async (token) => {
	const { data } = await client.get(`/data/ids`, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	printOutput && console.log(data);
	return data;
}

export const GetDataById = async (token, id) => {
	const { data } = await client.get(`/data/${id}`, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	printOutput && console.log(data);
	return data;
}

export const GetDataByCategoryId = async (token, id) => {
	const { data } = await client.get(`/category/${id}/data`, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	printOutput && console.log(data);
	return data;
}

export default { Register, Login, Logout, LogoutAll, ReadUser, EditUser, 
	CreateDashboard, GetDashboards, GetDashboard, DeleteDashboard, 
	CreateChart, UpdateChart, GetCharts, DeleteChart, 
	GetData, PostData, GetDataIds, GetDataById, 
	CreateCategory, GetCategories, GetCategory, EditCategory, DeleteCategory, GetDataByCategoryId
};