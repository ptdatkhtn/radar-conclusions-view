import  axios from 'axios';
import { getCsrfToken, getSessionToken } from "./session";

const baseUrl = process.env.REACT_APP_VOTING_API_URL

async function httpRequest(baseUrl, method, path, payload = null) {
  return axios({
      method,
      url: `${baseUrl}/${path}`,
      headers: {
          'X-CSRF-Token': getCsrfToken(),
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getSessionToken()}`,
          // 'Access-Control-Allow-Origin': '*'
      },
      withCredentials: true,
      data: payload || null
  })
}

export const votingApi = {
  //get radar phenomenon vote for current user
  getVote: async (gid, radarId, pid) => {
    return await httpRequest(baseUrl, 'GET', `voting/${gid}/radar/${radarId}/phenomenon/${pid}/user`)
  },

  //get all radar phenomenon votes
  getVotes: async (gid, radarId, pid) => {
    return await httpRequest(baseUrl, 'GET', `voting/${gid}/radar/${radarId}/phenomenon/${pid}`)
  },

  //vote on radar phenomenon as current user
  addVote: async (gid, radarId, pid, payload) => {
    return await httpRequest(baseUrl, 'POST', `voting/${gid}/radar/${radarId}/phenomenon/${pid}`, payload)
  },

  // cancel radar phenomenon vote for current user
  deleteVote: async (gid, radarId, pid) => {
    return await httpRequest(baseUrl, 'DELETE', `voting/${gid}/radar/${radarId}/phenomenon/${pid}/user`)
  },

  //get all votes from all phenomenon by radarId
  getAllVotes: async (gid, radarId) => {
    return await httpRequest(baseUrl, 'GET', `voting/${gid}/radar/${radarId}/phenomenon`)
  },
}

export const ratingApi = {
  //get all votes from all phenomenon by radarId
  getAllRatings: async (gid, radarId) => {
      return await httpRequest(baseUrl, 'GET', `rating/${gid}/radar/${radarId}`)

  },

  //get rating by phenomenon id 
  getRatingByPhenomenonId: async (gid, radarId, pid) => {
      return await httpRequest(baseUrl, 'GET', `rating/${gid}/radar/${radarId}/phenomenon/${pid}/`)

  },

  //delete all votes from all phenomenon by radarId
  deleteAllRatings: async (gid, radarId) => {
      return await httpRequest(baseUrl, 'DELETE', `rating/${gid}/radar/${radarId}/phenomenon`)
  },

  //get all hidden ratings
  getAllHiddenRatings : async (gid, radarId) => {
    return await httpRequest(baseUrl, 'GET', `meta/rating/${gid}/radar/${radarId}/phenomenon/`)
},
}