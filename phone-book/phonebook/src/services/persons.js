/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

// eslint-disable-next-line no-undef
const baseURL = process.env.BACKEND_URL

const getAll = () => {
    return axios.get(baseURL)
        .then(res => res.data)
}

const create = (person) => {
    return axios.post(baseURL, person)
        .then(res => {
            return res.data
        }).catch(error => {
            throw error.response.data
        })
}

const remove = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}

const update = (changedData) => {
    return axios.put(`${baseURL}/${changedData.id}`, changedData)
        .then(res => res.data)
}

export default {
    getAll,
    create,
    remove,
    update
}