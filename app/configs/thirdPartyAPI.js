
module.exports = {
    crmTicketTokenCreate: {
        data: {
            userName : process.env.CRM_TICKET_USER_NAME,
            password : process.env.CRM_TICKET_PASSWORD
        },
        method: "POST",
        url: process.env.CRM_TICKET_TOKEN_URL,
        headers: {
            contentType: 'application/json',
        },
    },
    crmTicketCreateNewTicket: {
        data: {
            
        },
        method: "POST",
        url: process.env.CRM_CREATE_NEW_TICKET_URL,
        headers: {
            contentType: 'application/json',
        },
    },
    crmTicketStatus: {
        data: {
            
        },
        url: process.env.CRM_TICKET_URL,
        headers: {
            contentType: 'application/json',
        },
    },
}