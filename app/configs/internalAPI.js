
module.exports = {
    getUserById: {
        method: 'GET',
        url: "",
        headers: {
            contentType: 'application/json',
        }
    },
    getAPById: {
        method: 'GET',
        url: "",
        headers: {
            contentType: 'application/json',
        }
    },
    getSequenceId: {
        method: 'GET',
        url: "",
        headers: {
            contentType: 'application/json',
        }
    },
    AddLeadNotification: {
        method: 'POST',
        url: "",
        headers: {
            contentType: 'application/json'
        }
    },
    sendEmail: {
        method: "POST",
        url: process.env.COMMUNICATION + process.env.SEND_EMAIL,
        headers: {
            contentType: "application/json",
        },
    },
    
}