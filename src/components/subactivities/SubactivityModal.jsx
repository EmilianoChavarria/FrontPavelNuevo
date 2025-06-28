import { Dialog } from 'primereact/dialog';
import React from 'react'

export const SubactivityModal = () => {
    return (
        <Dialog
            header="Subactividades"
            visible={visible}
            onHide={() => {
                if (!visible) return;
                setVisible(false);
                formik.resetForm();
            }}
            style={{ width: '30vw' }}
            breakpoints={{ '960px': '50vw', '641px': '50vw' }}
        >
            

        </Dialog>
    )
}
