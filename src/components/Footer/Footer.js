import React from 'react'
import "./Footer.css"
import {Facebook,Mail,Twitter,Phone} from '@material-ui/icons'
import {IconButton} from '@material-ui/core'

function Footer() {
    return (
        <div className="footer_">
            <div className="footer_creator">
                created by Stanislav Popov &copy;
            </div>
                <div className="contacts_icons">
                <IconButton><Facebook /></IconButton>
                <IconButton><Mail /></IconButton>
                <IconButton><Twitter /></IconButton>
                <IconButton><Phone /></IconButton>
                </div>
        </div>
    )
}

export default Footer
