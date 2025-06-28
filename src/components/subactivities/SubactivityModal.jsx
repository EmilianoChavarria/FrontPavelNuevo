import { Dialog } from 'primereact/dialog';
import React, { useState } from 'react'
import { SubactivityService } from '../../services/SubactivityService';

export const SubactivityModal = ({ visible, setVisible, activityId }) => {

    const [subactivities, setSubactivities] = useState([]);

    const fetchSubactivities = async () => {
        setIsLoading(true)
        try {
            const data = await SubactivityService.getByActivityId(activityId)
            if (data) setSubactivities(data.subactivities)
        } catch (error) {
            console.error('Error fetching project details:', error)
        } finally {
            setIsLoading(false)
        }
    }

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
            asdas

        </Dialog>
    )
}
