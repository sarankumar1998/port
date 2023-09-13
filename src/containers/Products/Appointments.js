import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbars from "../../components/Navbars"
import moment from "moment";
import { Chip } from '@mui/material';
import ApptsDialog from './ApptsDialog';


const apiBaseUrl2 = 'http://localhost:4000/api/v8/available-slots';

function Appointments() {
    const [slots, setSlots] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedDialogDate, setSelectedDialogDate] = useState('');
    const [selectedDateSlots, setSelectedDateSlots] = useState([]);

    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = () => {
        axios.get(apiBaseUrl2)
            .then(response => {
                const currentDate = moment().format('YYYY-MM-DD');
                const filteredSlots = response.data.filter(slot => moment(slot.date).format('YYYY-MM-DD') >= currentDate);
                const sortedSlots = filteredSlots.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf());
                setSlots(sortedSlots);
            })
            .catch(error => {
                console.error('Error fetching available slots:', error);
            });
    };

    const generateHourlySlots = (start, end) => {
        const startTime = moment(start, 'HH:mm');
        const endTime = moment(end, 'HH:mm');
        const hourlySlots = [];

        while (startTime.isBefore(endTime)) {
            hourlySlots.push(startTime.format('HH:mm A'));
            startTime.add(1, 'hour');
        }

        return hourlySlots;
    };

    const handleOpenDialog = (date) => {
        setSelectedDialogDate(date);
        const dateSlots = slots.filter(slot => moment(slot.date).format('MMM D') === date);
        setSelectedDateSlots(dateSlots);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <Navbars />
            <div style={{ margin: '5rem' }}>
                <Navbars />
                <div className="slots mt-5 px-5">
                    <h2>Available Slots</h2>
                    <div className="card">
                        <div className="card-body">
                            <p>Dr. Annu Sharma</p>
                            <p>Pediatrician</p>
                            <div className="row">
                                {slots.map((slot) => (
                                    <div key={slot.id} className="col-xl-1 mb-3">
                                        <Chip
                                            style={{
                                                background: moment().format('MMM D') === moment(slot.date).format('MMM D') ? 'white' : 'yellow',
                                            }}
                                            label={<>
                                                {moment().format('YYYY-MM-DD') === moment(slot.date).format('YYYY-MM-DD') ? 'Today' : moment(slot.date).format('MMM D')}
                                                <br />
                                                {generateHourlySlots(slot.start_time, slot.end_time).length} appts
                                            </>}
                                            onClick={() => handleOpenDialog(moment(slot.date).format('MMM D'))}
                                            sx={{ borderRadius: '0', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ApptsDialog
                handleOpenDialog={handleOpenDialog}
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                selectedDialogDate={selectedDialogDate}
                selectedDateSlots={selectedDateSlots}
                generateHourlySlots={generateHourlySlots}
            />
        </>
    );
}

export default Appointments;
