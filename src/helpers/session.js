import axios from 'axios'

// using axios built in interceptors to refresh the page if the user is either unauthorized
// or his session has run out. Drupal will automatically log the user out on refresh
axios.interceptors.response.use(null, error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        if (!(process.env.NODE_ENV === 'development')) {
            window.location.replace(process.env.REACT_APP_PUBLIC_URL)
        }
    }

    return Promise.reject(error)
})

export function getSessionToken() {
    return sessionStorage.getItem('fp-session-token')
}

export function getCsrfToken() {
    return sessionStorage.getItem('fp-csrf-token')
}

export function getUserId() {
    return sessionStorage.getItem('fp-user-id')
}

export function clearSession() {
    sessionStorage.clear()
    return true
}

export function getUserRoles() {
    const roles = sessionStorage.getItem('fp-user-roles')

    if (roles && roles.length) {
        return JSON.parse(roles)[0]
    }

    return false
}

/**
 * Fetch csrf & session token & user id and start session storing data to sessionStorage
 * @returns {Promise<Boolean>} Returns true
 */
export async function startSession() {
    return axios({
        method: 'get',
        url: `${process.env.REACT_APP_DRUPAL_API_URL}/session/token`,
        withCredentials: true
    }).then(csrfRes => {
        const csrfToken = csrfRes.data['X-CSRF-Token']
        sessionStorage.setItem('fp-csrf-token', csrfToken)
        return axios({
            method: 'get',
            url: `${process.env.REACT_APP_DRUPAL_API_URL}/fp-session-token`,
            withCredentials: true
        }).then(tokenRes => {
            const token = tokenRes.data.token
            const userId = Number(tokenRes.data.user_id)
            const roles = tokenRes.data.accountDrupalRoles

            sessionStorage.setItem('fp-session-token', token)
            sessionStorage.setItem('fp-user-id', userId)
            sessionStorage.setItem('fp-user-roles', JSON.stringify(roles))
            return true
        })
    })
}
