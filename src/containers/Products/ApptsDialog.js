import React from 'react';
import { Chip, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import axios from 'axios'; // Import axios for making the POST request

export default function ApptsDialog({ handleCloseDialog, openDialog, selectedDialogDate, generateHourlySlots, selectedDateSlots }) {

    const bookAppointment = async (selectedTimeSlot) => {
        try {
            const response = await axios.post('http://localhost:4000/api/v8/book-appointment', { selectedTimeSlot });
            console.log(response.data.message); // Display the response message
            // Perform any additional actions after booking the appointment
        } catch (error) {
            console.error('Error booking appointment:', error);
            // Handle error cases
        }
    };

    return (
        <div>
            <Dialog open={openDialog} onClose={handleCloseDialog} minWidth="md" fullWidth>
                <DialogTitle>{selectedDialogDate}</DialogTitle>
                <DialogContent>
                    <div>
                        <div>
                            {selectedDateSlots.map((slot) => (
                                <div key={slot.id} style={{ marginBottom: '1rem' }}>
                                    {generateHourlySlots(slot.start_time, slot.end_time).map((hourSlot) => (
                                        <Chip
                                            sx={{ borderRadius: '0' }}
                                            key={hourSlot}
                                            label={hourSlot}
                                            style={{ margin: '0.5rem', background: "yellow" }}
                                            onClick={() => bookAppointment(hourSlot)}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
