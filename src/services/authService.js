export const authSigninService = async ( credentials ) => {
  return fetch('http://estudiosis.com.br/teste-api.php?action=sign_in', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: credentials.email,
      password: credentials.password,
    }),
  });
}