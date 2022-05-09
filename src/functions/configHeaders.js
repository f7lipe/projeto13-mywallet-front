function configHeaders(token=''){
    return { headers: { Authorization: `Bearer ${token}` }}
}

export default configHeaders