//register api
export const registerUser = async(email, password) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password}),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to register user');
  }
  return data;
}

//login api
export const loginUser = async(email, password) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`,{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password}),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Wrong email or password');
  }
  return data;
}


//submit blog api

export const submitBlog = async (title, content) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/blog/addblog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, content })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    return err.message;
  }
}

//fetch blogs api
export const fetchBlogs = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/blog/getblogs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    return  `Error fetching blogs: ${err.message}`;
  }
}


//deleting a blog api
export const removeBlog = async (blogId) => {
  
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/blog/delete/${blogId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return await response.json();
  } catch (err) {
    throw new Error(`Error deleting blog: ${err.message}`);
  }
}


export const randomBlogs = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/blog/random`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error fetching random blogs: ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    throw new Error(`Error fetching random blogs: ${err.message}`);
  }
}

