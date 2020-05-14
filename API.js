import { baseUrl } from './Server/baseUrl'

export const fetchDataAPI = () => (
        fetch(baseUrl)
        .then(response => response.json())
        .catch(err => {throw new Error(err.message)})    
)


export const addEmpolyeeAPI = (employee) => (
    fetch(baseUrl+'send-data', {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(employee)
    })
    .then(response => response.ok)
    .catch(err => {throw new Error(err.message)})
)

export const updateEmpolyeeAPI = (newData) => (
    fetch(baseUrl+'update', {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(newData)
    })
    .then(response => response.ok)
    .catch(error => error.message)
)

export const deleteEmployeeAPI = (id) => (
    fetch(baseUrl+'delete', {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({id})
    })
    .then(response => response.ok)
    .catch(error => {throw new Error(error.message)})
)

export const uploadImageAPI = (image)=> {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'EmployeeApp')
    data.append('cloud_name', 'gallarycloud')
    return(
        fetch('https://api.cloudinary.com/v1_1/gallarycloud/image/upload', {
            method: 'POST',
            body: data
        }).then(response => response.json())
        .then(result => result.url)
        .catch(err => {throw new Error(err.message)})        
    )
}