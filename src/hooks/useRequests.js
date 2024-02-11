const fetchUserInfo = (authToken, hook) => {
  fetch('https://palatial-api.palatialxr.com/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    hook(data);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    console.error(authToken);
  });
};

const fetchProjectInfo = (data, hook) => {
  fetch(`https://palatial-api.palatialxr.com/projects/${data.projectId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${data.authToken}`
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    hook(data);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
};

const fetchProjectMembers = (data, hook) => {
  fetch(`https://palatial-api.palatialxr.com/projects/${data.projectId}/members`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${data.authToken}`
    },
//    body: JSON.stringify({ id: data.projectId, email: data.email })
  }).then(data => {
    hook(data);
  })
  .catch(error => {
    console.error('There was a problem fetching project members: ', error);
  });
};

export { fetchUserInfo, fetchProjectInfo, fetchProjectMembers };
