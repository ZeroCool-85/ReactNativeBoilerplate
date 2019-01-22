/* eslint-disable */
import { stringify } from 'query-string'
import merge from 'lodash/merge'
import Config from 'react-native-config'
import axios from 'axios'
import { store } from '../../index'
import md5 from 'md5'

const apiUrl = Config.API_URL

export const checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
        return response
    }
    const error = new Error(`${response.status} ${response.statusText}`)
    error.response = response
    throw error
}

export const parseJSON = response => response.data

export const parseSettings = ({
                                  method = 'GET',
                                  data,
                                  locale,
                                  ...otherSettings
                              } = {}) => {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': locale,
    }
    const validateStatus = status => status < 500
    const settings = {
        data,
        method,
        headers,
        validateStatus,
        ...otherSettings,
    }

    return settings
}

export const parseEndpoint = (endpoint, params) => {
    const url = endpoint.indexOf('http') === 0 ? endpoint : apiUrl + endpoint
    const querystring = params ? `?${stringify(params)}` : ''
    return { url: `${url}${querystring}` }
}

const api = {}

api.request = (endpoint, { params, ...settings } = {}) =>
    axios({ ...parseEndpoint(endpoint, params), ...parseSettings(settings) })
        .then(checkStatus)
        .then(parseJSON)
;['delete', 'get'].forEach(method => {
    api[method] = (endpoint, settings) =>
        api.request(endpoint, { method: method.toUpperCase(), ...settings })
})
;['post', 'put', 'patch'].forEach(method => {
    api[method] = (endpoint, data, settings) =>
        api.request(endpoint, {
            method: method.toUpperCase(),
            data,
            ...settings,
        })
})

api.create = (settings = {}) => ({
    settings,
    setToken(token) {
        this.settings.headers = {
            ...this.settings.headers,
            Authorization: `Bearer ${token}`,
        }
    },

    setAccess() {
        this.settings.headers = {
            ...this.settings.headers,
            'Access-Control-Allow-Origin': '*',
        }
    },

    unsetToken() {
        this.settings.headers = {
            ...this.settings.headers,
            Authorization: undefined,
        }
    },

    request(endpoint, settings) {
        return api.request(endpoint, merge({}, this.settings, settings))
    },

    post(endpoint, data, settings) {
        return this.request(endpoint, { method: 'POST', data, ...settings })
    },

    get(endpoint, settings) {
        return this.request(endpoint, { method: 'GET', ...settings })
    },

    put(endpoint, data, settings) {
        return this.request(endpoint, { method: 'PUT', data, ...settings })
    },

    patch(endpoint, data, settings) {
        return this.request(endpoint, { method: 'PATCH', data, ...settings })
    },

    delete(endpoint, settings) {
        return this.request(endpoint, { method: 'DELETE', ...settings })
    },
})

export default api
