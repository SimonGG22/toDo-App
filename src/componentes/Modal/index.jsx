import { createPortal } from "react-dom"

import './index.scss'

function Modal ({ children }) {
    return createPortal(
            <div className="modal-container">
                {children}
            </div>,
        document.getElementById('modal')
    )
}

export {Modal}