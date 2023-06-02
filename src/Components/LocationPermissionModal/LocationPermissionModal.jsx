import React, { useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';
import './LocationPermissionModal.css';

export default function LocationPermissionModal({ showModal, handleAllowLocationAccess, handleDenyLocationAccess }) {
    return (
        <Modal
            className="location-permission-modal"
            show={showModal}
            onHide={() => {}}
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title id="modal-title">Weather App Location Request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h1 id="modal-body-header">Can this application access your current location?</h1>
                <p id="modal-body-content">Please select one of the following options to continue</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleAllowLocationAccess}>
                    Allow
                </Button>
                <Button variant="secondary" onClick={handleDenyLocationAccess}>
                    Deny
                </Button>
            </Modal.Footer>
        </Modal>
    )
}